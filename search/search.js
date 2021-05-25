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


/*
https://github.com/GenjiApp/genjiapp.github.io/blob/master/js/search.js
*/
/**
 * URLのパラメタから検索文字列を取り出し、オブジェクトに格納して返す。
 * オブジェクトは'tags'、'keywords'キィを持つ。値は共に配列。
 * パラメタ名'q'を検索パラメタとする。
 * 検索パラメタは空白文字で区切られ、'[]'で囲まれたものはタグ名、
 * それ以外はキィワードと見なして、配列に格納する。
 */
function getQuery()
{
  // 返却するオブジェクトの初期化。
  var query = { 'tags': [], 'keywords': [] };

  // LocationオブジェクトのsearchプロパティはURLのパラメタ部の文字列。
  // searchプロパティは'?'を含むのでString.substring(1)で'?'を取り除き、
  // '&'でパラメタ名毎に分割して配列に入れる。
  var parameters = window.location.search.substring(1).split('&');

  $.each(parameters, function(index, parameterString) {
    var parameter = parameterString.split('=');
    var parameterName = parameter[0];
    var parameterValue = parameter[1];
    // パラメタ名'q'以外は無視。
    if(parameterName != 'q') return true;

    // パラメタ値をデコードし、全角空白は'+'に置換、
    // 連続する'+'はひとつに纏める。
    var decodedParameterValue = decodeURIComponent(parameterValue).replace(/　/g, '+').replace(/\++/g, '+');
    var words = decodedParameterValue.split('+');
    words.forEach(function(word) {
      var tag = word.match(/^\[(.*)\]$/);
      if(tag) query.tags.push(tag[1]);
      else query.keywords.push(word);
    });
  });

  return query;
}

function condenseContent(content)
{
  content = content.replace(/{%.*?%}/g, " ");
  content = content.replace(/##+/g, " ");
  
  // マークアップしている箇所を探し出す
  var index = content.indexOf("<span");
  // マークアップしている箇所から20文字前の場所を取得
  index -= 20;
  // 20文字前の場所が-1など0よりも小さい値になったら0にリセット
  if(index < 0) index = 0;
  
  // 20文字前から200文字後までの間を抽出
  return content.substring(index, index + 200);
}

window.onload = function(){
  // 入力フォームに URL パラメータ中の検索キーワードを渡す
  var search_param = location.search.split("=")[1];
  if (search_param != undefined) {
    $("#search_param").val(decodeURIComponent(search_param));
  }
  
  var query = getQuery();
  var queryString = '';  // input要素に表示する文字列
  query.tags.forEach(function(tagName) {
    queryString += '[' + tagName + '] ';
  });
  queryString += query.keywords.join(' ');
  $('#globalNavigation form input[type="search"]').val(queryString);

  var matchedPosts = [];
  $.getJSON('/search/search_data.json', function(posts) {
    posts.forEach(function(postInfo) {
      

		// 漢数字を算用数字に変換
		$.each(search_pattern_for_using_roman_numbers, function(_, search_pattern) {
			let patterns_matched = postInfo.content.match(new RegExp(search_pattern, "gi"));
			
			if (patterns_matched == null) {
				return true;
			}
			
			// 文字列の長さ順にソート
			patterns_matched.sort(function(a, b) {return b.length - a.length;});
			
			$.each(patterns_matched, function(_, pattern) {
				let text_with_hankaku_numbers = replaceTextWighObj(pattern,
					objChineseNumbersAndRomanNumbers);

				postInfo.content = postInfo.content.replace(new RegExp(pattern, 'g'),
					text_with_hankaku_numbers);
			});
		});
      
      
      if(!postInfo.tags) postInfo.tags = [];
      var postTagNames = [];
      postInfo.tags.forEach(function(tag) {
        postTagNames.push(tag['tagName']);
      });

      // タグが複数指定されていた場合は、
      // そのすべてを含んだ記事のみを合致とする。
      var isContainingAllQueriedTags = false;
      $.each(query.tags, function(index, tagName) {
        isContainingAllQueriedTags = (postTagNames.indexOf(tagName) != -1);
        if(!isContainingAllQueriedTags) return false;
      });
      if(isContainingAllQueriedTags && !query.keywords.length) matchedPosts.push(postInfo);
      else if(isContainingAllQueriedTags || !query.tags.length) {
        var regexpString = '';
        if(query.keywords.length == 1) regexpString = query.keywords[0];
        else {
          query.keywords.forEach(function(keyword) {
            regexpString += '(?=.*' + keyword + ')';
          });
        }
        var regExp = new RegExp(regexpString, 'i');
        if(postInfo.title.match(regExp) != null || postInfo.content.match(regExp) != null) {
          matchedPosts.push(postInfo);
          
          postInfo.title = postInfo.title.replace(regExp, function(match){
            return "<span style='background:linear-gradient(transparent 70%, #FFD1D1 0%)'>" + match + "</span>";
          });
          postInfo.content = postInfo.content.replace(regExp, function(match){
            return "<span style='background:linear-gradient(transparent 70%, #FFD1D1 0%)'>" + match + "</span>";
          });
          
        }
      }
    });

    // 検索条件に合致した記事があった場合は、
    // ページ内の'#matchedList'に流し込む。
    if(matchedPosts.length) {
      var dl = $('<dl>');
      matchedPosts.forEach(function(postInfo) {
        if(postInfo.title == "") return false;
        
        if(!postInfo.title.length) postInfo.title = 'untitled';
        dl.append('<dt><a href="' + postInfo.url + '">' + postInfo.title + '</a></dt>');
        dl.append('<dd>' + condenseContent(postInfo.content) + '</dd>');
      });
      $('#matchedList').append(dl);
    }
    else $('#matchedList').append('<p>no search result.</p>');
  });
};
