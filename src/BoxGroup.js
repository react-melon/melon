/**
 * @file melon/BoxGroup
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {PropTypes, Children} from 'react';
import Option from './boxgroup/Option';
import {create} from './common/util/cxBuilder';
import InputComponent from './InputComponent';
import Validity from './Validity';

const cx = create('BoxGroup');

export default class BoxGroup extends InputComponent {

    constructor(props, context) {

        super(props, context);

        const {value} = this.state;

        this.state = {
            ...this.state,
            value: Array.isArray(value) ? value : [value]
        };

        this.onChange = this.onChange.bind(this);
        this.renderOption = this.renderOption.bind(this);

    }

    onChange(e) {

        const optionValue = e.target.value;
        const value = this.getValue();

        const {boxModel} = this.props;

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
     * @param  {?ReactElement} option 选项
     * @return {Array.ReactElement}
     */
    renderOption(option) {

        const {type, props} = option;

        // 如果 child 不是一个 <Option> 那么直接返回它
        if (type !== 'option') {
            return option;
        }

        const {boxModel} = this.props;
        const {value, children, label} = props;

        return (
            <Option
                key={value}
                boxModel={boxModel}
                label={label || children}
                value={value}
                checked={this.state.value.indexOf(value) > -1}
                disabled={this.props.disabled || props.disabled}
                onChange={this.onChange} />
        );

    }

    render() {
        return (
            <div className={cx(this.props).addStates(this.getStyleStates()).build()}>
                {Children.map(this.props.children, this.renderOption)}
                <Validity validity={this.state.validity} />
            </div>
        );
    }

}

BoxGroup.displayName = 'BoxGroup';

BoxGroup.propTypes = {
    ...InputComponent.propTypes,
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired
};

BoxGroup.defaultProps = {
    ...InputComponent.defaultProps,
    boxModel: 'checkbox',
    defaultValue: []
};

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
