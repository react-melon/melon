(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Tooltip', 'melon-core/classname/cxBuilder', '../Icon', './TextEditor', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Tooltip'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('./TextEditor'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Tooltip, global.cxBuilder, global.Icon, global.TextEditor, global.babelHelpers);
        global.Column = mod.exports;
    }
})(this, function (exports, _react, _Tooltip, _cxBuilder, _Icon, _TextEditor, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tooltip2 = babelHelpers.interopRequireDefault(_Tooltip);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _TextEditor2 = babelHelpers.interopRequireDefault(_TextEditor);

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
         * 列宽度增长度
         * @type {number}
         */
        grow: _react.PropTypes.number.isRequired,

        /**
         * 列宽度收缩度
         * @type {number}
         */
        shrink: _react.PropTypes.number.isRequired,

        /**
         * 最大宽度
         *
         * @type {number}
         */
        maxWidth: _react.PropTypes.number,

        /**
         * 最小宽度
         *
         * @type {number}
         */
        minWidth: _react.PropTypes.number,

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
        sortBy: _react.PropTypes.oneOf(['asc', 'desc', 'none']),

        /**
         * 是否可编辑
         *
         * @type {boolean}
         */
        editable: _react.PropTypes.bool,

        /**
        * 编辑器选项
        *
        * @type {Object}
        */
        editorMode: _react.PropTypes.oneOf(['inline', 'confirm']),

        /**
         * 编辑器标题
         *
         * @type {string}
         */
        editorTitle: _react.PropTypes.string,

        /**
         * placeholder
         *
         * @type {string}
         */
        placeholder: _react.PropTypes.string,

        onChange: function onChange(propName, props) {
            if (props.editable && props.onChange == null) {
                return new Error('You muse set `onChange` handler while column is `editable`');
            }
        }
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

    TableColumn.bodyRenderer = function (props) {
        var columnData = props.columnData,
            rowData = props.rowData,
            cellData = props.cellData,
            columnIndex = props.columnIndex,
            rowIndex = props.rowIndex;
        var editable = columnData.editable,
            editorMode = columnData.editorMode,
            onChange = columnData.onChange,
            _columnData$placehold = columnData.placeholder,
            placeholder = _columnData$placehold === undefined ? '' : _columnData$placehold,
            dataKey = columnData.dataKey,
            editorTitle = columnData.editorTitle;


        var content = cellData == null ? placeholder : cellData + '';

        return editable ? _react2['default'].createElement(
            _TextEditor2['default'],
            {
                mode: editorMode,
                title: editorTitle,
                onChange: onChange,
                dataKey: dataKey,
                columnData: columnData,
                rowData: rowData,
                rowIndex: rowIndex,
                columnIndex: columnIndex },
            content
        ) : cellData;
    };

    TableColumn.defaultProps = {
        align: 'left',
        headerRenderer: TableColumn.headerRenderer,
        bodyRenderer: TableColumn.bodyRenderer,
        grow: 1,
        shrink: 1
    };

    TableColumn._TABLE_COMPONENT_ = 'COLUMN';
});
//# sourceMappingURL=Column.js.map
