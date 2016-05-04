/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Validator', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Validator'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Validator, global.babelHelpers);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _Validator, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Validator2 = babelHelpers.interopRequireDefault(_Validator);

    var Form = function (_Component) {
        babelHelpers.inherits(Form, _Component);

        function Form(props) {
            babelHelpers.classCallCheck(this, Form);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.fields = [];
            _this.state = {};

            _this.addField = _this.addField.bind(_this);
            _this.removeField = _this.removeField.bind(_this);

            return _this;
        }

        Form.prototype.getChildContext = function getChildContext() {
            return {
                pointer: '/',
                attachForm: this.addField,
                detachForm: this.removeField,
                validator: this.props.validator
            };
        };

        Form.prototype.componentWillUnmount = function componentWillUnmount() {
            this.fields.length = 0;
            this.fields = null;
        };

        Form.prototype.addField = function addField(field) {
            this.fields.push(field);
        };

        Form.prototype.removeField = function removeField(field) {
            var fields = this.fields;


            if (fields) {
                this.fields = this.fields.filter(function (f) {
                    return f !== field;
                });
            }
        };

        Form.prototype.isValidFormField = function isValidFormField(field) {

            var value = field.getValue();
            var pointer = field.pointer;
            var props = field.props;
            var name = props.name;
            var disabled = props.disabled;


            return name && !disabled && value != null && pointer && pointer.lastIndexOf('/') === 0;
        };

        Form.prototype.getData = function getData() {
            var _this2 = this;

            return this.fields.reduce(function (data, field) {

                if (_this2.isValidFormField(field)) {
                    data[field.props.name] = field.getValue();
                }

                return data;
            }, {});
        };

        Form.prototype.validate = function validate() {
            return this.checkValidity().isValid;
        };

        Form.prototype.checkValidity = function checkValidity() {
            var _this3 = this;

            return this.fields.reduce(function (formValidity, field) {

                // 不校验以下字段
                if (!_this3.isValidFormField(field)) {
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
        };

        Form.prototype.render = function render() {
            var _this4 = this;

            var _props = this.props;
            var noValidate = _props.noValidate;
            var _onSubmit = _props.onSubmit;
            var rest = babelHelpers.objectWithoutProperties(_props, ['noValidate', 'onSubmit']);


            return _react2['default'].createElement('form', babelHelpers['extends']({}, rest, { onSubmit: function onSubmit(e) {

                    if (!noValidate) {
                        if (!_this4.validate()) {
                            e.preventDefault();
                            return;
                        }
                    }

                    if (_onSubmit) {
                        e.data = _this4.getData();
                        _onSubmit(e);
                    }
                } }));
        };

        return Form;
    }(_react.Component);

    exports['default'] = Form;


    Form.displayName = 'Form';

    Form.propTypes = {
        onSumbit: _react.PropTypes.func,
        target: _react.PropTypes.string,
        action: _react.PropTypes.string,
        method: _react.PropTypes.oneOf(['POST', 'GET']),
        validator: _react.PropTypes.shape({
            validate: _react.PropTypes.func.isRequired
        })
    };

    Form.defaultProps = {
        validator: _Validator2['default']
    };

    Form.childContextTypes = {
        attachForm: _react.PropTypes.func,
        detachForm: _react.PropTypes.func,
        validator: _react.PropTypes.shape({
            validate: _react.PropTypes.func.isRequired
        }),
        pointer: _react.PropTypes.string.isRequired
    };
});