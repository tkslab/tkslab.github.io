$(function() {
	$('p').each(function(index, elem) {
		let i = index + 1
		$(elem).prepend(`[<a href="#id_${i}">${i}</a>]<a id="id_${i}"></a>　`);
    });
    
    
    let depthJapaneseStyleQuotationMark = 0;
    let depthJapaneseRoundBrackets = 0;
    
	$('p').each(function(index, elem) {
		let tmpHTML = "";
		
		$.each($(elem).html().split(""), function (_, char) {
			if (char == "「") {
				depthJapaneseStyleQuotationMark += 1

			    if (depthJapaneseStyleQuotationMark == 1) {
					tmpHTML += `<span class='japanese_style_quotation_mark'>${char}`
			    }
			} else if (char == "」") {
				depthJapaneseStyleQuotationMark -= 1

			    if (depthJapaneseStyleQuotationMark == 0) {
					tmpHTML += `${char}</span>`
			    }
			}
			 else if (char == "（") {
				depthJapaneseRoundBrackets += 1

			    if (depthJapaneseRoundBrackets == 1) {
				tmpHTML += `<span class='japanese_style_round_brackets'>${char}`
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
	
		$(elem).html(tmpHTML);
	});
});

