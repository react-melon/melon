define('melon/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Validator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var validator = require('./Validator');
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
        getDefaultProps: function () {
            return { validator: validator };
        },
        getInitialState: function () {
            this.fields = [];
            return {};
        },
        childContextTypes: {
            attachForm: PropTypes.func,
            detachForm: PropTypes.func,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
            pointer: PropTypes.string.isRequired
        },
        getChildContext: function () {
            return {
                pointer: '/',
                attachForm: this.addField,
                detachForm: this.removeField,
                validator: this.props.validator
            };
        },
        componentWillUnmount: function () {
            this.fields.length = 0;
            this.fields = null;
        },
        addField: function (field) {
            this.fields.push(field);
        },
        removeField: function (field) {
            var fields = this.fields;
            if (fields) {
                this.fields = this.fields.filter(function (f) {
                    return f !== field;
                });
            }
        },
        isValidFormField: function (field) {
            var value = field.getValue();
            var pointer = field.pointer;
            var props = field.props;
            var name = props.name;
            var disabled = props.disabled;
            return name && !disabled && value != null && pointer && pointer.lastIndexOf('/') === 0;
        },
        getData: function () {
            var _this = this;
            return this.fields.reduce(function (data, field) {
                if (_this.isValidFormField(field)) {
                    data[field.props.name] = field.getValue();
                }
                return data;
            }, {});
        },
        validate: function () {
            return this.checkValidity().isValid;
        },
        checkValidity: function () {
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
        onSubmit: function (e) {
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
        render: function () {
            var props = this.props;
            return React.createElement('form', babelHelpers._extends({}, props, { onSubmit: this.onSubmit }));
        }
    });
    module.exports = Form;
});