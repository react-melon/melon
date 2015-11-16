/**
 * @file esui-react/BoxGroup
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

var React = require('react');
var Option = require('./boxgroup/Option');
var InputComponent = require('./InputComponent');

class BoxGroup extends InputComponent {

    static displayName = 'BoxGroup';

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    getRawValue() {

        var props = this.props;

        if (props.disabled) {
            return [];
        }

        var value = super.getRawValue();
        var children = React.Children.toArray(props.children);

        // 要过滤掉被禁用的项
        return value.reduce(
            function (result, value) {
                for (var i = children.length - 1; i >= 0; --i) {
                    var child = children[i];
                    if (child
                        && child.type === 'option'
                        && child.props.value === value
                        && !child.props.disabled
                    ) {
                        result.push(value);
                        break;
                    }
                }
                return result;
            },
            []
        );
    }

    getValue() {
        return this.getRawValue().join(',');
    }

    parseValue(value) {
        return value ? value.split(',') : [];
    }

    render() {

        var props = this.props;

        return (
            <div className={this.getClassName()}>
                {React.Children.map(props.children, this.renderOption, this)}
                {this.renderValidateMessage()}
            </div>
        );

    }

    renderOption(option) {

        var props = option.props;

        if (option.type !== 'option') {
            return option;
        }

        var disabled = this.props.disabled || props.disabled;
        var value = props.value;

        return (
            <Option
                boxModel={this.props.boxModel}
                label={props.label || props.children}
                value={value}
                checked={this.isOptionChecked(value)}
                name={props.name}
                disabled={disabled}
                onChange={this.onChange} />
        );

    }

    isOptionChecked(value) {
        var currentValue = this.getRawValue();
        return currentValue.indexOf(value) !== -1;
    }

    onChange(e) {

        var optionValue = e.target.value;
        var rawValue = this.getRawValue();

        // 计算 radio 的值
        if (this.props.boxModel === 'radio') {
            rawValue = [optionValue];
        }
        // 计算 checkbox 的值
        else {

            var index = rawValue.indexOf(optionValue);

            if (index === -1) {
                rawValue = rawValue.concat(optionValue);
            }
            else {
                rawValue = rawValue.slice(0, index).concat(rawValue.slice(index + 1));
            }

        }

        // 生成事件对象
        e = {type: 'change', target: this, value: this.stringifyValue(rawValue), rawValue};

        super.onChange(e);

        // 如果是被控制了的，那么直接交给控制者来搞
        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        // 否则，更新自己的状态
        this.setState({
            rawValue: rawValue
        }, function () {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        });

    }

}

var PropTypes = React.PropTypes;

BoxGroup.propTypes = {
    disabled: PropTypes.bool,
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
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
        return (
            <option
                key={index}
                disabled={option.disabled}
                label={option.name}
                value={option.value} />
        );
    });

};

module.exports = BoxGroup;
