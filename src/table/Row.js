/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import TableCell from './Cell';

const cx = create('TableRow');

/**
 * 表格行
 *
 * @extends React.Component
 */
export default class TableRow extends Component {

    /**
     * 是否应该更新视图
     *
     * @public
     * @param  {*} nextProps 下一个属性
     * @param  {*} nextState 下一个状态
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {

        const {
            tableWidth,
            rowHasChanged,
            data
        } = this.props;

        if (tableWidth !== nextProps.tableWidth) {
            return true;
        }

        if (rowHasChanged) {
            return rowHasChanged(data, nextProps.data);
        }

        return true;

    }

    /**
     * 渲染表格单元格
     *
     * @protected
     * @param {*} props 属性
     * @param {*} columnData 列配置
     * @param {*} index 行号
     * @return {React.Element}
     */
    renderCell(props, columnData, index) {

        const {
            part,
            data,
            height,
            rowIndex
        } = props;

        const {
            width,
            align,
            dataKey,
            cellRenderer
        } = columnData;

        const cellData = part === 'header' || part === 'footer'
            ? columnData[part]
            : data[dataKey];

        const cellProps = {
            part,
            height,
            width,
            align,
            rowIndex,
            columnData,
            cellData,
            key: dataKey || part,
            columnIndex: index,
            rowData: data,
            cellKey: dataKey
        };

        // 内容默认是 cellData
        let content = cellData;

        // 如果有 cellRenderer
        if (typeof cellRenderer === 'function') {
            content = cellRenderer(cellProps);
        }
        // 或者是有局部的 renderer
        else {

            const partSpecificRenderer = columnData[`${part}Renderer`];

            if (typeof partSpecificRenderer === 'function') {
                content = partSpecificRenderer(cellProps);
            }

        }

        return (
            <TableCell {...cellProps} content={content} />
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {Element}
     */
    render() {

        const props = this.props;
        const {columns, tableWidth} = props;

        return (
            <div
                className={cx(props).build()}
                style={{width: tableWidth ? tableWidth - 2 : null}}>
                {columns.map((column, index) => this.renderCell(props, column.props, index))}
            </div>
        );

    }


}

TableRow.displayName = 'TableRow';

TableRow.propTypes = {

    index: PropTypes.number,

    /**
     * 行类型
     *
     * @type {string}
     */
    part: PropTypes.oneOf(['header', 'footer', 'body']).isRequired,

    /**
     * 行数据
     *
     * @type {(Object | array)}
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /**
     * Height of the row.
     * @type {number}
     */
    height: PropTypes.number.isRequired,

    /**
     * 行数据是否发生变化
     *
     * 此函数会被用于优化性能。如果返回值为 false，那么当前行不会被更新
     *
     * @type {Funciton}
     */
    rowHasChanged: PropTypes.func.isRequired
};
