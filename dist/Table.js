define('melon/Table', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'underscore',
    'react',
    './Component',
    './table/Row',
    './table/SelectorColumn',
    './table/Column'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var React = require('react');
    var Component = require('./Component');
    var Row = require('./table/Row');
    var SelectorColumn = require('./table/SelectorColumn');
    var PropTypes = React.PropTypes;
    var Children = React.Children;
    function getNextSelectedRowData(dataSource, current, action, rowIndex) {
        if (action === 'selectAll') {
            return u.range(0, dataSource.length);
        }
        if (action === 'unselectAll') {
            return [];
        }
        var selected = action === 'select' ? current.concat(rowIndex).sort() : u.reject(current, function (row) {
            return row === rowIndex;
        });
        return selected;
    }
    var Table = function (_Component) {
        babelHelpers.inherits(Table, _Component);
        function Table(props) {
            babelHelpers.classCallCheck(this, Table);
            babelHelpers.get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);
            this.isRowSelected = this.isRowSelected.bind(this);
            this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onSelectAll = this.onSelectAll.bind(this);
            this.state = {
                selected: props.selected,
                columns: this.getColumns(props)
            };
        }
        babelHelpers.createClass(Table, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        selected: nextProps.selected,
                        columns: this.getColumns(nextProps)
                    });
                }
            },
            {
                key: 'getColumns',
                value: function getColumns(props) {
                    var children = [];
                    if (props.selectable) {
                        var selector = React.createElement(SelectorColumn, {
                            title: '',
                            isSelected: this.isRowSelected,
                            isAllSelected: this.isAllRowsSelected,
                            onSelect: this.onSelect,
                            onSelectAll: this.onSelectAll
                        });
                        children = [selector].concat(babelHelpers.toConsumableArray(children));
                    }
                    return Children.toArray(props.children).reduce(function (children, child) {
                        if (child != null) {
                            if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                                throw new Error('Table child must be a TableColumn');
                            }
                            children.push(child);
                        }
                        return children;
                    }, children);
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
                        selected: { selected: this.isAllRowsSelected() },
                        height: props.headerRowHeight,
                        columns: columns
                    }));
                }
            },
            {
                key: 'renderBody',
                value: function renderBody(columns) {
                    var _this = this;
                    return React.createElement('div', { className: 'ui-table-body' }, this.props.dataSource.map(function (rowData, index) {
                        return _this.renderRow(columns, rowData, index);
                    }));
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
            },
            {
                key: 'onSelect',
                value: function onSelect(e, rowIndex) {
                    this.onRowSelectorClick(this.isRowSelected(rowIndex) ? 'unselect' : 'select', rowIndex);
                }
            },
            {
                key: 'onSelectAll',
                value: function onSelectAll(e) {
                    this.onRowSelectorClick(this.isAllRowsSelected() ? 'unselectAll' : 'selectAll');
                }
            },
            {
                key: 'onRowSelectorClick',
                value: function onRowSelectorClick(action, rowIndex) {
                    var _props2 = this.props;
                    var onSelect = _props2.onSelect;
                    var selected = _props2.selected;
                    var dataSource = _props2.dataSource;
                    selected = getNextSelectedRowData(dataSource, selected, action, rowIndex);
                    if (onSelect) {
                        onSelect({
                            target: this,
                            selected: selected
                        });
                        return;
                    }
                    this.setState({ selected: selected });
                }
            },
            {
                key: 'isRowSelected',
                value: function isRowSelected(rowIndex) {
                    return this.state.selected.indexOf(rowIndex) !== -1;
                }
            },
            {
                key: 'isAllRowsSelected',
                value: function isAllRowsSelected() {
                    var selected = this.state.selected;
                    return selected.length === this.props.dataSource.length;
                }
            }
        ]);
        return Table;
    }(Component);
    Table.propTypes = {
        rowHeight: PropTypes.number.isRequired,
        highlight: PropTypes.bool,
        headerRowHeight: PropTypes.number,
        selectable: PropTypes.bool.isRequired,
        onSelect: PropTypes.func,
        selected: PropTypes.arrayOf(PropTypes.number).isRequired,
        dataSource: PropTypes.array.isRequired
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56,
        selectable: false,
        selected: [],
        columns: []
    };
    Table.Column = require('./table/Column');
    module.exports = Table;
});