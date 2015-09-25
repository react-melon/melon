/**
 * @file melon/common/component/InputComponent
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Validity = require('./common/util/Validity');
var Validator = require('./Validator');

var Component = require('./Component.jsx');
var ValidityLabel = require('./Validity.jsx');

class InputComponent extends Component {

    constructor(props) {

        super(props);

        var rawValue = props.rawValue || props.defaultRawValue;
        var value = props.value || props.defaultValue;

        if (rawValue == null) {
            rawValue = this.parseValue(value);
        }

        this.state = {rawValue};

    }

    componentDidMount() {
        var form = this.context.form;
        if (form) {
            form.attach(this);
        }
    }

    componentWillUnmount() {
        var form = this.context.form;
        if (form) {
            form.detach(this);
        }
    }

    componentWillReceiveProps(props) {

        var rawValue = props.rawValue == null
            ? this.parseValue(props.value)
            : props.rawValue;

        // 如果 rawValue 未发生变化，
        // 或者控制是非控制的，这种情况下控制自行控制 rawValue
        // 那么就再见了
        if (this.props.rawValue === rawValue || !this.isControlled()) {
            return;
        }

        var value = this.stringifyValue(rawValue);
        var validity = this.checkValidity(value);

        this.setState({rawValue});
        this.showValidity(validity);

    }

    isControlled() {
        var props = this.props;
        var value = props.rawValue || props.value;
        return props.disabled || props.readOnly || value != null && props.onChange;
    }

    getRawValue() {
        return this.state.rawValue;
    }

    getValue() {
        return this.stringifyValue(this.getRawValue());
    }

    parseValue(value) {
        return value;
    }

    stringifyValue(rawValue) {
        return rawValue ? rawValue + '' : '';
    }

    onFocus(e) {
        if (this.willValidate('focus')) {
            this.validate(e.getValue());
        }
    }

    onChange(e) {

        if (this.willValidate('change')) {
            this.validate(e.value);
        }

        // var form = this.context.form;

        // if (form) {
        //     form.onFinishEdit(e);
        // }

    }

    onBlur(e) {

        if (this.willValidate('blur')) {
            this.validate(this.getValue());
        }

        // var form = this.context.form;

        // if (form) {
        //     form.onFinishEdit(e);
        // }

    }

    getStates(props) {

        var states = super.getStates(props);
        var state = this.state;
        var isValid = state.isValid;

        if (state.isValidating) {
            states.isValidating = true;
        }
        else if (typeof isValid === 'boolean') {
            states.invalid = !isValid;
            states.valid = isValid;
        }

        states.readOnly = !!props.readOnly;

        return states;
    }

    checkValidity(value) {

        var validity = new Validity();
        var rules = Validator.resolve(this);

        rules.forEach((rule) => {
            validity.addState(rule.name, rule.check(value, this));
        });

        return validity;

    }

    /**
     * 获取检验提示消息
     *
     * @param {module:Validity} validity 校验结果
     * @return {string}
     */
    getValidateMessage(validity) {
        var isValid = validity.isValid();
        return isValid ? '' : validity.getErrorMessage();
    }

    /**
     * 显示校验消息
     *
     * @param {module:Validity} validity 校验结果
     */
    showValidity(validity) {

        var isValid = validity.isValid();

        this.setState({
            isValid: isValid,
            validateMessage: this.getValidateMessage(validity)
        });

    }

    /**
     * 隐藏校验消息
     */
    hideValidity() {

        this.setState({
            isValid: void 0,
            validateMessage: ''
        });

    }

    validate(value) {

        var validity = this.checkValidity(value);

        if (validity.isValid()) {
            this.props.onValid && this.props.onValid({
                type: 'valid',
                target: this,
                validity: validity
            });
        }
        else {
            this.props.onInvalid && this.props.onInvalid({
                type: 'invalid',
                target: this,
                validity: validity
            });
        }

        this.showValidity(validity);

        return validity;

    }

    renderValidateMessage() {
        var validateMessage = this.state.validateMessage;
        return <ValidityLabel message={validateMessage} isValid={this.state.isValid} />;
    }

    willValidate(eventName) {
        return this.props.validateEvents.indexOf(eventName) !== -1;
    }

}

var PropTypes = React.PropTypes;

InputComponent.defaultProps = {
    defaultValue: '',
    validateEvents: ['blur']
};

InputComponent.contextTypes = {
    form: PropTypes.object
};

InputComponent.propTypes = {
    required: PropTypes.bool,
    name: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    maxByteLength: PropTypes.number,
    minByteLength: PropTypes.number,
    pattern: PropTypes.string,
    // type: PropTypes.oneOf([
    //     'datetime', 'date', 'week', 'month',
    //     'number',
    //     'email', 'time', 'url'
    // ]),
    value: PropTypes.string,
    onChange: PropTypes.func
};

module.exports = InputComponent;
