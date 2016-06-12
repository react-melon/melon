/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './Mask', './common/util/dom', './dialog/DialogWindow', './common/util/cxBuilder', 'react-motion', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./Mask'), require('./common/util/dom'), require('./dialog/DialogWindow'), require('./common/util/cxBuilder'), require('react-motion'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Mask, global.dom, global.DialogWindow, global.cxBuilder, global.reactMotion, global.babelHelpers);
        global.Dialog = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Mask, _dom, _DialogWindow, _cxBuilder, _reactMotion, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Mask2 = babelHelpers.interopRequireDefault(_Mask);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    var _DialogWindow2 = babelHelpers.interopRequireDefault(_DialogWindow);

    /**
     * @file melon/Dialog
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Dialog');

    var Dialog = function (_Component) {
        babelHelpers.inherits(Dialog, _Component);

        function Dialog(props) {
            babelHelpers.classCallCheck(this, Dialog);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.originalHTMLBodySize = {};

            _this.state = {
                open: props.open
            };

            _this.onShow = _this.onShow.bind(_this);
            _this.onHide = _this.onHide.bind(_this);
            _this.onMaskClick = _this.onMaskClick.bind(_this);

            return _this;
        }

        Dialog.prototype.componentDidMount = function componentDidMount() {
            if (this.state.open) {
                this.positionDialog();
            }
        };

        Dialog.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
            if (nextState.open) {
                this.positionDialog();
            }
        };

        Dialog.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
            var open = _ref.open;


            if (open === this.state.open) {
                return;
            }

            this.setState({ open: open }, open ? this.onShow : this.onHide);
        };

        Dialog.prototype.positionDialog = function positionDialog() {
            var dialogWindow = _reactDom2['default'].findDOMNode(this.dialogWindow);
            var marginTop = -dialogWindow.offsetHeight / 2;

            var windowHeight = _dom2['default'].getClientHeight();

            marginTop = dialogWindow.offsetHeight > windowHeight ? -windowHeight / 2 + 16 : marginTop;
            dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
            dialogWindow.style.marginTop = marginTop + 'px';
        };

        Dialog.prototype.onMaskClick = function onMaskClick(e) {
            if (this.props.maskClickClose) {
                this.setState({ open: false }, this.onHide);
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

        Dialog.prototype.renderTitle = function renderTitle() {

            var title = this.props.title;

            return title ? _react2['default'].createElement(
                'h1',
                { className: cx().part('title').build() },
                title
            ) : null;
        };

        Dialog.prototype.renderAction = function renderAction() {

            var actions = this.props.actions;

            return actions ? _react2['default'].createElement(
                'div',
                { ref: 'dialogActions', className: cx().part('actions').build() },
                actions
            ) : null;
        };

        Dialog.prototype.render = function render() {
            var _this2 = this;

            var props = this.props;
            var state = this.state;
            var children = props.children;
            var width = props.width;
            var others = babelHelpers.objectWithoutProperties(props, ['children', 'width']);


            var open = state.open;

            var title = this.renderTitle();

            var body = _react2['default'].createElement(
                'div',
                { className: cx().part('body').build() },
                children
            );

            var footer = this.renderAction();

            var windowPartClassName = cx().part('window').addVariants(width === 'adaptive' ? 'adaptive' : undefined).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, { className: cx(props).addStates({ open: open }).build() }),
                _react2['default'].createElement(
                    _reactMotion.Motion,
                    { style: { y: (0, _reactMotion.spring)(open ? 0 : -80) } },
                    function (_ref2) {
                        var y = _ref2.y;
                        return _react2['default'].createElement(
                            _DialogWindow2['default'],
                            {
                                top: Math.round(y),
                                ref: function ref(c) {
                                    _this2.dialogWindow = c;
                                },
                                width: width,
                                title: title,
                                footer: footer,
                                className: windowPartClassName },
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

        return Dialog;
    }(_react.Component);

    exports['default'] = Dialog;


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