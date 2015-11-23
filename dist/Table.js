define('melon/Table', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './dialog/WindowResizeAware',
    './table/Row',
    './table/Column'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var WindowResizeAware = require('./dialog/WindowResizeAware');
    var Row = require('./table/Row');
    var PropTypes = React.PropTypes;
    var Children = React.Children;
    var Table = function (_WindowResizeAware) {
        babelHelpers.inherits(Table, _WindowResizeAware);
        babelHelpers.createClass(Table, null, [{
                key: 'displayName',
                value: 'Table',
                enumerable: true
            }]);
        function Table(props) {
            babelHelpers.classCallCheck(this, Table);
            _WindowResizeAware.call(this, props);
            this.state = { columns: this.getColumns(props) };
        }
        Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.setState({ columns: this.getColumns(nextProps) });
        };
        Table.prototype.componentDidMount = function componentDidMount() {
            _WindowResizeAware.prototype.componentDidMount.call(this);
            this.onWindowResize();
        };
        Table.prototype.getColumns = function getColumns(props) {
            return Children.toArray(props.children).reduce(function (children, child) {
                if (child != null) {
                    if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                        throw new Error('Table child must be a TableColumn');
                    }
                    children.push(child);
                }
                return children;
            }, []);
        };
        Table.prototype.render = function render() {
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
                className: 'ui-table',
                ref: 'main'
            }, this.renderHeader(columns, width), this.renderBody(columns, width), this.renderFooter(columns, width));
        };
        Table.prototype.renderHeader = function renderHeader(columns, width) {
            var props = this.props;
            return React.createElement('div', { className: 'ui-table-header' }, React.createElement(Row, {
                part: 'header',
                height: props.headerRowHeight,
                columns: columns,
                tableWidth: width
            }));
        };
        Table.prototype.renderBody = function renderBody(columns, width) {
            var _this = this;
            var _props = this.props;
            var dataSource = _props.dataSource;
            var noDataContent = _props.noDataContent;
            var body = dataSource && dataSource.length ? dataSource.map(function (rowData, index) {
                return _this.renderRow(columns, rowData, index, width);
            }) : React.createElement('div', {
                className: this.getPartClassName('body-empty'),
                style: { width: width - 2 }
            }, noDataContent);
            return React.createElement('div', { className: this.getPartClassName('body') }, body);
        };
        Table.prototype.renderRow = function renderRow(columns, rowData, index, tableWidth) {
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
        };
        Table.prototype.renderFooter = function renderFooter(columns) {
            return null;
        };
        Table.prototype.onWindowResize = function onWindowResize() {
            this.setState({ width: this.refs.main.offsetWidth });
        };
        return Table;
    }(WindowResizeAware);
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