/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';
import TableCell from './Cell';

const cx = create('TableRow');

function renderCell(props, columnData, index) {

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

export default class TableRow extends Component {

    render() {

        const props = this.props;
        const columns = props.columns;
        const tableWidth = props.tableWidth;

        return (
            <div
                className={cx(props).build()}
                style={{width: tableWidth ? tableWidth - 2 : null}}>
                {columns.map((column, index) => renderCell(props, column.props, index))}
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
    height: PropTypes.number.isRequired
};
