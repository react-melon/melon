/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Children} from 'react';
import Icon from './Icon';
import InputComponent from 'melon-core/InputComponent';
import Group from './select/OptionGroup';
import Option from './select/Option';
import {create} from 'melon-core/classname/cxBuilder';
import Layer from './Layer';
import align from 'dom-align';
import {Motion, spring} from 'react-motion';
import {throttle} from './common/util/fn';
import {getClientHeight, getClientWidth} from './common/util/dom';

const cx = create('Select');

/**
 * melon/Select
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class Select extends InputComponent {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     * @param  {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        /**
         * 状态
         *
         * @type {Object}
         */
        this.state = {
            ...this.state,
            open: false
        };

        this.onClick = this.onClick.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.onMotionEnd = this.onMotionEnd.bind(this);
        this.onWindowResizeOrScroll = throttle(
            this.onWindowResizeOrScroll.bind(this),
            200,
            {leading: true, trailing: true}
        );

        this.hideOptions = this.hideOptions.bind(this);
        this.renderOptions = this.renderOptions.bind(this);

    }

    componentDidUpdate() {

        if (!this.layer || !this.main || !this.state.open) {
            return;
        }

        let {
            mainArchor,
            layerArchor
        } = this.props;

        if (this.layer.offsetWidth < this.main.offsetWidth) {
            this.layer.style.width = `${this.main.offsetWidth}px`;
        }

        align(
            this.layer,
            this.main,
            {
                points: [layerArchor, mainArchor],
                overflow: {
                    adjustX: true,
                    adjustY: true
                }
            }
        );


    }

    componentWillUnmount() {
        this.unbindToWindow();
    }

    onWindowResizeOrScroll() {

        if (!this.state.open || !this.layer || !this.main) {
            return;
        }

        let {
            bottom,
            top,
            left,
            right
        } = this.main.getBoundingClientRect();

        let windowHeight = getClientHeight();
        let windowWidth = getClientWidth();

        // 在视野内
        if (
            top > 0
            && bottom < windowHeight
            && left > 0
            && right < windowWidth
        ) {

            let {
                mainArchor,
                layerArchor
            } = this.props;

            align(
                this.layer,
                this.main,
                {
                    points: [layerArchor, mainArchor],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                }
            );

            return;
        }

        this.hideOptions();

    }

    /**
     * 渲染选项浮层
     *
     * @protected
     * @return {ReactElement}
     */
    renderOptions() {

        let children = Children.map(
            this.props.children,
            this.renderItem,
            this
        );

        let className = cx.getPartClassName('popup');
        let {open, closing} = this.state;
        let begin = open && !closing ? 0 : 1;
        let end = open && !closing ? 1 : 0;

        return (
            <Motion
                defaultStyle={{
                    opacity: begin,
                    scale: begin
                }}
                style={{
                    opacity: spring(end),
                    scale: spring(end, {stiffness: 260, damping: 20})
                }}
                onRest={this.onMotionEnd}>
                {({scale, opacity}) => (
                    <div
                        className={className}
                        style={{
                            opacity: opacity,
                            transform: `scale(${scale}, ${scale})`
                        }}
                        ref={layer => {
                            this.layer = layer;
                        }}>
                        {children}
                    </div>
                )}
            </Motion>
        );

    }

    /**
     * 渲染选项
     *
     * @protected
     * @param  {ReactElement} child 节点
     * @param  {number} index 序号
     * @return {ReactElement}
     */
    renderItem(child, index) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return (
                <Option
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        if (child.type === 'optgroup') {
            return (
                <Group
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        return null;

    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement}
     */
    renderHiddenInput() {

        const {name, value} = this.props;

        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={value} />
            )
            : null;

    }

    /**
     * 渲染label部件
     *
     * @protected
     * @return {ReactElement}
     */
    renderLabel() {

        const value = this.state.value;
        const {children, placeholder} = this.props;

        const option = this.findOption(value, children);

        const label = option
            ? (option.props.label || option.props.children)
            : (
                <span className={cx().part('label-placeholder').build()}>
                    {placeholder}
                </span>
            );

        return (
            <label className={cx().part('label').build()}>
                {label}
            </label>
        );

    }

    /**
     * 找到当前选中的选项
     *
     * @protected
     * @param  {string} value    当前值
     * @param  {Array<ReactElement>} children 子节点数组
     * @return {Array<ReactElement>?}
     */
    findOption(value, children) {

        children = Children.toArray(children);

        if (!children) {
            return null;
        }

        for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if (child.type === 'optgroup') {
                const option = this.findOption(value, child.props.children);
                if (option) {
                    return option;
                }
                continue;
            }
            if (child.props.value === value) {
                return child;
            }
        }

        return null;
    }

    /**
     * 渲染icon
     *
     * @protected
     * @return {ReactElement}
     */
    renderIcon() {
        return <Icon icon='expand-more' />;
    }

    /**
     * 是否打开
     *
     * @protected
     * @return {boolean}
     */
    isOpen() {
        return this.state.open;
    }

    /**
     * 展示浮层
     *
     * @private
     */
    showOptions() {
        this.setState({
            open: true
        });
        this.bindToWindow();
    }

    /**
     * 隐藏选项浮层
     *
     * @private
     */
    hideOptions() {
        this.setState({
            closing: true
        });
        this.unbindToWindow();
    }

    bindToWindow() {
        window.addEventListener('resize', this.onWindowResizeOrScroll);
        window.addEventListener('scroll', this.onWindowResizeOrScroll);
    }

    unbindToWindow() {
        window.addEventListener('resize', this.onWindowResizeOrScroll);
        window.removeEventListener('scroll', this.onWindowResizeOrScroll);
    }

    /**
     * 当动画完成时的回调
     */
    onMotionEnd() {
        if (this.state.closing) {
            this.setState({
                closing: false,
                open: false
            });
        }
    }

    /**
     * 点击时处理
     *
     * @protected
     */
    onClick() {

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

        let open = this.state.open;

        if (open) {
            this.hideOptions();
            return;
        }

        this.showOptions();

    }

    /**
     * 点击选项时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     * @param  {string} e.value 当前值
     */
    onClickOption(e) {

        const value = e.value;

        if (this.state.closing) {
            return;
        }

        this.hideOptions();

        super.onChange({
            type: 'change',
            target: this,
            value
        });

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        let className = cx(this.props).addStates(this.getStyleStates()).build();
        let {open, closing} = this.state;

        return (
            <div
                onClick={this.onClick}
                className={className}
                ref={main => {
                    this.main = main;
                }}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                <Layer
                    open={open || closing}
                    onClickAway={this.hideOptions}
                    render={this.renderOptions} />
            </div>
        );

    }

}

Select.displayName = 'Select';

let archor = PropTypes.oneOf([
    'tl', 'tc', 'tr',
    'cl', 'cc', 'cr',
    'bl', 'bc', 'br'
]);

Select.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired,
    layerArchor: archor,
    mainArchor: archor
};

Select.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '请选择',
    layerArchor: 'tl',
    mainArchor: 'tl'
};

Select.childContextTypes = InputComponent.childContextTypes;
Select.contextTypes = InputComponent.contextTypes;

/**
 * 生成 Select 的选项
 *
 * @param  {Array<{disabled: boolean, name: string, value: string}>} dataSource 数据
 * @return {Array<ReactElement>}
 */
export function createOptions(dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

}

Select.createOptions = createOptions;
