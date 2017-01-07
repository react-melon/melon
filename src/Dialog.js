/**
 * @file melon/Dialog
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Mask from './Mask';
import dom from './common/util/dom';
import DialogWindow from './dialog/DialogWindow';
import omit from 'lodash/omit';

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
     * @param  {*} props 属性
     */
    constructor(props) {

        super(props);

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
     * @param {Object}  nestProps 新属性
     */
    componentWillReceiveProps(nestProps) {

        const open = nestProps.open;

        if (open === this.state.open) {
            return;
        }

        this.setState({open}, open ? this.onShow : this.onHide);

    }

    /**
     * 定位对话框
     *
     * @protected
     */
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

    /**
     * 遮罩点击事件处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMaskClick(e) {
        if (this.props.maskClickClose) {
            this.setState({open: false}, this.onHide);
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
                <div ref="dialogActions" className={cx().part('actions').build()}>
                    {actions}
                </div>
            )
            : null;

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {props, state} = this;

        const {
            children,
            width
        } = props;

        const open = state.open;

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

        return (
            <div className={className}>
                <Motion style={{y: spring(open ? 0 : -80)}}>
                    {({y}) =>
                        <DialogWindow
                            top={Math.round(y)}
                            ref={c => {
                                this.dialogWindow = c;
                            }}
                            width={width}
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
