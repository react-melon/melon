/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Table', './table/SelectorColumn', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Table'), require('./table/SelectorColumn'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Table, global.SelectorColumn, global.babelHelpers);
        global.SelectableTable = mod.exports;
    }
})(this, function (exports, _react, _Table, _SelectorColumn, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Table2 = babelHelpers.interopRequireDefault(_Table);

    var _SelectorColumn2 = babelHelpers.interopRequireDefault(_SelectorColumn);

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

    var SelectableTable = function (_Component) {
        babelHelpers.inherits(SelectableTable, _Component);

        function SelectableTable(props) {
            babelHelpers.classCallCheck(this, SelectableTable);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.getSelected = _this.getSelected.bind(_this);
            _this.isAllRowsSelected = _this.isAllRowsSelected.bind(_this);
            _this.isRowSelected = _this.isRowSelected.bind(_this);
            _this.onSelect = _this.onSelect.bind(_this);
            _this.onSelectAll = _this.onSelectAll.bind(_this);

            _this.state = {
                selected: _this.props.selected
            };

            return _this;
        }

        SelectableTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {

            if (!this.props.onSelect) {
                this.setState({
                    selected: props.selected
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
            var state = this.state;
            var props = this.props;
            var onSelect = props.onSelect;

            var _ref = onSelect ? props : state;

            var selected = _ref.selected;

            return selected;
        };

        SelectableTable.prototype.isRowSelected = function isRowSelected(rowIndex) {
            var selected = this.getSelected();
            return selected.indexOf(rowIndex) !== -1;
        };

        SelectableTable.prototype.isAllRowsSelected = function isAllRowsSelected() {
            var selected = this.getSelected();
            return selected.length === this.props.dataSource.length;
        };

        SelectableTable.prototype.render = function render() {
            var _props2 = this.props;
            var children = _props2.children;
            var multiple = _props2.multiple;
            var rest = babelHelpers.objectWithoutProperties(_props2, ['children', 'multiple']);


            return _react2['default'].createElement(
                _Table2['default'],
                rest,
                _react2['default'].createElement(_SelectorColumn2['default'], {
                    isSelected: this.isRowSelected,
                    isAllSelected: this.isAllRowsSelected,
                    multiple: multiple,
                    onSelect: this.onSelect,
                    onSelectAll: this.onSelectAll }),
                children
            );
        };

        return SelectableTable;
    }(_react.Component);

    exports['default'] = SelectableTable;


    SelectableTable.displayName = 'SelectableTable';

    SelectableTable.propTypes = babelHelpers['extends']({}, _Table2['default'].propTypes, {
        multiple: _react.PropTypes.bool.isRequired,
        onSelect: _react.PropTypes.func,
        selected: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired
    });

    SelectableTable.defaultProps = babelHelpers['extends']({}, _Table2['default'].defaultProps, {
        multiple: true,
        selected: []
    });
});