/**
 * @file esui-react/Dialog
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Mask = require('./Mask');
var _  = require('underscore');
var dom = require('./common/util/dom');

var Component = require('./Component');
var DialogWindow = require('./dialog/DialogWindow');
var windowScrollHelper = require('./dialog/windowScrollHelper');

var {
    Motion,
    spring
} = require('react-motion');

class Dialog extends Component {

    static displayName = 'Dialog';

    constructor(props) {
        super(props);
        this.originalHTMLBodySize = {};
        this.state = {
            open: this.props.open || false
        };
        this.positionDialog = this.positionDialog.bind(this);
        this.handleMaskClick = this.handleMaskClick.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);

        this.marginTop = -150;
    }

    componentDidMount() {
        this.positionDialog();
        if (this.state.open) {
            this.dialogWindow.style.marginTop = this.marginTop + 'px';
        }
    }

    componentWillUpdate() {
        this.positionDialog();
    }

    componentWillReceiveProps(nextProps) {

        var open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        var onEvent = open ? this.onShow : this.onHide;
        this.setState({open: open}, onEvent);

    }

    positionDialog() {
        var dialogWindow = ReactDOM.findDOMNode(this.dialogWindow);
        this.marginTop = -dialogWindow.offsetHeight / 2;

        var windowHeight = dom.getClientHeight();

        this.marginTop = dialogWindow.offsetHeight > windowHeight
                        ? (-windowHeight / 2 + 16)
                        : this.marginTop;
        dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
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
    }

    getStates(props) {
        var states = super.getStates(props);
        states.open = this.state.open;
        return states;
    }

    render() {

        var {
            children,
            ...others
        } = this.props;

        let open = this.state.open;
        let top = this.marginTop;
        let title = this.renderTitle();
        let body = (
            <div className={this.getPartClassName('body')}>
                {children}
            </div>
        );
        let footer = this.renderAction();
        let windowPartClassName = this.getPartClassName('window');

        return (
            <div {...others} className={this.getClassName()}>
                <Motion style={{y: spring(open ? top : -150)}}>
                    {({y}) =>
                        <DialogWindow
                            top={Math.round(y)}
                            ref={(c) => {
                                this.dialogWindow = c;
                            }}
                            title={title}
                            footer={footer}
                            className={windowPartClassName} >
                            {body}
                        </DialogWindow>
                    }
                </Motion>
                <Mask
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
    maskClickClose: true
};

module.exports = Dialog;
