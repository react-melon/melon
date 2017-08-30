(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', './Cell', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('./Cell'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Cell, global.shallowEqual, global.babelHelpers);
        global.Row = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Cell, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Cell2 = babelHelpers.interopRequireDefault(_Cell);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file melon/TableRow
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TableRow');

    /**
     * 表格行
     *
     * @extends React.Component
     */

    var TableRow = function (_Component) {
        babelHelpers.inherits(TableRow, _Component);

        function TableRow() {
            babelHelpers.classCallCheck(this, TableRow);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableRow.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            var _props = this.props,
                tableWidth = _props.tableWidth,
                rowHasChanged = _props.rowHasChanged,
                data = _props.data;


            if (tableWidth !== nextProps.tableWidth) {
                return true;
            }

            var columns = this.props.columns;
            var nextColumns = nextProps.columns;

            // 列设置是否发生了变化
            if (columns.length !== nextColumns || columns.some(function (column, i) {
                return !(0, _shallowEqual2['default'])(column.props, nextColumns[i].props);
            })) {
                return true;
            }

            // 行数据是否发生了变化
            if (rowHasChanged) {
                return rowHasChanged(data, nextProps.data);
            }

            return true;
        };

        TableRow.prototype.renderCell = function renderCell(props, columnData, index) {
            var part = props.part,
                data = props.data,
                height = props.height,
                rowIndex = props.rowIndex;
            var dataKey = columnData.dataKey,
                cellRenderer = columnData.cellRenderer;


            var cellData = part === 'header' || part === 'footer' ? columnData[part] : data[dataKey];

            var cellProps = {
                part: part,
                height: height,
                rowIndex: rowIndex,
                columnData: columnData,
                cellData: cellData,
                key: dataKey || part,
                columnIndex: index,
                rowData: data,
                cellKey: dataKey
            };

            // 内容默认是 cellData
            var content = cellData;

            // 如果有 cellRenderer
            if (typeof cellRenderer === 'function') {
                content = cellRenderer(cellProps);
            }
            // 或者是有局部的 renderer
            else {

                    var partSpecificRenderer = columnData[part + 'Renderer'];

                    if (typeof partSpecificRenderer === 'function') {
                        content = partSpecificRenderer(cellProps);
                    }
                }

            return _react2['default'].createElement(_Cell2['default'], babelHelpers['extends']({}, cellProps, { content: content }));
        };

        TableRow.prototype.render = function render() {
            var _this2 = this;

            var columns = this.props.columns;

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                columns.map(function (column, index) {
                    return _this2.renderCell(_this2.props, column.props, index);
                })
            );
        };

        return TableRow;
    }(_react.Component);

    exports['default'] = TableRow;


    TableRow.displayName = 'TableRow';

    TableRow.propTypes = {

        index: _propTypes2['default'].number,

        /**
         * 行类型
         *
         * @type {string}
         */
        part: _propTypes2['default'].oneOf(['header', 'footer', 'body']).isRequired,

        /**
         * 行数据
         *
         * @type {(Object | array)}
         */
        data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]),

        /**
         * Height of the row.
         * @type {number}
         */
        height: _propTypes2['default'].number.isRequired,

        /**
         * 行数据是否发生变化
         *
         * 此函数会被用于优化性能。如果返回值为 false，那么当前行不会被更新
         *
         * @type {Funciton}
         */
        rowHasChanged: _propTypes2['default'].func.isRequired
    };
});
//# sourceMappingURL=Row.js.map
