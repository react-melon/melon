define('melon/table/Row', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    './Cell'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TableRow');
    var TableCell = require('./Cell');
    var TableRow = React.createClass({
        displayName: 'TableRow',
        renderCell: function (columnData, index) {
            var _props = this.props;
            var part = _props.part;
            var data = _props.data;
            var height = _props.height;
            var rowIndex = _props.rowIndex;
            var width = columnData.width;
            var align = columnData.align;
            var dataKey = columnData.dataKey;
            var cellRenderer = columnData.cellRenderer;
            var cellData = part === 'header' || part === 'footer' ? columnData[part] : data[dataKey];
            return React.createElement(TableCell, {
                part: part,
                height: height,
                width: width,
                align: align,
                key: dataKey || part,
                rowIndex: rowIndex,
                columnIndex: index,
                columnData: columnData,
                rowData: data,
                cellKey: dataKey,
                cellData: cellData,
                cellRenderer: cellRenderer
            });
        },
        render: function () {
            var _this = this;
            var _props2 = this.props;
            var columns = _props2.columns;
            var tableWidth = _props2.tableWidth;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'columns',
                'tableWidth'
            ]);
            return React.createElement('div', babelHelpers._extends({}, rest, {
                className: cx(this.props).build(),
                style: { width: tableWidth ? tableWidth - 2 : null }
            }), columns.map(function (column, index) {
                return _this.renderCell(column.props, index);
            }));
        }
    });
    var PropTypes = React.PropTypes;
    TableRow.propTypes = {
        index: PropTypes.number,
        part: PropTypes.oneOf([
            'header',
            'footer',
            'body'
        ]).isRequired,
        data: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        height: PropTypes.number.isRequired
    };
    module.exports = TableRow;
});