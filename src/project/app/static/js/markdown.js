/**
 * Created by v_wanggang on 2016/2/24.
 */

/**
 * 页面加载结束触发
 */
$(document).ready(function () {
    var navbars = new Array();
    navbars[0] = wngn.conf_navbar("markdown.html", "Home", 1)
    var c = wngn.conf("WNGN-CONFIG-CENTER", navbars);
    wngn.init(c);
    var params = CommonUtils.getRequestParams(location.search);
    if (CommonUtils.isBlank(params.markdown)) {
        params.markdown = 'helloworld.md';
    }
    $.get(params.markdown).success(function (content) {
        var converter = new showdown.Converter();
        converter.setOption('tables', 'true');
        html = converter.makeHtml(content);
        $('#markdown').html(html);

        // 处理表格
        $('#markdown table').addClass("table table-striped table-bordered table-hover table-condensed");

        // 处理引用
        var blockquotes = $('#markdown').find('blockquote');
        console.log(blockquotes.length);
        if (blockquotes.length > 0) {
            for (var i = 0; i < blockquotes.length; i++) {
                var blockquoteHtm = blockquotes[i];
                var blockquoteObj = $(blockquoteHtm);
                var blockquoteps = blockquoteObj.find('p');
                if (blockquoteps.length > 1) {
                    blockquoteObj.html(blockquoteps[0]);
                }
                var blockquoteNextObj = blockquoteObj;
                for (var j = 1; j < blockquoteps.length; j++) {
                    blockquoteNextObj.after('<blockquote></blockquote>');
                    blockquoteNextObj = blockquoteNextObj.next();
                    blockquoteNextObj.html(blockquoteps[j]);
                }
            }
        }
    });
})