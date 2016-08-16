/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Children} from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';
import SeparatePopup from './select/SeparatePopup';
import Validity from 'melon-core/Validity';
import InputComponent from 'melon-core/InputComponent';
import Group from './select/OptionGroup';
import Option from './select/Option';
import {create} from 'melon-core/classname/cxBuilder';

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
        this.onPopupHide = this.onPopupHide.bind(this);

    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {

        super.componentDidMount();

        let container = this.container = document.createElement('div');

        container.className = cx().part('popup').build();

        document.body.appendChild(container);

        /**
         * 浮层
         *
         * @type {Object}
         */
        this.popup = ReactDOM.render(
            <SeparatePopup
                target={ReactDOM.findDOMNode(this)}
                open={false}
                onHide={this.onPopupHide}>
                {Children.map(
                    this.props.children,
                    this.renderItem,
                    this
                )}
            </SeparatePopup>,
            container
        );

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        const children = nextProps.children;

        if (children !== this.props.children) {
            this.popup = ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={this.state.open}
                    onHide={this.onPopupHide}>
                    {Children.map(
                        children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        }

        super.componentWillReceiveProps(nextProps);

    }

    /**
     * 将要Unmount时的处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {

        let container = this.container;

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);

            /**
             * 浮层的容器
             *
             * @type {HTMLElement}
             */
            this.container = container = null;
        }

        super.componentWillUnmount();

    }

    /**
     * 渲染选项浮层
     *
     * @protected
     * @param  {boolean} open 是否可见
     */
    renderOptions(open) {

        this.setState({
            open
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={open}
                    onHide={this.onPopupHide}>
                    {Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

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

        this.renderOptions(!this.isOpen());
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

        this.renderOptions(false);

        super.onChange({
            type: 'change',
            target: this,
            value
        });
    }

    /**
     * popup 隐藏时调用
     *
     * @protected
     */
    onPopupHide() {
        this.renderOptions(false);
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
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        return (
            <div
                onClick={this.onClick}
                className={cx(this.props).addStates(this.getStyleStates()).build()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                <Validity validity={this.state.validity} />
            </div>
        );

    }

}

Select.displayName = 'Select';

Select.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '请选择',
    defaultValue: ''
};

Select.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired
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
