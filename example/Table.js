/**
 * @file melon example table
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Table from '../src/Table';
import Title from '../src/Title';
import Icon from '../src/Icon';
import SelectableTable from '../src/SelectableTable';

const DATA_PRIORITY = ['Critical', 'High', 'Medium', 'Low'];
const DATA_ISSUE_TYPE = ['Bug', 'Improvement', 'Epic', 'Story'];

// helper to create a fixed number of rows
function createDataSource(numberOfRows) {

    return Array
        .of(numberOfRows)
        .map(function (_, i) {
            return {
                id: i,
                task: 'Task ' + i,
                complete: Math.min(100, Math.round(Math.random() * 110)),
                priority: DATA_PRIORITY[Math.floor((Math.random() * 3) + 1)],
                issueType: DATA_ISSUE_TYPE[Math.floor((Math.random() * 3) + 1)]
            };
        });

}

export default class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            table1DataSource: createDataSource(20),
            table2DataSource: createDataSource(3),
            table3DataSource: createDataSource(5),
            selected: []
        };

    }

    getEditableTableColumns() {
        return [];
    }

    renderEditableCell(props) {
        return props.cellData
            ? '嘿嘿'
            : <div>请填写<Icon icon="mode-edit" onClick={this.onStartEdit.bind(this, props)} /></div>;
    }

    onStartEdit(props) {
        // console.log('edit', props);
    }

    render() {
        return (
            <div>
                <Title level={3}>Table</Title>

                <Table dataSource={this.state.table1DataSource}>
                    <Table.Column dataKey='id' header='ID' footer='ID' align='right' width={100} />
                    <Table.Column dataKey='task' header='Title' footer='Title' width={200} />
                    <Table.Column dataKey='priority' header='Priority' footer='Priority' width={200} />
                    <Table.Column dataKey='issueType' header='Issue Type' footer='Issue Type' width={100} />
                    <Table.Column dataKey='complete' header='% Complete' footer='% Complete' width={300} />
                    <Table.Column dataKey='haha' header='% Complete' footer='% Complete' width={300} />
                </Table>

                <Title level={3}>Table</Title>

                <Table dataSource={[]}>
                    <Table.Column dataKey='id' header='ID' footer='ID' align='right' width={100} />
                    <Table.Column dataKey='task' header='Title' footer='Title' width={200} />
                    <Table.Column dataKey='priority' header='Priority' footer='Priority' width={200} />
                    <Table.Column dataKey='issueType' header='Issue Type' footer='Issue Type' width={100} />
                    <Table.Column dataKey='complete' header='% Complete' footer='% Complete' width={300} />
                </Table>

                <SelectableTable dataSource={this.state.table3DataSource}>
                    <Table.Column
                        dataKey='id'
                        header='ID'
                        footer='ID'
                        align='right'
                        width={100} />
                    <Table.Column
                        dataKey='task'
                        header='Title'
                        footer='Title'
                        width={200} />
                    <Table.Column
                        dataKey='comment'
                        header='comment'
                        width={300} />
                </SelectableTable>
                <SelectableTable
                    multiple={false}
                    dataSource={this.state.table3DataSource}>
                    <Table.Column dataKey='id' header='ID' footer='ID' align='right' width={100} />
                    <Table.Column dataKey='task' header='Title' footer='Title' width={200} />
                    <Table.Column dataKey='comment' header='comment' width={300} />
                </SelectableTable>
                <SelectableTable
                    multiple={false}
                    dataSource={this.state.table3DataSource}
                    onSelect={this.onSelectableTable}>
                    <Table.Column dataKey='id' header='ID' footer='ID' align='right' width={100} />
                    <Table.Column dataKey='task' header='Title' footer='Title' width={200} />
                    <Table.Column dataKey='comment' header='comment' width={300} />
                </SelectableTable>
                <div>
                    {this.renderSelected()}
                </div>
            </div>
        );
    }

    renderSelected() {
        const {selected} = this.state;
        return selected.length
            ? <div>您已选中{selected.join(',')}</div>
            : '您没有选中任何一行';
    }

    onSelectableTable(selected) {
        this.setState({selected});
    }

}
