define('melon/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './LiteValiditor'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var validator = require('./LiteValiditor');
    var PropTypes = React.PropTypes;
    var Form = React.createClass({
        displayName: 'Form',
        propTypes: {
            onSumbit: PropTypes.func,
            target: PropTypes.string,
            action: PropTypes.string,
            method: PropTypes.oneOf([
                'POST',
                'GET'
            ]),
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired })
        },
        getDefaultProps: function getDefaultProps() {
            return { validator: validator };
        },
        getInitialState: function getInitialState() {
            this.fields = [];
            return {};
        },
        childContextTypes: {
            attachForm: PropTypes.func,
            detachForm: PropTypes.func,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
            pointer: PropTypes.string.isRequired
        },
        getChildContext: function getChildContext() {
            return {
                pointer: '/',
                attachForm: this.addField,
                detachForm: this.removeField,
                validator: this.props.validator
            };
        },
        componentWillUnmount: function componentWillUnmount() {
            this.fields.length = 0;
            this.fields = null;
        },
        addField: function addField(field) {
            this.fields.push(field);
        },
        removeField: function removeField(field) {
            this.fields = this.fields.filter(function (f) {
                return f !== field;
            });
        },
        isValidFormField: function isValidFormField(field) {
            var value = field.getValue();
            var pointer = field.pointer;
            var props = field.props;
            var name = props.name;
            var disabled = props.disabled;
            return name && !disabled && value != null && pointer && pointer.lastIndexOf('/') === 0;
        },
        getData: function getData() {
            var _this = this;
            return this.fields.reduce(function (data, field) {
                if (_this.isValidFormField(field)) {
                    data[field.props.name] = field.getValue();
                }
                return data;
            }, {});
        },
        validate: function validate() {
            return this.checkValidity().isValid;
        },
        checkValidity: function checkValidity() {
            var _this2 = this;
            return this.fields.reduce(function (formValidity, field) {
                if (!_this2.isValidFormField(field)) {
                    return formValidity;
                }
                var value = field.getValue();
                var validity = field.validate(value);
                return {
                    isValid: formValidity.isValid && validity.isValid(),
                    errors: [].concat(formValidity.errors, validity.states.filter(function (state) {
                        return !state.isValid;
                    }))
                };
            }, {
                isValid: true,
                errors: []
            });
        },
        onSubmit: function onSubmit(e) {
            var _props = this.props;
            var onSubmit = _props.onSubmit;
            var noValidate = _props.noValidate;
            if (!noValidate) {
                if (!this.validate()) {
                    e.preventDefault();
                    return;
                }
            }
            if (onSubmit) {
                e.data = this.getData();
                onSubmit(e);
            }
        },
        render: function render() {
            var props = this.props;
            return React.createElement('form', babelHelpers._extends({}, props, { onSubmit: this.onSubmit }));
        }
    });
    module.exports = Form;
});