define('melon/common/util/dom', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.on = function (target, eventName, handler) {
        if (target.addEventListener) {
            target.addEventListener(eventName, handler);
        } else {
            target.attachEvent('on' + eventName, handler);
        }
    };
    exports.off = function (target, eventName, handler) {
        if (target.removeEventListener) {
            target.removeEventListener(eventName, handler);
        } else {
            target.detachEvent('on' + eventName, handler);
        }
    };
    exports.contains = function (container, contained) {
        return container.contains(contained);
    };
    function getCompatElement(el) {
        var doc = el && el.ownerDocument || document;
        var compatMode = doc.compatMode;
        return !compatMode || compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
    }
    exports.getScrollLeft = function () {
        return window.pageXOffset || getCompatElement().scrollLeft;
    };
    exports.getScrollTop = function () {
        return window.pageYOffset || getCompatElement().scrollTop;
    };
    exports.getClientHeight = function () {
        return getCompatElement().clientHeight;
    };
    exports.getClientWidth = function () {
        return getCompatElement().clientWidth;
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
            top: parseFloat(bound.top) + scrollTop - clientTop,
            width: bound.width,
            height: bound.height
        };
    };
});