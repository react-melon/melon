(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', '../Popover', '../TextBox', '../Button', 'melon-core/classname/cxBuilder', '../Title', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('../Popover'), require('../TextBox'), require('../Button'), require('melon-core/classname/cxBuilder'), require('../Title'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Popover, global.TextBox, global.Button, global.cxBuilder, global.Title, global.babelHelpers);
        global.TextEditor = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Popover, _TextBox, _Button, _cxBuilder, _Title, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    var _TextBox2 = babelHelpers.interopRequireDefault(_TextBox);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    /**
     * @file 单元格文本编辑
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('TableCellTextEditor');

    var TableCellTextEditor = function (_Component) {
        babelHelpers.inherits(TableCellTextEditor, _Component);

        function TableCellTextEditor() {
            babelHelpers.classCallCheck(this, TableCellTextEditor);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.state = {
                open: false
            };

            _this.onMainClick = _this.onMainClick.bind(_this);
            _this.onClose = _this.onClose.bind(_this);
            _this.onChange = _this.onChange.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);

            return _this;
        }

        TableCellTextEditor.prototype.onMainClick = function onMainClick() {
            this.setState({ open: true });
        };

        TableCellTextEditor.prototype.onClose = function onClose() {
            this.setState({ open: false });
        };

        TableCellTextEditor.prototype.onChange = function onChange(e) {
            this.submit(e.value);
        };

        TableCellTextEditor.prototype.onConfirm = function onConfirm() {
            this.submit(this.refs.input.getValue());
            this.setState({ open: false });
        };

        TableCellTextEditor.prototype.submit = function submit(value) {
            var _props = this.props,
                onChange = _props.onChange,
                columnData = _props.columnData,
                rowIndex = _props.rowIndex,
                rowData = _props.rowData,
                columnIndex = _props.columnIndex,
                dataKey = _props.dataKey;


            onChange({
                columnData: columnData,
                rowData: rowData,
                columnIndex: columnIndex,
                rowIndex: rowIndex,
                dataKey: dataKey,
                value: value
            });
        };

        TableCellTextEditor.prototype.render = function render() {
            var _props2 = this.props,
                children = _props2.children,
                mode = _props2.mode,
                placeholder = _props2.placeholder,
                title = _props2.title;


            var className = cx(this.props).build();

            title = mode === 'confirm' ? _react2['default'].createElement(
                _Title2['default'],
                { level: 3 },
                title
            ) : null;

            var footer = mode === 'confirm' ? _react2['default'].createElement(
                'footer',
                { className: cx.getPartClassName('footer') },
                _react2['default'].createElement(
                    _Button2['default'],
                    {
                        size: 'xs',
                        variants: ['info'],
                        onClick: this.onClose },
                    '\u53D6\u6D88'
                ),
                _react2['default'].createElement(
                    _Button2['default'],
                    {
                        size: 'xs',
                        variants: ['info'],
                        onClick: this.onConfirm },
                    '\u786E\u5B9A'
                )
            ) : null;

            var text = mode === 'confirm' ? _react2['default'].createElement(_TextBox2['default'], {
                ref: 'input',
                autoFocus: true,
                variants: ['fluid'],
                placeholder: placeholder,
                defaultValue: children }) : _react2['default'].createElement(_TextBox2['default'], {
                autoFocus: true,
                variants: ['fluid'],
                placeholder: placeholder,
                value: children,
                onChange: this.onChange });

            return _react2['default'].createElement(
                'div',
                { ref: 'main', onClick: this.onMainClick, className: className },
                children,
                _react2['default'].createElement(
                    _Popover2['default'],
                    {
                        open: this.state.open,
                        anchor: this.refs.main && this.refs.main.parentNode,
                        onRequestClose: this.onClose },
                    _react2['default'].createElement(
                        'div',
                        { className: cx().part('layer').addVariants(mode).build() },
                        title,
                        text,
                        footer
                    )
                )
            );
        };

        return TableCellTextEditor;
    }(_react.Component);

    exports['default'] = TableCellTextEditor;


    TableCellTextEditor.propTypes = {
        mode: _propTypes2['default'].oneOf(['inline', 'confirm']),
        children: _propTypes2['default'].string,
        placeholder: _propTypes2['default'].string,
        onChange: _propTypes2['default'].func.isRequired
    };
});
//# sourceMappingURL=TextEditor.js.map
