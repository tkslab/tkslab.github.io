function replaceTextWighObj(string, obj) {
	$.each(obj, function(key, value) {
		string = string.replace(new RegExp(key, 'g'), value);
	});
	return string;
}

var objChineseNumbersAndRomanNumbers = {
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
	'、': ","
}

var search_pattern_for_using_roman_numbers = [
	"([〇一二三四五六七八九]+[条項号]の){1,2}[〇一二三四五六七八九]+[条項号]?[あ-ん、。]",
	"[〇一二三四五六七八九]+[条項号]",
	"[〇一二三四五六七八九]+(年|月|箇月|カ月|日)",
	"[〇一二三四五六七八九]+[巻号頁]",
	"[〇一二三四五六七八九]+・[〇一二三四五六七八九]+・[〇一二三四五六七八九]+",
	"[〇一二三四五六七八九、兆億万]+円",
]


$(function() {
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


		$.each(search_pattern_for_using_roman_numbers, function(_, search_pattern) {


			let patterns_matched = tmpHTML.match(new RegExp(search_pattern, "gi"));
			
			// 文字列の長さ順にソート
			console.log(patterns_matched);
			patterns_matched.sort(function(a, b) {return b.length - a.length;});
			console.log(patterns_matched);

			$.each(patterns_matched, function(_, pattern) {
				let text_with_hankaku_numbers = replaceTextWighObj(pattern,
					objChineseNumbersAndRomanNumbers);


				tmpHTML = tmpHTML.replace(new RegExp(pattern, 'g'),
					text_with_hankaku_numbers);
			});
		});

		$(elem).html(tmpHTML);
	});
});
