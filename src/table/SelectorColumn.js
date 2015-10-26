/**
 * @file TableSelectorColumn
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Icon = require('../Icon');
var Column = require('./Column');

class TableSelectorColumn extends Column {

    static displayName = 'TableSelectorColumn';

    render() {
        return null;
    }
}

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
    let icons = TableSelectorColumn.icons[multiple ? 'checkbox' : 'radio'];
    return icons[selected ? 'checked' : 'unchecked'];
};

TableSelectorColumn.cellRenderer = function (props) {


    let {part, columnData, rowIndex} = props;
    let {multiple} = columnData;

    if (!multiple && part !== 'body') {
        return null;
    }

    let isSelected = part === 'body'
        ? columnData.isSelected(rowIndex)
        : columnData.isAllSelected();

    return (
        <Icon
            onClick={TableSelectorColumn.onCellClick.bind(null, props)}
            icon={TableSelectorColumn.getIcon(multiple, isSelected)}
            states={{selected: isSelected}}
            variants={['table-selector']} />
    );

};

TableSelectorColumn.onCellClick = function (props) {

    let {part, rowIndex, columnData, multiple} = props;
    let handler = columnData[part === 'body' ? 'onSelect' : 'onSelectAll'];

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

/**
 * 最关键的东西在这里
 */
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
