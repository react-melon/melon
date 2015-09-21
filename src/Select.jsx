/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var u = require('underscore');
var cx = require('./common/util/classname');
var dom = require('./common/util/dom');
var Icon = require('./Icon.jsx');

var Component = require('./Component.jsx');

class Select extends Component {

    contextTypes: {
        form: PropTypes.object
    }

    constructor(props) {

        super(props);

        var state = {
            isOpen: props.isOpen
        };

        if (!this.isControlled()) {
            state.value = this.props.value || this.props.defaultValue;
        }

        this.state = state;

    }

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    isControlled() {
        var props = this.props;
        return this.props.disabled || props.readOnly || props.value && props.onChange;
    }

    render() {
        return (
            <div ref="main" className={this.getClassName()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                {this.renderPopup()}
            </div>
        );
    }

    componentDidMount() {
        dom.on(document.body, 'click', this.onClick.bind(this));
    }

    componentWillUnmount() {
        dom.off(document.body, 'click', this.onClick.bind(this));
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
            this.setState({
                isOpen: false
            });
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
        var value = target.getAttribute('data-value');

        // 值未发生变化，收起
        if (value === this.state.value) {
            this.hideOptions();
            return;
        }

        // 生成事件
        var e = {type: 'change', target: this, value};

        // 被控制的状态，交给控制者处理
        if (this.isControlled()) {
            this.props.onChange(e);
            this.hideOptions();
            return;
        }

        // 展开并更新值
        this.setState({
            value: value
        }, function () {

            var onChange = this.props.onChange;

            if (onChange) {
                onChange({
                    target: this,
                    value: value
                });
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

        var className = cx.create({
            'ui-select-group': true,
            'state-disabled': disabled
        });

        return (
            <div className={className}>
                <h4 className="ui-select-group-title">{props.label}</h4>
                <div className="ui-select-group-list">
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

        var clazz = cx.create({
            'ui-select-option': true,
            'state-selected': this.state.value === value,
            'state-disabled': disabled
        });

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
            ? (<input name={name} type="hidden" value={this.state.value} />)
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

        var option = this.findOption(this.state.value, props.children);

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

        var form = this.context.form;

        if (form) {
            form.onStartEdit({type: 'focus', target: this});
        }

    }

    hideOptions() {

        this.setState({
            isOpen: false
        });

        var form = this.context.form;

        if (form) {
            form.onFinishEdit({type: 'blur', target: this});
        }

    }

}

Select.defaultProps = {
    placeholder: '请选择'
};

var PropTypes = React.PropTypes;

Select.propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
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
