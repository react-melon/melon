define('melon/Dialog', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Mask',
    'underscore',
    './common/util/dom',
    './Component',
    './dialog/windowScrollHelper',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Mask = require('./Mask');
    var _ = require('underscore');
    var dom = require('./common/util/dom');
    var Component = require('./Component');
    var windowScrollHelper = require('./dialog/windowScrollHelper');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var Dialog = function (_Component) {
        babelHelpers.inherits(Dialog, _Component);
        babelHelpers.createClass(Dialog, null, [{
                key: 'displayName',
                value: 'Dialog',
                enumerable: true
            }]);
        function Dialog(props) {
            babelHelpers.classCallCheck(this, Dialog);
            babelHelpers.get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).call(this, props);
            this.originalHTMLBodySize = {};
            this.state = { open: this.props.open || false };
            this.positionDialog = this.positionDialog.bind(this);
            this.handleMaskClick = this.handleMaskClick.bind(this);
            this.onShow = this.onShow.bind(this);
            this.onHide = this.onHide.bind(this);
            this.marginTop = -150;
        }
        babelHelpers.createClass(Dialog, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.positionDialog();
                    if (this.state.open) {
                        this.dialogWindow.style.marginTop = this.marginTop + 'px';
                    }
                }
            },
            {
                key: 'componentWillUpdate',
                value: function componentWillUpdate() {
                    this.positionDialog();
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var open = nextProps.open;
                    if (open === this.state.open) {
                        return;
                    }
                    var onEvent = open ? this.onShow : this.onHide;
                    this.setState({ open: open }, onEvent);
                }
            },
            {
                key: 'positionDialog',
                value: function positionDialog() {
                    var dialogWindow = this.dialogWindow;
                    this.marginTop = -dialogWindow.offsetHeight / 2;
                    var windowHeight = dom.getClientHeight();
                    this.marginTop = dialogWindow.offsetHeight > windowHeight ? -windowHeight / 2 + 16 : this.marginTop;
                    dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
                }
            },
            {
                key: 'bodyScrolling',
                value: function bodyScrolling() {
                    var show = this.state.open;
                    windowScrollHelper[show ? 'stop' : 'restore']();
                }
            },
            {
                key: 'handleMaskClick',
                value: function handleMaskClick(e) {
                    if (this.props.maskClickClose) {
                        this.setState({ open: false }, this.onHide);
                    } else {
                        e.stopPropagation();
                    }
                }
            },
            {
                key: 'onShow',
                value: function onShow() {
                    this.bodyScrolling();
                    var onShow = this.props.onShow;
                    if (_.isFunction(onShow)) {
                        onShow();
                    }
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    this.bodyScrolling();
                    if (_.isFunction(this.props.onHide)) {
                        this.props.onHide();
                    }
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(Dialog.prototype), 'getStates', this).call(this, props);
                    states.open = this.state.open;
                    return states;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var _props = this.props;
                    var children = _props.children;
                    var others = babelHelpers.objectWithoutProperties(_props, ['children']);
                    var open = this.state.open;
                    var top = this.marginTop;
                    var title = this.renderTitle();
                    var body = React.createElement('div', { className: this.getPartClassName('body') }, children);
                    var footer = this.renderAction();
                    var windowPartClassName = this.getPartClassName('window');
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement(Motion, { style: { y: spring(open ? top : -150) } }, function (_ref) {
                        var y = _ref.y;
                        return React.createElement('div', {
                            style: { marginTop: Math.round(y) },
                            ref: function (c) {
                                _this.dialogWindow = c;
                            },
                            className: windowPartClassName
                        }, title, body, footer);
                    }), React.createElement(Mask, {
                        ref: 'dialogMask',
                        show: open,
                        autoLockScrolling: false,
                        onClick: this.handleMaskClick
                    }));
                }
            },
            {
                key: 'renderTitle',
                value: function renderTitle() {
                    var title = this.props.title;
                    return title ? React.createElement('h1', { className: this.getPartClassName('title') }, title) : null;
                }
            },
            {
                key: 'renderAction',
                value: function renderAction() {
                    var actions = this.props.actions;
                    return actions ? React.createElement('div', {
                        ref: 'dialogActions',
                        className: this.getPartClassName('actions')
                    }, actions) : null;
                }
            }
        ]);
        return Dialog;
    }(Component);
    Dialog.propTypes = {
        actions: React.PropTypes.array,
        maskClickClose: React.PropTypes.bool,
        open: React.PropTypes.bool,
        onHide: React.PropTypes.func,
        onShow: React.PropTypes.func,
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ])
    };
    Dialog.defaultProps = { maskClickClose: true };
    module.exports = Dialog;
});