$(function() {
  // cases ディレクトリ以下のファイルに対してのみ
  // 段落番号を表示する
  var result = location.pathname.split("/").filter(function(elem) {
    return (elem == "cases");
	});

	if (result.length == 0) {
		return False
	}

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
});
