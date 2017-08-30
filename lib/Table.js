(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './table/Row', 'melon-core/classname/cxBuilder', './table/Column', 'react-sticky-state', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./table/Row'), require('melon-core/classname/cxBuilder'), require('./table/Column'), require('react-sticky-state'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Row, global.cxBuilder, global.Column, global.reactStickyState, global.babelHelpers);
        global.Table = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Row, _cxBuilder, _Column, _reactStickyState, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.Column = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Row2 = babelHelpers.interopRequireDefault(_Row);

    var _Column2 = babelHelpers.interopRequireDefault(_Column);

    var _reactStickyState2 = babelHelpers.interopRequireDefault(_reactStickyState);

    /**
     * @file melon/Table
     * @author leon(ludafa@outlook.com)
     */

    var SCROLL_CLASS = {
        down: 'sticky-scroll-down',
        up: 'sticky-scroll-up'
    };

    var cx = (0, _cxBuilder.create)('Table');

    /**
     * 表格
     *
     * @extends React.Component
     */

    var Table = function (_Component) {
        babelHelpers.inherits(Table, _Component);

        function Table() {
            babelHelpers.classCallCheck(this, Table);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Table.prototype.componentWillMount = function componentWillMount() {
            this.setState({
                columns: this.getColumns(this.props)
            });
        };

        Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.setState({
                columns: this.getColumns(nextProps)
            });
        };

        Table.prototype.getColumns = function getColumns(props) {
            var children = props.children,
                rowHasChanged = props.rowHasChanged;


            return _react.Children.toArray(children).filter(function (child) {
                return child.type._TABLE_COMPONENT_ === 'COLUMN';
            }).map(function (column, i) {
                return (0, _react.cloneElement)(column, { rowHasChanged: rowHasChanged });
            });
        };

        Table.prototype.renderHeader = function renderHeader(columns, sticky) {

            var header = _react2['default'].createElement(
                'div',
                { className: cx.getPartClassName('header') },
                this.renderRow('header', columns, null, -1)
            );

            if (sticky) {
                header = _react2['default'].createElement(
                    _reactStickyState2['default'],
                    { scrollClass: SCROLL_CLASS },
                    header
                );
            }

            return header;
        };

        Table.prototype.renderBody = function renderBody(columns) {
            var _this2 = this;

            var _props = this.props,
                dataSource = _props.dataSource,
                noDataContent = _props.noDataContent;


            var body = dataSource && dataSource.length ? dataSource.map(function (rowData, index) {
                return _this2.renderRow('body', columns, rowData, index);
            }) : _react2['default'].createElement(
                'div',
                { className: cx.getPartClassName('body-empty') },
                noDataContent
            );

            return _react2['default'].createElement(
                'div',
                { className: cx.getPartClassName('body') },
                body
            );
        };

        Table.prototype.renderRow = function renderRow(part, columns, rowData, index) {
            var _props2 = this.props,
                rowHeight = _props2.rowHeight,
                headerRowHeight = _props2.headerRowHeight,
                highlight = _props2.highlight,
                rowHasChanged = _props2.rowHasChanged;


            var height = part === 'body' ? rowHeight : headerRowHeight;

            return _react2['default'].createElement(_Row2['default'], {
                height: height,
                highlight: highlight,
                key: index,
                rowIndex: index,
                part: part,
                columns: columns,
                data: rowData,
                rowHasChanged: rowHasChanged });
        };

        Table.prototype.renderFooter = function renderFooter(columns) {
            return null;
        };

        Table.prototype.render = function render() {
            var _this3 = this;

            var _props3 = this.props,
                headerSticky = _props3.headerSticky,
                style = _props3.style;

            var columns = this.state.columns;

            return _react2['default'].createElement(
                'div',
                {
                    className: cx(this.props).build(),
                    style: style,
                    ref: function ref(main) {
                        _this3.main = main;
                    } },
                this.renderHeader(columns, headerSticky),
                this.renderBody(columns),
                this.renderFooter(columns)
            );
        };

        return Table;
    }(_react.Component);

    Table.displayName = 'Table';

    Table.propTypes = {
        rowHeight: _propTypes2['default'].number.isRequired,
        highlight: _propTypes2['default'].bool,
        headerRowHeight: _propTypes2['default'].number,
        dataSource: _propTypes2['default'].array.isRequired,
        noDataContent: _propTypes2['default'].node,
        rowHasChanged: _propTypes2['default'].func.isRequired,
        headerSticky: _propTypes2['default'].bool,
        height: _propTypes2['default'].number,
        width: _propTypes2['default'].number
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56,
        noDataContent: '没有数据',
        headerSticky: true,
        rowHasChanged: function rowHasChanged(r1, r2) {
            return r1 !== r2;
        }
    };

    Table.Column = _Column2['default'];

    exports['default'] = Table;
    exports.Column = _Column2['default'];
});
//# sourceMappingURL=Table.js.map
