define('melon/BoxGroup', [
    'require',
    'exports',
    'module',
    'react',
    './boxgroup/Option',
    './common/util/cxBuilder',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var Option = require('./boxgroup/Option');
    var cx = require('./common/util/cxBuilder').create('BoxGroup');
    var Validity = require('./Validity');
    var BoxGroup = React.createClass({
        displayName: 'BoxGroup',
        getValue: function () {
            var _props = this.props;
            var disabled = _props.disabled;
            var value = _props.value;
            if (disabled) {
                return [];
            }
            var children = React.Children.toArray(this.props.children);
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
        },
        onChange: function (e) {
            var optionValue = e.target.value;
            var value = this.getValue();
            var boxModel = this.props.boxModel;
            var nextValue = [];
            if (boxModel === 'radio') {
                nextValue = [optionValue];
            } else {
                var index = value.indexOf(optionValue);
                if (index === -1) {
                    nextValue = [].concat(value, [optionValue]);
                } else {
                    nextValue = [].concat(value.slice(0, index), value.slice(index + 1));
                }
            }
            this.props.onChange({
                type: 'change',
                target: this,
                value: nextValue
            });
        },
        renderOption: function (option) {
            var optionProps = option.props;
            if (option.type !== 'option') {
                return option;
            }
            var _props2 = this.props;
            var boxModel = _props2.boxModel;
            var value = _props2.value;
            var disabled = this.props.disabled || optionProps.disabled;
            var optionValue = optionProps.value;
            return React.createElement(Option, {
                boxModel: boxModel,
                label: optionProps.label || optionProps.children,
                value: optionValue,
                checked: value.indexOf(optionValue) !== -1,
                name: optionProps.name,
                disabled: disabled,
                onChange: this.onChange
            });
        },
        render: function () {
            var props = this.props;
            var validity = props.validity;
            return React.createElement('div', { className: cx(props).build() }, React.Children.map(props.children, this.renderOption), React.createElement(Validity, { validity: validity }));
        }
    });
    var PropTypes = React.PropTypes;
    BoxGroup.propTypes = {
        disabled: PropTypes.bool,
        boxModel: PropTypes.oneOf([
            'radio',
            'checkbox'
        ]).isRequired,
        onChange: PropTypes.func,
        value: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        children: PropTypes.node.isRequired
    };
    BoxGroup.defaultProps = {
        boxModel: 'checkbox',
        disabled: false,
        value: [],
        validateEvents: ['change']
    };
    BoxGroup = require('./createInputComponent').create(BoxGroup);
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