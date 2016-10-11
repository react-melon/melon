/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Button', './Icon', './Progress', './Link', 'melon-core/Validity', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Button'), require('./Icon'), require('./Progress'), require('./Link'), require('melon-core/Validity'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Button, global.Icon, global.Progress, global.Link, global.Validity, global.InputComponent, global.cxBuilder, global.babelHelpers);
        global.Uploader = mod.exports;
    }
})(this, function (exports, _react, _Button, _Icon, _Progress, _Link, _Validity, _InputComponent2, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Progress2 = babelHelpers.interopRequireDefault(_Progress);

    var _Link2 = babelHelpers.interopRequireDefault(_Link);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file melon/Uploader
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Uploader');

    /**
     * melon/Uploader
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var Uploader = function (_InputComponent) {
        babelHelpers.inherits(Uploader, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function Uploader(props, context) {
            babelHelpers.classCallCheck(this, Uploader);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                isUploading: false,
                isUploaded: !!_this.props.value
            });

            return _this;
        }

        /**
         * 文件上传时的处理
         *
         * @protected
         * @param  {Object} e 事件对象
         */


        Uploader.prototype.onFileChange = function onFileChange(e) {
            var _this2 = this;

            this.setUploading();

            this.props.upload({
                target: this,
                files: e.target.files
            }).then(function (result) {
                return _this2.setFile(result);
            }, function (error) {
                return _this2.clearFile();
            });
        };

        Uploader.prototype.setUploading = function setUploading() {
            this.setState({
                isUploading: true
            });
        };

        Uploader.prototype.setFile = function setFile(value) {
            var _this3 = this;

            this.setState({
                isUploaded: true,
                isUploading: false
            }, function () {
                _InputComponent.prototype.onChange.call(_this3, {
                    type: 'change',
                    target: _this3,
                    value: value
                });
            });
        };

        Uploader.prototype.clearFile = function clearFile() {
            var _this4 = this;

            this.setState({
                isUploaded: false,
                isUploading: false
            }, function () {

                _InputComponent.prototype.onChange.call(_this4, {
                    type: 'change',
                    target: _this4,
                    value: ''
                });
            });
        };

        Uploader.prototype.renderUploadFile = function renderUploadFile() {
            var _this5 = this;

            var _state = this.state;
            var isUploading = _state.isUploading;
            var isUploaded = _state.isUploaded;


            return isUploading || isUploaded ? null : _react2['default'].createElement('input', {
                ref: 'file',
                type: 'file',
                className: cx().part('file').build(),
                onChange: function onChange(e) {
                    _this5.onFileChange(e);
                },
                accept: this.props.accept });
        };

        Uploader.prototype.renderUploadButton = function renderUploadButton() {
            var _this6 = this;

            var _state2 = this.state;
            var isUploading = _state2.isUploading;
            var isUploaded = _state2.isUploaded;
            var value = _state2.value;
            var _props = this.props;
            var size = _props.size;
            var btnText = _props.btnText;


            if (isUploading) {
                return _react2['default'].createElement(_Progress2['default'], {
                    size: size,
                    mode: 'indeterminate',
                    shape: 'circle' });
            }

            if (isUploaded) {

                return _react2['default'].createElement(
                    'div',
                    { className: cx().part('uploaded').build() },
                    _react2['default'].createElement(_Icon2['default'], { icon: 'done', size: size }),
                    ' 已上传',
                    _react2['default'].createElement(
                        _Link2['default'],
                        {
                            size: size,
                            href: value,
                            variants: ['button'],
                            target: '_blank' },
                        '查看'
                    ),
                    _react2['default'].createElement(
                        _Button2['default'],
                        {
                            size: size,
                            type: 'button',
                            onClick: function onClick() {
                                _this6.clearFile();
                            } },
                        '重选'
                    )
                );
            }

            return _react2['default'].createElement(
                _Button2['default'],
                {
                    type: 'button',
                    variants: ['raised'],
                    onClick: function onClick() {
                        _this6.refs.file.click();
                    } },
                _react2['default'].createElement(_Icon2['default'], { icon: 'file-upload' }),
                btnText
            );
        };

        Uploader.prototype.render = function render() {

            var props = this.props;
            var value = props.value;
            var name = props.name;
            var label = props.label;


            return _react2['default'].createElement(
                'div',
                { className: cx(props).addStates(this.getStyleStates()).build() },
                _react2['default'].createElement('input', { name: name, type: 'hidden', value: value }),
                label ? _react2['default'].createElement(
                    'label',
                    { className: cx().part('label').build() },
                    label
                ) : null,
                this.renderUploadFile(),
                this.renderUploadButton(),
                _react2['default'].createElement(_Validity2['default'], { validity: this.state.validity })
            );
        };

        return Uploader;
    }(_InputComponent3['default']);

    exports['default'] = Uploader;


    Uploader.displayName = 'Uploader';

    Uploader.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        multiple: _react.PropTypes.bool,
        accept: _react.PropTypes.string,
        files: _react.PropTypes.array,
        upload: _react.PropTypes.func.isRequired,
        btnText: _react.PropTypes.string,
        label: _react.PropTypes.string
    });

    Uploader.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        btnText: '点击上传'
    });

    Uploader.childContextTypes = _InputComponent3['default'].childContextTypes;
    Uploader.contextTypes = _InputComponent3['default'].contextTypes;
});