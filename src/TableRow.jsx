/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var TableCell = require('./TableCell.jsx');
var cx = require('./common/util/classname');

var TableRow = React.createClass({

    displayName: 'TableRow',

    propTypes: {
        part: React.PropTypes.string.isRequired
    },

    render: function () {

        var props = this.props;
        var part = props.part;

        var rowData = props.rowData;
        var columns = props.columns;

        return (
            <div className={props.className}>
                {columns.map(function (columnData, index) {

                    var cellKey = columnData.key;

                    var cellData = part === 'header' || part === 'footer'
                        ? columnData[part] : rowData[cellKey];

                    return (
                        <TableCell
                            part={part}
                            height={props.rowHeight}
                            width={columnData.width}
                            align={columnData.align}
                            key={columnData.key}
                            rowIndex={props.rowIndex}
                            columnIndex={index}
                            columnData={columnData}
                            rowData={rowData}
                            cellKey={cellKey}
                            cellData={cellData}
                            cellRenderer={columnData.cellRenderer} />
                    );

                })}
            </div>
        );
    }

});

module.exports = require('./common/util/createControl')(TableRow);
