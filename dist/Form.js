define('melon/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Form = function (_Component) {
        babelHelpers.inherits(Form, _Component);
        function Form(props) {
            babelHelpers.classCallCheck(this, Form);
            babelHelpers.get(Object.getPrototypeOf(Form.prototype), 'constructor', this).call(this, props);
            this.fields = [];
            this.onSubmit = this.onSubmit.bind(this);
            this.attachField = this.attachField.bind(this);
            this.detachField = this.detachField.bind(this);
        }
        babelHelpers.createClass(Form, [
            {
                key: 'getChildContext',
                value: function getChildContext() {
                    var context = {};
                    if (!this.props.novalidate) {
                        context.form = {
                            attach: this.attachField,
                            detach: this.detachField
                        };
                    }
                    return context;
                }
            },
            {
                key: 'attachField',
                value: function attachField(component) {
                    this.fields = this.fields.concat(component);
                    return this;
                }
            },
            {
                key: 'detachField',
                value: function detachField(component) {
                    var fields = this.fields;
                    if (fields) {
                        var index = fields.indexOf(component);
                        if (index !== -1) {
                            this.fields = fields.slice(0, index).concat(fields.slice(index + 1));
                        }
                    }
                    return this;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var children = _props.children;
                    var props = babelHelpers.objectWithoutProperties(_props, ['children']);
                    return React.createElement('form', babelHelpers._extends({}, props, {
                        className: this.getClassName(),
                        onSubmit: this.onSubmit
                    }), this.props.children);
                }
            },
            {
                key: 'getData',
                value: function getData() {
                    return this.fields.reduce(function (data, field) {
                        var name = field.props.name;
                        if (name) {
                            data[name] = field.getValue();
                        }
                        return data;
                    }, {});
                }
            },
            {
                key: 'onSubmit',
                value: function onSubmit(e) {
                    if (!this.validate()) {
                        e.preventDefault();
                        return;
                    }
                    if (!this.props.onSubmit) {
                        return;
                    }
                    e.target = this;
                    this.props.onSubmit(e);
                }
            },
            {
                key: 'validate',
                value: function validate() {
                    var isValid = true;
                    for (var fields = this.fields, i = fields.length - 1; i >= 0; --i) {
                        var field = fields[i];
                        var value = field.getValue();
                        if (!field.validate(value).isValid()) {
                            isValid = false;
                        }
                    }
                    return isValid;
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.fields.length = 0;
                    this.fields = null;
                }
            }
        ]);
        return Form;
    }(Component);
    Form.childContextTypes = { form: React.PropTypes.object };
    var PropTypes = React.PropTypes;
    Form.propTypes = {
        novalidate: PropTypes.bool,
        validate: PropTypes.func,
        onValid: PropTypes.func,
        onInvalid: PropTypes.func,
        onSumbit: PropTypes.func
    };
    module.exports = Form;
});