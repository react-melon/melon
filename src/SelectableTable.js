/**
 * @file SelectableTable
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import Table from './Table';
import SelectorColumn from './table/SelectorColumn';

function getNextSelectedRowData(multiple, dataSource, current, action, rowIndex) {

    if (!multiple) {
        return [rowIndex];
    }

    if (action === 'selectAll') {
        return dataSource.map((_, index) => index);
    }

    if (action === 'unselectAll') {
        return [];
    }

    let selected = action === 'select'
        ? current.concat(rowIndex).sort()
        : current.filter(function (row) {
            return row !== rowIndex;
        });

    return selected;

}


/**
 * melon/SelectableTable
 *
 * @extends {React.Component}
 * @class
 */
export default class SelectableTable extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     */
    constructor(props) {

        super(props);

        this.getSelected = this.getSelected.bind(this);
        this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
        this.isRowSelected = this.isRowSelected.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            selected: this.props.selected
        };

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} props 新属性
     */
    componentWillReceiveProps(props) {

        if (!this.props.onSelect) {
            this.setState({
                selected: props.selected
            });
        }

    }

    /**
     * 行选中时的处理
     *
     * @protected
     * @param  {number} rowIndex 行号
     */
    onSelect(rowIndex) {
        this.onRowSelectorClick(
            this.isRowSelected(rowIndex) ? 'unselect' : 'select',
            rowIndex
        );
    }

    /**
     * 点击全选时的处理
     *
     * @protected
     */
    onSelectAll() {
        this.onRowSelectorClick(
            this.isAllRowsSelected() ? 'unselectAll' : 'selectAll'
        );
    }

    /**
     * 点击某一行时的处理
     *
     * @protected
     * @param  {string} action   指令：select(选择某一行), selectAll(全选)，unselectAll(全部取消)
     * @param  {number} rowIndex 行号
     */
    onRowSelectorClick(action, rowIndex) {

        const {
            onSelect,
            dataSource,
            multiple
        } = this.props;

        let selected = this.getSelected();

        selected = getNextSelectedRowData(
            multiple,
            dataSource,
            selected,
            action,
            rowIndex
        );

        if (onSelect) {
            onSelect({
                selected,
                target: this
            });
            return;
        }

        this.setState({
            selected
        });

    }

    /**
     * 获取当前选中的行号
     *
     * @public
     * @return {Array<number>}
     */
    getSelected() {
        const {state, props} = this;
        const onSelect = props.onSelect;
        const selected = onSelect ? props.selected : state.selected;
        return selected;
    }

    /**
     * 某行是否选中
     *
     * @public
     * @param {number} rowIndex 行号
     * @return {boolean}
     */
    isRowSelected(rowIndex) {
        const selected = this.getSelected();
        return selected.indexOf(rowIndex) !== -1;
    }

    /**
     * 是否全部选中
     *
     * @public
     * @return {boolean}
     */
    isAllRowsSelected() {
        const selected = this.getSelected();
        return selected.length === this.props.dataSource.length;
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {children, multiple, ...rest} = this.props;

        return (
            <Table {...rest}>
                <SelectorColumn
                    isSelected={this.isRowSelected}
                    isAllSelected={this.isAllRowsSelected}
                    multiple={multiple}
                    onSelect={this.onSelect}
                    onSelectAll={this.onSelectAll} />
                {children}
            </Table>
        );

    }

}

SelectableTable.displayName = 'SelectableTable';

SelectableTable.propTypes = {
    ...Table.propTypes,
    multiple: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired
};

SelectableTable.defaultProps = {
    ...Table.defaultProps,
    multiple: true,
    selected: []
};
