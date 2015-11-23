define('melon/BoxGroup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './boxgroup/Option',
    './InputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Option = require('./boxgroup/Option');
    var InputComponent = require('./InputComponent');
    var BoxGroup = function (_InputComponent) {
        babelHelpers.inherits(BoxGroup, _InputComponent);
        babelHelpers.createClass(BoxGroup, null, [{
                key: 'displayName',
                value: 'BoxGroup',
                enumerable: true
            }]);
        function BoxGroup(props) {
            babelHelpers.classCallCheck(this, BoxGroup);
            _InputComponent.call(this, props);
            this.onChange = this.onChange.bind(this);
        }
        BoxGroup.prototype.getRawValue = function getRawValue() {
            var props = this.props;
            if (props.disabled) {
                return [];
            }
            var value = _InputComponent.prototype.getRawValue.call(this);
            var children = React.Children.toArray(props.children);
            return value.reduce(function (result, value) {
                for (var i = children.length - 1; i >= 0; --i) {
                    var child = children[i];
                    if (child && child.type === 'option' && child.props.value === value && !child.props.disabled) {
                        result.push(value);
                        break;
                    }
                }
                return result;
            }, []);
        };
        BoxGroup.prototype.getValue = function getValue() {
            return this.getRawValue().join(',');
        };
        BoxGroup.prototype.parseValue = function parseValue(value) {
            return value ? value.split(',') : [];
        };
        BoxGroup.prototype.render = function render() {
            var props = this.props;
            return React.createElement('div', { className: this.getClassName() }, React.Children.map(props.children, this.renderOption, this), this.renderValidateMessage());
        };
        BoxGroup.prototype.renderOption = function renderOption(option) {
            var props = option.props;
            if (option.type !== 'option') {
                return option;
            }
            var disabled = this.props.disabled || props.disabled;
            var value = props.value;
            return React.createElement(Option, {
                boxModel: this.props.boxModel,
                label: props.label || props.children,
                value: value,
                checked: this.isOptionChecked(value),
                name: props.name,
                disabled: disabled,
                onChange: this.onChange
            });
        };
        BoxGroup.prototype.isOptionChecked = function isOptionChecked(value) {
            var currentValue = this.getRawValue();
            return currentValue.indexOf(value) !== -1;
        };
        BoxGroup.prototype.onChange = function onChange(e) {
            var optionValue = e.target.value;
            var rawValue = this.getRawValue();
            if (this.props.boxModel === 'radio') {
                rawValue = [optionValue];
            } else {
                var index = rawValue.indexOf(optionValue);
                if (index === -1) {
                    rawValue = rawValue.concat(optionValue);
                } else {
                    rawValue = rawValue.slice(0, index).concat(rawValue.slice(index + 1));
                }
            }
            e = {
                type: 'change',
                target: this,
                value: this.stringifyValue(rawValue),
                rawValue: rawValue
            };
            _InputComponent.prototype.onChange.call(this, e);
            if (this.isControlled()) {
                this.props.onChange(e);
                return;
            }
            this.setState({ rawValue: rawValue }, function () {
                var onChange = this.props.onChange;
                if (onChange) {
                    onChange(e);
                }
            });
        };
        return BoxGroup;
    }(InputComponent);
    var PropTypes = React.PropTypes;
    BoxGroup.propTypes = {
        disabled: PropTypes.bool,
        boxModel: PropTypes.oneOf([
            'radio',
            'checkbox'
        ]).isRequired,
        onChange: PropTypes.func,
        defaultRawValue: PropTypes.arrayOf(PropTypes.string),
        rawValue: PropTypes.arrayOf(PropTypes.string),
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node.isRequired
    };
    BoxGroup.defaultProps = {
        disabled: false,
        value: '',
        validateEvents: ['change']
    };
    BoxGroup.createOptions = function (datasource) {
        return datasource.map(function (option, index) {
            return React.createElement('option', {
                key: index,
                disabled: option.disabled,
                label: option.name,
                value: option.value
            });
        });
    };
    module.exports = BoxGroup;
});