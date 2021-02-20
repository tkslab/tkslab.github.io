function replaceTextWighObj(string, obj) {
	$.each(obj, function(key, value) {
		string = string.replace(new RegExp(key, 'g'), value);
	});
	return string;
}


const large_numbers = {
	'兆': 1000000000000,
	'億': 100000000,
	'万': 10000,
	'千': 1000,
	'百': 100,
	'十': 10,
	}

const objChineseNumbersAndRomanNumbers = {
	'〇': 0,
	'一': 1,
	'二': 2,
	'三': 3,
	'四': 4,
	'五': 5,
	'六': 6,
	'七': 7,
	'八': 8,
	'九': 9,
}

const search_pattern_for_using_roman_numbers = [
	"([〇一二三四五六七八九、]+[条項号]の){1,2}[〇一二三四五六七八九、]+[条項号]?[あ-ん、。]",
	"[〇一二三四五六七八九、]+[条項号]",
	"[〇一二三四五六七八九、]+各[条項号]",
	// 割合
	"[〇一二三四五六七八九]+分の[〇一二三四五六七八九]+",
	// 日時
	"[〇一二三四五六七八九]+・[〇一二三四五六七八九]+・[〇一二三四五六七八九]+",
	"[〇一二三四五六七八九]+(年|月|箇月|カ月|日)",
	"[〇一二三四五六七八九]+[時分秒]",
	// 出典
	"[〇一二三四五六七八九]+[巻号頁]",
	// 金額
	"[〇一二三四五六七八九、兆億万]+円",
	// 大きさや長さ
	"[〇一二三四五六七八九・]+(平方|立方|キロ|センチ|ミリ|ナノ)*(メートル|ヘクタール)",
	// 個数
	"[〇一二三四五六七八九]+(人|名)",
]



$(function() {
	// 段落番号の自動割り当て
	let para_index = 0;
	$('p').each(function(_, elem) {
		if ($(elem).closest("li").length > 0) {
			return true
		}

		para_index += 1;
		$(elem).prepend(
			`[<a href="#id_${para_index}">${para_index}</a>]<a id="id_${para_index}"></a>　`
		);
	});


	let depthJapaneseStyleQuotationMark = 0;
	let depthJapaneseRoundBrackets = 0;

	$('p').each(function(index, elem) {
		let tmpHTML = "";

		// 「」と（）を強調
		$.each($(elem).html().split(""), function(_, char) {
			if (char == "「") {
				depthJapaneseStyleQuotationMark += 1

				if (depthJapaneseStyleQuotationMark ==
					1) {
					tmpHTML +=
						`<span class='japanese_style_quotation_mark'>${char}`
				}
			} else if (char == "」") {
				depthJapaneseStyleQuotationMark -= 1

				if (depthJapaneseStyleQuotationMark ==
					0) {
					tmpHTML += `${char}</span>`
				}
			} else if (char == "（") {
				depthJapaneseRoundBrackets += 1

				if (depthJapaneseRoundBrackets == 1) {
					tmpHTML +=
						`<span class='japanese_style_round_brackets'>${char}`
				}
			} else if (char == "）") {
				depthJapaneseRoundBrackets -= 1

				if (depthJapaneseRoundBrackets == 0) {
					tmpHTML += `${char}</span>`
				}
			} else {
				tmpHTML += `${char}`
			}
		});


		// 漢数字を算用数字に変換
		$.each(search_pattern_for_using_roman_numbers, function(_, search_pattern) {
			let patterns_matched = tmpHTML.match(new RegExp(search_pattern, "gi"));
			
			if (patterns_matched == null) {
				return true;
			}
			
			// 文字列の長さ順にソート
			patterns_matched.sort(function(a, b) {return b.length - a.length;});
			
			$.each(patterns_matched, function(_, pattern) {
				let text_with_hankaku_numbers = replaceTextWighObj(pattern,
					objChineseNumbersAndRomanNumbers);


				tmpHTML = tmpHTML.replace(new RegExp(pattern, 'g'),
					text_with_hankaku_numbers);
			});
		});

		// 昭和28年あ第1713号 => 昭和28年（あ）第1713号
		tmpHTML = tmpHTML.replace(/(年)([^法律政令規則条約]{1,2})(第)(.{1,5})(号)/g, `$1（$2）$3$4$5`);
		$(elem).html(tmpHTML);
	});
});
