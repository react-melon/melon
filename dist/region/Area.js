/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../common/util/cxBuilder', './Selector', './Province', './City', './helper', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../common/util/cxBuilder'), require('./Selector'), require('./Province'), require('./City'), require('./helper'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Selector, global.Province, global.City, global.helper, global.babelHelpers);
        global.Area = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Selector, _Province, _City, _helper, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);

    var _Province2 = babelHelpers.interopRequireDefault(_Province);

    var _City2 = babelHelpers.interopRequireDefault(_City);

    var helper = babelHelpers.interopRequireWildcard(_helper);

    /**
     * @file Region/RegionArea
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('RegionArea');

    var RegionArea = function (_Component) {
        babelHelpers.inherits(RegionArea, _Component);

        function RegionArea(props) {
            babelHelpers.classCallCheck(this, RegionArea);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onSelectorChange = _this.onSelectorChange.bind(_this);
            _this.onProvinceChange = _this.onProvinceChange.bind(_this);

            return _this;
        }

        RegionArea.prototype.onSelectorChange = function onSelectorChange(e) {

            var value = e.value;
            var _props = this.props;
            var datasource = _props.datasource;
            var onChange = _props.onChange;


            helper[value ? 'selectAll' : 'cancelAll'](datasource);

            onChange && onChange({
                data: datasource
            });
        };

        RegionArea.prototype.onProvinceChange = function onProvinceChange(index, e) {

            var data = e.data;
            var _props2 = this.props;
            var datasource = _props2.datasource;
            var onChange = _props2.onChange;


            datasource.children[index] = data;

            helper.isAllSelected(datasource);

            onChange && onChange({
                data: datasource
            });
        };

        RegionArea.prototype.onCityChange = function onCityChange(pIndex, cIndex, e) {

            var data = e.data;

            var _props3 = this.props;
            var datasource = _props3.datasource;
            var onChange = _props3.onChange;


            var p = datasource.children[pIndex];

            p.children[cIndex] = data;

            helper.isAllSelected(p);

            onChange && onChange({
                data: datasource
            });
        };

        RegionArea.prototype.renderProvince = function renderProvince(child, index) {
            var _this2 = this;

            return _react2['default'].createElement(
                _Province2['default'],
                {
                    key: index,
                    datasource: child,
                    onChange: this.onProvinceChange.bind(this, index) },
                Array.isArray(child.children) && child.children.length > 0 ? child.children.map(function (child, i) {
                    return _this2.renderCity(index, child, i);
                }) : null
            );
        };

        RegionArea.prototype.renderCity = function renderCity(pIndex, child, index) {
            var _this3 = this;

            return _react2['default'].createElement(_City2['default'], {
                key: index,
                datasource: child,
                onChange: function onChange(e) {
                    return _this3.onCityChange(pIndex, index, e);
                } });
        };

        RegionArea.prototype.render = function render() {
            var _this4 = this;

            var datasource = this.props.datasource;


            return _react2['default'].createElement(
                'li',
                { className: cx(this.props).build() },
                _react2['default'].createElement(
                    'div',
                    { className: cx().part('selector').build() },
                    _react2['default'].createElement(_Selector2['default'], {
                        label: datasource.text,
                        id: datasource.id,
                        checked: datasource.selected,
                        onChange: this.onSelectorChange })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: cx().part('content').build() },
                    datasource.children.map(function () {
                        return _this4.renderProvince.apply(_this4, arguments);
                    })
                )
            );
        };

        return RegionArea;
    }(_react.Component);

    exports['default'] = RegionArea;


    RegionArea.displayName = 'RegionArea';

    RegionArea.propTypes = {
        onChange: _react.PropTypes.func,
        disabled: _react.PropTypes.bool,
        datasource: _react.PropTypes.object
    };
});