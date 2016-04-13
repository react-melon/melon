/**
 * @file melon/SnackBar
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import * as dom from './common/util/dom';
import {create} from './common/util/cxBuilder';

const cx = create('SnackBar');

export default class SnackBar extends Component {

    constructor(props) {

        super(props);

        this.autoHideTimer = null;

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onHide = this.onHide.bind(this);

        this.state = {
            open: this.props.open
        };

    }

    componentDidMount() {

        dom.on(document.body, 'mouseup', this.onMouseUp);

        if (this.props.openOnMount) {
            this.onShow();
        }

        this.locate();

    }

    componentWillReceiveProps(nextProps) {

        const {open} = nextProps;

        if (open === this.state.open) {
            return;
        }

        open ? this.onShow() : this.onHide();

    }

    componentDidUpdate() {
        this.locate();
    }

    componentWillUnmount() {

        dom.off(document.body, 'mouseup', this.onMouseUp);

        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }

    }

    locate() {

        const {
            direction
        } = this.props;

        const {open} = this.state;

        const main = ReactDOM.findDOMNode(this);

        if (open) {
            return;
        }

        switch (direction) {
            case 'bc':
            case 'tc':
                main.style.marginTop = '';
                main.style.marginLeft = -main.offsetWidth / 2 + 'px';
                break;
            case 'lc':
            case 'rc':
                main.style.marginLeft = '';
                main.style.marginTop = -main.offsetHeight / 2 + 'px';
                break;
        }

    }

    onHide() {

        const {onHide} = this.props;

        this.setState({open: false}, function () {
            if (onHide) {
                onHide();
            }
        });

    }

    onShow() {

        const {
            onShow,
            autoHideDuration
        } = this.props;

        this.setState({open: true}, function () {

            if (onShow) {
                onShow();
            }

            if (autoHideDuration > 0) {

                this.autoHideTimer = setTimeout(
                    () => {
                        this.onHide();
                    },
                    autoHideDuration
                );

            }

        });

    }

    onMouseUp(e) {

        if (!this.state.open) {
            return;
        }

        e = e || window.event;

        const target = e.target || e.srcElement;

        const main = ReactDOM.findDOMNode(this);

        // 点击不在 snackBar 内部
        if (main !== target && !dom.contains(main, target)) {
            this.onHide();
            return;
        }
    }

    render() {

        const {
            message,
            action,
            direction
        } = this.props;

        const {open} = this.state;

        const className = cx(this.props)
            .addStates({open})
            .addVariants(`direction-${direction}`)
            .build();

        return (
            <div className={className}>
                <span className={cx().part('message').build()}>
                    {message}
                </span>
                <Button
                    variants={['snackbar']}
                    className={cx().part('action').build()}
                    onClick={this.onHide} >
                    {action}
                </Button>
            </div>
        );

    }

}

SnackBar.displayName = 'SnackBar';

SnackBar.defaultProps = {
    autoHideDuration: 0,
    action: '关闭',
    direction: 'bl'
};

SnackBar.propTypes = {
    action: PropTypes.string,
    autoHideDuration: PropTypes.number,
    message: PropTypes.node.isRequired,
    openOnMount: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    direction: PropTypes.oneOf(['tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt', 'tl', 'tc', 'rc', 'bc', 'lc'])
};


SnackBar.show = function (message, duration = 0, direction = 'bl') {

    let doc = document;
    let body = doc.body;
    let container = doc.createElement('div');

    body.appendChild(container);

    let snackbar = (
        <SnackBar
            autoHideDuration={duration}
            message={message}
            direction={direction}
            onHide={() => {

                // 这里 delay 400 是因为要等动画搞完
                setTimeout(
                    () => {
                        if (container) {
                            ReactDOM.unmountComponentAtNode(container);
                            body.removeChild(container);
                            body = doc = container = snackbar = null;
                        }
                    },
                    400
                );

            }} />
    );

    ReactDOM.render(snackbar, container, () => {
        snackbar = React.cloneElement(snackbar, {open: true});
        setTimeout(
            () => {
                ReactDOM.render(snackbar, container);
            },
            0
        );
    });

    return snackbar;
};
