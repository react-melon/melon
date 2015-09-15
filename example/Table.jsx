/**
 * @file melon example table
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Table = require('../src/Table.jsx');
var Column = Table.Column;
var Title = require('../src/Title.jsx');
var Button = require('../src/Button.jsx');

//helper to create a fixed number of rows
function createDataSource(numberOfRows) {
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
            table1DataSource: createDataSource(20),
            table2DataSource: createDataSource(3),
            table3DataSource: createDataSource(5),
            selected: []
        };

    },

    getEditableTableColumns: function () {
        return [

        ];
    },

    renderEditableCell: function (props) {
        return props.cellData
            ? '嘿嘿'
            : <div>请填写<Icon icon="mode-edit" onClick={this.onStartEdit.bind(this, props)} /></div>;
    },

    onStartEdit: function (props) {
        console.log('edit', props);
    },

    render: function() {
        return (
            <div>
                <Title level={3}>Table</Title>
                <Table dataSource={this.state.table1DataSource}>
                    <Column
                        dataKey='id'
                        header='ID'
                        footer='ID'
                        align='right'
                        width={100} />
                    <Column
                        dataKey='task'
                        header='Title'
                        footer='Title'
                        width={200} />
                    <Column
                        dataKey='priority'
                        header='Priority'
                        footer='Priority'
                        width={200} />
                    <Column
                        dataKey='issueType'
                        header='Issue Type'
                        footer='Issue Type'
                        width={100} />
                    <Column
                        dataKey='complete'
                        header='% Complete'
                        footer='% Complete'
                        width={300} />
                </Table>
               <Table
                    selectable={true}
                    dataSource={this.state.table2DataSource}
                    onSelect={this.onTableSelect} >
                    <Column
                        dataKey='id'
                        header='ID'
                        align='right'
                        width={100} />
                    <Column
                        dataKey='task'
                        header='Title'
                        footer='Title'
                        width={200} />
                    <Column
                        dataKey='priority'
                        header='Priority'
                        width={200} />
                    <Column
                        dataKey='issueType'
                        header='Issue Type'
                        width={100} />
                    <Column
                        dataKey='complete'
                        header='% Complete'
                        width={300} />
                </Table>
                <div>
                    {this.renderSelected()}
                </div>
            </div>
        );

// <Table
                //     selectable={true}
                //     dataSource={this.state.table3DataSource}>
                //     <Column
                //         dataKey='id'
                //         header='ID'
                //         footer='ID'
                //         align='right'
                //         width={100} />
                //     <Column
                //         dataKey='task'
                //         header='Title'
                //         footer='Title'
                //         width={200} />
                //     <Column
                //         dataKey='comment'
                //         header='comment'
                //         width={300}
                //         cellRenderer={this.renderEditableCell} />
                // </Table>
    },

    renderSelected: function () {
        var selected = this.state.selected;
        return selected.length
            ? <div>您已选中{selected.join(',')}</div>
            : '您没有选中任何一行';
    },

    onTableSelect: function (selectedRows) {
        this.setState({
            selected: selectedRows
        });
    }

});

module.exports = View;

