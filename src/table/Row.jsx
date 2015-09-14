/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var PropTypes = React.PropTypes;
var TableCell = require('./Cell.jsx');
var cx = require('../common/util/classname');

var TableRow = React.createClass({

    displayName: 'TableRow',

    propTypes: {

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
         * 单击事件
         *
         * @type {function}
         */
        onClick: PropTypes.func,

        /**
         * 双击事件
         *
         * @type {function}
         */
        onDoubleClick: PropTypes.func,

        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseDown: PropTypes.func,

        /**
         * Height of the row.
         * @type {number}
         */
        height: PropTypes.number.isRequired
    },

    render: function () {

        var props = this.props;
        var part = props.part;
        var columns = props.columns;
        var renderCell = this.renderCell;

        return (
            <div className={props.className}
                onClick={this.props.onClick ? this._onClick : null}
                onDoubleClick={this.props.onDoubleClick ? this._onDoubleClick : null}
                onMouseDown={this.props.onMouseDown ? this._onMouseDown : null}
                onMouseEnter={this.props.onMouseEnter ? this._onMouseEnter : null}
                onMouseLeave={this.props.onMouseLeave ? this._onMouseLeave : null}>
                {columns.map(function (column, index) {
                    return renderCell(column.props, index);
                })}
            </div>
        );
    },

    renderCell: function (columnData, index) {

        var props = this.props;
        var part = props.part;
        var cellKey = columnData.dataKey;
        var data = props.data;

        var cellData = part === 'header' || part === 'footer'
            ? columnData[part]
            : data[cellKey];

        return (
            <TableCell
                part={part}
                height={props.height}
                width={columnData.width}
                align={columnData.align}
                key={columnData.dataKey || part}
                rowIndex={props.rowIndex}
                columnIndex={index}
                columnData={columnData}
                rowData={data}
                cellKey={cellKey}
                cellData={cellData}
                cellRenderer={columnData.cellRenderer} />
        );

    },

    onMouseEnter: function (e) {
        this.props.onMouseEnter(e, this.props.index, this.props.data);
    },

    onMouseLeave: function (e) {
        this.props.onMouseLeave(e, this.props.index, this.props.data);
    },

    onMouseDown: function (e) {
        this.props.onMouseDown(e, this.props.index, this.props.data);
    }


});

module.exports = require('../common/util/createControl')(TableRow);
