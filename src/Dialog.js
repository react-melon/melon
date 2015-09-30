/**
 * @file esui-react/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Mask = require('./Mask');
var _  = require('underscore');

var WindowResizeAware = require('./dialog/WindowResizeAware');
var windowScrollHelper = require('./dialog/windowScrollHelper');

class Dialog extends WindowResizeAware {

    constructor(props) {
        super(props);
        this.originalHTMLBodySize = {};
        this.state = {
            open: this.props.open || false,
        };
        this.positionDialog = _.throttle.call(this, this.positionDialog, 50);
        this.handleMaskClick = this.handleMaskClick.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        this.positionDialog();
    }

    componentDidUpdate() {
        this.positionDialog();
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.positionDialog();
        return true;
    }

    componentWillReceiveProps(nextProps) {

        var open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        var onEvent = open ? this.onShow : this.onHide;
        this.setState({open: open}, onEvent);

    }

    onWindowResize(e) {
        this.positionDialog();
    }

    positionDialog() {

        if (!this.state.open) {
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

        dialogWindow.style.top = top + 'px';

        dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';

        container.style.left = 0;

    }

    bodyScrolling() {
        var show = this.state.open;
        windowScrollHelper[show ? 'stop' : 'restore']();
    }

    handleMaskClick(e) {
        if (this.props.maskClickClose) {
            this.setState({open: false}, this.onHide);
        }
        else {
            e.stopPropagation();
        }
    }

    onShow() {
        this.bodyScrolling();
        var onShow = this.props.onShow;
        if (_.isFunction(onShow)) {
            onShow();
        }
    }

    onHide() {
        this.bodyScrolling();
        if (_.isFunction(this.props.onHide)) {
            this.props.onHide();
        }

        // 隐藏时，向上滚动动画的hack
        // 隐藏的时候把inline的top样式去掉，下次打开的时候才会出动画
        // main的left属性要延迟设置
        var dialogWindow =  this.refs.dialogWindow;
        dialogWindow.style.top = '';

        var main = ReactDOM.findDOMNode(this);
        setTimeout(function () {
            main.style.left = '-10000px';
        }, 200);
    }

    getStates(props) {
        var states = super.getStates(props);
        states.open = this.state.open;
        return states;
    }

    render() {

        var {
            title,
            children,
            ...others
        } = this.props;

        var open = this.state.open;

        return (
            <div {...others} className={this.getClassName()}>
                <div ref="dialogWindow" className={this.getPartClassName('window')} >
                    {this.renderTitle()}
                    <div ref="dialogContent" className={this.getPartClassName('body')}>
                        {children}
                    </div>
                    {this.renderAction()}
                </div>
                <Mask
                  ref="dialogMask"
                  show={open}
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
    open: React.PropTypes.bool,
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
