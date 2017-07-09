/**
 * @file TableColumn
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';
import TableCellTextEditor from './TextEditor';

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
     * 列宽度增长度
     * @type {number}
     */
    grow: PropTypes.number.isRequired,

    /**
     * 列宽度收缩度
     * @type {number}
     */
    shrink: PropTypes.number.isRequired,

    /**
     * 最大宽度
     *
     * @type {number}
     */
    maxWidth: PropTypes.number,

    /**
     * 最小宽度
     *
     * @type {number}
     */
    minWidth: PropTypes.number,

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
    sortBy: PropTypes.oneOf(['asc', 'desc', 'none']),

    /**
     * 是否可编辑
     *
     * @type {boolean}
     */
    editable: PropTypes.bool,

    /**
    * 编辑器选项
    *
    * @type {Object}
    */
    editorMode: PropTypes.oneOf(['inline', 'confirm']),

    /**
     * 编辑器标题
     *
     * @type {string}
     */
    editorTitle: PropTypes.string,

    /**
     * placeholder
     *
     * @type {string}
     */
    placeholder: PropTypes.string,

    /**
     * 文本编辑回调
     *
     * @type {Function}
     * @param {string} propName 属性名
     * @param {Object} props    属性
     * @return {Error?}
     */
    onChange(propName, props) {
        if (props.editable && props.onChange == null) {
            return new Error('You muse set `onChange` handler while column is `editable`');
        }
    }

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

TableColumn.bodyRenderer = function (props) {

    let {columnData, rowData, cellData, columnIndex, rowIndex} = props;

    let {
        editable,
        editorMode,
        onChange,
        placeholder = '',
        dataKey,
        editorTitle
    } = columnData;

    let content = cellData == null ? placeholder : (cellData + '');

    return editable
        ? (
            <TableCellTextEditor
                mode={editorMode}
                title={editorTitle}
                onChange={onChange}
                dataKey={dataKey}
                columnData={columnData}
                rowData={rowData}
                rowIndex={rowIndex}
                columnIndex={columnIndex}>
                {content}
            </TableCellTextEditor>
        )
        : cellData;
};

TableColumn.defaultProps = {
    align: 'left',
    headerRenderer: TableColumn.headerRenderer,
    bodyRenderer: TableColumn.bodyRenderer,
    grow: 1,
    shrink: 1
};

TableColumn._TABLE_COMPONENT_ = 'COLUMN';
