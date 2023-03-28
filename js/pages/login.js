$(".btn_login").click(function () {
  let username = $("#account").val();
  let password = $("#psw").val();
  $.postAjax($.api("login"), {
    username,
    password,
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      $.success(res.msg);
      setTimeout(() => {
        location.replace('/pages/index.html')
      }, 2000)
    })
    .catch((err) => {
      console.log(err);
    });
});

window.onload = function () {
    let token = localStorage.getItem('token');
    if (token) {
        location.replace('/pages/index.html')
    }
}