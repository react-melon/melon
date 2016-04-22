/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import FloatingLabel from './textbox/FloatLabel';
import TextBoxInput from './textbox/Input';
import Validity from './Validity';
import InputComponent from './InputComponent';

import {create} from './common/util/cxBuilder';

const cx = create('TextBox');

export default class TextBox extends InputComponent {

    constructor(props, context) {

        super(props, context);

        const {value} = this.state;

        this.state = {
            ...this.state,
            isFloating: !!value,
            isFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    componentWillReceiveProps(nextProps) {

        const {value} = nextProps;

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

    componentDidMount() {

        super.componentDidMount();

        if (this.props.multiline && this.state.value) {
            this.syncTextareaHeight();
        }

    }

    onFocus(e) {

        this.setState({
            isFocus: true,
            isFloating: true
        });

        const {onFocus} = this.props;

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

    onBlur(e) {

        const {value} = e.target;

        this.setState({
            isFloating: !!value,
            isFocus: false
        });

        const {onBlur} = this.props;

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

    onChange(e) {

        super.onChange({
            type: 'change',
            target: this,
            value: e.target.value
        });

    }

    syncTextareaHeight() {

        const {input} = this;

        if (input) {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
        }

    }

    needValidate(eventName) {
        return this.props.validateEvents.indexOf(eventName) !== -1;
    }

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

    render() {

        const {
            onFocus,
            onBlur,
            onChange,
            props
        } = this;

        const {
            floatingLabel,
            className,
            value,
            ...rest
        } = props;

        const {
            validity,
            isFocus,
            isFloating
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

    type: PropTypes.oneOf(['text', 'password']),

    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string,

    multiline: PropTypes.bool,

    onFocus: PropTypes.func,
    onBlur: PropTypes.func

};
