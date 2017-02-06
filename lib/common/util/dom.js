(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.dom = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.getClientHeight = getClientHeight;
    exports.getClientWidth = getClientWidth;
    exports.getPosition = getPosition;
    exports.hasClass = hasClass;
    exports.addClass = addClass;
    exports.removeClass = removeClass;
    /**
     * @file melon dom 相关的小工具
     * @author leon(ludafa@outlook.com)
     */

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
        return !compatMode || compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
    }

    function getClientHeight() {
        return getCompatElement().clientHeight;
    }

    function getClientWidth() {
        return getCompatElement().clientWidth;
    }

    function getPosition(element) {

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
    }

    function hasClass(element, cls) {
        return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(element, cls) {
        if (!this.hasClass(element, cls)) {
            element.className += ' ' + cls;
        }
    }

    function removeClass(element, cls) {
        if (this.hasClass(element, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    }
});
//# sourceMappingURL=dom.js.map
