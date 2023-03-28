(function ($) {
  $.loading = function (flag) {
    //这里写插件代码
    if (flag) {
      $("body").append(
        '<div class="fixed-loading"><div class="spinner-border text-primary"></div><div class="loading-text">Loading...</div></div>'
      );
    } else {
      $(".fixed-loading").remove();
    }
  };
  $.error = function (msg) {
    $("body").append(
      `<div class="fixed-error-msg"><div class="alert alert-secondary" role="alert">
      ${msg}
    </div></div>`
    );
    setTimeout(() => {
      $(".fixed-error-msg").remove();
    }, 2000);
  };
  $.success = function (msg) {
    $("body").append(
      `<div class="fixed-success-msg"><div class="alert alert-secondary" role="alert">
      ${msg}
    </div></div>`
    );
    setTimeout(() => {
      $(".fixed-success-msg").remove();
    }, 2000);
  };
})(jQuery);
