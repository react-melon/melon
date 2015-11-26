define('melon/Dialog', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './Mask',
    './common/util/dom',
    './common/util/cxBuilder',
    './dialog/DialogWindow',
    './dialog/windowScrollHelper',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Mask = require('./Mask');
    var dom = require('./common/util/dom');
    var cx = require('./common/util/cxBuilder').create('Dialog');
    var DialogWindow = require('./dialog/DialogWindow');
    var windowScrollHelper = require('./dialog/windowScrollHelper');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var PropTypes = React.PropTypes;
    var Dialog = React.createClass({
        displayName: 'Dialog',
        propTypes: {
            actions: PropTypes.node,
            maskClickClose: PropTypes.bool,
            open: PropTypes.bool,
            onHide: PropTypes.func,
            onShow: PropTypes.func,
            title: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ])
        },
        getDefaultProps: function () {
            return {
                maskClickClose: true,
                open: false
            };
        },
        getInitialState: function () {
            this.originalHTMLBodySize = {};
            return { open: this.props.open };
        },
        componentDidMount: function () {
            this.positionDialog();
        },
        componentWillUpdate: function () {
            this.positionDialog();
        },
        componentWillReceiveProps: function (nextProps) {
            var open = nextProps.open;
            if (open === this.state.open) {
                return;
            }
            var onEvent = open ? this.onShow : this.onHide;
            this.setState({ open: open }, onEvent);
        },
        positionDialog: function () {
            var dialogWindow = ReactDOM.findDOMNode(this.dialogWindow);
            var marginTop = -dialogWindow.offsetHeight / 2;
            var windowHeight = dom.getClientHeight();
            marginTop = dialogWindow.offsetHeight > windowHeight ? -windowHeight / 2 + 16 : marginTop;
            dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
            dialogWindow.style.marginTop = marginTop + 'px';
        },
        bodyScrolling: function () {
            var show = this.state.open;
            windowScrollHelper[show ? 'stop' : 'restore']();
        },
        handleMaskClick: function (e) {
            if (this.props.maskClickClose) {
                this.setState({ open: false }, this.onHide);
            } else {
                e.stopPropagation();
            }
        },
        onShow: function () {
            this.bodyScrolling();
            var onShow = this.props.onShow;
            if (onShow) {
                onShow();
            }
        },
        onHide: function () {
            this.bodyScrolling();
            var onHide = this.props.onHide;
            if (onHide) {
                onHide();
            }
        },
        renderTitle: function () {
            var title = this.props.title;
            return title ? React.createElement('h1', { className: cx().part('title').build() }, title) : null;
        },
        renderAction: function () {
            var actions = this.props.actions;
            return actions ? React.createElement('div', {
                ref: 'dialogActions',
                className: cx().part('actions').build()
            }, actions) : null;
        },
        render: function () {
            var _this = this;
            var props = this.props;
            var state = this.state;
            var children = props.children;
            var others = babelHelpers.objectWithoutProperties(props, ['children']);
            var open = state.open;
            var title = this.renderTitle();
            var body = React.createElement('div', { className: cx().part('body').build() }, children);
            var footer = this.renderAction();
            var windowPartClassName = cx().part('window').build();
            return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ open: open }).build() }), React.createElement(Motion, { style: { y: spring(open ? 0 : -80) } }, function (_ref) {
                var y = _ref.y;
                return React.createElement(DialogWindow, {
                    top: Math.round(y),
                    ref: function (c) {
                        _this.dialogWindow = c;
                    },
                    title: title,
                    footer: footer,
                    className: windowPartClassName
                }, body);
            }), React.createElement(Mask, {
                show: open,
                autoLockScrolling: false,
                onClick: this.handleMaskClick
            }));
        }
    });
    module.exports = Dialog;
});