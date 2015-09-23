/**
 * @file esui-react/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Mask = require('./Mask.jsx');
var _  = require('underscore');

var WindowResizeAware = require('./dialog/WindowResizeAware.jsx');

class Dialog extends WindowResizeAware {

    constructor(props) {
        super(props);
        this.originalHTMLBodySize = {};
        this.state = {
            isOpen: this.props.isOpen || false,
        };
        this.positionDialog = _.throttle.call(this, this.positionDialog, 50);
        this.handleMaskClick = this.handleMaskClick.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {

        this.positionDialog();

        _.each(['html', 'body'], function (name) {
            var ele = document.getElementsByTagName(name)[0];
            this.originalHTMLBodySize[name] = {
                width: ele.style.width,
                height: ele.style.height
            };
        }, this);

    }

    componentDidUpdate() {
        this.positionDialog();
    }

    componentWillReceiveProps(nextProps) {

        var isOpen = nextProps.isOpen;

        if (isOpen === this.state.isOpen) {
            return;
        }

        var onEvent = isOpen ? this.onShow : this.onHide;
        this.setState({ isOpen: isOpen }, onEvent);

    }

    positionDialog() {

        if (!this.state.isOpen) {
            return;
        }

        var container = ReactDOM.findDOMNode(this);
        var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var dialogWindow = this.refs.dialogWindow;
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

        container.style.left = 0;

    }

    bodyScrolling() {
        var show = this.state.isOpen;
        _.each(['html', 'body'], function (name) {
            var ele = document.getElementsByTagName(name)[0];
            ele.style.height = show ? '100%' : this.originalHTMLBodySize[name].height;
            ele.style.width = show ? '100%' : this.originalHTMLBodySize[name].width;

            if (name === 'html') {
                ele.style.overflowY = show ? 'hidden' : '';
            }
        }, this);
    }

    handleMaskClick(e) {
        if (this.props.maskClickClose) {
            this.setState({ isOpen: false }, this.onHide);
        }
        else {
            e.stopPropagation();
        }
    }

    onShow() {
        this.bodyScrolling();
        if (_.isFunction(this.props.onShow)) {
            this.props.onShow();
        }
    }

    onHide() {
        this.bodyScrolling();
        if (_.isFunction(this.props.onHide)) {
            this.props.onHide();
        }
        var dialogWindow =  this.refs.dialogWindow;
        dialogWindow.style.top = '';

        var container = ReactDOM.findDOMNode(this);
        setTimeout(function () {
            container.style.left = '-10000px';
        }, 200);
    }

    getStates(props) {
        var states = super.getStates(props);
        states.open = this.state.isOpen;
        return states;
    }

    render() {

        var props = this.props;

        var isOpen = this.state.isOpen;

        return (
            <div {...props} className={this.getClassName()}>
                <div ref="dialogWindow" className={this.getPartClassName('window')} >
                    {this.renderTitle()}
                    <div ref="dialogContent" className={this.getPartClassName('body')}>
                        {props.children}
                    </div>
                    {this.renderAction()}
                </div>
                <Mask
                  ref="dialogMask"
                  show={isOpen}
                  autoLockScrolling={false}
                  onClick={this.handleMaskClick} />
            </div>
        );

    }

    renderTitle() {
        var title = this.props.title;
        return title
            ? <h1 className={this.getPartClassName('title')}>{title}</h1>
            : null;
    }

    renderAction() {
        var actions = this.props.actions;
        return actions
            ? (
                <div ref="dialogActions"
                    className={this.getPartClassName('actions')}>
                    {actions}
                </div>
            )
            : null;
    }

}

Dialog.propTypes = {
    actions: React.PropTypes.array,
    maskClickClose: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    onHide: React.PropTypes.func,
    onShow: React.PropTypes.func,
    title: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ])
};

Dialog.defaultProps = {
    ...WindowResizeAware.defaultProps,
    maskClickClose: true
};

module.exports = Dialog;
