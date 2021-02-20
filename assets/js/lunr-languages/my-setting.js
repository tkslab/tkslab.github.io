window.idx = lunr(function () {
  this.field('id');
  this.field('title', { boost: 10 });
  this.field('author');
  this.field('category');

  // この行を追加しました
  this.use(lunr.ja)

  var that = this;
  $.each(result, function(i, value) {
    var row = $.extend({ "id": i }, value)
    that.add(row);
  });
});
