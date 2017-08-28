/**
 * @file melon/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import Mask from './Mask';
import DialogWindow from './dialog/DialogWindow';
import Layer from './Layer';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Dialog');

/**
 * melon/Dialog
 *
 * @extends {React.Component}
 * @class
 */
export default class Dialog extends Component {

    constructor(...args) {

        super(...args);

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            open: this.props.open
        };

        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.onMotionEnd = this.onMotionEnd.bind(this);

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {boolean} nextProps.open 下一个状态是打开窗口
     */
    componentWillReceiveProps({open}) {

        if (open === this.state.open) {
            return;
        }

        this.setState(
            open ? {open, closing: false} : {open, closing: this.state.open && !open}
        );

    }

    /**
     * 遮罩点击事件处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMaskClick(e) {

        let {maskClickClose} = this.props;

        e.stopPropagation();

        if (maskClickClose) {
            this.setState({open: false, closing: true});
        }

    }

    /**
     * 显示事件处理
     *
     * @protected
     */
    onShow() {
        const onShow = this.props.onShow;
        if (onShow) {
            onShow();
        }
    }

    /**
     * 隐藏事件处理
     *
     * @protected
     */
    onHide() {
        const onHide = this.props.onHide;
        if (onHide) {
            onHide();
        }
    }

    /**
     * 当动画完成时回调
     *
     * @private
     */
    onMotionEnd() {

        if (!this.state.closing) {
            return;
        }

        this.setState({
            closing: false,
            open: false
        });

        let onHide = this.props.onHide;

        if (onHide) {
            onHide();
        }


    }

    /**
     * 关闭窗口
     *
     * @private
     */
    hide() {

        let {open} = this.state;

        if (!open) {
            return;
        }

        this.setState({open: false});

    }

    /**
     * 获取标题
     *
     * @protected
     * @param {string} title 标题
     * @return {ReactElement|null} [description]
     */
    renderTitle(title) {
        return title
            ? <h1 className={cx().part('title').build()}>{title}</h1>
            : null;
    }

    /**
     * 获取按钮
     *
     * @protected
     * @return {ReactElement|null} [description]
     */
    renderActionPanel() {

        let actions = this.props.actions;

        if (!actions) {
            return null;
        }

        if (!Array.isArray(actions)) {
            actions = [actions];
        }

        if (!actions.length) {
            return null;
        }

        actions = actions
            .map(action => cloneElement(action, {size: action.props.size || 'l'}))
            .reverse();

        return (
            <div className={cx().part('actions').build()}>
                {actions.length === 1 ? actions[0] : actions}
            </div>
        );

    }

    /**
     * 渲染内容
     *
     * @return {ReactElement}
     */
    renderLayer() {

        let {props, state} = this;

        let {
            children,
            width,
            title
        } = props;

        let {open, closing} = state;

        if (title) {
            title = this.renderTitle(title);
        }

        let body = (
            <div className={cx().part('body').build()}>
                {children}
            </div>
        );

        let footer = this.renderActionPanel();

        let windowPartClassName = cx()
            .part('window')
            .addVariants(
                width === 'adaptive' ? 'adaptive' : null,
                title ? null : 'no-title',
            )
            .build();

        let className = cx(props)
            .addStates({
                open: open || closing
            }).build();

        return (
            <div className={className}>
                {/* 这一层用来提供顶部、底部的 padding 空间，主要是超长对话窗好看 */}
                <div className={cx.getPartClassName('content')}>
                    <DialogWindow
                        closing={closing}
                        width={width}
                        title={title}
                        footer={footer}
                        className={windowPartClassName}
                        onMotionEnd={this.onMotionEnd}>
                        {body}
                    </DialogWindow>
                </div>
                <Mask
                    show={open || closing}
                    closing={closing}
                    lockScrollingOnShow={true}
                    onClick={this.onMaskClick} />
            </div>
        );
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {
        let {open, closing} = this.state;
        return (
            <Layer open={open || closing} render={this.renderLayer} />
        );
    }

}

Dialog.displayName = 'Dialog';

/**
 * propTypes
 *
 * @property {Array<ReactElement>} selectedIndex  选中标签的序号
 * @property {boolean}             maskClickClose 是否点击遮罩时隐藏对话框
 * @property {boolean}             open           是否显示
 * @property {Function}            onHide         隐藏时执行
 * @property {Function}            onShow         显示时执行
 * @property {ReactElement|string} title          标题
 * @property {number|string}       width          对话框宽度
 */
Dialog.propTypes = {
    actions: PropTypes.node,
    maskClickClose: PropTypes.bool,
    open: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

Dialog.defaultProps = {
    maskClickClose: true,
    open: false
};
