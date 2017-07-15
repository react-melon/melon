/**
 * @file SelectableTable
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import SelectorColumn from './table/SelectorColumn';
import SelectorRow from './table/SelectorRow';

function getNextSelectedRowData(multiple, dataSource, current, action, rowIndex) {

    if (!multiple) {
        return [rowIndex];
    }

    if (action === 'selectAll') {
        return dataSource.map((_, index) => index);
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

/**
 * 可选择行的表格
 *
 * @extends {Table}
 */
export default class SelectableTable extends Table {

    /**
     * 构造函数
     *
     * @public
     * @param  {*} props 属性
     */
    constructor(props) {

        super(props);

        this.getSelected = this.getSelected.bind(this);
        this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
        this.isRowSelected = this.isRowSelected.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

        this.state = {
            ...this.state,
            selected: this.props.selected
        };

    }

    /**
     * 接受新属性时处理函数
     *
     * @public
     * @param  {*} props 新属性
     */
    componentWillReceiveProps(props) {

        super.componentWillReceiveProps(props);

        const {selected, onSelect} = props;

        if (onSelect && selected != null) {
            this.setState({
                selected
            });
        }

    }

    /**
     * 当某行被选中时处理函数
     *
     * @private
     * @param  {number} rowIndex 行号
     */
    onSelect(rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    }

    /**
     * 当『选择全部』被点击时的处理函数
     *
     * @private
     */
    onSelectAll() {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        );
    }

    /**
     * 当某行中的选择器被点击时的处理函数
     *
     * @private
     * @param  {string} action   动作
     * @param  {number} rowIndex 行号
     */
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
                selected,
                target: this
            });
            return;
        }

        this.setState({
            selected
        });

    }

    /**
     * 获取当前选中行号
     *
     * @protected
     * @return {Array.number}
     */
    getSelected() {
        const source = this.props.onSelect ? this.props : this.state;
        return source.selected;
    }

    /**
     * 指定行号是否被选中
     *
     * @public
     * @param  {number}  rowIndex 行号
     * @return {boolean}
     */
    isRowSelected(rowIndex) {
        const selectedRows = this.getSelected();
        return selectedRows.indexOf(rowIndex) !== -1;
    }

    /**
     * 是否全部被选中
     *
     * @public
     * @return {boolean}
     */
    isAllRowsSelected() {
        const selectedRows = this.getSelected();
        return selectedRows.length === this.props.dataSource.length;
    }

    /**
     * 从属性中解析出列配置
     *
     * @protected
     * @param  {*} props 属性
     * @return {Array.Element}
     */
    getColumns(props) {

        const selectorColumn = (
            <SelectorColumn
                isSelected={this.isRowSelected}
                isAllSelected={this.isAllRowsSelected}
                multiple={props.multiple}
                onSelect={this.onSelect}
                onSelectAll={this.onSelectAll} />
        );

        const columns = super.getColumns(props);

        return [selectorColumn, ...columns];

    }

    /**
     * 渲染一行
     *
     * @protected
     * @param  {string}        part       位置
     * @param  {Array.Element} columns    列配置
     * @param  {*}             rowData    行数据
     * @param  {number}        index      行号
     * @param  {number}        tableWidth 表格宽度
     * @return {Element}
     */
    renderRow(part, columns, rowData, index, tableWidth) {
        const {rowHeight, headerRowHeight, highlight, rowHasChanged} = this.props;
        return (
            <SelectorRow
                selected={part === 'body' ? this.isRowSelected(index) : this.isAllRowsSelected()}
                height={part === 'body' ? rowHeight : headerRowHeight}
                highlight={highlight}
                key={index}
                rowIndex={index}
                part={part}
                columns={columns}
                data={rowData}
                tableWidth={tableWidth}
                rowHasChanged={rowHasChanged} />
        );
    }

}

SelectableTable.displayName = 'SelectableTable';

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
