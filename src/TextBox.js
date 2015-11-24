/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const ReactDOM = require('react-dom');

const FloatingLabel = require('./textbox/FloatLabel');
const TextBoxInput = require('./textbox/Input');

const cx = require('./common/util/cxBuilder').create('TextBox');

let TextBox = React.createClass({

    getInitialState() {

        const {
            value
        } = this.props;

        return {
            isFloating: !!value,
            isFocus: false
        };

    },

    onFocus(e) {

        var {
            onFocus,
            // willValidate,
            validate,
            value
        } = this.props;

        if (onFocus)  {
            onFocus({
                type: 'focus',
                target: this
            });
        }

        this.setState({
            isFocus: true,
            isFloating: true
        });

        // if (willValidate('focus')) {
        //     validate(value);
        // }

    },

    onBlur(e) {

        const {
            onBlur,
            value,
            // willValidate,
            validate
        } = this.props;

        if (onBlur)  {
            onBlur({
                type: 'blur',
                target: this
            });
        }

        this.setState({
            isFloating: !!value,
            isFocus: false
        });

        // if (willValidate('blur')) {
        //     validate(value);
        // }

    },

    onChange(e) {

        var rawValue = e.target.value;

        const {
            onChange,
            // willValidate,
            validate
        } = this.props;

        onChange({
            type: 'change',
            target: this,
            value: rawValue,
            rawValue
        });

        // if (willValidate('change')) {
        //     validate(rawValue);
        // }

    },

    componentWillReceiveProps(nextProps) {

        const {value} = nextProps;

        // 多行文本框应该可以自动更新高度
        if (nextProps.multiline && this.props.value !== value) {
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

    },

    syncTextareaHeight() {

        const {
            input
        } = this;

        if (input) {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
        }

    },

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

    },


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
            isFocus,
            isFloating
        } = this.state;

        const statefulClassName = cx(props)
            .addStates({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            })
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
                    ref={(input) => {
                        if (input) {
                            this.input = ReactDOM.findDOMNode(input);
                        }
                    }} />
            </div>
        );

    }

});

TextBox.defaultProps = {
    value: '',
    defaultValue: ''
};

const {PropTypes} = React;

TextBox.propTypes = {

    type: PropTypes.oneOf(['text', 'password']),

    value: PropTypes.string,
    defaultValue: PropTypes.string,

    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string,

    multiline: PropTypes.bool,

    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func

};

module.exports = require('./createInputComponent').create(TextBox);
