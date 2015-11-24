/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const Row = require('./table/Row');
const {PropTypes, Children} = React;
const dom = require('./common/util/dom');
const cx = require('./common/util/cxBuilder').create('Table');

const Table = React.createClass({

    displayName: 'Table',

    getInitialState() {

        return {
            columns: this.getColumns(this.props)
        };

    },

    componentDidMount() {
        this.onWindowResize();
        dom.on(window, 'resize', this.onWindowResize);
    },

    componentWillUnmount() {
        dom.off(window, 'resize', this.onWindowResize);
    },

    componentWillReceiveProps(nextProps) {

        this.setState({
            columns: this.getColumns(nextProps)
        });

    },

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

    },

    renderHeader(columns, width) {
        const {props} = this;
        return (
            <div className={cx().part('header').build()}>
                <Row
                    part='header'
                    height={props.headerRowHeight}
                    columns={columns}
                    tableWidth={width} />
            </div>
        );
    },

    renderBody(columns, width) {

        const {dataSource, noDataContent} = this.props;

        const body = dataSource && dataSource.length
            ? dataSource.map((rowData, index) => {
                return this.renderRow(columns, rowData, index, width);
            })
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

    },

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
    },

    renderFooter(columns) {
        return null;
    },

    onWindowResize() {

        const {main} = this;

        if (this.main) {
            this.setState({
                width: main.offsetWidth
            });
        }

    },

    render() {

        let {width, columns} = this.state;

        if (width) {
            // 计算出tableWidth和所有的columnWidth，将更大的一个传递给row使用
            width = Math.max(
                width,
                columns.reduce((width, columns) => {
                    return width + columns.props.width;
                }, 0)
            );
        }
        else {
            width = '';
        }

        return (
            <div
                className={cx(this.props).build()}
                ref={(main) => {
                    this.main = main;
                }}>
                {this.renderHeader(columns, width)}
                {this.renderBody(columns, width)}
                {this.renderFooter(columns, width)}
            </div>
        );

    }

});

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

Table.Column = require('./table/Column');

module.exports = Table;
