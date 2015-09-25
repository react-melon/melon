/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('./common/util/classname');
var PropTypes = React.PropTypes;
var InputComponent = require('./InputComponent');
var FloatingLabel = require('./textbox/FloatLabel');

class TextBox extends InputComponent {

    constructor(props) {

        super(props);

        this.state = {
            ...this.state,
            isFloating: !!this.getValue(),
            isFocus: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    render() {

        var props = this.props;

        return (
            <div className={this.getClassName()}>
                {this.renderFloatingLabel(this.props.floatingLabel)}
                {this.renderInput()}
                {this.renderValidateMessage()}
            </div>
        );

    }

    renderInput() {

        var props = this.props;
        var multiline = props.multiline;
        var tag = multiline ? 'textarea' : 'input';

        props = {
            name: props.name,
            disabled: props.disabled,
            readOnly: props.readOnly,
            type: props.type,
            value: this.getValue(),
            placeholder: props.placeholder,
            className: this.getPartClassName('input'),
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
            ref: 'input'
        };

        if (multiline) {
            props.rows = 1;
        }

        return React.createElement(tag, props);

    }

    renderFloatingLabel(floatingLabel) {

        var state = this.state;

        return floatingLabel
            ? <FloatingLabel
                floating={state.isFloating || state.isFocus}
                focused={state.isFocus}
                label={floatingLabel} />
            : null;

    }

    onFocus(e) {

        e = {type: 'focus', target: this};

        super.onFocus(e);

        var onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus(e);
        }

        this.setState({
            isFocus: true,
            isFloating: true
        });

    }

    getStates(props) {
        var states = super.getStates(props);
        states.focus = this.state.isFocus;
        return states;
    }

    onBlur(e) {

        e = {type: 'blur', target: this};

        super.onBlur(e);

        var onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur(e);
        }

        this.setState({
            isFloating: !!this.getValue(),
            isFocus: false
        });

    }

    onChange(e) {

        var rawValue = e.target.value;

        e = {
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue),
            rawValue
        };

        super.onChange(e);

        // 如果被控制了，那么就交给控制者管理
        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        // 如果没有被控制，那么数据自行使用状态管理
        // 这时多行文本框需要自行更新高度
        this.setState({rawValue});

        if (this.props.multiline) {
            this.syncTextareaHeight();
        }

    }

    componentWillReceiveProps(nextProps) {

        super.componentWillReceiveProps(nextProps);

        // 多行文本框应该可以自动更新高度
        if (nextProps.multiline
            && this.isControlled()
            && this.props.value !== nextProps.value
        ) {
            syncTextareaHeight();
        }

    }

    syncTextareaHeight() {
        var dom = this.refs.input;
        dom.style.height = 'auto';
        dom.style.height = dom.scrollHeight + 'px';
    }

}

TextBox.defaultProps = {
    ...InputComponent.defaultProps,
    value: ''
};

TextBox.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string,
    multiline: PropTypes.bool
};

module.exports = TextBox;
