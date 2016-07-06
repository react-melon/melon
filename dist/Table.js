/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './table/Row', './common/util/dom', 'melon-core/classname/cxBuilder', './table/Column', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./table/Row'), require('./common/util/dom'), require('melon-core/classname/cxBuilder'), require('./table/Column'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Row, global.dom, global.cxBuilder, global.Column, global.babelHelpers);
        global.Table = mod.exports;
    }
})(this, function (exports, _react, _Row, _dom, _cxBuilder, _Column, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Row2 = babelHelpers.interopRequireDefault(_Row);

    var dom = babelHelpers.interopRequireWildcard(_dom);

    var _Column2 = babelHelpers.interopRequireDefault(_Column);

    /**
     * @file melon/Table
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Table');

    var Table = function (_Component) {
        babelHelpers.inherits(Table, _Component);

        function Table(props) {
            babelHelpers.classCallCheck(this, Table);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {
                columns: _this.getColumns(_this.props)
            };

            _this.onWindowResize = _this.onWindowResize.bind(_this);
            return _this;
        }

        Table.prototype.componentDidMount = function componentDidMount() {
            this.onWindowResize();
            dom.on(window, 'resize', this.onWindowResize);
        };

        Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.setState({
                columns: this.getColumns(nextProps)
            });
        };

        Table.prototype.componentWillUnmount = function componentWillUnmount() {
            dom.off(window, 'resize', this.onWindowResize);
        };

        Table.prototype.getColumns = function getColumns(props) {

            return _react.Children.toArray(props.children).reduce(function (children, child) {

                if (child != null) {

                    if (child.type._TABLE_COMPONENT_ !== 'COLUMN') {
                        throw new Error('Table child must be a TableColumn');
                    }

                    children.push(child);
                }

                return children;
            }, []);
        };

        Table.prototype.renderHeader = function renderHeader(columns, width) {
            var props = this.props;

            return _react2['default'].createElement(
                'div',
                { className: cx().part('header').build() },
                _react2['default'].createElement(_Row2['default'], {
                    part: 'header',
                    height: props.headerRowHeight,
                    columns: columns,
                    tableWidth: width })
            );
        };

        Table.prototype.renderBody = function renderBody(columns, width) {
            var _this2 = this;

            var _props = this.props;
            var dataSource = _props.dataSource;
            var noDataContent = _props.noDataContent;


            var body = dataSource && dataSource.length ? dataSource.map(function (rowData, index) {
                return _this2.renderRow(columns, rowData, index, width);
            }) : _react2['default'].createElement(
                'div',
                {
                    className: cx().part('body-empty').build(),
                    style: { width: width - 2 } },
                noDataContent
            );

            return _react2['default'].createElement(
                'div',
                { className: cx().part('body').build() },
                body
            );
        };

        Table.prototype.renderRow = function renderRow(columns, rowData, index, tableWidth) {
            var _props2 = this.props;
            var rowHeight = _props2.rowHeight;
            var highlight = _props2.highlight;

            return _react2['default'].createElement(_Row2['default'], {
                height: rowHeight,
                highlight: highlight,
                key: index,
                rowIndex: index,
                part: 'body',
                columns: columns,
                data: rowData,
                tableWidth: tableWidth });
        };

        Table.prototype.renderFooter = function renderFooter(columns) {
            return null;
        };

        Table.prototype.onWindowResize = function onWindowResize() {
            var main = this.main;


            if (this.main) {
                this.setState({
                    width: main.offsetWidth
                });
            }
        };

        Table.prototype.render = function render() {
            var _this3 = this;

            var _state = this.state;
            var width = _state.width;
            var columns = _state.columns;


            if (width) {
                // 计算出tableWidth和所有的columnWidth，将更大的一个传递给row使用
                width = Math.max(width, columns.reduce(function (width, columns) {
                    return width + columns.props.width;
                }, 0));
            } else {
                width = '';
            }

            return _react2['default'].createElement(
                'div',
                {
                    className: cx(this.props).build(),
                    ref: function ref(main) {
                        _this3.main = main;
                    } },
                this.renderHeader(columns, width),
                this.renderBody(columns, width),
                this.renderFooter(columns, width)
            );
        };

        return Table;
    }(_react.Component);

    exports['default'] = Table;


    Table.displayName = 'Table';

    Table.propTypes = {
        rowHeight: _react.PropTypes.number.isRequired,
        highlight: _react.PropTypes.bool,
        headerRowHeight: _react.PropTypes.number,
        dataSource: _react.PropTypes.array.isRequired,
        noDataContent: _react.PropTypes.node
    }, Table.defaultProps = {
        highlight: true,
        rowHeight: 48,
        headerRowHeight: 56,
        noDataContent: '没有数据'
    };

    Table.Column = _Column2['default'];
});