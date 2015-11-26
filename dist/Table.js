define('melon/Table', [
    'require',
    'exports',
    'module',
    'react',
    './table/Row',
    './common/util/dom',
    './common/util/cxBuilder',
    './table/Column'
], function (require, exports, module) {
    var React = require('react');
    var Row = require('./table/Row');
    var PropTypes = React.PropTypes;
    var Children = React.Children;
    var dom = require('./common/util/dom');
    var cx = require('./common/util/cxBuilder').create('Table');
    var Table = React.createClass({
        displayName: 'Table',
        getInitialState: function () {
            return { columns: this.getColumns(this.props) };
        },
        componentDidMount: function () {
            this.onWindowResize();
            dom.on(window, 'resize', this.onWindowResize);
        },
        componentWillUnmount: function () {
            dom.off(window, 'resize', this.onWindowResize);
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState({ columns: this.getColumns(nextProps) });
        },
        getColumns: function (props) {
            return Children.toArray(props.children).reduce(function (children, child) {
                if (child != null) {
                    if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                        throw new Error('Table child must be a TableColumn');
                    }
                    children.push(child);
                }
                return children;
            }, []);
        },
        renderHeader: function (columns, width) {
            var props = this.props;
            return React.createElement('div', { className: cx().part('header').build() }, React.createElement(Row, {
                part: 'header',
                height: props.headerRowHeight,
                columns: columns,
                tableWidth: width
            }));
        },
        renderBody: function (columns, width) {
            var _this = this;
            var _props = this.props;
            var dataSource = _props.dataSource;
            var noDataContent = _props.noDataContent;
            var body = dataSource && dataSource.length ? dataSource.map(function (rowData, index) {
                return _this.renderRow(columns, rowData, index, width);
            }) : React.createElement('div', {
                className: cx().part('body-empty').build(),
                style: { width: width - 2 }
            }, noDataContent);
            return React.createElement('div', { className: cx().part('body').build() }, body);
        },
        renderRow: function (columns, rowData, index, tableWidth) {
            var _props2 = this.props;
            var rowHeight = _props2.rowHeight;
            var highlight = _props2.highlight;
            return React.createElement(Row, {
                height: rowHeight,
                highlight: highlight,
                key: index,
                rowIndex: index,
                part: 'body',
                columns: columns,
                data: rowData,
                tableWidth: tableWidth
            });
        },
        renderFooter: function (columns) {
            return null;
        },
        onWindowResize: function () {
            var main = this.main;
            if (this.main) {
                this.setState({ width: main.offsetWidth });
            }
        },
        render: function () {
            var _this2 = this;
            var _state = this.state;
            var width = _state.width;
            var columns = _state.columns;
            if (width) {
                width = Math.max(width, columns.reduce(function (width, columns) {
                    return width + columns.props.width;
                }, 0));
            } else {
                width = '';
            }
            return React.createElement('div', {
                className: cx(this.props).build(),
                ref: function (main) {
                    _this2.main = main;
                }
            }, this.renderHeader(columns, width), this.renderBody(columns, width), this.renderFooter(columns, width));
        }
    });
    Table.propTypes = {
        rowHeight: PropTypes.number.isRequired,
        highlight: PropTypes.bool,
        headerRowHeight: PropTypes.number,
        dataSource: PropTypes.array.isRequired,
        noDataContent: PropTypes.node
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56,
        noDataContent: '\u6CA1\u6709\u6570\u636E'
    };
    Table.Column = require('./table/Column');
    module.exports = Table;
});