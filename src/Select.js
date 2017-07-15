/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

import React, {Children} from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputComponent from 'melon-core/InputComponent';
import Group from './select/OptionGroup';
import Option from './select/Option';
import {create} from 'melon-core/classname/cxBuilder';
import Popover, {alignments} from './Popover';

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
        this.hideOptions = this.hideOptions.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.showSelectedOption = this.showSelectedOption.bind(this);

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
            this.renderOption,
            this
        );

        return (
            <div className={cx.getPartClassName('popup')}>
                {children}
            </div>
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
    renderOption(child, index) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return (
                <Option
                    {...child.props}
                    selected={this.state.value === child.props.value}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        if (child.type === 'optgroup') {
            return (
                <Group
                    {...child.props}
                    value={this.state.value}
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
        }, this.showSelectedOption);
    }

    /**
     * 隐藏选项浮层
     *
     * @private
     */
    hideOptions() {
        this.setState({
            open: false
        });
    }


    showSelectedOption() {

        let value = this.state.value;
        let layer = this.popover.getLayer();

        if (value == null || !layer) {
            return;
        }

        let selectedOption = layer.querySelector(`[data-value="${value}"]`);

        if (selectedOption) {
            setTimeout(() => {
                selectedOption.scrollIntoView();
            }, 50);
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
        let {
            autoWidth,
            style,
            maxHeight
        } = this.props;

        return (
            <div
                onClick={this.onClick}
                className={className}
                style={style}
                ref="main">
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                <Popover
                    ref={popover => (this.popover = popover)}
                    maxHeight={maxHeight}
                    autoWidth={autoWidth}
                    variants={['select']}
                    anchor={this.refs.main}
                    useLayerMask={false}
                    open={this.state.open}
                    onRequestClose={this.hideOptions}>
                    {this.renderOptions()}
                </Popover>
            </div>
        );

    }

}

Select.displayName = 'Select';

Select.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired,
    layerArchor: PropTypes.oneOf(alignments),
    mainArchor: PropTypes.oneOf(alignments),
    maxHeight: PropTypes.number,
    autoWidth: PropTypes.bool
};

Select.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '请选择',
    layerArchor: 'tl',
    mainArchor: 'tl',
    autoWidth: false
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

        let {
            disabled,
            value,
            name
        } = option;

        return (
            <option
                key={value}
                disabled={disabled}
                value={value}
                label={name} />
        );

    });

}

Select.createOptions = createOptions;

export {
    Option,
    Group as OptionGroup
};
