(function ($) {
    $.paragraphI18n = function (id, page) {
        //这里写插件代码
        var lang = localStorage.getItem('lang');
        if (!lang || lang === '') {
            lang = 'tch';
        }
        if (!$(`#${id}`)) {
            return false;
        }
        var html = $(`#${id}`).html().trim();
        $(`#${id}`).html('')
        var jsonData = (function () {
            var result;
            $.ajax({
                type: 'GET',
                url: `/paragraph/${page}/${id}/${lang}.txt`,
                // dataType: 'json',
                async: false,
                success: function (data) {
                    result = data.trim();
                },
                error: function (xhr) {
                    result = html;
                }
            });
            return result;
        })();
        $(`#${id}`).html(jsonData)
    };
})(jQuery);
