/**
 * @file melon/BoxGroup
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {Children} from 'react';
import PropTypes from 'prop-types';
import Option from './boxgroup/Option';
import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';

const cx = create('BoxGroup');

/**
 * melon/BoxGroup
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class BoxGroup extends InputComponent {

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

        const value = this.state.value;

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            ...this.state,
            value: Array.isArray(value) ? value : [value]
        };

        this.onChange = this.onChange.bind(this);
        this.renderOption = this.renderOption.bind(this);

    }

    /**
     * 值改变时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onChange(e) {

        const optionValue = e.target.value;
        const value = this.getValue();

        const boxModel = this.props.boxModel;

        let nextValue;

        // 计算 radio 的值
        if (boxModel === 'radio') {
            nextValue = [optionValue];
        }
        // 计算 checkbox 的值
        else {

            const index = value.indexOf(optionValue);

            nextValue = index > -1
                ? [...value.slice(0, index), ...value.slice(index + 1)]
                : [...value, optionValue];

        }

        super.onChange({
            type: 'change',
            target: this,
            value: nextValue
        });

    }

    /**
     * 获取当前值
     *
     * @public
     * @return {Array<string>}
     */
    getValue() {

        const currentValue = this.state.value;

        return Children
            .toArray(this.props.children)
            .reduce(function (result, option) {

                if (option && option.props) {

                    const {disabled, value} = option.props;

                    if (!disabled && currentValue.indexOf(value) > -1) {
                        result.push(value);
                    }

                }

                return result;

            }, []);
    }

    /**
     * 渲染选项
     *
     * @protected
     * @param  {?ReactElement} option 选项
     * @return {Array.ReactElement}
     */
    renderOption(option) {

        const {type, props} = option;

        // 如果 child 不是一个 <Option> 那么直接返回它
        if (type !== 'option') {
            return option;
        }

        const boxModel = this.props.boxModel;
        const {value, children, label} = props;

        return (
            <Option
                key={value}
                boxModel={boxModel}
                label={label || children}
                value={value}
                checked={this.state.value.indexOf(value) > -1}
                disabled={this.props.disabled || props.disabled}
                readOnly={this.props.readOnly}
                onChange={this.onChange} />
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const className = cx(this.props)
            .addVariants(this.props.boxModel)
            .addStates(this.getStyleStates())
            .build();

        return (
            <div className={className}>
                {Children.map(this.props.children, this.renderOption)}
            </div>
        );
    }

}

BoxGroup.displayName = 'BoxGroup';

BoxGroup.propTypes = {
    ...InputComponent.propTypes,
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    value(...args) {
        return InputComponent.propTypes.value(...args)
            && PropTypes.arrayOf(PropTypes.string)(...args);
    },
    children: PropTypes.node.isRequired
};

BoxGroup.defaultProps = {
    ...InputComponent.defaultProps,
    boxModel: 'checkbox'
};

BoxGroup.childContextTypes = InputComponent.childContextTypes;
BoxGroup.contextTypes = InputComponent.contextTypes;

/**
 * 生成 BoxGroup 的选项
 *
 * @param  {Array<{disabled: boolean, name: string, value: string}>} datasource 数据
 * @return {Array<ReactElement>}
 */
export function createOptions(datasource) {

    return datasource.map(function (option, index) {

        const {name, value, disabled} = option;

        return (
            <option
                key={value}
                disabled={!!disabled}
                label={name}
                value={value} />
        );

    });

}

BoxGroup.createOptions = createOptions;
