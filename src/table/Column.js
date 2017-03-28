/**
 * @file TableColumn
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Component} from 'react';
import Tooltip from '../Tooltip';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';

const cx = create('TableColumnHeader');

/**
 * 表格列
 *
 * @extends React.Component
 */
export default class TableColumn extends Component {

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {
        return null;
    }

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
     * @type {string}
     */
    title: PropTypes.string,

    /**
     * 单元格式宽度
     *
     * @type {number}
     */
    width: PropTypes.number.isRequired,

    /**
     * 是否可排序
     *
     * @type {boolean}
     */
    sortable: PropTypes.bool,

    /**
     * 排序顺序
     *
     * @type {string}
     */
    sortBy: PropTypes.oneOf(['asc', 'desc', 'none'])

};

const SORT_ICONS = {
    asc: 'arrow-upward',
    none: 'arrow-upward',
    desc: 'arrow-downward'
};

TableColumn.headerRenderer = function (props) {

    let {columnData, cellData} = props;
    let {
        sortable,
        sortBy = 'none',
        title,
        align,
        onSort
    } = columnData;

    let className = cx()
        .addVariants([`align-${align}`])
        .addStates({[`sort-by-${sortBy}`]: true})
        .build();

    if (sortable) {

        cellData = align === 'right'
            ? (
                <div
                    className={cx.getPartClassName('sorter')}
                    onClick={onSort}>
                    <Icon icon={SORT_ICONS[sortBy]} size="s" />
                    {cellData}
                </div>
            )
            : (
                <div
                    className={cx.getPartClassName('sorter')}
                    onClick={onSort}>
                    {cellData}
                    <Icon icon={SORT_ICONS[sortBy]} size="s" />
                </div>
            );

    }

    if (title) {
        cellData = (
            <Tooltip content={title}>
                {cellData}
            </Tooltip>
        );
    }

    return (
        <div className={className}>
            {cellData}
        </div>
    );

};

TableColumn.defaultProps = {
    align: 'left',
    headerRenderer: TableColumn.headerRenderer
};

TableColumn._TABLE_COMPONENT_ = 'COLUMN';
