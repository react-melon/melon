/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import Row from './table/Row';
import {create} from 'melon-core/classname/cxBuilder';
import Column from './table/Column';
import Sticky from 'react-sticky-state';

const SCROLL_CLASS = {
    down: 'sticky-scroll-down',
    up: 'sticky-scroll-up'
};

const cx = create('Table');

/**
 * 表格
 *
 * @extends React.Component
 */
class Table extends Component {

    /**
     * 即将挂载到 DOM 时处理函数
     *
     * @public
     */
    componentWillMount() {
        this.setState({
            columns: this.getColumns(this.props)
        });
    }

    /**
     * 接受新属性时的处理函数
     *
     * @public
     * @param  {*} nextProps 下一个属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: this.getColumns(nextProps)
        });
    }

    /**
     * 从属性中解析出列配置
     *
     * @protected
     * @param  {*} props 属性
     * @return {Array.Element}
     */
    getColumns(props) {

        let {children, rowHasChanged} = props;

        return Children
            .toArray(children)
            .filter(child => child.type._TABLE_COMPONENT_ === 'COLUMN')
            .map((column, i) => cloneElement(column, {rowHasChanged}));

    }

    /**
     * 渲染表格头部
     *
     * @protected
     * @param  {Array.Element} columns 表格列
     * @param  {boolean}       sticky  是否为 sticky
     * @return {Element}
     */
    renderHeader(columns, sticky) {

        let header = (
            <div className={cx.getPartClassName('header')}>
                {this.renderRow('header', columns, null, -1)}
            </div>
        );

        if (sticky) {
            header = (
                <Sticky scrollClass={SCROLL_CLASS}>
                    {header}
                </Sticky>
            );
        }

        return header;

    }

    /**
     * 渲染表格 body
     *
     * @protected
     * @param  {Arra.Element} columns 表格列配置
     * @return {Element}
     */
    renderBody(columns) {

        const {dataSource, noDataContent} = this.props;

        const body = dataSource && dataSource.length
            ? dataSource.map(
                (rowData, index) => this.renderRow('body', columns, rowData, index)
            )
            : (
                <div className={cx.getPartClassName('body-empty')}>
                    {noDataContent}
                </div>
            );

        return (
            <div className={cx.getPartClassName('body')}>
                {body}
            </div>
        );

    }

    /**
     * 渲染一行
     *
     * @protected
     * @param  {string}        part       位置
     * @param  {Array.Element} columns    列配置
     * @param  {*}             rowData    行数据
     * @param  {number}        index      行号
     * @return {Element}
     */
    renderRow(part, columns, rowData, index) {

        const {
            rowHeight,
            headerRowHeight,
            highlight,
            rowHasChanged
        } = this.props;

        const height = part === 'body' ? rowHeight : headerRowHeight;

        return (
            <Row
                height={height}
                highlight={highlight}
                key={index}
                rowIndex={index}
                part={part}
                columns={columns}
                data={rowData}
                rowHasChanged={rowHasChanged} />
        );
    }

    /**
     * 渲染 footer
     *
     * @public
     * @param  {Array.Element} columns 列
     * @return {Element}
     */
    renderFooter(columns) {
        return null;
    }

    /**
     * 渲染
     *
     * @public
     * @return {Element}
     */
    render() {

        let {headerSticky, style} = this.props;
        let columns = this.state.columns;

        return (
            <div
                className={cx(this.props).build()}
                style={style}
                ref={main => {
                    this.main = main;
                }}>
                {this.renderHeader(columns, headerSticky)}
                {this.renderBody(columns)}
                {this.renderFooter(columns)}
            </div>
        );

    }

}

Table.displayName = 'Table';

Table.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    headerRowHeight: PropTypes.number,
    dataSource: PropTypes.array.isRequired,
    noDataContent: PropTypes.node,
    rowHasChanged: PropTypes.func.isRequired,
    headerSticky: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56,
    noDataContent: '没有数据',
    headerSticky: true,
    rowHasChanged(r1, r2) {
        return r1 !== r2;
    }
};

Table.Column = Column;

export default Table;

export {
    Column
};
