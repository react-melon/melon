/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes, Children} from 'react';
import Row from './table/Row';
import * as dom from './common/util/dom';
import {create} from 'melon-core/classname/cxBuilder';
import Column from './table/Column';

const cx = create('Table');

/**
 * melon/Table
 *
 * @extends {React.Component}
 * @class
 */
export default class Table extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     */
    constructor(props) {

        super(props);

        /**
         * 状态
         *
         * @type {Object}
         */
        this.state = {
            columns: this.getColumns(this.props)
        };

        this.onWindowResize = this.onWindowResize.bind(this);
    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {
        this.onWindowResize();
        dom.on(window, 'resize', this.onWindowResize);
    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: this.getColumns(nextProps)
        });
    }

    /**
     * unmount时的处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {
        dom.off(window, 'resize', this.onWindowResize);
    }

    /**
     * 过滤所有子元素，必须为TableColumn类型
     *
     * @protected
     * @param  {Object} props 组建属性
     * @return {Array<ReactElement>}
     * @throws {Error} 有子元素不是TableColumn时报错
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

                        children.push(child);

                    }

                    return children;
                },
                []
            );

    }

    /**
     * 渲染表头
     *
     * @protected
     * @param  {Array<ReactElement>} columns 所有列
     * @param  {number} width   宽度
     * @return {ReactElement}
     */
    renderHeader(columns, width) {
        const props = this.props;
        return (
            <div className={cx.getPartClassName('header')}>
                <Row
                    part='header'
                    height={props.headerRowHeight}
                    columns={columns}
                    tableWidth={width} />
            </div>
        );
    }

    /**
     * 渲染表格
     *
     * @protected
     * @param  {Array<ReactElement>} columns 所有列
     * @param  {number} width   宽度
     * @return {ReactElement}
     */
    renderBody(columns, width) {

        const {dataSource, noDataContent} = this.props;

        const body = dataSource && dataSource.length
            ? dataSource.map(
                (rowData, index) => this.renderRow(columns, rowData, index, width)
            )
            : (
                <div
                    className={cx().part('body-empty').build()}
                    style={{width: width - 2}}>
                    {noDataContent}
                </div>
            );

        return (
            <div className={cx().part('body').build()}>
                {body}
            </div>
        );

    }

    /**
     * 渲染表格
     *
     * @protected
     * @param  {Array<ReactElement>} columns 所有列
     * @param  {Object} rowData 表格数据
     * @param  {number} index 行号
     * @param  {number} tableWidth 表格宽度
     * @return {ReactElement}
     */
    renderRow(columns, rowData, index, tableWidth) {
        const {rowHeight, highlight} = this.props;
        return (
            <Row
                height={rowHeight}
                highlight={highlight}
                key={index}
                rowIndex={index}
                part='body'
                columns={columns}
                data={rowData}
                tableWidth={tableWidth} />
        );
    }

    /**
     * 渲染表尾
     *
     * @protected
     * @param  {Array<ReactElement>} columns 所有列
     * @return {ReactElement}
     * @todo
     */
    renderFooter(columns) {
        return null;
    }

    /**
     * 窗口大小改变时执行
     *
     * @protected
     */
    onWindowResize() {

        const main = this.main;

        if (main) {
            this.setState({
                width: main.offsetWidth
            });
        }
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
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
    noDataContent: PropTypes.node
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56,
    noDataContent: '没有数据'
};

Table.Column = Column;
