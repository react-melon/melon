/**
 * @file Form
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const validator = require('./Validator');

const {PropTypes} = React;

let Form = React.createClass({

    displayName: 'Form',

    propTypes: {
        onSumbit: PropTypes.func,
        target: PropTypes.string,
        action: PropTypes.string,
        method: PropTypes.oneOf(['POST', 'GET']),
        validator: PropTypes.shape({
            validate: PropTypes.func.isRequired
        })
    },

    getDefaultProps() {
        return {
            validator: validator
        };
    },

    getInitialState() {
        this.fields = [];
        return {};
    },

    childContextTypes: {
        attachForm: PropTypes.func,
        detachForm: PropTypes.func,
        validator: PropTypes.shape({
            validate: PropTypes.func.isRequired
        }),
        pointer: PropTypes.string.isRequired
    },

    getChildContext() {
        return {
            pointer: '/',
            attachForm: this.addField,
            detachForm: this.removeField,
            validator: this.props.validator
        };
    },

    componentWillUnmount() {
        this.fields.length = 0;
        this.fields = null;
    },

    addField(field) {
        this.fields.push(field);
    },

    removeField(field) {

        const {fields} = this;

        if (fields) {
            this.fields = this.fields.filter((f) => {
                return f !== field;
            });
        }

    },

    isValidFormField(field) {

        const value = field.getValue();
        const {pointer, props} = field;
        const {name, disabled} = props;

        return name
            && !disabled
            && value != null
            && pointer
            && pointer.lastIndexOf('/') === 0;

    },

    getData() {
        return this
            .fields
            .reduce(
                (data, field) => {

                    if (this.isValidFormField(field)) {
                        data[field.props.name] = field.getValue();
                    }

                    return data;
                },
                {}
            );
    },

    validate() {
        return this.checkValidity().isValid;
    },

    checkValidity() {
        return this
            .fields
            .reduce((formValidity, field) => {

                // 不校验以下字段
                if (!this.isValidFormField(field)) {
                    return formValidity;
                }

                const value = field.getValue();
                const validity = field.validate(value);

                return {
                    isValid: formValidity.isValid && validity.isValid(),
                    errors: [
                        ...formValidity.errors,
                        ...validity.states.filter((state) => !state.isValid)
                    ]
                };

            }, {
                isValid: true,
                errors: []
            });
    },

    onSubmit(e) {

        const {
            onSubmit,
            noValidate
        } = this.props;

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

    render() {

        const {props} = this;

        return (
            <form {...props} onSubmit={this.onSubmit} />
        );

    }

});

module.exports = Form;
