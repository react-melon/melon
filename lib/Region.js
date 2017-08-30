(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './region/Selector', './region/Area', './region/helper', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./region/Selector'), require('./region/Area'), require('./region/helper'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Selector, global.Area, global.helper, global.InputComponent, global.cxBuilder, global.babelHelpers);
        global.Region = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Selector, _Area, _helper, _InputComponent2, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);

    var _Area2 = babelHelpers.interopRequireDefault(_Area);

    var helper = babelHelpers.interopRequireWildcard(_helper);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file melon/Region
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('Region');

    var Region = function (_InputComponent) {
        babelHelpers.inherits(Region, _InputComponent);

        function Region(props, context) {
            babelHelpers.classCallCheck(this, Region);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.state = babelHelpers['extends']({}, _this.state, {
                datasource: _this.props.datasource
            });

            _this.onChange = _this.onChange.bind(_this);
            _this.onSelectorChange = _this.onSelectorChange.bind(_this);

            return _this;
        }

        Region.prototype.onChange = function onChange(rawValue) {

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: this.stringifyValue(rawValue)
            });
        };

        Region.prototype.onAreaChange = function onAreaChange(index, cIndex, e) {

            var data = e.data;
            var datasource = this.state.datasource;

            helper.isAllSelected(data);
            datasource[cIndex].children[index] = data;
            helper.isAllSelected(datasource[cIndex]);

            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        };

        Region.prototype.onSelectorChange = function onSelectorChange(index, _ref) {
            var value = _ref.value;


            var datasource = this.state.datasource;

            helper[value ? 'selectAll' : 'cancelAll'](datasource[index]);

            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        };

        Region.prototype.parseValue = function parseValue(value) {
            value = value.split(',');
            return this.props.datasource.map(helper.parse.bind(this, value));
        };

        Region.prototype.stringifyValue = function stringifyValue(datasource) {
            var _this2 = this;

            return datasource ? datasource.reduce(function () {
                return _this2.format.apply(_this2, arguments);
            }, []).join(',') : '';
        };

        Region.prototype.format = function format(result, child, index) {
            var _this3 = this;

            if (child.selected) {
                result.push(child.id);
            }

            return child.children ? child.children.reduce(function () {
                return _this3.format.apply(_this3, arguments);
            }, result) : result;
        };

        Region.prototype.renderCountry = function renderCountry(country, index) {
            var _this4 = this;

            return _react2['default'].createElement(
                'div',
                { className: cx().part('country').build(), key: index },
                _react2['default'].createElement(
                    'h1',
                    null,
                    _react2['default'].createElement(_Selector2['default'], {
                        label: country.text,
                        id: country.id,
                        index: index,
                        checked: country.selected,
                        onChange: function onChange(e) {
                            _this4.onSelectorChange(index, e);
                        } })
                ),
                this.renderArea(country.children, index)
            );
        };

        Region.prototype.renderArea = function renderArea(area, cIndex) {
            var _this5 = this;

            return Array.isArray(area) && area.length > 0 ? _react2['default'].createElement(
                'ul',
                null,
                area.map(function (a, index) {
                    return _react2['default'].createElement(_Area2['default'], {
                        key: index,
                        variants: index % 2 ? ['even'] : [],
                        datasource: a,
                        onChange: function onChange(e) {
                            _this5.onAreaChange(index, cIndex, e);
                        } });
                })
            ) : null;
        };

        Region.prototype.render = function render() {
            var _this6 = this;

            var datasource = this.state.datasource;

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                datasource.map(function () {
                    return _this6.renderCountry.apply(_this6, arguments);
                })
            );
        };

        return Region;
    }(_InputComponent3['default']);

    exports['default'] = Region;


    Region.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        datasource: []
    });

    Region.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        selected: _propTypes2['default'].bool,
        datasource: _propTypes2['default'].arrayOf(_propTypes2['default'].object)
    });

    Region.childContextTypes = _InputComponent3['default'].childContextTypes;
    Region.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=Region.js.map
