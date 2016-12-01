(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Cell', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Cell'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Cell, global.babelHelpers);
        global.Row = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Cell, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Cell2 = babelHelpers.interopRequireDefault(_Cell);

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
            var width = columnData.width,
                align = columnData.align,
                dataKey = columnData.dataKey,
                cellRenderer = columnData.cellRenderer;


            var cellData = part === 'header' || part === 'footer' ? columnData[part] : data[dataKey];

            var cellProps = {
                part: part,
                height: height,
                width: width,
                align: align,
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

            var props = this.props;
            var columns = props.columns,
                tableWidth = props.tableWidth;


            return _react2['default'].createElement(
                'div',
                {
                    className: cx(props).build(),
                    style: { width: tableWidth ? tableWidth - 2 : null } },
                columns.map(function (column, index) {
                    return _this2.renderCell(props, column.props, index);
                })
            );
        };

        return TableRow;
    }(_react.Component);

    exports['default'] = TableRow;


    TableRow.displayName = 'TableRow';

    TableRow.propTypes = {

        index: _react.PropTypes.number,

        /**
         * 行类型
         *
         * @type {string}
         */
        part: _react.PropTypes.oneOf(['header', 'footer', 'body']).isRequired,

        /**
         * 行数据
         *
         * @type {(Object | array)}
         */
        data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),

        /**
         * Height of the row.
         * @type {number}
         */
        height: _react.PropTypes.number.isRequired,

        /**
         * 行数据是否发生变化
         *
         * 此函数会被用于优化性能。如果返回值为 false，那么当前行不会被更新
         *
         * @type {Funciton}
         */
        rowHasChanged: _react.PropTypes.func.isRequired
    };
});
//# sourceMappingURL=Row.js.map
