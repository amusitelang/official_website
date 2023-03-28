var type = 0;
var time_type = 1;
var page = 1;
var size = 20;
var start = null;
var end = null;
var total = 0;
var usdt = 0;
var wallet_address = "";
let share_url = "";
// 提现
var input_title = "";
var withdraw_address = "";
var withdraw_num = "";
var withdraw_sms_code = "";
// 钱包
var money_time_type = 1;
var money_start = null;
var money_end = null;
var money_page = 1;
var money_size = 20;
var money_total = 0;
var money_shengyu_total = 0;
var lang = localStorage.getItem('lang');
if (!lang) {
  lang = 'tch';
}
window.onload = function () {
  $(".success-btn").hide();
  $.paragraphI18n('account1', 'account')
  var token = localStorage.getItem("token");
  if (token) {
    $.postAjax($.api("getUserInfo"), {}).then((res) => {
      if (res.code === 0) {
        if (res.data.total !== "0") {
          $(".success-btn").show();
        }
        $("#username").html(res.data.username);
        $("#nickname").html(res.data.nickname);
        $("#mobile").html(`+${res.data.quyu}  ${res.data.mobile}`);
        $("#email").html(res.data.email ? res.data.email : "");
        $("#share_man").html(res.data.pname ? res.data.pname : "");
        $("#create_time").html(res.data.create_time);
        $("#share_code").html(res.data.share_code);
        share_url = `https://bitminer.shakugo.com/index/home/register?code=${res.data.share_code}`;
        $("#share_link").html(share_url);
        $("#copy-share").attr("data-clipboard-text", res.data.share_code);
        $("#share-link-priview").attr("data-clipboard-text", share_url);
        usdt = res.data.usdt;
        wallet_address = res.data.wallet_address;
        input_title = `${$.msgI18n("验证码")}：${$.msgI18n("將發送驗證碼至")} ${
          res.data.mobile
        }`;
        new QRCode(document.getElementById("qrcode"), {
          text: share_url,
          width: 180,
          height: 180,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    });
  }
};

$(".account-tab-item").click(function () {
  if (!$(this).hasClass("active")) {
    $(".account-tab-item").removeClass("active");
    $(this).addClass("active");
    $(".account-veo").removeClass("account-block");
    $(`.account-veo${$(this).index() + 1}`).addClass("account-block");
    if ($(this).index() === 1) {
      setTimeout(() => {
        getTime();
      }, 1000);
      $.postAjax($.api("getOrderStatistic"), {}).then((res) => {
        if (res.code === 0) {
          $("#benjin").html(res.data.benjin);
          $("#shouyi").html(res.data.shouyi);
          $("#shouyi_today").html(res.data.shouyi_today);
        }
      });
      getOrderList();
    }

    if ($(this).index() === 2) {
      $("#usdt-h4").html(`${usdt} USDT`);
      $("#wallet_address").html(wallet_address);
      $("#copy-address").attr("data-clipboard-text", wallet_address);
      new QRCode(document.getElementById("qqrrccooddee"), {
        text: wallet_address,
        width: 130,
        height: 130,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
    if ($(this).index() === 3) {
      getOrderList2();
      getTime3();
      $.postAjax($.api("getRecOrderStatistic"), {}).then((res) => {
        $("#total_num span").html(res.data.total);
        $("#rec_buy_amount").html(`${res.data.rec_buy_amount} USDT`);
        $("#first_num span").html(res.data.first);
        $("#pid_sum").html(`${res.data.pid_sum} USDT`);
        $("#second_num span").html(res.data.second);
        $("#ppid_sum").html(`${res.data.ppid_sum} USDT`);
      });
    }
  }
});

$(".tab-account-item").click(function () {
  if (!$(this).hasClass("active")) {
    $(".tab-account-item").removeClass("active");
    $(this).addClass("active");
  }

  if ($(this).index() === 0) {
    type = 0;
    time_type = 1;
    page = 1;
    size = 20;
    start = null;
    end = null;
    total = 0;
    getOrderList();
  }

  if ($(this).index() === 1) {
    type = 1;
    time_type = 1;
    page = 1;
    size = 20;
    start = null;
    end = null;
    total = 0;
    getOrderList();
  }

  if ($(this).index() === 2) {
    type = 2;
    time_type = 1;
    page = 1;
    size = 20;
    start = null;
    end = null;
    total = 0;
    getOrderList();
  }
});

// 充值 提现 钱包明细
$(".tab-account-item2").click(function () {
  if (!$(this).hasClass("active")) {
    $(".tab-account-item2").removeClass("active");
    $(this).addClass("active");
    // tab-account-item2-1
    $(".tab-account-item2-as").removeClass("tab-account-item2-block");
    $(`.tab-account-item2-${$(this).index()}`).addClass(
      "tab-account-item2-block"
    );

    if ($(this).index() === 1) {
      $("#sendwdsms-disabled").hide();
      $("#input_title").html(input_title);
      // 获取钱包地址
      $("#address_input").change(function (e) {
        withdraw_address = e.target.value;
      });
      $("#sms_code_input").change(function (e) {
        withdraw_sms_code = e.target.value;
      });
      $("#num_input").on("input", function (e) {
        let num = parseFloat(e.target.value);
        withdraw_num = num - 1 ? num - 1 : 0;
        $("#daozhang").html(`${withdraw_num}`);
      });
    }

    if ($(this).index() === 2) {
      getTime2();
      getMoneyLog();
    }
  }
});

$(".all-btns").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".jin-btns").removeClass("active");
  $(this).addClass("active");
  time_type = 1;
  getOrderList();
});

$(".jin-btns").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".all-btns").removeClass("active");
  $(this).addClass("active");
  time_type = 2;
  getOrderList();
});

