(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Icon', './Column', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Icon'), require('./Column'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Icon, global.Column, global.babelHelpers);
        global.SelectorColumn = mod.exports;
    }
})(this, function (exports, _react, _Icon, _Column, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Column2 = babelHelpers.interopRequireDefault(_Column);

    var TableSelectorColumn = function (_Component) {
        babelHelpers.inherits(TableSelectorColumn, _Component);

        function TableSelectorColumn() {
            babelHelpers.classCallCheck(this, TableSelectorColumn);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableSelectorColumn.prototype.render = function render() {
            return null;
        };

        return TableSelectorColumn;
    }(_react.Component);

    exports['default'] = TableSelectorColumn;


    TableSelectorColumn.displayName = 'TableSelectorColumn';

    TableSelectorColumn.icons = {
        radio: {
            checked: 'radio-button-checked',
            unchecked: 'radio-button-unchecked'
        },
        checkbox: {
            checked: 'check-box',
            unchecked: 'check-box-outline-blank'
        }
    };

    TableSelectorColumn.getIcon = function (multiple, selected) {
        var icons = TableSelectorColumn.icons[multiple ? 'checkbox' : 'radio'];
        return icons[selected ? 'checked' : 'unchecked'];
    };

    TableSelectorColumn.cellRenderer = function (props) {
        var part = props.part,
            columnData = props.columnData,
            rowIndex = props.rowIndex;

        var multiple = columnData.multiple;

        if (!multiple && part !== 'body') {
            return null;
        }

        var isSelected = part === 'body' ? columnData.isSelected(rowIndex) : columnData.isAllSelected();

        return _react2['default'].createElement(_Icon2['default'], {
            onClick: TableSelectorColumn.onCellClick.bind(null, props),
            icon: TableSelectorColumn.getIcon(multiple, isSelected),
            states: { selected: isSelected },
            variants: ['table-selector'] });
    };

    TableSelectorColumn.onCellClick = function (props) {
        var part = props.part,
            rowIndex = props.rowIndex,
            columnData = props.columnData;

        var handler = columnData[part === 'body' ? 'onSelect' : 'onSelectAll'];

        if (typeof handler === 'function') {
            handler(rowIndex);
        }
    };

    TableSelectorColumn.propTypes = babelHelpers['extends']({}, _Column2['default'].propTypes, {

        isSelected: _react.PropTypes.func.isRequired,
        isAllSelected: _react.PropTypes.func.isRequired,
        onSelect: _react.PropTypes.func,
        onSelectAll: _react.PropTypes.func,
        name: _react.PropTypes.string

    });

    /**
     * 最关键的东西在这里
     */
    TableSelectorColumn.defaultProps = babelHelpers['extends']({}, _Column2['default'].defaultProps, {
        width: 66,
        grow: 0,
        shrink: 0,
        cellRenderer: TableSelectorColumn.cellRenderer,
        headerRenderer: TableSelectorColumn.headerRenderer,
        footerRenderer: TableSelectorColumn.footerRenderer,
        align: 'center',
        dataKey: '',
        multiple: false
    });

    TableSelectorColumn._TABLE_COMPONENT_ = 'COLUMN';
});
//# sourceMappingURL=SelectorColumn.js.map
