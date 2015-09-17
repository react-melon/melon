/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
var u = require('underscore');
var cx = require('./common/util/classname');
var dom = require('./common/util/dom');
var Icon = require('./Icon.jsx');

var Select = React.createClass({

    propTypes: {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        children: PropTypes.node.isRequired
    },

    contextTypes: {
        form: PropTypes.object
    },

    render: function () {
        return (
            <div className={this.props.className}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                {this.renderPopup()}
            </div>
        );
    },

    getInitialState: function () {

        var props = this.props;

        return {
            isOpen: props.isOpen,
            value: props.value
        };

    },

    componentDidMount: function () {
        dom.on(document.body, 'click', this.onClick);
    },

    componentWillUnmount: function () {
        dom.off(document.body, 'click', this.onClick);
    },

    componentWillReceiveProps: function (props) {
        this.setState({
            value: props.value,
            isOpen: props.isOpen
        });
    },

    onClick: function (e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        // @hack 这里你妹的在ie8上有问题。
        // 虽然我们添加了`componentWillUnmount`的，但是还会有已经`unmount`的控件的`click`被回调。
        // 所以我们加上这个吧。。。
        if (!this.isMounted()) {
            return;
        }

        var main = ReactDOM.findDOMNode(this);

        if (main !== target && !dom.contains(main, target)) {
            this.setState({
                isOpen: false
            });
            return;
        }

        if (!this.isOpen()) {
            this.setState({
                isOpen: true
            });
            return;
        }

        var role = target.getAttribute('data-role');

        while (target !== main && role !== 'option') {
            target = target.parentElement;
            role = target.getAttribute('data-role');
        }

        if (!role) {
            this.setState({
                isOpen: false
            });
            return;
        }

        var disabled = target.getAttribute('data-disabled');

        if (disabled) {
            this.hideOptions();
            return;
        }

        var value = target.getAttribute('data-value');

        if (value === this.state.value) {
            this.hideOptions();
            return;
        }

        this.setState({
            isOpen: false,
            value: value
        }, function () {

            if (!u.isFunction(this.props.onChange)) {
                return;
            }

            this.props.onChange({
                target: this,
                value: value
            });

        });

    },

    renderPopup: function () {

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
                {React.Children.map(this.props.children, this.renderItem)}
            </div>
        );

    },

    renderItem: function (child) {

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

    },

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

    },

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

    },

    renderHiddenInput: function () {
        var name = this.props.name;
        return name
            ? (<input name={name} type="hidden" value={this.state.value} />)
            : null;
    },

    /**
     * 渲染label部件
     *
     * @param {string|ReactElement} label label部件内容
     * @return {ReactElement}
     */
    renderLabel: function () {

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

    },

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
    },

    renderIcon: function () {
        return <Icon icon='expand-more' />;
    },

    isOpen: function () {
        return this.state.isOpen;
    },

    showOptions: function () {

        this.setState({
            isOpen: true
        });

        var form = this.context.form;

        if (form) {
            form.onFocus();
        }

    },

    hideOptions: function () {

        this.setState({
            isOpen: false
        });

        var form = this.context.form;

        if (form) {
            form.onBlur();
        }

    }

});

Select = require('./common/util/createControl')(Select);

Select.defaultProps = {
    placeholder: '请选择'
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
