/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

var u = require('underscore');
var React = require('react');
var PropTypes = React.PropTypes;
var ReactChildren = React.Children;

var Row = require('./table/Row');
var SelectorColumn = require('./table/SelectorColumn');

function getNextSelectedRowData(dataSource, current, action, rowIndex) {

    var selectedCount = current.length;

    switch (action) {

        case 'select':

            return current.concat(rowIndex).sort();

        case 'unselect':

            return u.reject(current, function (row) {
                return row === rowIndex;
            });

        case 'selectAll':

            return u.range(0, dataSource.length);

        case 'unselectAll':

            return [];
    }

}

class Table extends React.Component {

    constructor(props) {

        super(props);

        this.isRowSelected = this.isRowSelected.bind(this);
        this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

        this.state = {
            selected: [],
            ...this.getState(this.props)
        };

    }

    componentWillReceiveProps(nextProps) {
        return {
            selected: this.state.selected,
            ...this.getState(nextProps)
        };
    }

    getState(props) {

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

            children.unshift(selector);

        }

        return {
            columns: ReactChildren
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
                )
        };

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
        var me = this;
        return (
            <div className="ui-table-body">
                {this.props.dataSource.map(function (rowData, index) {
                    return me.renderRow(columns, rowData, index);
                })}
            </div>
        );
    }

    renderRow(columns, rowData, index) {
        var props = this.props;
        return (
            <Row
                height={props.rowHeight}
                highlight={props.highlight}
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
        )
    }

    onRowSelectorClick(action, rowIndex) {

        var nextSelected = getNextSelectedRowData(
            this.props.dataSource,
            this.state.selected,
            action,
            rowIndex
        );

        this.setState(
            {
                selected: nextSelected
            },
            function () {
                var handler = this.props.onSelect;
                if (handler) {
                    handler(this.state.selected);
                }
            }
        );
    }

    isRowSelected(rowIndex) {
        return u.contains(this.state.selected, rowIndex);
    }

    isAllRowsSelected() {
        return this.state.selected.length === this.props.dataSource.length;
    }

}

Table.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    headerRowHeight: PropTypes.number,
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    dataSource: PropTypes.array.isRequired
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56,
    selectable: false,
    columns: []
};

Table.Column = require('./table/Column');

module.exports = Table;