$(".search-btns").click(function () {
  start = $(".input-append.date1 .start")[0].innerText;
  end = $(".input-append.date2 .end")[0].innerText;
  time_type = 3;
  $(".jin-btns").removeClass("active");
  $(".all-btns").removeClass("active");
  getOrderList();
});

$("#sendwdsms").click(function () {
  $.postAjax($.api("sendWdSms"), {}).then((res) => {
    countdown();
  });
});

//复制
$("#copy-share").click(function () {
  let clipboard = new ClipboardJS("#copy-share");
  clipboard.on("success", function (e) {
    $.success("copy success");
  });
});

$("#share-link-priview").click(function () {
  let clipboard = new ClipboardJS("#share-link-priview");
  clipboard.on("success", function (e) {
    $.success("copy success");
  });
});

$("#copy-address").click(function () {
  let clipboard = new ClipboardJS("#copy-address");
  clipboard.on("success", function (e) {
    $.success("copy success");
  });
});

// 粘贴
$("#paste-address").click(async function () {
  const text = await navigator.clipboard.readText();
  $("#address_input").val(text);
  withdraw_address = text;
});

$("#submit_with").click(function () {
  const address = $("#address_input").val();
  const sms_code = $("#sms_code_input").val();
  const num = $("#num_input").val();
  $.postAjax($.api("withdraw"), {
    address,
    sms_code,
    num,
  }).then((res) => {
  });
});

