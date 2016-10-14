/**
 * @file melon/Toggle
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */


import React, {PropTypes} from 'react';
import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';
import CenterRipple from './ripples/CenterRipple';
import Validity from 'melon-core/Validity';

const cx = create('Toggle');

/**
 * melon/Toggle
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class Toggle extends InputComponent {

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

        this.onChange = this.onChange.bind(this);

    }

    /**
     * 值改变处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onChange(e) {

        const {
            disabled,
            readOnly,
            trueValue,
            falseValue
        } = this.props;

        if (disabled || readOnly) {
            return;
        }

        super.onChange({
            type: 'change',
            target: this,
            value: e.target.checked ? trueValue : falseValue
        });

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            props,
            state,
            onChange
        } = this;

        const {value, validity} = state;

        const {
            name,
            trueValue,
            disabled
        } = props;

        const checked = value === trueValue;

        return (
            <label className={cx(props).addStates({checked}).build()}>
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked} />
                <div className={cx().part('bar-container').build()}>
                    <div className={cx().part('bar').build()} />
                    <div className={cx().part('circle').build()}>
                        {disabled
                            ? null
                            : <CenterRipple flag={checked} scale={2.5} opacity={0.3} />}
                    </div>
                </div>
                <Validity validity={validity} />
            </label>
        );

    }

}

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
    ...InputComponent.defaultProps,
    trueValue: 'on',
    falseValue: '',
    defaultValue: ''
};

Toggle.propTypes = {
    ...InputComponent.propTypes,
    trueValue: PropTypes.any.isRequired
};

Toggle.childContextTypes = InputComponent.childContextTypes;
Toggle.contextTypes = InputComponent.contextTypes;
