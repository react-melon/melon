/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('./common/util/classname');
var Icon = require('./Icon');
var SeparatePopup = require('./select/SeparatePopup');

var InputComponent = require('./InputComponent');

class Select extends InputComponent {

    static displayName = 'Select';

    constructor(props) {

        super(props);

        this.state = {
            ...this.state,
            open: props.open
        };

        this.onClick = this.onClick.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.onPopupHide = this.onPopupHide.bind(this);

    }

    componentDidMount() {

        super.componentDidMount();

        let container = this.container = document.createElement('div');

        container.className = this.getPartClassName('popup');

        document.body.appendChild(container);

        this.popup = ReactDOM.render(
            <SeparatePopup
                target={ReactDOM.findDOMNode(this)}
                open={false}
                onHide={this.onPopupHide}>
                {React.Children.map(
                    this.props.children,
                    this.renderItem,
                    this
                )}
            </SeparatePopup>,
            container
        );

    }

    componentWillUnmount() {

        super.componentWillUnmount();

        let {container} = this;

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            this.container = container = null;
        }

    }

    showOptions() {

        this.setState({
            open: true
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={true}
                    onHide={this.onPopupHide}>
                    {React.Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

    }

    hideOptions() {

        this.setState({
            open: false
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={false}
                    onHide={this.onPopupHide}>
                    {React.Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

        super.onBlur({type: 'blur', target: this});

    }

    render() {
        return (
            <div
                onClick={this.onClick}
                className={this.getClassName()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                {this.renderValidateMessage()}
            </div>
        );
    }

    onClick() {

        if (this.isOpen()) {
            this.hideOptions();
        }
        else {
            this.showOptions();
        }

    }

    onClickOption(e) {

        let {target} = e;

        this.hideOptions();

        // 如果选项是禁用状态的，收起
        var disabled = target.getAttribute('data-disabled');

        if (disabled) {
            return;
        }

        // 取值
        var rawValue = target.getAttribute('data-value');

        // 值未发生变化，收起
        if (rawValue === this.state.rawValue) {
            return;
        }

        // 生成事件
        e = {
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue),
            rawValue
        };

        super.onChange(e);

        // 被控制的状态，交给控制者处理
        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        // 展开并更新值
        this.setState({
            rawValue
        }, function () {

            var onChange = this.props.onChange;

            if (onChange) {
                onChange(e);
            }

        });
    }

    onPopupHide(e) {
        this.hideOptions();
    }

    renderItem(child) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return this.renderOption(child, false);
        }

        if (child.type === 'optgroup') {
            return this.renderOptGroup(child);
        }

        return null;

    }

    renderOptGroup(group) {

        var props = group.props;

        var disabled = props.disabled;

        var className = cx.create(
            this.getPartClassName('group'),
            {
                disabled: disabled
            }
        );

        return (
            <div className={className}>
                <h4 className={this.getPartClassName('group-title')}>{props.label}</h4>
                <div className={this.getPartClassName('group-list')}>
                    {React.Children.map(
                        props.children,
                        function (child, index) {
                            return this.renderOption(child, disabled);
                        },
                        this
                    )}
                </div>
            </div>
        );

    }

    renderOption(option, isGroupDisabled) {

        var props = option.props;
        var value = props.value;

        var disabled = isGroupDisabled || props.disabled;

        var clazz = cx.create(
            this.getPartClassName('option'),
            this.getStateClasses({
                selected: this.state.rawValue === value,
                disabled: disabled
            })
        );

        return (
            <div className={clazz}
                key={value}
                data-value={value}
                data-role="option"
                data-disabled={disabled}
                title={name}
                onClick={this.onClickOption}>
                {props.label || props.children}
            </div>
        );

    }

    renderHiddenInput() {
        var name = this.props.name;
        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={this.state.rawValue} />
            )
            : null;
    }

    /**
     * 渲染label部件
     *
     * @param {string|ReactElement} label label部件内容
     * @return {ReactElement}
     */
    renderLabel() {

        var props = this.props;

        var option = this.findOption(this.getRawValue(), props.children);

        var label = option
            ? (option.props.label || option.props.children)
            : (
                <span className="ui-select-label-placeholder">
                    {props.placeholder}
                </span>
            );

        return <label className="ui-select-label">{label}</label>;

    }

    findOption(value, children) {

        children = React.Children.toArray(children);

        if (!children) {
            return null;
        }

        for (var i = 0, len = children.length; i < len; ++i) {
            var child = children[i];
            if (child.type === 'optgroup') {
                var option = this.findOption(value, child.props.children);
                if (option) {
                    return option;
                }
                continue;
            }
            if (child.props.value === value) {
                return child;
            }
        }

        return null;
    }

    renderIcon() {
        return <Icon icon='expand-more' />;
    }

    isOpen() {
        return this.state.open;
    }

}

Select.defaultProps = {
    ...InputComponent.defaultProps,
    validateEvents: ['change'],
    placeholder: '请选择'
};

var PropTypes = React.PropTypes;

Select.propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    rawValue: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired
};

Select.createOptions = function (dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

};

module.exports = Select;
