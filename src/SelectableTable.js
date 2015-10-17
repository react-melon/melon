/**
 * @file SelectableTable
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let Component = require('./Component');
let Table = require('./Table');
let SelectorColumn = require('./table/SelectorColumn');

function getNextSelectedRowData(multiple, dataSource, current, action, rowIndex) {

    if (!multiple) {
        return [rowIndex];
    }

    if (action === 'selectAll') {
        return dataSource.map((_, index) => {
            return index;
        });
    }

    if (action === 'unselectAll') {
        return [];
    }

    let selected = action === 'select'
        ? current.concat(rowIndex).sort()
        : current.filter(function (row) {
            return row !== rowIndex;
        });

    return selected;

}

class SelectableTable extends Component {

    constructor(props) {
        super(props);
        this.isRowSelected = this.isRowSelected.bind(this);
        this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.state = {
            selected: props.selected
        };
    }

    componentWillReceiveProps(props) {

        if (!this.props.onSelect) {
            this.setState({
                selected: props.selected
            });
        }

    }

    render() {

        let {children, multiple, ...rest} = this.props;

        return (
            <Table {...rest}>
                <SelectorColumn
                    isSelected={this.isRowSelected}
                    isAllSelected={this.isAllRowsSelected}
                    multiple={multiple}
                    onSelect={this.onSelect}
                    onSelectAll={this.onSelectAll} />
                {children}
            </Table>
        );

    }

    onSelect(rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    }

    onSelectAll() {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        );
    }

    onRowSelectorClick(action, rowIndex) {

        let {onSelect, dataSource, multiple} = this.props;

        let selected = this.getSelected();

        selected = getNextSelectedRowData(
            multiple,
            dataSource,
            selected,
            action,
            rowIndex
        );

        if (onSelect) {
            onSelect({
                target: this,
                selected: selected
            });
            return;
        }

        this.setState({
            selected: selected
        });

    }

    getSelected() {
        let {state, props} = this;
        let {onSelect} = props;
        let {selected} = onSelect ? props : state;
        return selected;
    }

    isRowSelected(rowIndex) {
        let selected = this.getSelected();
        return selected.indexOf(rowIndex) !== -1;
    }

    isAllRowsSelected() {
        let selected = this.getSelected();
        return selected.length === this.props.dataSource.length;
    }

}

let {PropTypes} = React;


SelectableTable.propTypes = {
    ...Component.propTypes,
    ...Table.propTypes,
    multiple: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired
};

SelectableTable.defaultProps = {
    ...Component.defaultProps,
    ...Table.defaultProps,
    multiple: true,
    selected: []
};

module.exports = SelectableTable;
