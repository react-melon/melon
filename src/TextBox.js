/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import FloatingLabel from './textbox/FloatLabel';
import TextBoxInput from './textbox/Input';
import Validity from 'melon-core/Validity';
import InputComponent from 'melon-core/InputComponent';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TextBox');

/**
 * melon/TextBox
 *
 * @extends {melon-core/InputComponent}
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

        const value = this.state.value;

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            ...this.state,
            isFloating: !!value,
            isFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        let {value, defaultValue} = nextProps;

        if (value === void 0) {
            value = defaultValue;
        }

        // 多行文本框应该可以自动更新高度
        if (nextProps.multiline && this.state.value !== value) {
            this.syncTextareaHeight();
        }

        const {
            isFloating,
            isFocus
        } = this.state;

        const nextIsFloating = !!value || isFocus;

        if (isFloating !== nextIsFloating) {
            this.setState({
                isFloating: nextIsFloating
            });
        }

        super.componentWillReceiveProps(nextProps);

    }

    /**
     * Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {

        super.componentDidMount();

        if (this.props.multiline && this.state.value) {
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
            isFocus: true,
            isFloating: true
        });

        const onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus({
                type: 'focus',
                target: this
            });
            return;
        }

        if (this.needValidate('focus')) {
            this.validate(this.state.value);
        }

    }

    /**
     * 失去焦点时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onBlur(e) {

        const value = e.target.value;

        this.setState({
            isFloating: !!value,
            isFocus: false
        });

        const onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur({
                type: 'blur',
                target: this
            });
            return;
        }

        this.setState({value});


        if (this.needValidate('blur')) {
            this.validate(value);
        }

    }

    /**
     * 值改变时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onChange(e) {

        super.onChange({
            type: 'change',
            target: this,
            value: e.target.value
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
     * 是否需要校验
     *
     * @private
     * @param {number} eventName 事件名称
     * @return {boolean} 是否需要校验
     */
    needValidate(eventName) {
        return this.props.validateEvents.indexOf(eventName) !== -1;
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
            ...rest
        } = props;

        const {
            validity,
            isFocus,
            isFloating,
            value
        } = this.state;

        const statefulClassName = cx(props)
            .addStates({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            })
            .addStates(this.getStyleStates())
            .build();

        return (
            <div className={statefulClassName}>
                {this.renderFloatingLabel(floatingLabel, isFloating, isFocus)}
                <TextBoxInput
                    {...rest}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    isFocus={isFocus}
                    value={value}
                    ref={input => {
                        if (input) {
                            this.input = ReactDOM.findDOMNode(input);
                        }
                    }} />
                <Validity validity={validity} />
            </div>
        );

    }



}

TextBox.displayName = 'TextBox';

TextBox.defaultProps = {
    ...InputComponent.defaultProps,
    validateEvents: ['change', 'blur']
};

TextBox.propTypes = {

    ...InputComponent.propTypes,

    type: PropTypes.oneOf(['text', 'password', 'number']),

    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string,

    multiline: PropTypes.bool,

    onFocus: PropTypes.func,
    onBlur: PropTypes.func

};

TextBox.childContextTypes = InputComponent.childContextTypes;
TextBox.contextTypes = InputComponent.contextTypes;
