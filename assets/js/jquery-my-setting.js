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

        // let pattern_matched = tmpHTML.match(/[〇一二三四五六七八九の条]+条/);
        
        $(elem).html(tmpHTML);
    });
});
