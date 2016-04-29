/**
 * @file TableColumn
 * @author leon(ludafa@outlook.com)
 */

import {PropTypes} from 'react';

export default function TableColumn(props) {
    return null;
}

TableColumn.displayName = 'TableColumn';

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

    headerRenderer: PropTypes.func,

    bodyRenderer: PropTypes.func,

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
