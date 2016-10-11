/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Table', './table/SelectorColumn', './table/SelectorRow', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Table'), require('./table/SelectorColumn'), require('./table/SelectorRow'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Table, global.SelectorColumn, global.SelectorRow, global.babelHelpers);
        global.SelectableTable = mod.exports;
    }
})(this, function (exports, _react, _Table2, _SelectorColumn, _SelectorRow, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Table3 = babelHelpers.interopRequireDefault(_Table2);

    var _SelectorColumn2 = babelHelpers.interopRequireDefault(_SelectorColumn);

    var _SelectorRow2 = babelHelpers.interopRequireDefault(_SelectorRow);

    /**
     * @file SelectableTable
     * @author leon(ludafa@outlook.com)
     */

    function getNextSelectedRowData(multiple, dataSource, current, action, rowIndex) {

        if (!multiple) {
            return [rowIndex];
        }

        if (action === 'selectAll') {
            return dataSource.map(function (_, index) {
                return index;
            });
        }

        if (action === 'unselectAll') {
            return [];
        }

        var selected = action === 'select' ? current.concat(rowIndex).sort() : current.filter(function (row) {
            return row !== rowIndex;
        });

        return selected;
    }

    /**
     * 可选择行的表格
     *
     * @extends {Table}
     */

    var SelectableTable = function (_Table) {
        babelHelpers.inherits(SelectableTable, _Table);

        /**
         * 构造函数
         *
         * @public
         * @param  {*} props 属性
         */
        function SelectableTable(props) {
            babelHelpers.classCallCheck(this, SelectableTable);

            var _this = babelHelpers.possibleConstructorReturn(this, _Table.call(this, props));

            _this.getSelected = _this.getSelected.bind(_this);
            _this.isAllRowsSelected = _this.isAllRowsSelected.bind(_this);
            _this.isRowSelected = _this.isRowSelected.bind(_this);
            _this.onSelect = _this.onSelect.bind(_this);
            _this.onSelectAll = _this.onSelectAll.bind(_this);

            _this.state = babelHelpers['extends']({}, _this.state, {
                selected: _this.props.selected
            });

            return _this;
        }

        /**
         * 接受新属性时处理函数
         *
         * @public
         * @param  {*} props 新属性
         */


        SelectableTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {

            _Table.prototype.componentWillReceiveProps.call(this, props);

            var selected = props.selected;
            var onSelect = props.onSelect;


            if (onSelect && selected != null) {
                this.setState({
                    selected: selected
                });
            }
        };

        SelectableTable.prototype.onSelect = function onSelect(rowIndex) {
            this.onRowSelectorClick(this.isRowSelected(rowIndex) ? 'unselect' : 'select', rowIndex);
        };

        SelectableTable.prototype.onSelectAll = function onSelectAll() {
            this.onRowSelectorClick(this.isAllRowsSelected() ? 'unselectAll' : 'selectAll');
        };

        SelectableTable.prototype.onRowSelectorClick = function onRowSelectorClick(action, rowIndex) {
            var _props = this.props;
            var onSelect = _props.onSelect;
            var dataSource = _props.dataSource;
            var multiple = _props.multiple;


            var selected = this.getSelected();

            selected = getNextSelectedRowData(multiple, dataSource, selected, action, rowIndex);

            if (onSelect) {
                onSelect({
                    selected: selected,
                    target: this
                });
                return;
            }

            this.setState({
                selected: selected
            });
        };

        SelectableTable.prototype.getSelected = function getSelected() {
            var source = this.props.onSelect ? this.props : this.state;
            return source.selected;
        };

        SelectableTable.prototype.isRowSelected = function isRowSelected(rowIndex) {
            var selectedRows = this.getSelected();
            return selectedRows.indexOf(rowIndex) !== -1;
        };

        SelectableTable.prototype.isAllRowsSelected = function isAllRowsSelected() {
            var selectedRows = this.getSelected();
            return selectedRows.length === this.props.dataSource.length;
        };

        SelectableTable.prototype.getColumns = function getColumns(props) {

            var selectorColumn = _react2['default'].createElement(_SelectorColumn2['default'], {
                isSelected: this.isRowSelected,
                isAllSelected: this.isAllRowsSelected,
                multiple: props.multiple,
                onSelect: this.onSelect,
                onSelectAll: this.onSelectAll });

            var columns = _Table.prototype.getColumns.call(this, props);

            return [selectorColumn].concat(columns);
        };

        SelectableTable.prototype.renderRow = function renderRow(part, columns, rowData, index, tableWidth) {
            var _props2 = this.props;
            var rowHeight = _props2.rowHeight;
            var headerRowHeight = _props2.headerRowHeight;
            var highlight = _props2.highlight;
            var rowHasChanged = _props2.rowHasChanged;

            return _react2['default'].createElement(_SelectorRow2['default'], {
                selected: part === 'body' ? this.isRowSelected(index) : this.isAllRowsSelected(),
                height: part === 'body' ? rowHeight : headerRowHeight,
                highlight: highlight,
                key: index,
                rowIndex: index,
                part: part,
                columns: columns,
                data: rowData,
                tableWidth: tableWidth,
                rowHasChanged: rowHasChanged });
        };

        return SelectableTable;
    }(_Table3['default']);

    exports['default'] = SelectableTable;


    SelectableTable.displayName = 'SelectableTable';

    SelectableTable.propTypes = babelHelpers['extends']({}, _Table3['default'].propTypes, {
        multiple: _react.PropTypes.bool.isRequired,
        onSelect: _react.PropTypes.func,
        selected: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired
    });

    SelectableTable.defaultProps = babelHelpers['extends']({}, _Table3['default'].defaultProps, {
        multiple: true,
        selected: []
    });
});