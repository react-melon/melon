(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './Mask', './common/util/dom', './dialog/DialogWindow', './Layer', 'melon-core/classname/cxBuilder', 'react-motion', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./Mask'), require('./common/util/dom'), require('./dialog/DialogWindow'), require('./Layer'), require('melon-core/classname/cxBuilder'), require('react-motion'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Mask, global.dom, global.DialogWindow, global.Layer, global.cxBuilder, global.reactMotion, global.babelHelpers);
        global.Dialog = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Mask, _dom, _DialogWindow, _Layer, _cxBuilder, _reactMotion, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Mask2 = babelHelpers.interopRequireDefault(_Mask);

    var dom = babelHelpers.interopRequireWildcard(_dom);

    var _DialogWindow2 = babelHelpers.interopRequireDefault(_DialogWindow);

    var _Layer2 = babelHelpers.interopRequireDefault(_Layer);

    /**
     * @file melon/Dialog
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Dialog');

    /**
     * melon/Dialog
     *
     * @extends {React.Component}
     * @class
     */

    var Dialog = function (_Component) {
        babelHelpers.inherits(Dialog, _Component);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param {*} props 属性
         * @param {*} context 上下文
         */
        function Dialog(props, context) {
            babelHelpers.classCallCheck(this, Dialog);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            /**
             * 初始状态
             *
             * @private
             * @type {Object}
             */
            _this.state = {
                open: props.open
            };

            _this.onShow = _this.onShow.bind(_this);
            _this.onHide = _this.onHide.bind(_this);
            _this.onMaskClick = _this.onMaskClick.bind(_this);
            _this.renderLayer = _this.renderLayer.bind(_this);
            _this.onMotionEnd = _this.onMotionEnd.bind(_this);

            return _this;
        }

        /**
         * Mount时的处理
         *
         * @public
         * @override
         */


        Dialog.prototype.componentDidMount = function componentDidMount() {
            if (this.state.open) {
                this.positionDialog();
            }
        };

        Dialog.prototype.componentDidUpdate = function componentDidUpdate() {
            if (this.state.open) {
                this.positionDialog();
            }
        };

        Dialog.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var open = nextProps.open;

            if (open === this.state.open) {
                return;
            }

            // 如果是打开，那么就直接打开。
            if (open) {
                this.setState({ open: true });
                return;
            }

            // 如果是关闭，但我们正在关闭，就算了。
            if (!this.state.closing) {
                this.hide();
            }
        };

        Dialog.prototype.positionDialog = function positionDialog() {

            var dialogWindow = this.dialogWindow;

            if (!dialogWindow) {
                return;
            }

            dialogWindow = _reactDom2['default'].findDOMNode(this.dialogWindow);

            if (this.state.open) {
                var marginTop = -dialogWindow.offsetHeight / 2;
                var windowHeight = dom.getClientHeight();

                marginTop = dialogWindow.offsetHeight > windowHeight ? -windowHeight / 2 + 16 : marginTop;

                dialogWindow.style.marginTop = marginTop + 'px';
            } else {
                dialogWindow.style.marginTop = 0;
            }
        };

        Dialog.prototype.onMaskClick = function onMaskClick(e) {

            if (this.props.maskClickClose) {
                this.hide();
            } else {
                e.stopPropagation();
            }
        };

        Dialog.prototype.onShow = function onShow() {
            var onShow = this.props.onShow;
            if (onShow) {
                onShow();
            }
        };

        Dialog.prototype.onHide = function onHide() {
            var onHide = this.props.onHide;
            if (onHide) {
                onHide();
            }
        };

        Dialog.prototype.onMotionEnd = function onMotionEnd() {

            if (this.state.closing) {

                this.setState({
                    closing: false,
                    open: false
                });

                var onHide = this.props.onHide;

                if (onHide) {
                    onHide();
                }
            }
        };

        Dialog.prototype.hide = function hide() {
            var _state = this.state,
                open = _state.open,
                closing = _state.closing;


            if (!open || closing) {
                return;
            }

            this.setState({ closing: true });
        };

        Dialog.prototype.renderTitle = function renderTitle(title) {
            return title ? _react2['default'].createElement(
                'h1',
                { className: cx().part('title').build() },
                title
            ) : null;
        };

        Dialog.prototype.renderActionPanel = function renderActionPanel() {

            var actions = this.props.actions;

            if (!actions) {
                return null;
            }

            if (!Array.isArray(actions)) {
                actions = [actions];
            }

            if (!actions.length) {
                return null;
            }

            actions = actions.map(function (action) {
                return (0, _react.cloneElement)(action, { size: action.props.size || 'l' });
            }).reverse();

            return _react2['default'].createElement(
                'div',
                { className: cx().part('actions').build() },
                actions.length === 1 ? actions[0] : actions
            );
        };

        Dialog.prototype.renderLayer = function renderLayer() {
            var _this2 = this;

            var props = this.props,
                state = this.state;
            var children = props.children,
                width = props.width,
                title = props.title;
            var open = state.open,
                closing = state.closing;


            if (title) {
                title = this.renderTitle(title);
            }

            var body = _react2['default'].createElement(
                'div',
                { className: cx().part('body').build() },
                children
            );

            var footer = this.renderActionPanel();

            var windowPartClassName = cx().part('window').addVariants(width === 'adaptive' ? 'adaptive' : null, title ? null : 'no-title').build();

            var className = cx(props).addStates({ open: open }).build();

            var opening = open && !closing;

            var distance = dom.getClientHeight() * 0.4 * (opening ? -1 : 1);
            var yBegin = opening ? distance : 0;
            var yEnd = opening ? 0 : distance;
            var opacityBegin = opening ? 0 : 1;
            var opacityEnd = opening ? 1 : 0;
            var control = { stiffness: 200, damping: 18, precision: 1 };

            return _react2['default'].createElement(
                'div',
                { className: className, style: !opening ? { overflow: 'hidden' } : null },
                _react2['default'].createElement(
                    _reactMotion.Motion,
                    {
                        defaultStyle: {
                            top: yBegin,
                            opacity: opacityBegin
                        },
                        style: {
                            top: (0, _reactMotion.spring)(yEnd, control),
                            opacity: (0, _reactMotion.spring)(opacityEnd, control)
                        },
                        onRest: this.onMotionEnd },
                    function (_ref) {
                        var top = _ref.top,
                            opacity = _ref.opacity;
                        return _react2['default'].createElement(
                            _DialogWindow2['default'],
                            {
                                ref: function ref(dialogWindow) {
                                    _this2.dialogWindow = dialogWindow;
                                },
                                width: width,
                                title: title,
                                footer: footer,
                                className: windowPartClassName,
                                style: {
                                    opacity: opacity,
                                    transform: 'translate(-50%, ' + Math.round(top) + 'px)'
                                } },
                            body
                        );
                    }
                ),
                _react2['default'].createElement(_Mask2['default'], {
                    show: open,
                    lockScrollingOnShow: true,
                    onClick: this.onMaskClick })
            );
        };

        Dialog.prototype.render = function render() {
            var _state2 = this.state,
                open = _state2.open,
                closing = _state2.closing;

            return _react2['default'].createElement(_Layer2['default'], {
                open: open || closing,
                render: this.renderLayer });
        };

        return Dialog;
    }(_react.Component);

    exports['default'] = Dialog;


    Dialog.displayName = 'Dialog';

    /**
     * propTypes
     *
     * @property {Array<ReactElement>} selectedIndex  选中标签的序号
     * @property {boolean}             maskClickClose 是否点击遮罩时隐藏对话框
     * @property {boolean}             open           是否显示
     * @property {Function}            onHide         隐藏时执行
     * @property {Function}            onShow         显示时执行
     * @property {ReactElement|string} title          标题
     * @property {number|string}       width          对话框宽度
     */
    Dialog.propTypes = {
        actions: _react.PropTypes.node,
        maskClickClose: _react.PropTypes.bool,
        open: _react.PropTypes.bool,
        onHide: _react.PropTypes.func,
        onShow: _react.PropTypes.func,
        title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
        width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
    };

    Dialog.defaultProps = {
        maskClickClose: true,
        open: false
    };
});
//# sourceMappingURL=Dialog.js.map
