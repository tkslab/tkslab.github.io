$(function () {
    
var path = location.pathname;

var dir_list = path.replace("law/jp", "law@jp").split("/");

var url_list = dir_list.map((value, index) => {
	return dir_list.slice(0, index + 1)
});


var text_pre = ["law@jp", "courses", "tools", "administrative-law", "cases"];
var text_post = ["法学資料（日本）", "講義・演習・課外講座", "ツール", "行政法", "判例一覧"];


dir_list[0] = "Home";
dir_list = dir_list.map((value) => {
	text_pre.forEach((elem, index) => {
		value = value.replace(elem, text_post[index]);
	});
	return value
});

// text と url をまとめたリスト生成
var text_and_url_list = url_list.map((value, index) => {
	return [dir_list[index], value.join("/").replace("law@jp", "law/jp")]
});

// text が空白のときには対応する url を除去
text_and_url_list = text_and_url_list.filter((value)  => {
  return value[0] != "";
});

// 末尾の項目を除去
text_and_url_list.pop();

// html として出力するよう整形
text_and_url_list = text_and_url_list.map((value) => {
	return `<li><a href='${value[1]}/'>${value[0]}</a></li>`
});


$("h1#page-title").before(`<nav><ul class="breadcrumbs">${text_and_url_list.join("\n")}</ul></nav>`);

});
