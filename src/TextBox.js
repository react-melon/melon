/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FloatingLabel from './textbox/FloatLabel';
import TextBoxInput from './textbox/Input';
import InputComponent from 'melon-core/InputComponent';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TextBox');

function getValueStringLength(value) {
    return value == null ? 0 : ('' + value).length;
}

/**
 * melon/TextBox
 *
 * @extends {React.Component}
 * @class
 */
export default class TextBox extends InputComponent {

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
         * @private
         * @type {Object}
         */
        this.state = {
            ...this.state,
            isFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {

        super.componentDidMount();

        let {
            multiline,
            autoFocus
        } = this.props;

        if (multiline && this.state.value != null) {
            this.syncTextareaHeight();
        }

        if (autoFocus) {
            this.input.focus();
        }

    }

    componentDidUpdate() {

        const props = this.props;

        if (
            // 多行的
            props.multiline
            // 控制的
            && !props.hasOwnProperty('defaultValue')
        ) {
            // 同步高度
            this.syncTextareaHeight();
        }

    }

    /**
     * 获取焦点时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onFocus(e) {

        this.setState({
            isFocus: true
        });

        const onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus({
                type: 'focus',
                target: this
            });
            return;
        }

    }

    /**
     * 失去焦点时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onBlur(e) {

        this.setState({
            isFocus: false
        });

        const onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur({
                type: 'blur',
                target: this
            });
        }


    }

    onChange(e) {

        const currentValue = this.state.value;

        super.onChange({
            value: e.target.value,
            target: e.target,
            currentTarget: this,
            type: 'change'
        }, () => {
            if (
                this.props.multiline
                && this.props.hasOwnProperty('defaultValue')
                && currentValue !== this.state.value
            ) {
                this.syncTextareaHeight();
            }
        });

    }

    /**
     * 多行时同步输入框高度
     *
     * @protected
     */
    syncTextareaHeight() {

        const input = this.input;

        if (input) {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
        }

    }

    /**
     * 渲染浮动标签
     *
     * @protected
     * @param  {string}  floatingLabel 标签内容
     * @param  {boolean} isFloating    是否浮动
     * @param  {boolean} isFocus       是否获取焦点
     * @return {?ReactElement}
     */
    renderFloatingLabel(floatingLabel, isFloating, isFocus) {

        if (!floatingLabel) {
            return null;
        }

        return (
            <FloatingLabel
                floating={isFloating || isFocus}
                focused={isFocus}
                label={floatingLabel} />
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            onFocus,
            onBlur,
            onChange,
            props
        } = this;

        const {
            floatingLabel,
            defaultValue,
            ...rest
        } = props;

        const {
            isFocus,
            value = defaultValue
        } = this.state;

        const floating = !!getValueStringLength(value) || isFocus;

        const className = cx(props)
            .addStates({
                floating: floatingLabel && floating,
                focus: isFocus,
                fulfilled: value == null
            })
            .addStates(this.getStyleStates())
            .build();

        return (
            <div className={className}>
                {this.renderFloatingLabel(floatingLabel, floating, isFocus)}
                <TextBoxInput
                    {...rest}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    isFocus={isFocus}
                    value={value == null ? '' : value}
                    ref={input => {
                        if (input) {
                            this.input = ReactDOM.findDOMNode(input);
                        }
                    }} />
            </div>
        );

    }

}

TextBox.displayName = 'TextBox';

TextBox.defaultProps = {
    type: 'text'
};

TextBox.propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']),
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string,
    multiline: PropTypes.bool,
    autoFocus: PropTypes.bool
};

TextBox.contextTypes = InputComponent.contextTypes;
