(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.shallowEqual, global.babelHelpers);
        global.Cell = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

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

        part: _propTypes2['default'].oneOf(['header', 'body', 'footer']),

        columnData: _propTypes2['default'].shape({
            width: _propTypes2['default'].number.isRequired,
            align: _propTypes2['default'].oneOf(['left', 'center', 'right']).isRequired,
            grow: _propTypes2['default'].number.isRequired,
            shrink: _propTypes2['default'].number.isRequired,
            maxWidth: _propTypes2['default'].number,
            minWidth: _propTypes2['default'].number
        }),

        rowData: _propTypes2['default'].any,
        columnIndex: _propTypes2['default'].number,
        rowIndex: _propTypes2['default'].number,
        cellData: _propTypes2['default'].any,
        cellKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string.isRequired, _propTypes2['default'].number.isRequired]),

        height: _propTypes2['default'].number.isRequired,
        cellRenderer: _propTypes2['default'].func

    };

    TableCell.defaultProps = {
        align: 'left'
    };
});
//# sourceMappingURL=Cell.js.map
