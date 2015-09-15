/**
 * @file esui-react/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var createControl = require('./common/util/createControl');
var WindowListenable = require('./mixins/window-listenable');
var Mask = require('./Mask.jsx');
var cx = require('./common/util/classname');
var _  = require('underscore');

var Dialog = React.createClass({

    mixins: [WindowListenable],

    originalHTMLBodySize: {},

    statics: {
        type: 'Dialog'
    },

    propTypes: {
        actions: React.PropTypes.array,
        maskClickClose: React.PropTypes.bool,
        isOpen: React.PropTypes.bool,
        onHide: React.PropTypes.func,
        onShow: React.PropTypes.func,
        title: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ])
    },

    windowListeners: {
        resize: 'positionDialog'
    },

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen || false,
        };
    },

    getDefaultProps: function () {
        return {
            maskClickClose: true
        };
    },

    componentDidMount: function () {
        this.positionDialog();
        this.positionDialog = _.throttle.call(this, this.positionDialog, 50);

        _.each(['html', 'body'], function (name) {
            var ele = document.getElementsByTagName(name)[0];
            this.originalHTMLBodySize[name] = {
                width: ele.style.width,
                height: ele.style.height
            };
        }, this);
    },

    componentDidUpdate: function () {
        this.positionDialog();
    },

    componentWillReceiveProps: function (nextProps) {

        var isOpen = nextProps.isOpen;

        if (isOpen !== !this.state.isOpen) {
            return;
        }

        var onEvent = isOpen ? this.onShow : this.onHide;
        this.setState({ isOpen: isOpen }, onEvent);
    },

    positionDialog: function () {

        if (this.state.isOpen) {
            var container = React.findDOMNode(this);
            var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var dialogWindow =  React.findDOMNode(this.refs.dialogWindow);
            var minTop = 16;

            dialogWindow.style.height = '';

            var dialogWindowHeight = dialogWindow.offsetHeight;
            var top = ((clientHeight - dialogWindowHeight) / 2) - 30;

            top = Math.max(top, minTop);

            // Vertically center the dialog window, but make sure it doesn't
            // transition to that position.
            if (!dialogWindow.style.top) {
                dialogWindow.style.top = top + 'px';
            }

            dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
        }
    },

    bodyScrolling: function () {
        var show = this.state.isOpen;
        _.each(['html', 'body'], function (name) {
            var ele = document.getElementsByTagName(name)[0];
            ele.style.height = show ? '100%' : this.originalHTMLBodySize[name].height;
            ele.style.width = show ? '100%' : this.originalHTMLBodySize[name].width;

            if (name === 'html') {
                ele.style.overflowY = show ? 'hidden' : '';
            }
        }, this);
    },

    handleMaskClick: function (e) {
        if (this.props.maskClickClose) {
            this.setState({ isOpen: false }, this.onHide);
        }
        else {
            e.stopPropagation();
        }
    },

    onShow: function () {
        this.bodyScrolling();
        if (this.props.onShow) {
            this.props.onShow();
        }
    },

    onHide: function () {
        this.bodyScrolling();
        if (this.props.onHide) {
            this.props.onHide();
        }
        var dialogWindow =  React.findDOMNode(this.refs.dialogWindow);
        dialogWindow.style.top = '';
    },

    getTitle: function () {
        var title = this.props.title;

        var classname = cx.createComponentClass('dialog-title');

        return title ? <h1 className={classname} key="title">{title}</h1> : null;
    },

    getAction: function () {
        var actions = this.props.actions;

        var classname = cx.createComponentClass('dialog-actions');

        return actions ? (
            <div ref="dialogActions" className={classname} key="actions">
                {actions}
            </div>
        ) : null;
    },

    render: function() {

        var props = this.props;

        var isOpen = this.state.isOpen;

        var bodyClassName = cx.createComponentClass('dialog-body');
        var windowClassName = cx.createComponentClass('dialog-window');

        var className = cx.createComponentClass('dialog', [], {open: isOpen});

        return (
            <div {...props} className={className}>
                <div className={windowClassName} ref="dialogWindow">
                    {isOpen && [
                        this.getTitle(),
                        <div ref="dialogContent" className={bodyClassName} key="body">
                            {props.children}
                        </div>,
                        this.getAction()
                    ]}
                </div>
                <Mask
                  ref="dialogMask"
                  show={isOpen}
                  autoLockScrolling={false}
                  onClick={this.handleMaskClick} />
            </div>
        );

    }

});

module.exports = createControl(Dialog);
