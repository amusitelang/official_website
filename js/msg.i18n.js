(function ($) {
  $.msgI18n = function (str) {
    //这里写插件代码
    var lang = localStorage.getItem("lang");
    if (!lang || lang === '') {
      lang = 'tch'
    }
    var jsonData = (function () {
      var result;
      $.ajax({
        type: 'GET',
        url: `/i18n/language/i18n_${lang}.json`,
        dataType: 'json',
        async: false,
        success: function (data) {
          result = data;
        }
      });
      return result;
    })();
    return jsonData[str] ?? str;
  };
})(jQuery);
