/**
 * @file melon/Table
 * @author leon(ludafa@outlook.com)
 */

let u = require('underscore');
let React = require('react');
let Component = require('./Component');

let Row = require('./table/Row');

let {PropTypes, Children} = React;

class Table extends Component {

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

        var columns = this.state.columns;

        return (
            <div className="ui-table">
                {this.renderHeader(columns)}
                {this.renderBody(columns)}
                {this.renderFooter(columns)}
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

    renderBody(columns) {

        let {dataSource} = this.props;

        let body = dataSource && dataSource.length
            ? dataSource.map((rowData, index) => {
                return this.renderRow(columns, rowData, index);
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

    renderRow(columns, rowData, index) {
        let {rowHeight, highlight} = this.props;
        return (
            <Row
                height={rowHeight}
                highlight={highlight}
                key={index}
                rowIndex={index}
                part='body'
                columns={columns}
                data={rowData} />
        );
    }

    renderFooter(columns) {
        return null;
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
