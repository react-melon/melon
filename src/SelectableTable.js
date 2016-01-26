/**
 * @file SelectableTable
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const Table = require('./Table');
const SelectorColumn = require('./table/SelectorColumn');

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

const SelectableTable = React.createClass({

    displayName: 'SelectableTable',

    getInitialState() {
        return {
            selected: this.props.selected
        };
    },

    componentWillReceiveProps(props) {

        if (!this.props.onSelect) {
            this.setState({
                selected: props.selected
            });
        }

    },

    onSelect(rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    },

    onSelectAll() {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        );
    },

    onRowSelectorClick(action, rowIndex) {

        const {
            onSelect,
            dataSource,
            multiple
        } = this.props;

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
                selected
            });
            return;
        }

        this.setState({
            selected
        });

    },

    getSelected() {
        const {state, props} = this;
        const {onSelect} = props;
        const {selected} = onSelect ? props : state;
        return selected;
    },

    isRowSelected(rowIndex) {
        const selected = this.getSelected();
        return selected.indexOf(rowIndex) !== -1;
    },

    isAllRowsSelected() {
        const selected = this.getSelected();
        return selected.length === this.props.dataSource.length;
    },

    render() {

        const {children, multiple, ...rest} = this.props;

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

});

const {PropTypes} = React;

SelectableTable.propTypes = {
    ...Table.propTypes,
    multiple: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired
};

SelectableTable.defaultProps = {
    ...Table.defaultProps,
    multiple: true,
    selected: []
};

module.exports = SelectableTable;
