/**
 * @file melon/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Mask from './Mask';
import * as dom from './common/util/dom';
import DialogWindow from './dialog/DialogWindow';
import Layer from './Layer';
import {create} from 'melon-core/classname/cxBuilder';

import {Motion, spring} from 'react-motion';

const cx = create('Dialog');

/**
 * melon/Dialog
 *
 * @extends {React.Component}
 * @class
 */
export default class Dialog extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param {*} props 属性
     * @param {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        /**
         * 保存原始的 html body 样式
         *
         * @private
         * @type {Object}
         */
        this.originalHTMLBodySize = {};

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            open: props.open
        };

        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.onMotionEnd = this.onMotionEnd.bind(this);

    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {
        if (this.state.open) {
            this.positionDialog();
        }
    }

    /**
     * 状态更新时的处理
     *
     * @public
     * @override
     */
    componentDidUpdate() {
        if (this.state.open) {
            this.positionDialog();
        }
    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {Object} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        const open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        // 如果是打开，那么就直接打开。
        if (open) {
            this.setState({open: true});
            return;
        }

        // 如果是关闭，但我们正在关闭，就算了。
        if (!this.state.closing) {
            this.hide();
        }

    }

    /**
     * 定位对话框
     *
     * @protected
     */
    positionDialog() {

        let dialogWindow = this.dialogWindow;

        if (!dialogWindow) {
            return;
        }

        dialogWindow = ReactDOM.findDOMNode(this.dialogWindow);

        if (this.state.open) {
            let marginTop = -dialogWindow.offsetHeight / 2;
            let windowHeight = dom.getClientHeight();

            marginTop = dialogWindow.offsetHeight > windowHeight
            ? (-windowHeight / 2 + 16)
            : marginTop;

            dialogWindow.style.marginTop = marginTop + 'px';
        }
        else {
            dialogWindow.style.marginTop = 0;
        }


    }

    /**
     * 遮罩点击事件处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMaskClick(e) {

        if (this.props.maskClickClose) {
            this.hide();
        }
        else {
            e.stopPropagation();
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
     */
    onMotionEnd() {

        if (this.state.closing) {

            this.setState({
                closing: false,
                open: false
            });

            let onHide = this.props.onHide;

            if (onHide) {
                onHide();
            }

        }

    }

    /**
     * 关闭窗口
     */
    hide() {

        let {open, closing} = this.state;

        if (!open || closing) {
            return;
        }

        this.setState({closing: true});

    }

    /**
     * 获取标题
     *
     * @protected
     * @return {ReactElement|null} [description]
     */
    renderTitle() {

        const title = this.props.title;

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
    renderAction() {

        const actions = this.props.actions;

        return actions
            ? (
                <div className={cx().part('actions').build()}>
                    {actions}
                </div>
            )
            : null;

    }

    /**
     * 渲染内容
     *
     * @return {ReactElement}
     */
    renderLayer() {

        const {props, state} = this;

        const {
            children,
            width
        } = props;

        const {open, closing} = state;

        const title = this.renderTitle();

        const body = (
            <div className={cx().part('body').build()}>
                {children}
            </div>
        );

        const footer = this.renderAction();

        const windowPartClassName = cx()
            .part('window')
            .addVariants(width === 'adaptive' ? 'adaptive' : undefined)
            .build();

        const className = cx(props).addStates({open}).build();

        const opening = open && !closing;

        const distance = dom.getClientHeight() * 0.4 * (opening ? -1 : 1);
        const yBegin = opening ? distance : 0;
        const yEnd = opening ? 0 : distance;
        const opacityBegin = opening ? 0 : 1;
        const opacityEnd = opening ? 1 : 0;
        const control = {stiffness: 200, damping: 18, precision: 1};

        return (
            <div className={className} style={!opening ? {overflow: 'hidden'} : null}>
                <Motion
                    defaultStyle={{
                        top: yBegin,
                        opacity: opacityBegin
                    }}
                    style={{
                        top: spring(yEnd, control),
                        opacity: spring(opacityEnd, control)
                    }}
                    onRest={this.onMotionEnd()}>
                    {({top, opacity}) => (
                        <DialogWindow
                           ref={c => {
                               this.dialogWindow = c;
                           }}
                           width={width}
                           title={title}
                           footer={footer}
                           className={windowPartClassName}
                           style={{
                               opacity: opacity,
                               transform: `translate(-50%, ${Math.round(top)}px)`
                           }}>
                           {body}
                       </DialogWindow>
                   )}
                </Motion>
                <Mask
                    show={open}
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
            <Layer
                open={open || closing}
                render={this.renderLayer} />
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
