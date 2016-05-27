/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Validator', './common/util/syncPropsToState', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Validator'), require('./common/util/syncPropsToState'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Validator, global.syncPropsToState, global.babelHelpers);
        global.InputComponent = mod.exports;
    }
})(this, function (exports, _react, _Validator, _syncPropsToState, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Validator2 = babelHelpers.interopRequireDefault(_Validator);

    var _syncPropsToState2 = babelHelpers.interopRequireDefault(_syncPropsToState);

    var InputComponent = function (_Component) {
        babelHelpers.inherits(InputComponent, _Component);

        function InputComponent(props) {
            var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            babelHelpers.classCallCheck(this, InputComponent);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            var name = props.name;
            var value = props.value;
            var defaultValue = props.defaultValue;


            // 这里 validator 有两种来源 #=-= 略多，提供了丰富的可能性，比如一个表单里混合使用两种校验规则
            // 1. 来自 props 这种最高优先，因为是手动指定的
            // 2. 来自 contenxt 这种是继承自 form 提供的 validator
            // 3. 最后，这一种情况是一个孤立 input component 在自己战斗，使用默认的 LiteValidator
            _this.validator = props.validator || context.validator || _Validator2['default'];

            var pointer = context.pointer;


            /**
             * @property {string} pointer 输入控件在表单中的位置
             *
             * ### 格式
             *
             * 举例：/aaa/bbb/0/ddd
             * [json pointer](https://tools.ietf.org/html/rfc6901)
             * 这货是个规范啊，不要小看人家，类似 XPath 在 XML 中的定位
             *
             * ### 使用规则
             *
             * 1. 只通过 contenxt 传递
             * 2. 只在当组件有 name 属性时有效
             * 3. 如果这货的父级 input component 没有 pointer，那么它也没有 pointer
             *
             * 其实就是说，这个 /aaa/bbb/0/ddd 的字符串中，不能出现 undefined / null
             * 只要有任意一级断开了，其所有子级都是无效的
             */
            _this.pointer = name != null && pointer ? '' + pointer + name : null;

            _this.state = { value: value != null ? value : defaultValue };

            return _this;
        }

        InputComponent.prototype.getChildContext = function getChildContext() {
            var pointer = this.pointer;


            return {
                pointer: pointer ? pointer + '/' : null
            };
        };

        InputComponent.prototype.componentDidMount = function componentDidMount() {
            var attachForm = this.context.attachForm;


            if (attachForm) {
                attachForm(this);
            }
        };

        InputComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var updates = this.getSyncUpdates(nextProps);

            if (updates) {
                this.setState(updates);
            }
        };

        InputComponent.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            return (0, _syncPropsToState2['default'])(this, nextProps);
        };

        InputComponent.prototype.componentWillUnmount = function componentWillUnmount() {
            var detachForm = this.context.detachForm;


            if (detachForm) {
                detachForm(this);
            }
        };

        InputComponent.prototype.validate = function validate(value) {

            var validity = this.checkValidity(value);

            this.setState({ validity: validity });

            return validity;
        };

        InputComponent.prototype.checkValidity = function checkValidity(value) {
            return this.validator.validate(value, this);
        };

        InputComponent.prototype.setCustomValidity = function setCustomValidity(customValidity) {
            this.setState({
                validity: this.validator.createCustomValidity(customValidity)
            });
        };

        InputComponent.prototype.onChange = function onChange(e) {
            var _props = this.props;
            var onChange = _props.onChange;
            var customValidity = _props.customValidity;


            // 这种对应着 controlled 组件逻辑
            if (onChange) {
                onChange(e);
                return;
            }

            var value = e.value;


            if (value === this.state.value) {
                return;
            }

            var validity = customValidity ? this.validator.createCustomValidity(customValidity) : this.checkValidity(value);

            // 这种对应非控制逻辑
            this.setState({ value: value, validity: validity });
        };

        InputComponent.prototype.isDisabled = function isDisabled() {
            return this.props.disabled;
        };

        InputComponent.prototype.isReadOnly = function isReadOnly() {
            return this.props.readOnly;
        };

        InputComponent.prototype.getValue = function getValue() {
            return this.state.value;
        };

        InputComponent.prototype.getStyleStates = function getStyleStates() {

            var states = {
                'read-only': this.isReadOnly()
            };

            var validity = this.state.validity;


            if (validity) {
                var valid = validity.isValid();
                states.valid = valid;
                states.invalid = !valid;
            }

            return states;
        };

        return InputComponent;
    }(_react.Component);

    exports['default'] = InputComponent;


    InputComponent.displayName = 'InputComponent';

    InputComponent.propTypes = {

        name: _react.PropTypes.string,
        readOnly: _react.PropTypes.bool,
        pointer: _react.PropTypes.string,

        custormValidity: _react.PropTypes.string,
        onChange: _react.PropTypes.func,

        validate: _react.PropTypes.func,
        renderErrorMessage: _react.PropTypes.func,
        validator: _react.PropTypes.shape({
            validate: _react.PropTypes.func.isRequired
        })

    };

    InputComponent.defaultProps = {
        defaultValue: '',
        readOnly: false,
        validateEvents: ['change']
    };

    InputComponent.contextTypes = {
        pointer: _react.PropTypes.string,
        validator: _react.PropTypes.shape({
            validate: _react.PropTypes.func.isRequired
        }),
        attachForm: _react.PropTypes.func,
        detachForm: _react.PropTypes.func
    };

    InputComponent.childContextTypes = {
        pointer: _react.PropTypes.string
    };
});