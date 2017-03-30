(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Tooltip', 'melon-core/classname/cxBuilder', '../Icon', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Tooltip'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Tooltip, global.cxBuilder, global.Icon, global.babelHelpers);
        global.Column = mod.exports;
    }
})(this, function (exports, _react, _Tooltip, _cxBuilder, _Icon, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tooltip2 = babelHelpers.interopRequireDefault(_Tooltip);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    /**
     * @file TableColumn
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TableColumnHeader');

    /**
     * 表格列
     *
     * @extends React.Component
     */

    var TableColumn = function (_Component) {
        babelHelpers.inherits(TableColumn, _Component);

        function TableColumn() {
            babelHelpers.classCallCheck(this, TableColumn);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableColumn.prototype.render = function render() {
            return null;
        };

        return TableColumn;
    }(_react.Component);

    exports['default'] = TableColumn;


    TableColumn.displayName = 'TableColumn';

    TableColumn.propTypes = {

        /**
         * 单元格式对齐方式
         *
         * @type {string}
         */
        align: _react.PropTypes.oneOf(['left', 'center', 'right']),

        /**
         * 单元格渲染函数
         *
         * @type {function}
         */
        cellRenderer: _react.PropTypes.func,

        headerRenderer: _react.PropTypes.func,

        bodyRenderer: _react.PropTypes.func,

        /**
         * 单元格从行数据中取数据的键值
         *
         * 必须是string/number
         *
         * @type {(string|number)}
         */
        dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

        /**
         * 列的头部文本
         *
         * @type {string}
         */
        title: _react.PropTypes.string,

        /**
         * 单元格式宽度
         *
         * @type {number}
         */
        width: _react.PropTypes.number.isRequired,

        /**
         * 是否可排序
         *
         * @type {boolean}
         */
        sortable: _react.PropTypes.bool,

        /**
         * 排序顺序
         *
         * @type {string}
         */
        sortBy: _react.PropTypes.oneOf(['asc', 'desc', 'none'])

    };

    var SORT_ICONS = {
        asc: 'arrow-upward',
        none: 'arrow-upward',
        desc: 'arrow-downward'
    };

    TableColumn.headerRenderer = function (props) {
        var _cx$addVariants$addSt;

        var columnData = props.columnData,
            cellData = props.cellData;
        var sortable = columnData.sortable,
            _columnData$sortBy = columnData.sortBy,
            sortBy = _columnData$sortBy === undefined ? 'none' : _columnData$sortBy,
            title = columnData.title,
            align = columnData.align,
            onSort = columnData.onSort;


        var className = cx().addVariants(['align-' + align]).addStates((_cx$addVariants$addSt = {}, _cx$addVariants$addSt['sort-by-' + sortBy] = true, _cx$addVariants$addSt)).build();

        if (sortable) {

            cellData = align === 'right' ? _react2['default'].createElement(
                'div',
                {
                    className: cx.getPartClassName('sorter'),
                    onClick: onSort },
                _react2['default'].createElement(_Icon2['default'], { icon: SORT_ICONS[sortBy], size: 's' }),
                cellData
            ) : _react2['default'].createElement(
                'div',
                {
                    className: cx.getPartClassName('sorter'),
                    onClick: onSort },
                cellData,
                _react2['default'].createElement(_Icon2['default'], { icon: SORT_ICONS[sortBy], size: 's' })
            );
        }

        if (title) {
            cellData = _react2['default'].createElement(
                _Tooltip2['default'],
                { content: title },
                cellData
            );
        }

        return _react2['default'].createElement(
            'div',
            { className: className },
            cellData
        );
    };

    TableColumn.defaultProps = {
        align: 'left',
        headerRenderer: TableColumn.headerRenderer
    };

    TableColumn._TABLE_COMPONENT_ = 'COLUMN';
});
//# sourceMappingURL=Column.js.map
