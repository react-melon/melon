/**
 * @file TableColumn
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var PropTypes = React.PropTypes;

var Component = require('../Component');

class TableColumn extends Component {

    render() {
        return null;
    }

}

TableColumn.propTypes = {

    /**
     * 单元格式对齐方式
     *
     * @type {string}
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * 单元格渲染函数
     *
     * @type {function}
     */
    cellRenderer: PropTypes.func,

    /**
     * 单元格从行数据中取数据的键值
     *
     * 必须是string/number
     *
     * @type {(string|number)}
     */
    dataKey: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),

    /**
     * 列的头部文本
     *
     * @type {[type]}
     */
    title: PropTypes.string,

    /**
     * 单元格式宽度
     *
     * @type {number}
     */
    width: PropTypes.number.isRequired
};

TableColumn.defaultProps = {
    align: 'left'
};

TableColumn._TABLE_COMPONENT_ = 'COLUMN';

module.exports = TableColumn;
