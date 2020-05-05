function Wngn() {

}

var wngn = new Wngn();

Wngn.prototype.conf_navbar = function (url, name, active) {
    var navbar = {};
    navbar.url = url;
    navbar.name = name;
    navbar.active = active;
    return navbar;
}

Wngn.prototype.conf = function (title, navbars) {
    var container = {};
    container.title = title;
    container.image = 'https://raw.githubusercontent.com/wngn123/resources/master/src/common/logo/logo_white.png';
    var navbars = navbars;
    container.navbars = navbars;
    return container;
}

Wngn.prototype.conf_default = function () {
    var container = {};
    container.title = 'Test';
    container.image = 'https://raw.githubusercontent.com/wngn123/resources/master/src/common/logo/logo_white.png';
    var navbars = new Array()
    var navbar = {};
    navbar.url = 'index.html';
    navbar.name = 'Test';
    navbar.active = 1;
    navbars[0] = navbar
    container.navbars = navbars;
    return container;
}

Wngn.prototype.init = function (container) {
    var nav = '';
    nav = nav + '<div class="container">';
    nav = nav + '    <div class="navbar-header">';
    nav = nav + '        <div class="navbar-header">';
    nav = nav + '            <a href="/"><img class="img-rounded navbar-brand" src="' + container.image + '"/></a>';
    nav = nav + '            <a href="./" id="header-title" class="navbar-brand">' + container.title + '</a>';
    nav = nav + '        </div>';
    nav = nav + '    </div>';

    nav = nav + '    <div id="navbar" class="collapse navbar-collapse">';
    nav = nav + '        <ul class="nav navbar-nav">';
    for (var i = 0; i < container.navbars.length; i++) {
        var navbar = container.navbars[i];
        if (navbar.active == 1) {
            nav = nav + '    <li class="active"><a href="' + navbar.url + '">' + navbar.name + '</a></li>';
        } else {
            nav = nav + '    <li><a href="' + navbar.url + '">' + navbar.name + '</a></li>';
        }
    }
    nav = nav + '        </ul>';
    nav = nav + '    </div>';
    nav = nav + '</div>';
    $('#wngn-navbar').html(nav);
    var footer = '';
    footer = footer + '<div id="container-footer">';
    footer = footer + '    <p>© 2016-2018 wngn123.com 版权所有 ICP证：<a href="http://www.miitbeian.gov.cn">豫ICP备16005007号</a> </p>';
    footer = footer + '</div>';
    $('#wngn-container').append(footer);
}


function Logger(level) {
    this.level = level;
}

var logger = new Logger("OFF");
var log = new Logger("OFF");

Logger.prototype.log = function (message) {
    if (this.level != "off" && this.level != "OFF") {
        console.log("INFO :" + message);
    }
}

Logger.prototype.debug = function (message) {
    if (this.level == "debug" || this.level == "DEBUG") {
        console.debug("DEBUG:" + message);
    }
}

Logger.prototype.warn = function (message) {
    if (this.level == "warn" || this.level == "WARN") {
        console.warn("WARN :" + message);
    }
}

Logger.prototype.error = function (message) {
    if (this.level == "error" || this.level == "ERROR") {
        console.error("ERROR :" + message);
    }
}

var CommonUtils = function () {
}
/**
 * 判断对象是否为空
 * obj=null true
 * obj="" true
 * obj=undefined true
 * @param obj 目标对象
 * @returns {boolean}
 */
CommonUtils.isBlank = function (obj) {
    if (typeof(obj) == "undefined" || obj == null || obj == "" || obj.length == 0) {
        return true;
    }
    if (typeof(obj) == "object") {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
/**
 * 判断对象是否不为空
 * obj=null false
 * obj="" false
 * obj=undefined false
 * @param obj 目标对象
 * @returns {boolean}
 */
CommonUtils.isNotBlank = function (obj) {
    return !this.isBlank(obj);
}

/**
 * 对象转换为字符串
 * @param obj 目标对象
 * @returns {string}
 */
CommonUtils.toString = function (obj) {
    return JSON.stringify(obj);
}
/**
 * 字符串是否以指定字符串开头
 * @param source 源字符串
 * @param target 开头字符串
 * @returns {boolean}
 */
CommonUtils.startWith = function (source, target) {
    var index = source.indexOf(target);
    if (index == 0) {
        return true;
    } else {
        return false;
    }
}
/**
 * 字符串是否以指定字符串结尾
 * @param source 源字符串
 * @param target 开头字符串
 * @returns {boolean}
 */
CommonUtils.endWith = function (source, target) {
    var index = source.indexOf(target);
    var target_length = target.length;
    var source_length = source.length;
    if (index != -1 && index + target_length == source_length) {
        return true;
    } else {
        return false;
    }
}
/**
 * 字符串是否相等
 * @param source 源字符串
 * @param target 目标字符串
 * @returns {boolean}
 */
CommonUtils.equal = function (source, target) {
    if (this.isBlank(source) && this.isBlank(target)) {
        return true;
    }
    if (this.isNotBlank(source) && this.isNotBlank(target)) {
        if (source == target) {
            return true;
        }
    }
    return false;
}

/**
 * 解析请求参数对象
 * @param url
 * @returns {{}}
 */
CommonUtils.getRequestParams = function (url) {
    var params = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            params[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
    }
    return params;
}

CommonUtils.getObjectForm = function (parent) {
    var data = {};
    list(parent, data);
    return data;
}

CommonUtils.list = function (ele, data) {
    if (this.isFormElement(ele.nodeName)) {
        if (ele.nodeName == "INPUT") {
            if (ele.type == "text") {
                data[ele.name] = ele.value;
            }
            if (ele.type == "password") {
                data[ele.name] = ele.value;
            } else if (ele.type == "checkbox") {
                if (ele.checked) {
                    if (data[ele.name] == null) {
                        data[ele.name] = new Array();
                    }
                    var checkboxs = data[ele.name];
                    checkboxs[checkboxs.length] = ele.value;
                }
            } else if (ele.type == "radio") {
                if (ele.checked) {
                    data[ele.name] = ele.value;
                }
            } else {
                data[ele.name] = ele.value;
            }
        } else if (ele.nodeName == "SELECT") {
            var options = ele.options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected == true) {
                    data[ele.name] = options[i].value;
                }
            }
        } else if (ele.nodeName == "TEXTAREA") {
            data[ele.name] = ele.value;
        }
    } else if (ele.hasChildNodes()) {
        var childs = ele.childNodes;
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                list(childs[i], data);
            }
        }
    }
}
CommonUtils.isFormElement = function (nodeName) {
    var formLabel = "INPUT SELECT TEXTAREA";
    if (formLabel.indexOf(nodeName) != -1) {
        return true;
    }
    return false;
}

