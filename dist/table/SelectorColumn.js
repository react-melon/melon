define('melon/table/SelectorColumn', [
    'exports',
    '../babelHelpers',
    'react',
    '../Icon',
    './Column'
], function (exports) {
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
    TableSelectorColumn.getIcon = function (selected) {
        return selected ? 'check-box' : 'check-box-outline-blank';
    };
    TableSelectorColumn.cellRenderer = function (props) {
        var part = props.part;
        var columnData = props.columnData;
        var isSelected = part === 'body' ? columnData.isSelected(props.rowIndex) : columnData.isAllSelected();
        return React.createElement(Icon, {
            onClick: columnData.onSelect ? TableSelectorColumn.onCellClick.bind(null, props) : null,
            icon: TableSelectorColumn.getIcon(isSelected),
            states: { selected: isSelected },
            variants: ['table-selector']
        });
    };
    TableSelectorColumn.onCellClick = function (props, e) {
        var part = props.part;
        var handler = part === 'body' ? 'onSelect' : 'onSelectAll';
        props.columnData[handler](e, props.rowIndex);
    };
    var PropTypes = React.PropTypes;
    TableSelectorColumn.propTypes = {
        isSelected: PropTypes.func.isRequired,
        isAllSelected: PropTypes.func.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func
    };
    TableSelectorColumn.defaultProps = {
        width: 66,
        cellRenderer: TableSelectorColumn.cellRenderer,
        headerRenderer: TableSelectorColumn.headerRenderer,
        footerRenderer: TableSelectorColumn.footerRenderer,
        align: 'center',
        dataKey: ''
    };
    TableSelectorColumn._TABLE_COMPONENT_ = 'COLUMN';
    module.exports = TableSelectorColumn;
});