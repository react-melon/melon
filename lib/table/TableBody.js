(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Row', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Row'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Row, global.shallowEqual, global.babelHelpers);
        global.TableBody = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Row, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Row2 = babelHelpers.interopRequireDefault(_Row);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file 表格 body
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('TableBody');

    var TableBody = function (_Component) {
        babelHelpers.inherits(TableBody, _Component);

        function TableBody() {
            babelHelpers.classCallCheck(this, TableBody);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableBody.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props,
                columns = _props.columns,
                dataSource = _props.dataSource;


            return !(0, _shallowEqual2['default'])(nextProps.columns, columns) || !(0, _shallowEqual2['default'])(dataSource, nextProps.dataSource);
        };

        TableBody.prototype.render = function render() {
            var _props2 = this.props,
                dataSource = _props2.dataSource,
                columns = _props2.columns;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                dataSource.map(function (rowData, index) {
                    return _react2['default'].createElement(_Row2['default'], {
                        columns: columns,
                        index: index,
                        rowData: rowData });
                })
            );
        };

        return TableBody;
    }(_react.Component);

    exports['default'] = TableBody;


    TableBody.propTypes = {
        columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
        dataSource: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired
    };
});
//# sourceMappingURL=TableBody.js.map
