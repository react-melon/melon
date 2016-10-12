(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Button', './Icon', './Progress', './Link', 'melon-core/Validity', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Button'), require('./Icon'), require('./Progress'), require('./Link'), require('melon-core/Validity'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Button, global.Icon, global.Progress, global.Link, global.Validity, global.InputComponent, global.cxBuilder, global.babelHelpers);
        global.Uploader = mod.exports;
    }
})(this, function (exports, _react, _Button, _Icon, _Progress, _Link, _Validity, _InputComponent2, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

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

            var _props = this.props;
            var upload = _props.upload;
            var onSelect = _props.onSelect;


            var event = {
                target: this,
                files: e.target.files
            };

            if (upload) {
                upload(event).then(function (result) {
                    return _this2.setFile(result);
                }, function (error) {
                    return _this2.clearFile();
                });
                return;
            }

            onSelect(event);
        };

        Uploader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var value = nextProps.value;

            _InputComponent.prototype.componentWillReceiveProps.call(this, nextProps);

            if (value) {
                this.setState({
                    isUploaded: true,
                    isUploading: false,
                    value: value
                });
            } else {
                this.setState({
                    isUploaded: false,
                    value: value
                });
            }
        };

        Uploader.prototype.setUploading = function setUploading() {
            this.setState({
                isUploading: true
            });
        };

        Uploader.prototype.setFile = function setFile(value) {

            this.setState({
                isUploaded: true,
                isUploading: false,
                value: value
            });

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: value
            });
        };

        Uploader.prototype.clearFile = function clearFile() {

            this.setState({
                isUploaded: false,
                isUploading: false,
                value: ''
            });

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: ''
            });
        };

        Uploader.prototype.renderUploadFile = function renderUploadFile() {
            var _this3 = this;

            var _state = this.state;
            var isUploading = _state.isUploading;
            var isUploaded = _state.isUploaded;


            return isUploading || isUploaded ? null : _react2['default'].createElement('input', {
                ref: 'file',
                type: 'file',
                className: cx().part('file').build(),
                onChange: function onChange(e) {
                    _this3.onFileChange(e);
                },
                accept: this.props.accept });
        };

        Uploader.prototype.renderUploadButton = function renderUploadButton() {
            var _this4 = this;

            var _state2 = this.state;
            var isUploading = _state2.isUploading;
            var isUploaded = _state2.isUploaded;
            var value = _state2.value;
            var _props2 = this.props;
            var size = _props2.size;
            var placeholder = _props2.placeholder;


            if (isUploading) {
                return _react2['default'].createElement(_Progress2['default'], {
                    size: size,
                    mode: 'indeterminate',
                    shape: 'circle' });
            }

            if (isUploaded) {

                return _react2['default'].createElement(
                    'div',
                    { className: cx.getPartClassName('content') },
                    _react2['default'].createElement('image', {
                        className: cx.getPartClassName('preview'),
                        src: value }),
                    _react2['default'].createElement(
                        _Link2['default'],
                        {
                            size: size,
                            href: value,
                            title: '\u70B9\u51FB\u67E5\u770B',
                            target: '_blank' },
                        value
                    ),
                    _react2['default'].createElement(
                        _Button2['default'],
                        {
                            size: size,
                            type: 'button',
                            title: '\u91CD\u65B0\u9009\u62E9',
                            onClick: function onClick() {
                                _this4.clearFile();
                            } },
                        _react2['default'].createElement(_Icon2['default'], { icon: 'refresh' })
                    )
                );
            }

            return _react2['default'].createElement(
                'div',
                {
                    className: cx.getPartClassName('content'),
                    onClick: function onClick() {
                        _this4.refs.file.click();
                    } },
                _react2['default'].createElement(_Icon2['default'], { icon: 'file-upload' }),
                _react2['default'].createElement(
                    'span',
                    { className: cx.getPartClassName('placeholder') },
                    placeholder
                )
            );
        };

        Uploader.prototype.render = function render() {

            var props = this.props;
            var value = props.value;
            var name = props.name;
            var style = props.style;

            var className = cx(props).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                {
                    className: className,
                    style: style },
                _react2['default'].createElement('input', { name: name, type: 'hidden', value: value }),
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
        accept: _react.PropTypes.string,
        upload: _react.PropTypes.func.isRequired,
        placeholder: _react.PropTypes.string
    });

    Uploader.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '点击上传'
    });

    Uploader.childContextTypes = _InputComponent3['default'].childContextTypes;
    Uploader.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=Uploader.js.map
