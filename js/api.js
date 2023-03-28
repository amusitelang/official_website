(function ($) {
  $.api = function (url) {
    var golbal = "/api/app/";
    var globalLogin = "/api/index/";
    switch (url) {
      case "sendSms": // 註冊获取手机验證码
        return `${golbal}sendSms`;
      case "register": // 註冊
        return `${golbal}register`;
      case "sendForgetSms": // 獲取忘記密码獲取手機验證码
        return `${golbal}sendForgetSms`;
      case "forget": // 獲取忘記密码提交
        return `${golbal}sendForgetSms`;
      case "login": // 登錄
        return `${golbal}login`;
      case "getGoodsList": // 註冊成為愛用者者時需要選擇套餐和年費商品
        return `${golbal}getGoodsList`;
      case "getSysConf": // 獲取系统配置 提现配置 奖金返利配置
        return `${golbal}getSysConf`;
      case "addOrder": // 下单购买
        return `${globalLogin}addOrder`;
      case "logout": // 退出登陆
        return `${globalLogin}logout`;
      case "getUserInfo": // 獲取當前用户信息
        return `${globalLogin}getUserInfo`;
      case "getOrderStatistic": // 獲取订单的统计数据
        return `${globalLogin}getOrderStatistic`;
      case "getRecOrderStatistic": // 獲取 直推 间推 订单的统计数据
        return `${globalLogin}getRecOrderStatistic`;
      case "getOrderList": // 獲取訂單列表
        return `${globalLogin}getOrderList`;
      case "getTransSubType": // 獲取交易类别 和getMoneyLog接口的type做映射
        return `${globalLogin}getTransSubType`;
      case "etWithdrawList": // 獲取提現記錄
        return `${globalLogin}getOrderStatistic`;
      case "getMoneyLog": // 獲取钱包明细 記錄
        return `${globalLogin}getMoneyLog`;
      case "sendWdSms": // 提现获取手机验證码
        return `${globalLogin}sendWdSms`;
      case "withdraw": // 提現提交
        return `${globalLogin}withdraw`;
    }
  };
})(jQuery);
