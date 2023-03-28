function countdown() {
  $(".disabled_code").show();
  $(".send_code").hide();
  var time = 60;
  let timer = setInterval(() => {
    if (time - 1 >= 0) {
      $(".disabled_code span").html(time - 1);
      time = time - 1;
    } else {
      clearInterval(timer);
      $(".disabled_code").hide();
      $(".send_code").show();
    }
  }, 1000);
}

window.onload = function () {
  let token = localStorage.getItem("token");
  if (token) {
    location.replace("/pages/index.html");
  }
  $(".disabled_code").hide();
};

$(".send_code").click(function () {
  quyu = $(".select_code").val();
  mobile = $("#phone_number").val();
  if (!vaildata(quyu, "empty") || !vaildata(mobile, "empty")) {
    return false;
  }
  $.postAjax($.api("sendForgetSms"), {
    mobile,
    quyu,
  })
    .then((res) => {
      if (res.code === 0) {
        countdown();
        $.success(res.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function vaildata(data, type) {
  if (type === "empty") {
    if (!data || data === "") {
      $.error("Not Empty");
      return false;
    } else {
      return true;
    }
  }
}

$(".btn_login").click(function () {
  password = $("#psw").val();
  sms_code = $("#sms_code").val();
  const sub_psd = $("#confirm_psw").val();
  if (password !== sub_psd) {
    $.error("password and confirm password error");
    return false;
  }
  if (
    !vaildata(username, "empty") ||
    !vaildata(nickname, "empty") ||
    !vaildata(password, "empty") ||
    !vaildata(sms_code, "empty")
  ) {
    return false;
  }

  $.postAjax($.api("forget"), {
    password,
    sms_code,
    mobile,
  })
    .then((res) => {
      if (res.code === 0) {
        $.success(res.msg);
        setTimeout(() => {
          location.replace("/pages/login.html");
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
