/**
 * @file melon/SnackBar
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from './Button';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('SnackBar');

/**
 * melon/SnackBar
 *
 * @extends {React.Component}
 * @class
 */
export default class SnackBar extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     */
    constructor(props) {

        super(props);

        /**
         * timeoutId
         *
         * @type {?number}
         */
        this.autoHideTimer = null;

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onHide = this.onHide.bind(this);

        /**
         * 状态
         *
         * @type {Object}
         */
        this.state = {
            open: props.open
        };

    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {

        window.addEventListener('mouseup', this.onMouseUp);

        if (this.props.openOnMount) {
            this.onShow();
        }

        this.locate();

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        const open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        open ? this.onShow() : this.onHide();

    }

    /**
     * 状态更新后的处理
     *
     * @public
     * @override
     */
    componentDidUpdate() {
        this.locate();
    }

    /**
     * unount时的处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {

        window.removeEventListener('mouseup', this.onMouseUp);

        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }

    }

    /**
     * 定位浮层
     *
     * @private
     * @return {undefined}
     */
    locate() {

        const direction = this.props.direction;

        const open = this.state.open;

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

    /**
     * 显示时的处理
     *
     * @protected
     */
    onHide() {

        const onHide = this.props.onHide;

        this.setState({open: false}, function () {
            if (onHide) {
                onHide();
            }
        });

    }

    /**
     * 隐藏时的处理
     *
     * @protected
     */
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

    /**
     * 鼠标抬起时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMouseUp(e) {

        if (!this.state.open) {
            return;
        }

        e = e || window.event;

        const target = e.target || e.srcElement;

        const main = ReactDOM.findDOMNode(this);

        // 点击不在 snackBar 内部
        if (main !== target && !main.contains(target)) {
            this.onHide();
            return;
        }
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            message,
            action,
            direction
        } = this.props;

        const open = this.state.open;

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
