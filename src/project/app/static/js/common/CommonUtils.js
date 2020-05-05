/**
 * JS通用公共方法
 * @constructor
 */
var CommonUtils = function () {
}
/**
 * 判断对象是否为空
 * obj=null true
 * obj="" true
 * obj=" " true
 * obj=0 true
 * obj=-0 true
 * obj=NaN true
 * obj=new Object() true
 * obj=new Array() true
 * obj={} true
 * obj=[] true
 * @param source 目标对象
 * @returns {boolean}
 */
CommonUtils.isBlank = function (source) {
    if (!source) {
        return true;
    } else {
        if (typeof(source) == 'string' && source.trim().length == 0) {
            return true;
        } else if (typeof(source) == 'object') {
            if (JSON.stringify(source) == "{}" || JSON.stringify(source) == "[]") {
                return true;
            } else {
                for (var name in source) {
                    if (source.hasOwnProperty(name)) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    return false;
}

/**
 * 判断对象是否不为空
 * obj=null false
 * obj="" false
 * obj=undefined false
 * obj={} false
 * obj=[] false
 * @param obj 目标对象
 * @returns {boolean}
 */
CommonUtils.isNotBlank = function (obj) {
    return !this.isBlank(obj);
}

/**
 * 判断对象是否为空
 * obj=null true
 * obj="" true
 * obj=undefined true
 * obj={} false
 * obj=[] false
 * @param obj 目标对象
 * @returns {boolean}
 */
CommonUtils.isEmpty = function (obj) {
    if (typeof(obj) == "undefined" || obj == null || obj == "" || obj.length == 0) {
        return true;
    }
    return false;
}

/**
 * 判断对象是否为非空
 * obj=null false
 * obj="" false
 * obj=undefined false
 * obj={} true
 * obj=[] true
 * @param obj 目标对象
 * @returns {boolean}
 */
CommonUtils.isNotEmpty = function (obj) {
    return !this.isEmpty(obj);
}

/**
 * 对象转换为JSON字符串
 * @param obj 目标对象
 * @returns {string}
 */
CommonUtils.toString = function (obj) {
    return JSON.stringify(obj);
}

/**
 * 字符串是否以指定字符串开始
 * @param source
 * @param target
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
 * @param source
 * @param target
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
 * 俩字符串是否相等
 * @param source
 * @param target
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
 * 解析URL中的参数
 * @param url
 * @returns {object}
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

/**
 * 解析URL是否是本地URL
 * @param url
 * @returns {boolean}
 */
CommonUtils.isLocalHost = function () {
    var hostnameStr = location.hostname.toLocaleLowerCase();
    if (CommonUtils.isBlank(hostnameStr)) {
        return false;
    }
    if ((hostnameStr.indexOf("localhost") != -1) || (hostnameStr.indexOf("127.0.0.1") != -1)) {
        return true;
    }
}
/**
 * @param url
 * @returns {string}
 */
CommonUtils.getRequestUri = function () {
    /**
     location属性值
     hash : ""
     host : "localhost:63343"
     hostname : "localhost"
     href : "http://localhost:63343/app/novels/novel.html?_ijt=om5h4ktc7sbkuas5dc5tktagie"
     origin : "http://localhost:63343"
     pathname : "/app/novels/wngn-wngn-wngn-novel.html"
     port : "63343"
     protocol : "http:"
     search : "?_ijt=om5h4ktc7sbkuas5dc5tktagie"
     */
    return location.pathname;
    /*
     var uri = url.substr("http://".length);
     uri = uri.substr(uri.indexOf("/"));
     if (uri.indexOf("?") != -1) {
     return uri.substr(0, uri.indexOf("?"));
     }
     return uri;
     */
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


/**
 * 日志对象
 * @constructor
 */
function Logger() {
    if (CommonUtils.isLocalHost()) {
        this.level = "OFFLINE";
    } else {
        this.level = "ONLINE";
    }
}

var logger = new Logger();

Logger.prototype.log = function () {
    if (arguments.length == 1) {
        console.log(arguments[0]);
    }
    if (arguments.length > 1) {
        var message = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            message = message.replace("{}", JSON.stringify(arguments[i]));
        }
        console.log(message);
    }
}

Logger.prototype.debug = function () {
    if (this.level == "offline" || this.level == "OFFLINE") {
        if (arguments.length == 1) {
            console.log(arguments[0]);
        }
        if (arguments.length > 1) {
            var message = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                message = message.replace("{}", JSON.stringify(arguments[i]));
            }
            console.log(message);
        }
    }
}

Logger.prototype.info = function (message) {
    if (arguments.length == 1) {
        console.log(arguments[0]);
    }
    if (arguments.length > 1) {
        var message = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            message = message.replace("{}", JSON.stringify(arguments[i]));
        }
        console.log(message);
    }
}

/**
 * 数据操作
 * @constructor
 */
var RequestUtil = function () {
};

RequestUtil.toJsonString = function (params) {
    return JSON.stringify(params);
};

RequestUtil.getJsonObjectByForm = function (form, hidded) {
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

RequestUtil.getJsonStringByForm = function (form, hidded) {
    var params = this.getJsonObjectByForm(form, hidded);
    return JSON.stringify(params);
}

/**
 * 发送JSONP请求
 * @param url
 * @param data
 * @param success
 * @param error
 */
RequestUtil.ajaxJsonp = function (url, data, success, error) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        data: data,
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
RequestUtil.ajaxJson = function (url, data, success, error) {
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
RequestUtil.builderRequestParams = function (method, channel, param) {
    var params = {};
    var meta = {};
    meta.method = method;
    meta.channel = channel;
    meta.request_id = new Date().getTime();
    params.meta = meta;
    params.param = param;
    var data = "params=" + JSON.stringify(params);
    logger.debug('{} : {} request {}', method, channel, data);
    return data;
}

RequestUtil.builderRequestParamsWithCache = function (method, channel, param) {
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