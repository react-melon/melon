define('melon/Dialog', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './Mask',
    'underscore',
    './dialog/WindowResizeAware',
    './dialog/windowScrollHelper'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Mask = require('./Mask');
    var _ = require('underscore');
    var WindowResizeAware = require('./dialog/WindowResizeAware');
    var windowScrollHelper = require('./dialog/windowScrollHelper');
    var Dialog = function (_WindowResizeAware) {
        babelHelpers.inherits(Dialog, _WindowResizeAware);
        function Dialog(props) {
            babelHelpers.classCallCheck(this, Dialog);
            babelHelpers.get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).call(this, props);
            this.originalHTMLBodySize = {};
            this.state = { open: this.props.open || false };
            this.positionDialog = _.throttle.call(this, this.positionDialog, 50);
            this.handleMaskClick = this.handleMaskClick.bind(this);
            this.onShow = this.onShow.bind(this);
            this.onHide = this.onHide.bind(this);
        }
        babelHelpers.createClass(Dialog, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    babelHelpers.get(Object.getPrototypeOf(Dialog.prototype), 'componentDidMount', this).call(this);
                    this.positionDialog();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.positionDialog();
                }
            },
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    this.positionDialog();
                    return true;
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
                key: 'onWindowResize',
                value: function onWindowResize(e) {
                    this.positionDialog();
                }
            },
            {
                key: 'positionDialog',
                value: function positionDialog() {
                    if (!this.state.open) {
                        return;
                    }
                    var container = ReactDOM.findDOMNode(this);
                    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    var dialogWindow = this.refs.dialogWindow;
                    var minTop = 16;
                    dialogWindow.style.height = '';
                    var dialogWindowHeight = dialogWindow.offsetHeight;
                    var top = (clientHeight - dialogWindowHeight) / 2 - 30;
                    top = Math.max(top, minTop);
                    dialogWindow.style.top = top + 'px';
                    dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
                    container.style.left = 0;
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
                    var dialogWindow = this.refs.dialogWindow;
                    dialogWindow.style.top = '';
                    var main = ReactDOM.findDOMNode(this);
                    setTimeout(function () {
                        main.style.left = '-10000px';
                    }, 200);
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
                    var _props = this.props;
                    var title = _props.title;
                    var children = _props.children;
                    var others = babelHelpers.objectWithoutProperties(_props, [
                        'title',
                        'children'
                    ]);
                    var open = this.state.open;
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement('div', {
                        ref: 'dialogWindow',
                        className: this.getPartClassName('window')
                    }, this.renderTitle(), React.createElement('div', {
                        ref: 'dialogContent',
                        className: this.getPartClassName('body')
                    }, children), this.renderAction()), React.createElement(Mask, {
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
    }(WindowResizeAware);
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
    Dialog.defaultProps = babelHelpers._extends({}, WindowResizeAware.defaultProps, { maskClickClose: true });
    module.exports = Dialog;
});