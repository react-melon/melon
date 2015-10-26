define('melon/SelectableTable', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './Table',
    './table/SelectorColumn'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Table = require('./Table');
    var SelectorColumn = require('./table/SelectorColumn');
    function getNextSelectedRowData(multiple, dataSource, current, action, rowIndex) {
        if (!multiple) {
            return [rowIndex];
        }
        if (action === 'selectAll') {
            return dataSource.map(function (_, index) {
                return index;
            });
        }
        if (action === 'unselectAll') {
            return [];
        }
        var selected = action === 'select' ? current.concat(rowIndex).sort() : current.filter(function (row) {
            return row !== rowIndex;
        });
        return selected;
    }
    var SelectableTable = function (_Component) {
        babelHelpers.inherits(SelectableTable, _Component);
        babelHelpers.createClass(SelectableTable, null, [{
                key: 'displayName',
                value: 'SelectableTable',
                enumerable: true
            }]);
        function SelectableTable(props) {
            babelHelpers.classCallCheck(this, SelectableTable);
            babelHelpers.get(Object.getPrototypeOf(SelectableTable.prototype), 'constructor', this).call(this, props);
            this.isRowSelected = this.isRowSelected.bind(this);
            this.isAllRowsSelected = this.isAllRowsSelected.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onSelectAll = this.onSelectAll.bind(this);
            this.state = { selected: props.selected };
        }
        babelHelpers.createClass(SelectableTable, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(props) {
                    if (!this.props.onSelect) {
                        this.setState({ selected: props.selected });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var children = _props.children;
                    var multiple = _props.multiple;
                    var rest = babelHelpers.objectWithoutProperties(_props, [
                        'children',
                        'multiple'
                    ]);
                    return React.createElement(Table, rest, React.createElement(SelectorColumn, {
                        isSelected: this.isRowSelected,
                        isAllSelected: this.isAllRowsSelected,
                        multiple: multiple,
                        onSelect: this.onSelect,
                        onSelectAll: this.onSelectAll
                    }), children);
                }
            },
            {
                key: 'onSelect',
                value: function onSelect(rowIndex) {
                    this.onRowSelectorClick(this.isRowSelected(rowIndex) ? 'unselect' : 'select', rowIndex);
                }
            },
            {
                key: 'onSelectAll',
                value: function onSelectAll() {
                    this.onRowSelectorClick(this.isAllRowsSelected() ? 'unselectAll' : 'selectAll');
                }
            },
            {
                key: 'onRowSelectorClick',
                value: function onRowSelectorClick(action, rowIndex) {
                    var _props2 = this.props;
                    var onSelect = _props2.onSelect;
                    var dataSource = _props2.dataSource;
                    var multiple = _props2.multiple;
                    var selected = this.getSelected();
                    selected = getNextSelectedRowData(multiple, dataSource, selected, action, rowIndex);
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
                key: 'getSelected',
                value: function getSelected() {
                    var state = this.state;
                    var props = this.props;
                    var onSelect = props.onSelect;
                    var _ref = onSelect ? props : state;
                    var selected = _ref.selected;
                    return selected;
                }
            },
            {
                key: 'isRowSelected',
                value: function isRowSelected(rowIndex) {
                    var selected = this.getSelected();
                    return selected.indexOf(rowIndex) !== -1;
                }
            },
            {
                key: 'isAllRowsSelected',
                value: function isAllRowsSelected() {
                    var selected = this.getSelected();
                    return selected.length === this.props.dataSource.length;
                }
            }
        ]);
        return SelectableTable;
    }(Component);
    var PropTypes = React.PropTypes;
    SelectableTable.propTypes = babelHelpers._extends({}, Component.propTypes, Table.propTypes, {
        multiple: PropTypes.bool.isRequired,
        onSelect: PropTypes.func,
        selected: PropTypes.arrayOf(PropTypes.number).isRequired
    });
    SelectableTable.defaultProps = babelHelpers._extends({}, Component.defaultProps, Table.defaultProps, {
        multiple: true,
        selected: []
    });
    module.exports = SelectableTable;
});