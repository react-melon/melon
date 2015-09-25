/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('./common/util/classname');
var dom = require('./common/util/dom');
var Icon = require('./Icon');

var InputComponent = require('./InputComponent');

class Select extends InputComponent {

    constructor(props) {

        super(props);

        this.state = {
            ...this.state,
            isOpen: props.isOpen
        };

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div ref="main" className={this.getClassName()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                {this.renderPopup()}
                {this.renderValidateMessage()}
            </div>
        );
    }

    componentDidMount() {
        super.componentDidMount();
        dom.on(document.body, 'click', this.onClick);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        dom.off(document.body, 'click', this.onClick);
    }

    onClick(e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        // @hack 这里你妹的在ie8上有问题。
        // 虽然我们添加了`componentWillUnmount`的，但是还会有已经`unmount`的控件的`click`被回调。
        // 所以我们加上这个吧。。。
        // if (!this.isMounted()) {
        //     return;
        // }

        var main = this.refs.main;

        // 点击不在 select内部，那么就把 select 收起
        if (main !== target && !dom.contains(main, target)) {
            if (this.state.isOpen) {
                this.hideOptions();
            }
            return;
        }

        // 如果当前是收起的，那么就展开
        if (!this.isOpen()) {
            this.showOptions();
            return;
        }

        // 向上查找，找到可用的 option
        var role = target.getAttribute('data-role');

        while (target !== main && role !== 'option') {
            target = target.parentElement;
            role = target.getAttribute('data-role');
        }

        // 没找到的话就收起
        if (!role) {
            this.hideOptions();
            return;
        }

        // 如果选项是禁用状态的，收起
        var disabled = target.getAttribute('data-disabled');

        if (disabled) {
            this.hideOptions();
            return;
        }


        // 取值
        var rawValue = target.getAttribute('data-value');

        // 值未发生变化，收起
        if (rawValue === this.state.rawValue) {
            this.hideOptions();
            return;
        }

        // 生成事件
        var e = {
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue),
            rawValue
        };

        super.onChange(e);

        // 被控制的状态，交给控制者处理
        if (this.isControlled()) {
            this.props.onChange(e);
            this.hideOptions();
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

        this.hideOptions();

    }

    renderPopup() {

        var isOpen = this.isOpen();

        var style = isOpen
            ? {
                height: 'auto',
                opacity: 1,
                overflow: 'auto'
            }
            : {
                height: 0,
                opacity: 0,
                padding: 0,
                overflow: 'hidden'
            };

        return (
            <div className="ui-select-popup" style={style}>
                {React.Children.map(this.props.children, this.renderItem, this)}
            </div>
        );

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
                title={name}>
                {props.label || props.children}
            </div>
        );

    }

    renderHiddenInput() {
        var name = this.props.name;
        return name
            ? (<input name={name} type="hidden" value={this.state.rawValue} />)
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
        return this.state.isOpen;
    }

    showOptions() {

        this.setState({
            isOpen: true
        });

    }

    hideOptions() {

        this.setState({
            isOpen: false
        });

        super.onBlur({type: 'blur', target: this});

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
