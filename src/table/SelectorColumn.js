/**
 * @file TableSelectorColumn
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Icon = require('../Icon');
var Column = require('./Column');

class TableSelectorColumn extends Column {
    render() {
        return null;
    }
}

TableSelectorColumn.getIcon = function (selected) {
    return selected ? 'check-box' : 'check-box-outline-blank';
};

TableSelectorColumn.cellRenderer = function (props) {

    var part = props.part;

    var columnData = props.columnData;
    var isSelected = part === 'body' ? columnData.isSelected(props.rowIndex) : columnData.isAllSelected();

    return (
        <Icon
            onClick={columnData.onSelect ? TableSelectorColumn.onCellClick.bind(null, props) : null}
            icon={TableSelectorColumn.getIcon(isSelected)}
            states={{selected: isSelected}}
            variants={['table-selector']} />
    );

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

/**
 * 最关键的东西在这里
 */
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
