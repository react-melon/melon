(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Selector', './helper', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Selector'), require('./helper'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Selector, global.helper, global.babelHelpers);
        global.Province = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Selector, _helper, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);

    var helper = babelHelpers.interopRequireWildcard(_helper);
    /**
     * @file Region/RegionProvince
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('RegionProvince');

    var RegionProvince = function (_Component) {
        babelHelpers.inherits(RegionProvince, _Component);

        function RegionProvince(props) {
            babelHelpers.classCallCheck(this, RegionProvince);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {
                expand: false
            };

            _this.onSelectorChange = _this.onSelectorChange.bind(_this);
            _this.onMouseEnter = _this.onMouseEnter.bind(_this);
            _this.onMouseLeave = _this.onMouseLeave.bind(_this);

            return _this;
        }

        RegionProvince.prototype.onSelectorChange = function onSelectorChange(e) {

            var value = e.value;
            var _props = this.props,
                datasource = _props.datasource,
                onChange = _props.onChange;


            helper[value ? 'selectAll' : 'cancelAll'](datasource);

            onChange && onChange({
                data: datasource
            });
        };

        RegionProvince.prototype.onMouseEnter = function onMouseEnter(e) {
            this.setState({ expand: true });
        };

        RegionProvince.prototype.onMouseLeave = function onMouseLeave(e) {
            this.setState({ expand: false });
        };

        RegionProvince.prototype.renderSelectedInfo = function renderSelectedInfo() {

            var datasource = this.props.datasource;

            var total = datasource.children && datasource.children.length;

            if (!total) {
                return;
            }

            var num = datasource.children.reduce(function (result, child, index) {
                if (child.selected) {
                    result++;
                }
                return result;
            }, 0);

            return num === total || num === 0 ? null : _react2['default'].createElement(
                'span',
                { className: cx().part('info').build() },
                '(' + num + '/' + total + ')'
            );
        };

        RegionProvince.prototype.render = function render() {
            var _props2 = this.props,
                datasource = _props2.datasource,
                children = _props2.children;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).addStates({ expand: this.state.expand }).build(),
                    onMouseEnter: children ? this.onMouseEnter : null,
                    onMouseLeave: children ? this.onMouseLeave : null },
                _react2['default'].createElement(_Selector2['default'], {
                    label: datasource.text,
                    id: datasource.id,
                    checked: datasource.selected,
                    onChange: this.onSelectorChange }),
                this.renderSelectedInfo(),
                children ? _react2['default'].createElement(
                    'div',
                    { className: cx().part('popup').build() },
                    _react2['default'].createElement(
                        'ul',
                        null,
                        children
                    )
                ) : null
            );
        };

        return RegionProvince;
    }(_react.Component);

    exports['default'] = RegionProvince;


    RegionProvince.propTypes = {
        onChange: _react.PropTypes.func,
        disabled: _react.PropTypes.bool,
        datasource: _react.PropTypes.object
    };
});
//# sourceMappingURL=Province.js.map
