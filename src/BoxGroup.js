/**
 * @file esui-react/BoxGroup
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

const React = require('react');
const Option = require('./boxgroup/Option');
const cx = require('./common/util/cxBuilder').create('BoxGroup');
const Validity = require('./Validity');

let BoxGroup = React.createClass({

    displayName: 'BoxGroup',

    getValue() {

        const {
            disabled,
            value
        } = this.props;

        if (disabled) {
            return [];
        }

        const children = React.Children.toArray(this.props.children);

        // 要过滤掉被禁用的项
        return value.reduce(
            (result, value) => {
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
    },

    onChange(e) {

        const optionValue = e.target.value;
        const value = this.getValue();

        const {
            boxModel
        } = this.props;

        let nextValue = [];

        // 计算 radio 的值
        if (boxModel === 'radio') {
            nextValue = [optionValue];
        }
        // 计算 checkbox 的值
        else {

            var index = value.indexOf(optionValue);

            if (index === -1) {
                nextValue = [...value, optionValue];
            }
            else {
                nextValue = [...value.slice(0, index), ...value.slice(index + 1)];
            }

        }

        this.props.onChange({
            type: 'change',
            target: this,
            value: nextValue
        });

    },

    renderOption(option) {

        var optionProps = option.props;

        if (option.type !== 'option') {
            return option;
        }

        const {
            boxModel,
            value
        } = this.props;

        const disabled = this.props.disabled || optionProps.disabled;
        const optionValue = optionProps.value;

        return (
            <Option
                boxModel={boxModel}
                label={optionProps.label || optionProps.children}
                value={optionValue}
                checked={value.indexOf(optionValue) !== -1}
                name={optionProps.name}
                disabled={disabled}
                onChange={this.onChange} />
        );

    },

    render() {

        const {props} = this;
        const {validity} = props;

        return (
            <div className={cx(props).build()}>
                {React.Children.map(props.children, this.renderOption)}
                <Validity validity={validity} />
            </div>
        );

    }

});

const {PropTypes} = React;

BoxGroup.propTypes = {
    disabled: PropTypes.bool,
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
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
