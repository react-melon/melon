/**
 * @file melon example table
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Table = require('../src/Table.jsx');
var Title = require('../src/Title.jsx');
var Button = require('../src/Button.jsx');

var columns = [
    {
        key: 'id',
        header: 'ID',
        footer: 'ID',
        align: 'right',
        width: 100
    },
    {
        key: 'task',
        header: 'Title',
        footer: 'Title',
        width: 200
    },
    {
        key: 'priority',
        header: 'Priority',
        footer: 'Priority',
        width: 200
    },
    {
        key: 'issueType',
        header: 'Issue Type',
        footer: 'Issue Type',
        width: 100
    },
    {
        key: 'complete',
        header: '% Complete',
        footer: '% Complete',
        width: 300
    }
];

//helper to create a fixed number of rows
function createDatasource(numberOfRows) {
    var rows = [];
    for (var i = 1; i <= numberOfRows; i++) {
        rows.push({
            id: i,
            task: 'Task ' + i,
            complete: Math.min(100, Math.round(Math.random() * 110)),
            priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
            issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        });
    }
    return rows;
}

var View = React.createClass({

    getInitialState: function () {

        return {
            table1Datasource: createDatasource(20),
            table2Datasource: createDatasource(3),
            selected: []
        };

    },

    render: function() {
        return (
            <div>
                <Title level={3}>Table</Title>
                <Table
                    columns={columns}
                    datasource={this.state.table1Datasource} />

                <Table
                    columns={columns}
                    selectable={true}
                    datasource={this.state.table2Datasource}
                    onSelect={this.onTableSelect} />

                <div>
                    {this.getSelected()}
                </div>
            </div>
        );
    },

    getSelected: function () {
        var selected = this.state.selected;
        return selected.length ? <div>您已选中{selected.join(',')}</div> : '';
    },

    onTableSelect: function (selectedRows, rowIndex) {
        this.setState({
            selected: selectedRows
        });
    }

});

module.exports = View;
