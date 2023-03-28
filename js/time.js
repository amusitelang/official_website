function getTime() {
  $(".input-append.date1")
    .datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
      todayHighlight: true,
      language: "zh-CN", //语言设置
    })
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date1 .start")[0].innerText = e.format();
    });

  $(".input-append.date2")
    .datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
      todayHighlight: true,
      // language: "zh-CN", //语言设置
    })
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date2 .end")[0].innerText = e.format();
    });
}
