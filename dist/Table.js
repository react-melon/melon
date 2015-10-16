define('melon/Table', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'underscore',
    'react',
    './Component',
    './table/Row',
    './table/Column'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var React = require('react');
    var Component = require('./Component');
    var Row = require('./table/Row');
    var PropTypes = React.PropTypes;
    var Children = React.Children;
    var Table = function (_Component) {
        babelHelpers.inherits(Table, _Component);
        function Table(props) {
            babelHelpers.classCallCheck(this, Table);
            babelHelpers.get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);
            this.state = { columns: this.getColumns(props) };
        }
        babelHelpers.createClass(Table, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ columns: this.getColumns(nextProps) });
                }
            },
            {
                key: 'getColumns',
                value: function getColumns(props) {
                    return Children.toArray(props.children).reduce(function (children, child) {
                        if (child != null) {
                            if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                                throw new Error('Table child must be a TableColumn');
                            }
                            children.push(child);
                        }
                        return children;
                    }, []);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var columns = this.state.columns;
                    return React.createElement('div', { className: 'ui-table' }, this.renderHeader(columns), this.renderBody(columns), this.renderFooter(columns));
                }
            },
            {
                key: 'renderHeader',
                value: function renderHeader(columns) {
                    var props = this.props;
                    return React.createElement('div', { className: 'ui-table-header' }, React.createElement(Row, {
                        part: 'header',
                        height: props.headerRowHeight,
                        columns: columns
                    }));
                }
            },
            {
                key: 'renderBody',
                value: function renderBody(columns) {
                    var _this = this;
                    var dataSource = this.props.dataSource;
                    var body = dataSource && dataSource.length ? dataSource.map(function (rowData, index) {
                        return _this.renderRow(columns, rowData, index);
                    }) : React.createElement('div', { className: this.getPartClassName('body-empty') }, '\u6CA1\u6709\u6570\u636E');
                    return React.createElement('div', { className: this.getPartClassName('body') }, body);
                }
            },
            {
                key: 'renderRow',
                value: function renderRow(columns, rowData, index) {
                    var _props = this.props;
                    var rowHeight = _props.rowHeight;
                    var highlight = _props.highlight;
                    return React.createElement(Row, {
                        height: rowHeight,
                        highlight: highlight,
                        key: index,
                        rowIndex: index,
                        part: 'body',
                        columns: columns,
                        data: rowData
                    });
                }
            },
            {
                key: 'renderFooter',
                value: function renderFooter(columns) {
                    return null;
                }
            }
        ]);
        return Table;
    }(Component);
    Table.propTypes = {
        rowHeight: PropTypes.number.isRequired,
        highlight: PropTypes.bool,
        headerRowHeight: PropTypes.number,
        dataSource: PropTypes.array.isRequired
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56
    };
    Table.Column = require('./table/Column');
    module.exports = Table;
});