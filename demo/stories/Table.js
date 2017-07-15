/**
 * @file Table
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';
import Table, {Column} from '../../src/Table';
import SelectableTable from '../../src/SelectableTable';

let book = storiesOf('Table', module);

class Demo extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            sortBy: '',
            order: 'none',
            data: Array.from({length: 100}).map((_, i) => {

                return {
                    name: `city_${i}`,
                    age: i,
                    size: i % 5,
                    distance: i
                };

            })
        };
    }

    onSort(column) {

        let {sortBy, order, data} = this.state;

        let nextOrder = sortBy === column && order === 'asc' ? 'desc' : 'asc';

        data = data.sort((a, b) => (b[column] - a[column]));

        if (nextOrder === 'desc') {
            data = data.reverse();
        }

        this.setState({
            sortBy: column,
            order: nextOrder,
            data
        });

    }

    getSort(name) {
        let {sortBy, order} = this.state;
        return name === sortBy ? order : 'none';
    }

    render() {

        return (
            <Table dataSource={this.state.data}>
                <Column
                    width={100}
                    header="城市名"
                    dataKey="name"
                    sortable={false} />
                <Column
                    width={100}
                    title="距离好远好远"
                    header="距离"
                    align="left"
                    dataKey="distance"
                    sortable={true}
                    sortBy={this.getSort('distance')}
                    onSort={this.onSort.bind(this, 'distance')}
                />
                <Column
                    width={100}
                    header="大小"
                    title="好大好大"
                    dataKey="size"
                    align="center"
                    sortable={true}
                    sortBy={this.getSort('size')}
                    onSort={this.onSort.bind(this, 'size')}
                />
                <Column
                    width={100}
                    header="年龄"
                    title="年纪轻轻就不学好！"
                    dataKey="age"
                    align="right"
                    sortable={true}
                    sortBy={this.getSort('age')}
                    onSort={this.onSort.bind(this, 'age')}
                />
            </Table>
        );

    }


}

book.add('排序', () => <Demo />);

book.add('表头跟随', () => (
    <div>
        <Table
            dataSource={Array.from({length: 30}).map((_, i) => ({name: `melon_${i}`, age: i}))}
            headerSticky>
            <Column
                dataKey="name"
                header="姓名"
                width={100}
                title="grow=1" />
            <Column
                dataKey="age"
                header="年龄"
                width={100}
                title="grow=2" />
        </Table>
        <Table
            dataSource={Array.from({length: 30}).map((_, i) => ({name: `melon_${i}`, age: i}))}
            headerSticky>
            <Column
                dataKey="name"
                header="姓名"
                width={100}
                title="grow=1" />
            <Column
                dataKey="age"
                header="年龄"
                width={100}
                title="grow=2" />
        </Table>
        <Table
            dataSource={Array.from({length: 30}).map((_, i) => ({name: `melon_${i}`, age: i}))}
            headerSticky>
            <Column
                dataKey="name"
                header="姓名"
                width={100}
                title="grow=1" />
            <Column
                dataKey="age"
                header="年龄"
                width={100}
                title="grow=2" />
        </Table>
    </div>
));

book.add('可选择表格', () => (

    <SelectableTable
        dataSource={Array.from({length: 10}).map((_, i) => ({name: `melon_${i}`, age: i}))}>
        <Column
            dataKey="name"
            header="姓名"
            width={100}
            title="grow=1" />
        <Column
            dataKey="age"
            header="年龄"
            width={100}
            title="grow=2" />
    </SelectableTable>

));

book.add('空表格', () => (
    <Table dataSource={[]}>
        <Column
            dataKey="name"
            header="姓名"
            width={100}
            title="grow=1" />
        <Column
            dataKey="age"
            header="年龄"
            width={100}
            title="grow=2" />
        <Column
            dataKey="a"
            header="a"
            width={100}
            title="grow=1" />
        <Column
            dataKey="b"
            header="b"
            width={100}
            title="grow=1" />
        <Column
            dataKey="c"
            header="c"
            width={100}
            title="grow=1" />
    </Table>
));

class TableCellEditDemo extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            dataSource: Array.from({length: 30}).map((_, i) => ({name: `melon_${i}`, age: i}))
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange({value, rowIndex, dataKey}) {

        let dataSource = this.state.dataSource;

        let nextDataSource = [
            ...dataSource.slice(0, rowIndex),
            {
                ...dataSource[rowIndex],
                [dataKey]: value
            },
            ...dataSource.slice(rowIndex + 1)
        ];

        this.setState({
            dataSource: nextDataSource
        });

    }

    render() {

        return (
            <Table
                height={600}
                dataSource={this.state.dataSource}
                headerSticky>
                <Column
                    dataKey="name"
                    header="姓名"
                    editable={true}
                    onChange={this.onChange}
                    width={100}
                    title="grow=1" />
                <Column
                    dataKey="age"
                    header="年龄"
                    width={100}
                    editable={true}
                    editorMode="confirm"
                    editorTitle="修改年龄"
                    onChange={this.onChange}
                    title="grow=2" />
            </Table>
        );

    }

}

book.add('单元格内文本编辑', () => (<TableCellEditDemo />));
