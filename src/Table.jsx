/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

var u = require('underscore');
var React = require('react');
var PropTypes = React.PropTypes;

var TableRow = require('./TableRow.jsx');
var Icon = require('./Icon.jsx');

function getNextSelectedRowData(datasource, current, action, rowIndex) {

    var selectedCount = current.length;

    switch (action) {

        case 'select':

            return current.concat(rowIndex).sort();

        case 'unselect':

            return u.reject(current, function (row) {
                return row === rowIndex;
            });

        case 'selectAll':

            return u.range(0, datasource.length);

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
        onSelect: PropTypes.func
    },

    getDefaultProps: function () {
        return {
            highlight: true,
            rowHeight: 48,
            headerRowHeight: 56,
            selectable: false
        };
    },

    getInitialState: function () {
        return {
            selected: []
        };
    },

    render: function() {

        var me = this;
        var props = me.props;
        var columns = props.columns;

        if (props.selectable) {
            columns = [{
                title: '',
                key: 'select',
                cellRenderer: me.renderSelectorCell,
                width: 66
            }].concat(columns);
        }

        return (
            <div className="ui-table">
                <div className="ui-table-header">
                    <TableRow
                        part='header'
                        states={{selected: me.isAllRowsSelected()}}
                        rowHeight={props.headerRowHeight}
                        columns={columns} />
                </div>
                <div className="ui-table-body">
                    {props.datasource.map(function (row, index) {
                        return (
                            <TableRow
                                states={{selected: me.isRowSelected(index)}}
                                rowHeight={props.rowHeight}
                                highlight={props.highlight}
                                key={index}
                                rowIndex={index}
                                part='body'
                                columns={columns}
                                rowData={row} />
                        );
                    })}
                </div>
            </div>
        );
    },

    renderSelectorCell: function (props) {

        var icon = props.part === 'body' && this.isRowSelected(props.rowIndex) || this.isAllRowsSelected()
            ? 'check-box' : 'check-box-outline-blank';

        var action = props.part === 'body'
            ? this.isRowSelected(props.rowIndex) ? 'unselect' : 'select'
            : this.isAllRowsSelected() ? 'unselectAll' : 'selectAll';

        return (
            <Icon
                onClick={this.onRowSelectorClick.bind(this, action, props.rowIndex)}
                icon={icon}
                variants={['table-selector']} />
        );

    },

    onRowSelectorClick: function (action, rowIndex) {

        var nextSelected = getNextSelectedRowData(
            this.props.datasource,
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
        return this.state.selected.length === this.props.datasource.length;
    }

});

module.exports = Table;