CommonUtils.ajaxJsonp = function (url, data, success, error) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        data: data,
        jsonp: 'callback',
        success: success,
        error: error,
        timeout: 3000
    });
}

CommonUtils.ajaxJson = function (url, data, success, error) {
    $.ajax({
        url: url,
        dataType: "json",
        type: "post",
        data: data,
        success: success,
        error: error,
        timeout: 3000
    });
}

var Params = function () {
    this.request_id = new Date().getTime();
    this.params = [];
};

Params.prototype.toJsonString = function () {
    return JSON.stringify(this);
};

var HttpUtil = function () {
};

var httpUtil = new HttpUtil();

HttpUtil.prototype.getJsonObjectByForm = function (form, hidded) {
    var inputs;
    if (hidded == true) {
        inputs = form.find("input:not(:hidden):not(:disabled)");
    } else {
        inputs = form.find("input:not(:disabled)");
    }
    var params = {};
    params.type = "none";
    params.form = form.id;
    params.start = 0;
    params.limit = 10;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value != '') {
            params[inputs[i].name] = inputs[i].value;
        }
    }
    log.debug(JSON.stringify(params));
    return params;
}

HttpUtil.prototype.getJsonStringByForm = function (form, hidded) {
    var params = this.getJsonObjectByForm(form, hidded);
    return JSON.stringify(params);
}

HttpUtil.prototype.parseParam = function (param) {
    if (param == null || param == '') {
        console.error("Parameters[param] cannot be empty");
        return null;
    }
    if (param instanceof String) {
        return JSON.parse(param);
    }
    return param;
}

HttpUtil.prototype.operateDb = function (url, param, success) {
    var params = new Params();
    params.params[0] = param;
    log.debug(url + ' request params:' + params.toJsonString());
    this.ajax(url, params, success);
}

HttpUtil.prototype.ajax = function (url, params, success) {
    if (!params instanceof Params) {
        console.error("The parameter[params] type is not correct");
    }
    var data = {params: params.toJsonString()};
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        data: data,
        jsonp: 'callback',
        success: success,
        timeout: 3000
    });
};

/**
 * 发送JSONP请求
 * @param url
 * @param data
 * @param success
 * @param error
 */
HttpUtil.prototype.ajaxJsonp = function (url, data, success, error) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        data: data,
        contentType:"application/json; charset=utf-8",
        jsonp: 'callback',
        success: function (result) {
            logger.debug("response result={}", result);
            success(result);
        },
        error: error,
        timeout: 3000
    });
}

/**
 * 发送AJAX的POST请求
 * @param url
 * @param data
 * @param success
 * @param error
 */
HttpUtil.prototype.ajaxJson = function (url, data, success, error) {
    $.ajax({
        url: url,
        dataType: "json",
        type: "post",
        data: data,
        success: success,
        error: error,
        timeout: 3000
    });
}
/**
 * 构造请求参数
 * @param method
 * @param channel
 * @param param
 * @returns {string}
 */
HttpUtil.prototype.builderRequestParams = function (method, channel, param) {
    var params = {};
    var meta = {};
    meta.method = method;
    meta.channel = channel;
    meta.request_id = new Date().getTime();
    params.meta = meta;
    params.param = param;
    var data = "params=" + encodeURI(JSON.stringify(params));
    logger.debug('{} : {} request {}', method, channel, data);
    return data;
}
/**
 * 构造请求参数
 * @param method
 * @param channel
 * @param param
 * @returns {string}
 */
HttpUtil.prototype.builderRequestParamsWithCache = function (method, channel, param) {
    var params = {};
    var meta = {};
    meta.method = method;
    meta.channel = channel;
    meta.cache = true;
    meta.request_id = new Date().getTime();
    params.meta = meta;
    params.param = param;
    var data = "params=" + JSON.stringify(params);
    logger.debug('{} : {} request {}', method, channel, data);
    return data;
}