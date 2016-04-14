/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
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

    return (
        <TableCell
            part={part}
            height={height}
            width={width}
            align={align}
            key={dataKey || part}
            rowIndex={rowIndex}
            columnIndex={index}
            columnData={columnData}
            rowData={data}
            cellKey={dataKey}
            cellData={cellData}
            cellRenderer={cellRenderer} />
    );

}

export default function TableRow(props)  {

    const {
        columns,
        tableWidth,
        ...rest
    } = props;

    return (
        <div
            {...rest}
            className={cx(props).build()}
            style={{width: tableWidth ? tableWidth - 2 : null}}>
            {columns.map((column, index) => {
                return renderCell(props, column.props, index);
            })}
        </div>
    );

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
