$(function() {
    // cases ディレクトリ以下のファイルに対しては
    // 段落番号を表示する

    if (location.pathname.split("/").includes("cases")) {
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
    } else {
        // cases 以外のディレクトリのファイルに対しては
        // 冒頭に一文字分の空白を挿入

        $('p').each(function(_, elem) {
            $(elem).prepend(`　`);
        });
    }
});
