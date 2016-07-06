/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../Icon', '../ripples/CenterRipple', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('../ripples/CenterRipple'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Icon, global.CenterRipple, global.babelHelpers);
        global.Option = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Icon, _CenterRipple, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _CenterRipple2 = babelHelpers.interopRequireDefault(_CenterRipple);

    /**
     * @file melon/boxgroup/Option
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('BoxGroupOption');

    var BoxGroupOption = function (_Component) {
        babelHelpers.inherits(BoxGroupOption, _Component);

        function BoxGroupOption(props) {
            babelHelpers.classCallCheck(this, BoxGroupOption);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        BoxGroupOption.prototype.onClick = function onClick() {
            this.refs.ripple && this.refs.ripple.animate();
        };

        BoxGroupOption.prototype.getIcon = function getIcon(boxModel, isChecked) {
            return BoxGroupOption.Icons[boxModel][isChecked ? 'checked' : 'unchecked'];
        };

        BoxGroupOption.prototype.render = function render() {

            var props = this.props;

            var boxModel = props.boxModel;
            var checked = props.checked;
            var disabled = props.disabled;
            var readOnly = props.readOnly;


            var className = cx(props).addStates({ checked: checked }).build();
            var icon = this.getIcon(boxModel, checked);

            return _react2['default'].createElement(
                'label',
                { className: className, onClick: disabled || readOnly ? null : this.onClick },
                _react2['default'].createElement('input', {
                    disabled: disabled,
                    checked: checked,
                    type: props.boxModel,
                    value: props.value,
                    readOnly: readOnly,
                    name: props.name,
                    onChange: readOnly ? null : props.onChange }),
                _react2['default'].createElement(_Icon2['default'], { icon: icon }),
                props.label,
                disabled || readOnly ? null : _react2['default'].createElement(_CenterRipple2['default'], { ref: 'ripple' })
            );
        };

        return BoxGroupOption;
    }(_react.Component);

    exports['default'] = BoxGroupOption;


    BoxGroupOption.displayName = 'BoxGroupOption';

    BoxGroupOption.propTypes = {
        boxModel: _react.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
        label: _react.PropTypes.string,
        value: _react.PropTypes.string,
        checked: _react.PropTypes.bool,
        name: _react.PropTypes.string,
        disabled: _react.PropTypes.bool,
        onChange: _react.PropTypes.func.isRequired
    };

    BoxGroupOption.Icons = {
        radio: {
            checked: 'radio-button-checked',
            unchecked: 'radio-button-unchecked'
        },
        checkbox: {
            checked: 'check-box',
            unchecked: 'check-box-outline-blank'
        }
    };
});