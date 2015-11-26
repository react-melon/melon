define('melon/SelectableTable', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Table',
    './table/SelectorColumn'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Table = require('./Table');
    var SelectorColumn = require('./table/SelectorColumn');
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
    var SelectableTable = React.createClass({
        displayName: 'SelectableTable',
        getInitialState: function () {
            return { selected: this.props.selected };
        },
        componentWillReceiveProps: function (props) {
            if (!this.props.onSelect) {
                this.setState({ selected: props.selected });
            }
        },
        onSelect: function (rowIndex) {
            this.onRowSelectorClick(this.isRowSelected(rowIndex) ? 'unselect' : 'select', rowIndex);
        },
        onSelectAll: function () {
            this.onRowSelectorClick(this.isAllRowsSelected() ? 'unselectAll' : 'selectAll');
        },
        onRowSelectorClick: function (action, rowIndex) {
            var _props = this.props;
            var onSelect = _props.onSelect;
            var dataSource = _props.dataSource;
            var multiple = _props.multiple;
            var selected = this.getSelected();
            selected = getNextSelectedRowData(multiple, dataSource, selected, action, rowIndex);
            if (onSelect) {
                onSelect({
                    target: this,
                    selected: selected
                });
                return;
            }
            this.setState({ selected: selected });
        },
        getSelected: function () {
            var state = this.state;
            var props = this.props;
            var onSelect = props.onSelect;
            var _ref = onSelect ? props : state;
            var selected = _ref.selected;
            return selected;
        },
        isRowSelected: function (rowIndex) {
            var selected = this.getSelected();
            return selected.indexOf(rowIndex) !== -1;
        },
        isAllRowsSelected: function () {
            var selected = this.getSelected();
            return selected.length === this.props.dataSource.length;
        },
        render: function () {
            var _props2 = this.props;
            var children = _props2.children;
            var multiple = _props2.multiple;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'children',
                'multiple'
            ]);
            return React.createElement(Table, rest, React.createElement(SelectorColumn, {
                isSelected: this.isRowSelected,
                isAllSelected: this.isAllRowsSelected,
                multiple: multiple,
                onSelect: this.onSelect,
                onSelectAll: this.onSelectAll
            }), children);
        }
    });
    var PropTypes = React.PropTypes;
    SelectableTable.propTypes = babelHelpers._extends({}, Table.propTypes, {
        multiple: PropTypes.bool.isRequired,
        onSelect: PropTypes.func,
        selected: PropTypes.arrayOf(PropTypes.number).isRequired
    });
    SelectableTable.defaultProps = babelHelpers._extends({}, Table.defaultProps, {
        multiple: true,
        selected: []
    });
    module.exports = SelectableTable;
});