function getOrderList() {
  let params = {
    direct: 0,
    type,
    time_type,
    page,
    size,
  };
  if (start && end) {
    params.start = start;
    params.end = end;
  }
  $.postAjax($.api("getOrderList"), params).then((res) => {
    const data = res.data;
    page = data.current_page;
    total = data.total;
    let orderList = data.data;
    let order_content = "";
    orderList.forEach((order) => {
      order_content =
        order_content +
        ` <div class="account-list-item">
            <div class="account-list-item-content">
              <div class="account-list-item-top">
                <div class="account-list-item-top-left">
                  <h3>${order.pname}</h3>
                  <div class="left-btns">${
                    order.status === 1
                      ? $.msgI18n("進行中")
                      : order.status === 2
                      ? $.msgI18n("其他")
                      : $.msgI18n("结束")
                  }</div>
                </div>
                <div class="account-list-item-top-right">
                  <div class="orders">
                    ${$.msgI18n("訂單編號")}：${order.sn}
                  </div>
                </div>
              </div>
              <div class="account-list-item-top">
                <div class="account-list-item-top-left">
                  <div class="orders">${$.msgI18n("訂購時間")}：${
          order.created_time
        }</div>
                </div>
                <div class="account-list-item-top-right">
                  <div class="orders">${$.msgI18n("結束時間")}：${
          order.end_time
        }</div>
                </div>
              </div>
              <div class="account-list-item-bottom">
                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("合約週期")}</div>
                    <div>${order.day}${$.msgI18n("天")}</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("年化報酬率")}</div>
                    <div>${order.rate} %</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("訂單金額")}</div>
                    <div>${order.amount} USDT</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("所得收益")}</div>
                    <div>${order.win} USDT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    });
    $("#order-list").html(order_content);
  });
}

function getTime() {
  const params = {
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
  }
  if (lang === 'tch' || lang === 'sch') {
    params.language = 'zh-CN';
  }
  $(".input-append.date1")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date1 .start")[0].innerText = e.format();
    });

  $(".input-append.date2")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date2 .end")[0].innerText = e.format();
    });
}

function countdown() {
  $("#sendwdsms-disabled").show();
  $("#sendwdsms").hide();
  var time = 60;
  let timer = setInterval(() => {
    if (time - 1 >= 0) {
      $("#sendwdsms-disabled span").html(time - 1);
      time = time - 1;
    } else {
      clearInterval(timer);
      $("#sendwdsms-disabled").hide();
      $("#sendwdsms").show();
    }
  }, 1000);
}

function getTime2() {
  const params = {
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
  }
  if (lang === 'tch' || lang === 'sch') {
    params.language = 'zh-CN';
  }
  $(".input-append.date3")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date3 .start")[0].innerText = e.format();
    });

  $(".input-append.date4")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date4 .end")[0].innerText = e.format();
    });
}

function getTime3() {
  const params = {
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
  }
  if (lang === 'tch' || lang === 'sch') {
    params.language = 'zh-CN';
  }
  $(".input-append.date5")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date5 .start")[0].innerText = e.format();
    });

  $(".input-append.date6")
    .datepicker(params)
    .on("changeDate", function (e) {
      time = e.format();
      $(".input-append.date6 .end")[0].innerText = e.format();
    });
}

/**               钱包管理                   **/
//加载更多
$("#tables-more").click(function () {
  money_page = money_page + 1;
  getMoneyLog();
});

// 全部
$(".all-btns1").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".jin-btns1").removeClass("active");
  $(this).addClass("active");
  money_time_type = 1;
  money_start = null;
  money_end = null;
  money_page = 1;
  money_size = 20;
  money_total = 0;
  money_shengyu_total = 0;

  getMoneyLog(true);
});
// 近7日
$(".jin-btns1").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".all-btns1").removeClass("active");
  $(this).addClass("active");
  money_time_type = 2;
  money_start = null;
  money_end = null;
  money_page = 1;
  money_size = 20;
  money_total = 0;
  money_shengyu_total = 0;
  getMoneyLog(true);
});

// 时间选择
$(".search-btns1").click(function () {
  money_start = $(".input-append.date3 .start")[0].innerText;
  money_end = $(".input-append.date4 .end")[0].innerText;
  money_time_type = 3;
  money_page = 1;
  money_size = 20;
  money_total = 0;
  money_shengyu_total = 0;
  $(".jin-btns1").removeClass("active");
  $(".all-btns1").removeClass("active");
  getMoneyLog(true);
});

function getMoneyLog(flag) {
  let params = {
    time_type: money_time_type,
    page: money_page,
    size: money_size,
  };

  if (money_end && money_start) {
    params.start = money_start;
    params.end = money_end;
  }
  $.postAjax($.api("getMoneyLog"), params).then((res) => {
    money_total = res.data.total;
    let data = res.data;
    let content = "";
    if (data.data.length) {
      data.data.forEach((item, i) => {
        content =
          content +
          ` <div class="table-row ${i % 2 !== 0 ? "table-row-n" : ""}">
                <div class="table-content">${item.created_time}</div>
                <div class="table-content">${item.remark}</div>
                <div class="table-content">${item.amount}</div>
              </div>`;
      });
      if (flag) {
        $(".account-tables").children(".table-row").remove();
      }
      $(".account-tables").append(content);
    } else {
      $(".account-tables").append(`<div class="table-row">
            <div class="table-content">No Data</div>
            <div class="table-content">No Data</div>
            <div class="table-content">No Data</div>
          </div>`);
    }
  });
}

/**       推薦資訊              */
var share_time_type = 1;
var share_start = null;
var share_end = null;
var share_page = 1;
var share_size = 20;
var share_total = 0;
var share_shengyu_total = 0;
var shre_direct = 0;
// 全部
$(".all-btns2").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".jin-btns2").removeClass("active");
  $(".jin-btns3").removeClass("active");
  $(this).addClass("active");
  share_time_type = 0;
  shre_direct = 1;
  share_start = null;
  share_end = null;
  share_page = 1;
  share_size = 20;
  share_total = 0;
  share_shengyu_total = 0;

  getOrderList2(true);
});
// 直接
$(".jin-btns2").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".all-btns2").removeClass("active");
  $(".jin-btns3").removeClass("active");
  $(this).addClass("active");
  share_time_type = 1;
  shre_direct = 1;
  share_start = null;
  share_end = null;
  share_page = 1;
  share_size = 20;
  share_total = 0;
  share_shengyu_total = 0;
  getOrderList2(true);
});
// 间接
$(".jin-btns3").click(function () {
  if ($(this).hasClass("active")) {
    return false;
  }
  $(".all-btns2").removeClass("active");
  $(".jin-btns3").removeClass("active");
  $(this).addClass("active");
  share_time_type = 1;
  shre_direct = 2;
  share_start = null;
  share_end = null;
  share_page = 1;
  share_size = 20;
  share_total = 0;
  share_shengyu_total = 0;
  getOrderList2(true);
});
// 时间选择
$(".search-btns2").click(function () {
  share_start = $(".input-append.date3 .start")[0].innerText;
  share_end = $(".input-append.date4 .end")[0].innerText;
  share_time_type = 3;
  share_page = 1;
  share_size = 20;
  share_total = 0;
  share_shengyu_total = 0;
  $(".all-btns2").removeClass("active");
  getMoneyLog(true);
});

function getOrderList2(falg) {
  let params = {
    time_type: share_time_type,
    page: share_page,
    size: share_size,
    type: 1,
    time_type: share_time_type,
    direct: shre_direct,
  };

  if (share_start && share_end) {
    params.start = share_start;
    params.end = share_end;
  }

  $.postAjax($.api("getOrderList"), params).then((res) => {
    const data = res.data;
    page = data.current_page;
    total = data.total;
    let orderList = data.data;
    let order_content = "";
    orderList.forEach((order) => {
      order_content =
        order_content +
        ` <div class="account-list-item">
            <div class="account-list-item-content">
              <div class="account-list-item-top">
                <div class="account-list-item-top-left">
                  <h3>${order.pname}</h3>
                  <div class="left-btns">${
                    order.status === 1
                      ? $.msgI18n("進行中")
                      : order.status === 2
                      ? $.msgI18n("其他")
                      : $.msgI18n("结束")
                  }</div>
                </div>
                <div class="account-list-item-top-right">
                  <div class="orders">
                    ${$.msgI18n("訂單編號")}：${order.sn}
                  </div>
                </div>
              </div>
              <div class="account-list-item-top">
                <div class="account-list-item-top-left">
                  <div class="orders">${$.msgI18n("訂購時間")}：${
          order.created_time
        }</div>
                </div>
                <div class="account-list-item-top-right">
                  <div class="orders">${$.msgI18n("結束時間")}：${
          order.end_time
        }</div>
                </div>
              </div>
              <div class="account-list-item-bottom">
                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("合約週期")}</div>
                    <div>${order.day}${$.msgI18n("天")}</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("年化報酬率")}</div>
                    <div>${order.rate} %</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("訂單金額")}</div>
                    <div>${order.amount} USDT</div>
                  </div>
                </div>

                <div class="account-list-item-bottom-item">
                  <div class="account-list-item-bottom-item-content">
                    <div>${$.msgI18n("所得收益")}</div>
                    <div>${order.win} USDT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    });
    if (falg) {
      $("#tuijian-list").children(".account-list-item").remove();
    }
    $("#tuijian-list").append(order_content);
  });
}
