/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Selector', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Selector'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Selector, global.babelHelpers);
        global.City = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Selector, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);

    /**
     * @file Region/RegionCity
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('RegionCity');

    var RegionCity = function (_Component) {
        babelHelpers.inherits(RegionCity, _Component);

        function RegionCity(props) {
            babelHelpers.classCallCheck(this, RegionCity);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onSelectorChange = _this.onSelectorChange.bind(_this);

            return _this;
        }

        RegionCity.prototype.onSelectorChange = function onSelectorChange(e) {
            var value = e.value;
            var _props = this.props;
            var datasource = _props.datasource;
            var onChange = _props.onChange;


            datasource.selected = value;

            onChange && onChange({
                data: datasource
            });
        };

        RegionCity.prototype.render = function render() {
            var datasource = this.props.datasource;


            return _react2['default'].createElement(
                'li',
                { className: cx(this.props).build() },
                _react2['default'].createElement(_Selector2['default'], {
                    label: datasource.text,
                    id: datasource.id,
                    checked: datasource.selected,
                    onChange: this.onSelectorChange })
            );
        };

        return RegionCity;
    }(_react.Component);

    exports['default'] = RegionCity;


    RegionCity.displayName = 'RegionCity';

    RegionCity.propTypes = {
        onChange: _react.PropTypes.func,
        disabled: _react.PropTypes.bool,
        datasource: _react.PropTypes.object
    };
});