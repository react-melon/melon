define('melon/table/SelectorColumn', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Icon',
    './Column'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Icon = require('../Icon');
    var Column = require('./Column');
    var TableSelectorColumn = function (_Column) {
        babelHelpers.inherits(TableSelectorColumn, _Column);
        function TableSelectorColumn() {
            babelHelpers.classCallCheck(this, TableSelectorColumn);
            babelHelpers.get(Object.getPrototypeOf(TableSelectorColumn.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(TableSelectorColumn, [{
                key: 'render',
                value: function render() {
                    return null;
                }
            }]);
        return TableSelectorColumn;
    }(Column);
    TableSelectorColumn.icons = {
        radio: {
            checked: 'radio-button-checked',
            unchecked: 'radio-button-unchecked'
        },
        checkbox: {
            checked: 'check-box',
            unchecked: 'check-box-outline-blank'
        }
    };
    TableSelectorColumn.getIcon = function (multiple, selected) {
        var icons = TableSelectorColumn.icons[multiple ? 'checkbox' : 'radio'];
        return icons[selected ? 'checked' : 'unchecked'];
    };
    TableSelectorColumn.cellRenderer = function (props) {
        var part = props.part;
        var columnData = props.columnData;
        var rowIndex = props.rowIndex;
        var multiple = columnData.multiple;
        if (!multiple && part !== 'body') {
            return null;
        }
        var isSelected = part === 'body' ? columnData.isSelected(rowIndex) : columnData.isAllSelected();
        return React.createElement(Icon, {
            onClick: TableSelectorColumn.onCellClick.bind(null, props),
            icon: TableSelectorColumn.getIcon(multiple, isSelected),
            states: { selected: isSelected },
            variants: ['table-selector']
        });
    };
    TableSelectorColumn.onCellClick = function (props) {
        var part = props.part;
        var rowIndex = props.rowIndex;
        var columnData = props.columnData;
        var multiple = props.multiple;
        var handler = columnData[part === 'body' ? 'onSelect' : 'onSelectAll'];
        if (typeof handler === 'function') {
            handler(rowIndex);
        }
    };
    var PropTypes = React.PropTypes;
    TableSelectorColumn.propTypes = {
        isSelected: PropTypes.func.isRequired,
        isAllSelected: PropTypes.func.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        name: PropTypes.string
    };
    TableSelectorColumn.defaultProps = {
        width: 66,
        cellRenderer: TableSelectorColumn.cellRenderer,
        headerRenderer: TableSelectorColumn.headerRenderer,
        footerRenderer: TableSelectorColumn.footerRenderer,
        align: 'center',
        dataKey: '',
        multiple: false
    };
    TableSelectorColumn._TABLE_COMPONENT_ = 'COLUMN';
    module.exports = TableSelectorColumn;
});