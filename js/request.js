(function ($) {
  //   $.fn.extend({
  //     getAjax: function (url, data, callback) {
  //       //这里写插件代码
  //       callback({
  //         code: 200,
  //         data: "success",
  //       });
  //       alert("sss");
  //     },
  //   });
  $.getAjax = function (url, data) {
    //这里写插件代码
    return new Promise((resolve, reject) => {
      if (url === "" || !url) {
        return reject({
          code: "",
          msg: "不允许空url传递",
        });
      }
      $.loading(true);
      var token = localStorage.getItem("token");
      // 不需要登录
      if (url.indexOf("/api/app/") !== -1) {
        $.ajax({
          url: `https://preadmin.dtbminer.com/${url}`,
          type: "get",
          dataType: "json",
          success: function (data) {
            $.loading(false);
            if (data.code === 0) {
              return resolve(data.data);
            }
          },
          error: function (xhr) {
            $.loading(false);
            return reject(xhr);
          },
        });
      } else {
        $.ajax({
          url: `https://preadmin.dtbminer.com/${url}`,
          type: "get",
          headers: { token: token },
          dataType: "json",
          data,
          success: function (data) {
            $.loading(false);
            return resolve(data);
          },
          error: function (xhr) {
            $.loading(false);
            return reject(xhr);
          },
        });
      }
    });
  };
  $.postAjax = function (url, data) {
    //这里写插件代码
    return new Promise((resolve, reject) => {
      if (url === "" || !url) {
        $.error("ERROR: Not Empty Url Request");
        return reject({
          code: "",
          msg: "ERROR: Not Empty Url Request",
        });
      }
      $.loading(true);
      var token = localStorage.getItem("token");
      // 不需要登录
      if (url.indexOf("/api/app/") !== -1) {
        $.ajax({
          url: `https://preadmin.dtbminer.com${url}`,
          type: "post",
          dataType: "json",
          data: JSON.stringify(data),
          contentType:"json/application",
          success: function (data) {
            $.loading(false);
            if (data.code === 0) {
              return resolve(data)
            }
            
            if (data.code === 403) {

            }
            $.error(data.msg)
          },
          error: function (xhr) {
            $.loading(false);
            console.log('xhr', xhr)
            return reject(xhr);
          },
        });
      } else {
        $.ajax({
          url: `https://preadmin.dtbminer.com/${url}`,
          type: "post",
          headers: { token: token },
          dataType: "json",
          data: JSON.stringify(data),
          contentType:"json/application",
          success: function (data) {
            $.loading(false);
            if (data.code === 0) {
              return resolve(data)
            }
            
            if (data.code === 403) {

            }
            $.error(data.msg)
          },
          error: function (xhr) {
            $.loading(false);
            $.error("错误啦");
            return reject(xhr);
          },
        });
      }
    });
  };
})(jQuery);
