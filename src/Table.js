/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes, Children, cloneElement} from 'react';
import Row from './table/Row';
import * as dom from './common/util/dom';
import {create} from 'melon-core/classname/cxBuilder';
import Column from './table/Column';

const cx = create('Table');

/**
 * 表格
 *
 * @extends React.Component
 */
class Table extends Component {

    /**
     * 构造函数
     *
     * @public
     * @param {*} props 属性
     */
    constructor(props) {

        super(props);

        this.state = {};

        this.onWindowResize = this.onWindowResize.bind(this);
    }

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
     * 已完成首次渲染时的处理函数
     *
     * @public
     */
    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
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
     * 即将被销毁时的处理函数
     *
     * @public
     */
    componentWillUnmount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    /**
     * 从属性中解析出列配置
     *
     * @protected
     * @param  {*} props 属性
     * @return {Array.Element}
     */
    getColumns(props) {

        return Children
            .toArray(props.children)
            .reduce(
                (children, child) => {

                    if (child != null) {

                        if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                            throw new Error('Table child must be a TableColumn');
                        }

                        children.push(
                            cloneElement(
                                child,
                                {
                                    rowHasChanged: props.rowHasChanged
                                }
                            )
                        );

                    }

                    return children;
                },
                []
            );

    }

    /**
     * 渲染表格头部
     *
     * @protected
     * @param  {Array.Element} columns 表格列
     * @param  {number} width   表格宽度
     * @return {Element}
     */
    renderHeader(columns, width) {
        return (
            <div className={cx.getPartClassName('header')}>
                {this.renderRow('header', columns, null, -1, width)}
            </div>
        );
    }

    /**
     * 渲染表格 body
     *
     * @protected
     * @param  {Arra.Element} columns 表格列配置
     * @param  {number} width   表格宽度
     * @return {Element}
     */
    renderBody(columns, width) {

        const {dataSource, noDataContent} = this.props;

        const body = dataSource && dataSource.length
            ? dataSource.map(
                (rowData, index) => this.renderRow('body', columns, rowData, index, width)
            )
            : (
                <div
                    className={cx.getPartClassName('body-empty')}
                    style={{width: width - 2}}>
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
     * @param  {number}        tableWidth 表格宽度
     * @return {Element}
     */
    renderRow(part, columns, rowData, index, tableWidth) {

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
                tableWidth={tableWidth}
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
     * 浏览器窗口大小变化处理函数
     *
     * @private
     */
    onWindowResize() {

        const main = this.main;

        if (this.main) {
            this.setState({
                width: main.offsetWidth
            });
        }

    }

    /**
     * 渲染
     *
     * @public
     * @return {Element}
     */
    render() {

        let {width, columns} = this.state;

        if (width) {
            // 计算出tableWidth和所有的columnWidth，将更大的一个传递给row使用
            width = Math.max(
                width,
                columns.reduce(
                    (width, columns) => width + columns.props.width,
                    0
                )
            );
        }
        else {
            width = '';
        }

        return (
            <div
                className={cx(this.props).build()}
                ref={main => {
                    this.main = main;
                }}>
                {this.renderHeader(columns, width)}
                {this.renderBody(columns, width)}
                {this.renderFooter(columns, width)}
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
    rowHasChanged: PropTypes.func.isRequired
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56,
    noDataContent: '没有数据',
    rowHasChanged(r1, r2) {
        return r1 !== r2;
    }
};

Table.Column = Column;

export {
    Table as default,
    Column
};
