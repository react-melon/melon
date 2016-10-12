(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.helper = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.selectAll = selectAll;
    exports.cancelAll = cancelAll;
    exports.parse = parse;
    exports.isAllSelected = isAllSelected;
    /**
     * @file melon/region/mixin
     * @author cxtom(cxtom2008@gmail.com)
     */

    function selectAll(child) {

        child.selected = true;

        if (Array.isArray(child.children)) {
            child.children.forEach(selectAll);
        }
    }

    function cancelAll(child) {

        child.selected = false;

        if (Array.isArray(child.children)) {
            child.children.forEach(cancelAll);
        }
    }

    function parse(value, child, index) {

        if (value.indexOf(child.id) > -1) {
            child.selected = true;
        }

        if (Array.isArray(child.children)) {
            child.children = child.children.map(function (c, i) {
                return parse(value, c, i);
            });
        }

        return child;
    }
    function isAllSelected(data) {

        if (!Array.isArray(data.children) || !(data.children.length > 0)) {
            return;
        }

        data.selected = data.children.reduce(function (result, child, index) {
            return result && child.selected;
        }, true);
    }
});
//# sourceMappingURL=helper.js.map
