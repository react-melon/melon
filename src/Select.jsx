/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var u = require('underscore');
var cx = require('./common/util/classname');
var dom = require('./common/util/dom');
var Icon = require('./Icon.jsx');

var Select = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        name: React.PropTypes.string
    },

    render: function () {
        return (
            <div className={this.props.className}>
                {this.renderLabel()}
                {this.renderInput()}
                {this.renderIcon()}
                {this.renderPopup()}
            </div>
        );
    },

    /**
     * 获取label部件内容
     * @return {[type]} [description]
     */
    getLabel: function () {
        var props = this.props;

        if (props.staticLabel) {
            return props.staticLabel;
        }

        var selectOption = u.findWhere(props.datasource, {value: this.state.value});

        return selectOption ? selectOption.name : props.emptyLabel;
    },

    getOption: function (option, index) {

        var value = this.state.value;

        var clazz = cx.create({
            'ui-select-option': true,
            'ui-select-option-selected': option.value === value
        });

        var name = option.name;
        var value = option.value;

        return (
            <div className={clazz}
                key={value}
                data-value={value}
                data-role="option"
                title={name}>
                {name}
            </div>
        );

    },

    getDefaultProps: function () {
        return {
            emptyLabel: '请选择'
        };
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

        var main = this.getDOMNode();

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

        var value = target.getAttribute('data-value');

        if (value === this.state.value) {
            this.setState({
                isOpen: false
            });
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
                {u.map(this.props.datasource, this.getOption || getOption, this)}
            </div>
        )
    },

    renderInput: function () {
        var name = this.props.name;
        return name
            ? (<input name={name} type="hidden" value={this.state.value} />)
            : null;
    },

    /**
     * 渲染label部件
     * @param {string|ReactElement} label label部件内容
     * @return {ReactElement}
     */
    renderLabel: function () {

        var label = this.getLabel(this);

        return u.isString(label)
            ? <label className="ui-select-label">{label}</label>
            : label;

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
    },

    hideOptions: function () {
        this.setState({
            isOpen: false
        });
    }

});

module.exports = require('./common/util/createControl')(Select);
