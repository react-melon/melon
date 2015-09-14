/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

var u = require('underscore');
var React = require('react');
var PropTypes = React.PropTypes;
var ReactChildren = React.Children;

var Row = require('./table/Row.jsx');
var SelectorColumn = require('./table/SelectorColumn.jsx');

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

var Table = React.createClass({

    propTypes: {
        rowHeight: PropTypes.number.isRequired,
        highlight: PropTypes.bool,
        headerRowHeight: PropTypes.number,
        selectable: PropTypes.bool,
        onSelect: PropTypes.func,
        dataSource: PropTypes.array.isRequired
    },

    getDefaultProps: function () {

        return {
            highlight: true,
            rowHeight: 48,
            headerRowHeight: 56,
            selectable: false,
            columns: []
        };

    },

    getInitialState: function () {
        return {
            selected: [],
            ...this.getState(this.props)
        };
    },

    componentWillReceiveProps: function (nextProps) {
        return {
            selected: this.state.selected,
            ...this.getState(nextProps)
        };
    },

    getState: function (props) {

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

        ReactChildren.forEach(props.children, function (child) {

            if (child == null) {
                return;
            }

            if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                throw new Error('Table child must be a TableColumn');
            }

            children.push(child);

        }, this);

        return {
            columns: children
        };

    },

    render: function() {

        var columns = this.state.columns;

        return (
            <div className="ui-table">
                {this.renderHeader(columns)}
                {this.renderBody(columns)}
                {this.renderFooter(columns)}
            </div>
        );

    },

    renderHeader: function (columns) {
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
    },

    renderBody: function (columns) {
        var me = this;
        return (
            <div className="ui-table-body">
                {this.props.dataSource.map(function (rowData, index) {
                    return me.renderRow(columns, rowData, index);
                })}
            </div>
        );
    },

    renderRow: function (columns, rowData, index) {
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
    },

    renderFooter: function (columns) {
        return null;
    },

    onSelect: function (e, rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    },

    onSelectAll: function (e) {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        )
    },

    onRowSelectorClick: function (action, rowIndex) {

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
    },

    isRowSelected: function (rowIndex) {
        return u.contains(this.state.selected, rowIndex);
    },

    isAllRowsSelected: function () {
        return this.state.selected.length === this.props.dataSource.length;
    }

});

Table.Column = require('./table/Column.jsx');

module.exports = Table;
