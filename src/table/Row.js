/**
 * @file melon/TableRow
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var TableCell = require('./Cell');

var Component = require('../Component');

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    render() {

        var props = this.props;
        var part = props.part;
        var columns = props.columns;
        var renderCell = this.renderCell;

        return (
            <div className={this.getClassName()}
                onClick={this.props.onClick ? this.onClick : null}
                onDoubleClick={this.props.onDoubleClick ? this.onDoubleClick : null}
                onMouseDown={this.props.onMouseDown ? this.onMouseDown : null}
                onMouseEnter={this.props.onMouseEnter ? this.onMouseEnter : null}
                onMouseLeave={this.props.onMouseLeave ? this.onMouseLeave : null}>
                {columns.map((column, index) => {return this.renderCell(column.props, index);})}
            </div>
        );
    }

    renderCell(columnData, index) {

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

    }

    onClick(e) {
        this.props.onClick(e, this.props.index, this.props.data);
    }

    onDoubleClick(e) {
        this.props.onDoubleClick(e, this.props.index, this.props.data);
    }

    onMouseEnter(e) {
        this.props.onMouseEnter(e, this.props.index, this.props.data);
    }

    onMouseLeave(e) {
        this.props.onMouseLeave(e, this.props.index, this.props.data);
    }

    onMouseDown(e) {
        this.props.onMouseDown(e, this.props.index, this.props.data);
    }


}

var PropTypes = React.PropTypes;

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
};

module.exports = TableRow;
