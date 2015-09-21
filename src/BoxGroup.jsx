/**
 * @file esui-react/BoxGroup
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

var React = require('react');
var Option = require('./boxgroup/Option.jsx');
var Component = require('./Component.jsx');

class BoxGroup extends Component {

    constructor(props) {
        super(props);
        this.state = this.isControlled()
            ? null
            : {value: this.props.value || this.props.defaultValue};
    }

    contextTypes: {
        form: PropTypes.object
    }

    getValue() {

        var props = this.props;

        if (props.disabled) {
            return [];
        }

        var value = this.isControlled() ? props.value : this.state.value;
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

    isControlled() {
        var props = this.props;
        return this.props.disabled || props.readOnly || props.value && props.onChange;
    }

    render() {

        var props = this.props;

        return (
            <div className={this.getClassName()}>
                {React.Children.map(props.children, this.renderOption, this)}
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
                label={props.label || pros.children}
                value={value}
                checked={this.isOptionChecked(value)}
                name={props.name}
                disabled={disabled}
                onChange={this.onChange.bind(this)} />
        );

    }

    isOptionChecked(value) {
        var currentValue = this.getValue();
        return currentValue.indexOf(value) !== -1;
    }

    onChange(e) {

        var optionValue = e.target.value;
        var value = this.getValue();

        // 计算 radio 的值
        if (this.props.boxModel === 'radio') {
            value = [optionValue];
        }
        // 计算 checkbox 的值
        else {

            var index = value.indexOf(optionValue);

            if (index === -1) {
                value = value.concat(optionValue);
            }
            else {
                value = value.slice(0, index).concat(value.slice(index + 1));
            }

        }

        // 生成事件对象
        e = {type: 'change', target: this, value};

        var form = this.context.form;

        if (form) {
            form.onFinishEdit(e);
        }

        // 如果是被控制了的，那么直接交给控制者来搞
        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        // 否则，更新自己的状态
        this.setState({
            value: value
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
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    children: PropTypes.node.isRequired
};

BoxGroup.defaultProps = {
    disabled: false,
    value: []
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
