$(function() {

    var path = location.pathname;

    var dir_list = path.replace("law/jp", "law@jp").split("/");

    var url_list = dir_list.map((value, index) => {
        return dir_list.slice(0, index + 1)
    });


    var replace_pattern = [["law@jp", "法学資料（日本）"]
    , ["courses", "講義・演習・課外講座"]
    , ["tools", "ツール"]
    , ["administrative-law", "行政法"]
    , ["cases", "判例一覧"]];


    dir_list[0] = "<span class='material-icons-outlined'>&#xe88a;</span>";
    dir_list = dir_list.map((value) => {
        replace_pattern.forEach((elem) => {
            value = value.replace(elem[0], elem[1]);
        });
        return value
    });

    // text と url をまとめたリスト生成
    var text_and_url_list = url_list.map((value, index) => {
        return [dir_list[index], value.join("/").replace("law@jp", "law/jp")]
    });

    // 特定の text がある場合には対応する url を除去
    var  hidden_items = ["", "tokoha", "aoyama", "seijo", "general"];
    text_and_url_list = text_and_url_list.filter((value) => {
        return hidden_items.includes(value[0])? false : value[0]
    });

    // 末尾の項目はそのページ自体となることから
    // 末尾の項目を除去
    text_and_url_list.pop();

    // html のリスト要素として出力するよう整形
    text_and_url_list = text_and_url_list.map((value) => {
        return `<li><a href='${value[1]}/'>${value[0]}</a></li>`
    });

$('ul.breadcrumbs')$.append(text_and_url_list.join("\n"));
//    $("div.sidebar").before(`<nav class="notice--info"><ul class="breadcrumbs">${text_and_url_list.join("\n")}</ul></nav>`);
});
