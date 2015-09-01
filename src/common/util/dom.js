/**
 * @file melon dom 相关的小工具
 * @author leon(ludafa@outlook.com)
 */

exports.on = function (target, eventName, handler) {
    if (target.addEventListener) {
        target.addEventListener(eventName, handler);
    }
    else {
        target.attachEvent('on' + eventName, handler);
    }
};

exports.off = function (target, eventName, handler) {

    if (target.removeEventListener) {
        target.removeEventListener(eventName, handler);
    }
    else {
        target.detachEvent('on' + eventName, handler);
    }

};

exports.contains = function (container, contained) {
    return container.contains(contained);
};

/**
 * 获取文档的兼容根节点
 *
 * @inner
 * @param {?HTMLElement=} el 节点引用，跨 frame 时需要
 * @return {HTMLElement} 兼容的有效根节点
 */
function getCompatElement(el) {
    var doc = el && el.ownerDocument || document;
    var compatMode = doc.compatMode;
    return !compatMode || compatMode === 'CSS1Compat'
        ? doc.documentElement
        : doc.body;
}

exports.getScrollLeft = function () {
    return window.pageXOffset || getCompatElement().scrollLeft;
};

exports.getScrollTop = function () {
    return window.pageYOffset || getCompatElement().scrollTop;
};

exports.getPosition = function (element) {

    var bound = element.getBoundingClientRect();
    var root = document.documentElement;
    var body = document.body;

    var clientTop = root.clientTop || body.clientTop || 0;
    var clientLeft = root.clientLeft || body.clientLeft || 0;
    var scrollTop = window.pageYOffset || root.scrollTop;
    var scrollLeft = window.pageXOffset || root.scrollLeft;

    return {
        left: parseFloat(bound.left) + scrollLeft - clientLeft,
        top: parseFloat(bound.top) + scrollTop - clientTop
    };

};
