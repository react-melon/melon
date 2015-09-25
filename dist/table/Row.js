define('melon/table/Row', [
    'exports',
    '../babelHelpers',
    'react',
    './Cell',
    '../Component'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var TableCell = require('./Cell');
    var Component = require('../Component');
    var TableRow = function (_Component) {
        babelHelpers.inherits(TableRow, _Component);
        function TableRow(props) {
            babelHelpers.classCallCheck(this, TableRow);
            babelHelpers.get(Object.getPrototypeOf(TableRow.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.onDoubleClick = this.onDoubleClick.bind(this);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
        }
        babelHelpers.createClass(TableRow, [
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var props = this.props;
                    var part = props.part;
                    var columns = props.columns;
                    var renderCell = this.renderCell;
                    return React.createElement('div', {
                        className: this.getClassName(),
                        onClick: this.props.onClick ? this.onClick : null,
                        onDoubleClick: this.props.onDoubleClick ? this.onDoubleClick : null,
                        onMouseDown: this.props.onMouseDown ? this.onMouseDown : null,
                        onMouseEnter: this.props.onMouseEnter ? this.onMouseEnter : null,
                        onMouseLeave: this.props.onMouseLeave ? this.onMouseLeave : null
                    }, columns.map(function (column, index) {
                        return _this.renderCell(column.props, index);
                    }));
                }
            },
            {
                key: 'renderCell',
                value: function renderCell(columnData, index) {
                    var props = this.props;
                    var part = props.part;
                    var cellKey = columnData.dataKey;
                    var data = props.data;
                    var cellData = part === 'header' || part === 'footer' ? columnData[part] : data[cellKey];
                    return React.createElement(TableCell, {
                        part: part,
                        height: props.height,
                        width: columnData.width,
                        align: columnData.align,
                        key: columnData.dataKey || part,
                        rowIndex: props.rowIndex,
                        columnIndex: index,
                        columnData: columnData,
                        rowData: data,
                        cellKey: cellKey,
                        cellData: cellData,
                        cellRenderer: columnData.cellRenderer
                    });
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    this.props.onClick(e, this.props.index, this.props.data);
                }
            },
            {
                key: 'onDoubleClick',
                value: function onDoubleClick(e) {
                    this.props.onDoubleClick(e, this.props.index, this.props.data);
                }
            },
            {
                key: 'onMouseEnter',
                value: function onMouseEnter(e) {
                    this.props.onMouseEnter(e, this.props.index, this.props.data);
                }
            },
            {
                key: 'onMouseLeave',
                value: function onMouseLeave(e) {
                    this.props.onMouseLeave(e, this.props.index, this.props.data);
                }
            },
            {
                key: 'onMouseDown',
                value: function onMouseDown(e) {
                    this.props.onMouseDown(e, this.props.index, this.props.data);
                }
            }
        ]);
        return TableRow;
    }(Component);
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
        onClick: PropTypes.func,
        onDoubleClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseDown: PropTypes.func,
        height: PropTypes.number.isRequired
    };
    module.exports = TableRow;
});