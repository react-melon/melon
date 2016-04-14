/**
 * @file melon/Dialog
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Mask from './Mask';
import dom from './common/util/dom';
import DialogWindow from './dialog/DialogWindow';
import * as windowScrollHelper from './dialog/windowScrollHelper';

import {create} from './common/util/cxBuilder';

import {Motion, spring} from 'react-motion';

const cx = create('Dialog');

export default class Dialog extends Component {

    constructor(props) {

        super(props);

        this.originalHTMLBodySize = {};

        this.state = {
            open: this.props.open
        };

        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);

    }

    componentDidMount() {
        this.positionDialog();
    }

    componentWillUpdate() {
        this.positionDialog();
    }

    componentWillReceiveProps({open}) {

        if (open === this.state.open) {
            return;
        }

        this.setState({open}, open ? this.onShow : this.onHide);

    }

    positionDialog() {
        let dialogWindow = ReactDOM.findDOMNode(this.dialogWindow);
        let marginTop = -dialogWindow.offsetHeight / 2;

        let windowHeight = dom.getClientHeight();

        marginTop = dialogWindow.offsetHeight > windowHeight
                        ? (-windowHeight / 2 + 16)
                        : marginTop;
        dialogWindow.style.marginLeft = -dialogWindow.offsetWidth / 2 + 'px';
        dialogWindow.style.marginTop = marginTop + 'px';
    }

    bodyScrolling() {
        const {show} = this.state;
        windowScrollHelper[show ? 'stop' : 'restore']();
    }

    onMaskClick(e) {
        if (this.props.maskClickClose) {
            this.setState({open: false}, this.onHide);
        }
        else {
            e.stopPropagation();
        }
    }

    onShow() {
        this.bodyScrolling();
        const {onShow} = this.props;
        if (onShow) {
            onShow();
        }
    }

    onHide() {
        this.bodyScrolling();
        const {onHide} = this.props;
        if (onHide) {
            onHide();
        }
    }

    renderTitle() {

        const {title} = this.props;

        return title
            ? <h1 className={cx().part('title').build()}>{title}</h1>
            : null;

    }

    renderAction() {

        const {actions} = this.props;

        return actions
            ? (
                <div ref="dialogActions" className={cx().part('actions').build()}>
                    {actions}
                </div>
            )
            : null;

    }

    render() {

        const {props, state} = this;

        const {
            children,
            ...others
        } = props;

        const {open} = state;

        const title = this.renderTitle();

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
                            ref={c => {
                                this.dialogWindow = c;
                            }}
                            title={title}
                            footer={footer}
                            className={windowPartClassName}>
                            {body}
                        </DialogWindow>
                    }
                </Motion>
                <Mask
                    show={open}
                    lockScrollingOnShow={true}
                    onClick={this.onMaskClick} />
            </div>
        );

    }

}

Dialog.propTypes = {
    actions: PropTypes.node,
    maskClickClose: PropTypes.bool,
    open: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};

Dialog.defaultProps = {
    maskClickClose: true,
    open: false
};
