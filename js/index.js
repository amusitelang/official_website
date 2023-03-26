jQuery(document).ready(function ($) {
  console.log($(window).width());
  //   $("#widget2")[0]
  const width = $(window).width() > 1792 ? $(window).width() : 1792;
  const css = {
    width: `${width}px`,
    height: `${width * 0.5625}px`
  };
  $("#iframeYtVideo-01").css(css)
});
