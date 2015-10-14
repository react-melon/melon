/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

let u = require('underscore');
let React = require('react');
let Component = require('./Component');

let Row = require('./table/Row');
let SelectorColumn = require('./table/SelectorColumn');

let {PropTypes, Children} = React;

function getNextSelectedRowData(dataSource, current, action, rowIndex) {

    if (action === 'selectAll') {
        return u.range(0, dataSource.length);
    }

    if (action === 'unselectAll') {
        return [];
    }

    let selected = action === 'select'
        ? current.concat(rowIndex).sort()
        : u.reject(current, function (row) {
            return row === rowIndex;
        });

    return selected;

}

class Table extends Component {

    constructor(props) {

        super(props);

        this.isRowSelected = this.isRowSelected.bind(this);
        this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

        this.state = {
            selected: props.selected,
            columns: this.getColumns(props)
        };

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            selected: nextProps.selected,
            columns: this.getColumns(nextProps)
        });

    }

    getColumns(props) {

        var children = [];

        if (props.selectable) {
            var selector = (
                <SelectorColumn
                    title=''
                    isSelected={this.isRowSelected}
                    isAllSelected={this.isAllRowsSelected}
                    onSelect={this.onSelect}
                    onSelectAll={this.onSelectAll} />
            );
            children = [selector, ...children];
        }

        return Children
            .toArray(props.children)
            .reduce(
                function (children, child) {

                    if (child != null) {

                        if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                            throw new Error('Table child must be a TableColumn');
                        }

                        children.push(child);

                    }

                    return children;
                },
                children
            );

    }

    render() {

        var columns = this.state.columns;

        return (
            <div className="ui-table">
                {this.renderHeader(columns)}
                {this.renderBody(columns)}
                {this.renderFooter(columns)}
            </div>
        );

    }

    renderHeader(columns) {
        var props = this.props;
        return (
            <div className="ui-table-header">
                <Row
                    part='header'
                    selected={{selected: this.isAllRowsSelected()}}
                    height={props.headerRowHeight}
                    columns={columns} />
            </div>
        );
    }

    renderBody(columns) {
        return (
            <div className="ui-table-body">
                {this.props.dataSource.map((rowData, index) => {
                    return this.renderRow(columns, rowData, index);
                })}
            </div>
        );
    }

    renderRow(columns, rowData, index) {
        let {rowHeight, highlight} = this.props;
        return (
            <Row
                height={rowHeight}
                highlight={highlight}
                key={index}
                rowIndex={index}
                part='body'
                columns={columns}
                data={rowData} />
        );
    }

    renderFooter(columns) {
        return null;
    }

    onSelect(e, rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    }

    onSelectAll(e) {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        );
    }

    onRowSelectorClick(action, rowIndex) {

        let {onSelect, selected, dataSource} = this.props;

        selected = getNextSelectedRowData(
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

    isRowSelected(rowIndex) {
        return this.state.selected.indexOf(rowIndex) !== -1;
    }

    isAllRowsSelected() {
        let selected = this.state.selected;
        return selected.length === this.props.dataSource.length;
    }

}

Table.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    headerRowHeight: PropTypes.number,
    selectable: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,
    dataSource: PropTypes.array.isRequired
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56,
    selectable: false,
    selected: [],
    columns: []
};

Table.Column = require('./table/Column');

module.exports = Table;
