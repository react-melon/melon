/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Item = function (_Component) {
        babelHelpers.inherits(Item, _Component);

        function Item(props) {
            babelHelpers.classCallCheck(this, Item);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        Item.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var disabled = _props.disabled;
            var selected = _props.selected;


            return nextProps.disabled !== disabled || nextProps.selected !== selected;
        };

        Item.prototype.onClick = function onClick(e) {

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
        };

        return Item;
    }(_react.Component);

    exports["default"] = Item;
});