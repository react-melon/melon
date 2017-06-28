(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.shallowEqual, global.babelHelpers);
        global.Cell = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file melon/TableCell
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TableCell');

    var JUSTIFY_CONTENT_MAP = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end'
    };

    var TableCell = function (_Component) {
        babelHelpers.inherits(TableCell, _Component);

        function TableCell() {
            babelHelpers.classCallCheck(this, TableCell);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableCell.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(nextProps, this.props);
        };

        TableCell.prototype.render = function render() {
            var _props = this.props,
                height = _props.height,
                content = _props.content,
                columnData = _props.columnData;
            var align = columnData.align,
                width = columnData.width,
                grow = columnData.grow,
                shrink = columnData.shrink,
                maxWidth = columnData.maxWidth,
                minWidth = columnData.minWidth;


            var style = {
                justifyContent: JUSTIFY_CONTENT_MAP[align],
                flexBasis: width,
                height: height,
                flexGrow: grow,
                flexShrink: shrink,
                maxWidth: maxWidth,
                minWidth: minWidth
            };

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build(), style: style },
                content
            );
        };

        return TableCell;
    }(_react.Component);

    exports['default'] = TableCell;


    TableCell.displayName = 'TableCell';

    TableCell.propTypes = {

        part: _react.PropTypes.oneOf(['header', 'body', 'footer']),

        columnData: _react.PropTypes.shape({
            width: _react.PropTypes.number.isRequired,
            align: _react.PropTypes.oneOf(['left', 'center', 'right']).isRequired,
            grow: _react.PropTypes.number.isRequired,
            shrink: _react.PropTypes.number.isRequired,
            maxWidth: _react.PropTypes.number,
            minWidth: _react.PropTypes.number
        }),

        rowData: _react.PropTypes.any,
        columnIndex: _react.PropTypes.number,
        rowIndex: _react.PropTypes.number,
        cellData: _react.PropTypes.any,
        cellKey: _react.PropTypes.oneOfType([_react.PropTypes.string.isRequired, _react.PropTypes.number.isRequired]),

        height: _react.PropTypes.number.isRequired,
        cellRenderer: _react.PropTypes.func

    };

    TableCell.defaultProps = {
        align: 'left'
    };
});
//# sourceMappingURL=Cell.js.map
