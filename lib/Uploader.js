(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Button', './Icon', './Progress', './Link', 'melon-core/InputComponent', './common/util/guid', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Button'), require('./Icon'), require('./Progress'), require('./Link'), require('melon-core/InputComponent'), require('./common/util/guid'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Button, global.Icon, global.Progress, global.Link, global.InputComponent, global.guid, global.cxBuilder, global.babelHelpers);
        global.Uploader = mod.exports;
    }
})(this, function (exports, _react, _Button, _Icon, _Progress, _Link, _InputComponent2, _guid, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Progress2 = babelHelpers.interopRequireDefault(_Progress);

    var _Link2 = babelHelpers.interopRequireDefault(_Link);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _guid2 = babelHelpers.interopRequireDefault(_guid);

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

            _this.onFileChange = _this.onFileChange.bind(_this);
            _this.onUploadSucceed = _this.onUploadSucceed.bind(_this);
            _this.onUploadFailed = _this.onUploadFailed.bind(_this);
            _this.onClear = _this.onClear.bind(_this);
            _this.onUploadCancel = _this.onUploadCancel.bind(_this);

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                value: props.value == null ? '' : props.value,
                uploading: 'value' in props ? !!props.uploading : false
            });

            return _this;
        }

        Uploader.prototype.getStatus = function getStatus(props) {
            var value = props.value,
                uploading = props.uploading;


            return uploading ? 'uploading' : value ? 'fulfilled' : 'empty';
        };

        Uploader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            if (nextProps.uploading !== this.state.uploading && !nextProps.upload) {
                this.setState({
                    uploading: nextProps.uploading
                });
            }

            _InputComponent.prototype.componentWillReceiveProps.call(this, nextProps);
        };

        Uploader.prototype.componentWillUnmount = function componentWillUnmount() {
            this.token = null;
        };

        Uploader.prototype.onFileChange = function onFileChange(e) {
            var _this2 = this;

            var _props = this.props,
                upload = _props.upload,
                onFileChange = _props.onFileChange;


            var files = e.target.files;

            // controlled 模式
            if (onFileChange) {
                onFileChange(files);
                return;
            }

            this.setState({
                uploading: true
            });

            var token = this.token = (0, _guid2['default'])();

            // Uncontrolled 模式
            upload(e.target.files, this.props).then(function (result) {
                if (_this2.token === token) {
                    _this2.onUploadSucceed(result);
                }
            }, function (error) {
                if (_this2.token === token) {
                    _this2.onUploadFailed(error);
                }
            });
        };

        Uploader.prototype.onUploadSucceed = function onUploadSucceed(result) {
            var _this3 = this;

            var onUploadSucceed = this.props.onUploadSucceed;

            if (onUploadSucceed) {
                onUploadSucceed(result);
            }

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                value: result,
                target: this
            }, function () {
                _this3.setState({ uploading: false });
            });
        };

        Uploader.prototype.onUploadFailed = function onUploadFailed(error) {

            var onUploadFailed = this.props.onUploadFailed;

            if (onUploadFailed) {
                onUploadFailed(error);
            }

            this.setState({ uploading: false });
        };

        Uploader.prototype.onUploadCancel = function onUploadCancel() {

            var onUploadCancel = this.props.onUploadCancel;

            if (onUploadCancel && onUploadCancel) {
                onUploadCancel();
            }

            if ('value' in this.props) {
                return;
            }

            this.token = null;

            this.setState({
                uploading: false
            });
        };

        Uploader.prototype.onClear = function onClear() {
            var _props2 = this.props,
                onFileChange = _props2.onFileChange,
                onClear = _props2.onClear;


            if (onFileChange) {
                onFileChange(null);
                return;
            }

            if (onClear) {
                onClear();
            }

            this.setState({ value: '' });
        };

        Uploader.prototype.renderUploadFile = function renderUploadFile() {

            var status = this.getStatus(this.state);

            return status !== 'empty' ? null : _react2['default'].createElement('input', {
                ref: 'file',
                type: 'file',
                className: cx().part('file').build(),
                onChange: this.onFileChange,
                accept: this.props.accept });
        };

        Uploader.prototype.renderUploadButton = function renderUploadButton() {
            var _this4 = this;

            var status = this.getStatus(this.state);
            var _props3 = this.props,
                size = _props3.size,
                placeholder = _props3.placeholder;

            var value = this.state.value;

            switch (status) {

                case 'fulfilled':
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
                                onClick: this.onClear },
                            _react2['default'].createElement(_Icon2['default'], { icon: 'refresh' })
                        )
                    );
                case 'uploading':
                    return _react2['default'].createElement(
                        'div',
                        { className: cx.getPartClassName('uploading') },
                        _react2['default'].createElement(_Progress2['default'], {
                            size: 'xxs',
                            mode: 'indeterminate',
                            shape: 'circle' }),
                        _react2['default'].createElement(
                            'span',
                            null,
                            '\u6B63\u5728\u4E0A\u4F20...'
                        ),
                        _react2['default'].createElement(
                            _Button2['default'],
                            {
                                title: '\u53D6\u6D88\u4E0A\u4F20',
                                variants: ['icon'],
                                size: 'xxs',
                                type: 'button',
                                onClick: this.onUploadCancel },
                            _react2['default'].createElement(_Icon2['default'], { icon: 'clear' })
                        )
                    );
                case 'empty':
                default:
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

            }
        };

        Uploader.prototype.render = function render() {
            var _props4 = this.props,
                name = _props4.name,
                style = _props4.style;

            var value = this.state.value;
            var className = cx(this.props).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                {
                    className: className,
                    style: style },
                _react2['default'].createElement('input', {
                    name: name,
                    type: 'hidden',
                    value: value,
                    readOnly: true }),
                this.renderUploadFile(),
                this.renderUploadButton()
            );
        };

        return Uploader;
    }(_InputComponent3['default']);

    exports['default'] = Uploader;


    Uploader.displayName = 'Uploader';

    function getCheck(names, mutex) {

        var ISSUE_URL = 'https://github.com/react-melon/melon/issues/53';

        return function (propTypes) {
            return function (props, propName, componentName) {
                for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                    rest[_key - 3] = arguments[_key];
                }

                // 全部存在
                if (names.every(function (name) {
                    return name in props;
                })) {

                    // 但是有互斥
                    if (mutex.some(function (name) {
                        return name in props;
                    })) {
                        return new Error('Cannot set ' + mutex.join(', ') + ' with ' + names.join(', ') + '. See: ' + ISSUE_URL);
                    }

                    // 原来的校验
                    return propTypes.apply(undefined, [props, propName, componentName].concat(rest));
                }

                // 部分存在
                if (names.some(function (name) {
                    return name in props;
                })) {
                    return new Error('Please set ' + names.join(', ') + ' at same time. See : ' + ISSUE_URL);
                }

                // 全部都不存在
                return propTypes.apply(undefined, [props, propName, componentName].concat(rest));
            };
        };
    }

    var controlledGroup = ['value', 'uploading', 'onFileChange'];
    var uncontrolledGroup = ['defaultValue', 'upload'];

    var controlledCheck = getCheck(controlledGroup, uncontrolledGroup);
    var uncontrolledCheck = getCheck(uncontrolledGroup, controlledGroup);

    Uploader.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {

        accept: _react.PropTypes.string,
        placeholder: _react.PropTypes.string,

        value: controlledCheck(_react.PropTypes.string),
        uploading: controlledCheck(_react.PropTypes.bool),
        onFileChange: controlledCheck(_react.PropTypes.func),

        defaultValue: uncontrolledCheck(_InputComponent3['default'].propTypes.defaultValue),
        upload: uncontrolledCheck(_react.PropTypes.func),
        onUploadStart: uncontrolledCheck(_react.PropTypes.func),
        onUploadSucceed: uncontrolledCheck(_react.PropTypes.func),
        onUploadFailed: uncontrolledCheck(_react.PropTypes.func)

    });

    Uploader.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '点击上传'
    });

    Uploader.childContextTypes = _InputComponent3['default'].childContextTypes;
    Uploader.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=Uploader.js.map
