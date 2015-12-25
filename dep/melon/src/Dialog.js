/**
 * @file esui-react/Dialog
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');
const Mask = require('./Mask');
const dom = require('./common/util/dom');
const cx = require('./common/util/cxBuilder').create('Dialog');
const DialogWindow = require('./dialog/DialogWindow');
const windowScrollHelper = require('./dialog/windowScrollHelper');

const {
    Motion,
    spring
} = require('react-motion');

const {PropTypes} = React;

const Dialog = React.createClass({

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

    getInitialState() {

        this.originalHTMLBodySize = {};

        return {
            open: this.props.open
        };

    },

    componentDidMount() {
        this.positionDialog();
    },

    componentWillUpdate() {
        this.positionDialog();
    },

    componentWillReceiveProps(nextProps) {

        var open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        var onEvent = open ? this.onShow : this.onHide;
        this.setState({open: open}, onEvent);

    },

    positionDialog() {
        let dialogWindow = ReactDOM.findDOMNode(this.dialogWindow);
        let marginTop = -dialogWindow.offsetHeight / 2;

        let windowHeight = dom.getClientHeight();

        marginTop = dialogWindow.offsetHeight > windowHeight
                        ? (-windowHeight / 2 + 16)
                        : marginTop;
        dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
        dialogWindow.style.marginTop = marginTop + 'px';
    },

    bodyScrolling() {
        var show = this.state.open;
        windowScrollHelper[show ? 'stop' : 'restore']();
    },

    handleMaskClick(e) {
        if (this.props.maskClickClose) {
            this.setState({open: false}, this.onHide);
        }
        else {
            e.stopPropagation();
        }
    },

    onShow() {
        this.bodyScrolling();
        const {onShow} = this.props;
        if (onShow) {
            onShow();
        }
    },

    onHide() {
        this.bodyScrolling();
        const {onHide} = this.props;
        if (onHide) {
            onHide();
        }
    },

    renderTitle() {
        var title = this.props.title;
        return title
            ? <h1 className={cx().part('title').build()}>{title}</h1>
            : null;
    },

    renderAction() {
        var actions = this.props.actions;
        return actions
            ? (
                <div ref="dialogActions" className={cx().part('actions').build()}>
                    {actions}
                </div>
            )
            : null;
    },

    render() {

        let {props, state} = this;

        const {
            children,
            ...others
        } = props;

        const {open} = state;

        let title = this.renderTitle();

        const body = (
            <div className={cx().part('body').build()}>
                {children}
            </div>
        );

        const footer = this.renderAction();

        const windowPartClassName = cx().part('window').build();

        return (
            <div {...others} className={cx(props).addStates({open}).build()}>
                <Motion style={{y: spring(open ? 0 : -80)}}>
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

});

module.exports = Dialog;
