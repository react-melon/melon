/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let WindowResizeAware = require('./dialog/WindowResizeAware');

let Row = require('./table/Row');

let {PropTypes, Children} = React;

class Table extends WindowResizeAware {

    constructor(props) {

        super(props);

        this.state = {
            columns: this.getColumns(props)
        };

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            columns: this.getColumns(nextProps)
        });

    }

    componentDidMount() {
        super.componentDidMount();
        this.onWindowResize();
    }

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
            <div className="ui-table" ref="main">
                {this.renderHeader(columns, width)}
                {this.renderBody(columns, width)}
                {this.renderFooter(columns, width)}
            </div>
        );

    }

    renderHeader(columns) {
        var props = this.props;
        return (
            <div className="ui-table-header">
                <Row
                    part='header'
                    height={props.headerRowHeight}
                    columns={columns} />
            </div>
        );
    }

    renderBody(columns, width) {

        let {dataSource} = this.props;

        let body = dataSource && dataSource.length
            ? dataSource.map((rowData, index) => {
                return this.renderRow(columns, rowData, index, width);
            })
            : (
                <div className={this.getPartClassName('body-empty')}>
                    没有数据
                </div>
            );

        return (
            <div className={this.getPartClassName('body')}>{body}</div>
        );

    }

    renderRow(columns, rowData, index, tableWidth) {
        let {rowHeight, highlight} = this.props;
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

    renderFooter(columns) {
        return null;
    }

    onWindowResize() {
        this.setState({
            width: this.refs.main.offsetWidth
        });
    }

}

Table.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    highlight: PropTypes.bool,
    headerRowHeight: PropTypes.number,
    dataSource: PropTypes.array.isRequired
},

Table.defaultProps = {
    highlight: true,
    rowHeight: 48,
    headerRowHeight: 56
};

Table.Column = require('./table/Column');

module.exports = Table;
