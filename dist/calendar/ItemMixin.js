/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module", "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.babelHelpers);
        global.ItemMixin = mod.exports;
    }
})(this, function (module, babelHelpers) {
    "use strict";

    /**
     * @file CalendarItemMixin
     * @author cxtom(cxtom2010@gmail.com)
     */

    module.exports = {
        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var disabled = _props.disabled;
            var selected = _props.selected;


            return nextProps.disabled !== disabled || nextProps.selected !== selected;
        },
        onClick: function onClick(e) {

            e.preventDefault();

            var _props2 = this.props;
            var disabled = _props2.disabled;
            var onClick = _props2.onClick;
            var date = _props2.date;
            var mode = _props2.mode;


            if (disabled) {
                return;
            }

            if (onClick) {

                var _e = {
                    target: this,
                    date: date
                };

                if (mode) {
                    _e.mode = mode;
                }

                onClick(_e);
            }
        }
    };
});