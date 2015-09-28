define('melon/Table', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'underscore',
    'react',
    './table/Row',
    './table/SelectorColumn',
    './table/Column'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var u = require('underscore');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var ReactChildren = React.Children;
    var Row = require('./table/Row');
    var SelectorColumn = require('./table/SelectorColumn');
    function getNextSelectedRowData(dataSource, current, action, rowIndex) {
        var selectedCount = current.length;
        switch (action) {
        case 'select':
            return current.concat(rowIndex).sort();
        case 'unselect':
            return u.reject(current, function (row) {
                return row === rowIndex;
            });
        case 'selectAll':
            return u.range(0, dataSource.length);
        case 'unselectAll':
            return [];
        }
    }
    var Table = function (_React$Component) {
        babelHelpers.inherits(Table, _React$Component);
        function Table(props) {
            babelHelpers.classCallCheck(this, Table);
            babelHelpers.get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);
            this.isRowSelected = this.isRowSelected.bind(this);
            this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onSelectAll = this.onSelectAll.bind(this);
            this.state = babelHelpers._extends({ selected: [] }, this.getState(this.props));
        }
        babelHelpers.createClass(Table, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    return babelHelpers._extends({ selected: this.state.selected }, this.getState(nextProps));
                }
            },
            {
                key: 'getState',
                value: function getState(props) {
                    var children = [];
                    if (props.selectable) {
                        var selector = React.createElement(SelectorColumn, {
                            title: '',
                            isSelected: this.isRowSelected,
                            isAllSelected: this.isAllRowsSelected,
                            onSelect: this.onSelect,
                            onSelectAll: this.onSelectAll
                        });
                        children.unshift(selector);
                    }
                    return {
                        columns: ReactChildren.toArray(props.children).reduce(function (children, child) {
                            if (child != null) {
                                if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                                    throw new Error('Table child must be a TableColumn');
                                }
                                children.push(child);
                            }
                            return children;
                        }, children)
                    };
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
                    var me = this;
                    return React.createElement('div', { className: 'ui-table-body' }, this.props.dataSource.map(function (rowData, index) {
                        return me.renderRow(columns, rowData, index);
                    }));
                }
            },
            {
                key: 'renderRow',
                value: function renderRow(columns, rowData, index) {
                    var props = this.props;
                    return React.createElement(Row, {
                        height: props.rowHeight,
                        highlight: props.highlight,
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
                    var nextSelected = getNextSelectedRowData(this.props.dataSource, this.state.selected, action, rowIndex);
                    this.setState({ selected: nextSelected }, function () {
                        var handler = this.props.onSelect;
                        if (handler) {
                            handler(this.state.selected);
                        }
                    });
                }
            },
            {
                key: 'isRowSelected',
                value: function isRowSelected(rowIndex) {
                    return u.contains(this.state.selected, rowIndex);
                }
            },
            {
                key: 'isAllRowsSelected',
                value: function isAllRowsSelected() {
                    return this.state.selected.length === this.props.dataSource.length;
                }
            }
        ]);
        return Table;
    }(React.Component);
    Table.propTypes = {
        rowHeight: PropTypes.number.isRequired,
        highlight: PropTypes.bool,
        headerRowHeight: PropTypes.number,
        selectable: PropTypes.bool,
        onSelect: PropTypes.func,
        dataSource: PropTypes.array.isRequired
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56,
        selectable: false,
        columns: []
    };
    Table.Column = require('./table/Column');
    module.exports = Table;
});