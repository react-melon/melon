/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('TableRow');
const TableCell = require('./Cell');

const TableRow = React.createClass({

    displayName: 'TableRow',

    renderCell(columnData, index) {

        const {
            part,
            data,
            height,
            rowIndex
        } = this.props;

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

    },

    render() {

        const {
            columns,
            tableWidth,
            ...rest
        } = this.props;

        return (
            <div
                {...rest}
                className={cx(this.props).build()}
                style={{width: tableWidth ? tableWidth - 2 : null}}>
                {columns.map((column, index) => {
                    return this.renderCell(column.props, index);
                })}
            </div>
        );
    }


});

const {PropTypes} = React;

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

module.exports = TableRow;
