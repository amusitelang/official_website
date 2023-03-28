window.onload = function () {
  getGoodList(true);
  $(".modal_wrap").hide();
};
var page = 1;
var size = 20;
var goodsList = [];
var id = null;
$('.ele-button-buy2').click(function () {
    page = page + 1
    getGoodList(false);
})
// 获取商品列表
function getGoodList(flag) {
  $.postAjax($.api("getGoodsList"), {
    page,
    size,
  }).then((res) => {
    let content = "";
    if (res.data.data && res.data.data.length) {
      goodsList = res.data.data;
      res.data.data.forEach((item) => {
        content =
          content +
          `
            <div class="cloud-item">
          <div class="cloud-item-content">
            <div class="cloud-item-title">${item.name}<br />${
            item.day
          }${$.msgI18n("天")}</div>
            <div class="cloud-item-menu">
              <div class="cloud-item-menu-item">
                <div class="menu-item-icon">
                  <div class="item-icon-box">
                    <svg
                      aria-hidden="true"
                      class="e-font-icon-svg e-far-file-alt"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="menu-item-icon menu-text">${$.msgI18n("年化")}</div>
                <div class="menu-item-icon menu-btn">
                  <span class="ray">${item.rate}%</span>
                </div>
              </div>
              <div class="cloud-item-menu-item">
                <div class="menu-item-icon">
                  <div class="item-icon-box">
                    <svg
                      aria-hidden="true"
                      class="e-font-icon-svg e-far-calendar-alt"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="menu-item-icon menu-text">${$.msgI18n(
                  "每份算力"
                )}</div>
                <div class="menu-item-icon menu-btn">
                  <span class="ray2">${item.total} USDT</span>
                </div>
              </div>
              <div class="cloud-item-menu-item">
                <div class="menu-item-icon">
                  <div class="item-icon-box">
                    <svg
                      aria-hidden="true"
                      class="e-font-icon-svg e-far-chart-bar"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M396.8 352h22.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h22.4c6.4 0 12.8-6.4 12.8-12.8V140.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h22.4c6.4 0 12.8-6.4 12.8-12.8V204.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zM496 400H48V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-387.2-48h22.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="menu-item-icon menu-text">${$.msgI18n(
                  "每日產出"
                )}</div>
                <div class="menu-item-icon menu-btn">
                  <span class="ray3">${item.day_rate} USDT</span>
                </div>
              </div>
            </div>
            <h3 class="price-title">$${item.money}</h3>
            ${
              item.status === 1
                ? `<a class="ele-button-buy" data-id="${item.id}">${$.msgI18n(
                    "购买"
                  )}</a>`
                : `<a class="ele-button"  data-id="${item.id}">${$.msgI18n(
                    "缺货"
                  )}</a>`
            }
          </div>
        </div>`;
      });
      if (flag) {
        $("#cloud-goos-list").html(content);
      } else {
        $("#cloud-goos-list").append(content);
      }
      $(".ele-button-buy").click(function () {
        // console.log($(this).attr('data-id'));
        $(".modal_wrap").show();
        console.log(goodsList[$(this).index()])
        let good = goodsList.filter(item => item.id.toString() === $(this).attr('data-id'))[0];
        $('.modal_title').html(good.name)
        $('.contact_period .day').html(good.day);
        id = $(this).attr('data-id');
        $('.bottom .date1').html(good.today);
        $('.bottom .date3').html(good.end);
        $('.amount_div').html(good.money)
      });
    }
  });
}

$('.close').click(function () {
    $(".modal_wrap").hide();
})

$('.btn_buy').click(function() {
    $.postAjax($.api('addOrder'), {
        id
    }).then((res) => {
        console.log(res);
    })
})
