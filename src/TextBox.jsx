/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var PropTypes = React.PropTypes;
var cx = require('./common/util/classname');

var TextBox = React.createClass({

    contextTypes: {
        form: React.PropTypes.object
    },

    propTypes: {
        value: PropTypes.string,
        onChange: PropTypes.func,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        floatingLabel: PropTypes.string
    },

    getInitialState: function () {

        var value = this.isControlled() ? null : this.props.defaultValue;

        return {
            value: value,
            isFloating: !!value
        };

    },

    isControlled() {
        var props = this.props;
        return props.readOnly || props.disabled || props.value != null && !!props.onChange;
    },

    render() {

        var props = this.props;

        var className = ''
            + props.className
            + ' '
            + cx.createStateClass(this.state.isFocus ? 'focus' : '');

        return (
            <div className={className}>
                {this.renderFloatingLabel(this.props.floatingLabel)}
                {this.renderInput()}
            </div>
        );

    },

    renderInput: function () {

        var props = this.props;
        var tag = 'input';

        if (props.multiline) {
            tag = 'textarea';
            props = React.__spread(
                {},
                props,
                {
                    ref: 'input',
                    rows: 1
                }
            );
        }

        props = React.__spread(
            {},
            props,
            {
                className: cx.createPartClass('textbox', 'input'),
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onChange: this.onChange,
                value: this.getValue()
            }
        );

        return React.createElement(tag, props);

    },

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    },

    renderFloatingLabel: function (floatingLabel) {

        var state = this.state;

        var className = cx.createComponentClass(
            'textbox-label',
            null,
            [
                state.isFloating ? 'floating' : '',
                state.isFocus ? 'focus' : ''
            ]
        );

        return floatingLabel
            ? (
                <label
                    onClick={this.onClick}
                    className={className}>
                    {floatingLabel}
                </label>
            )
            : null;

    },

    onFocus: function (e) {

        var onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus(e);
        }

        var form = this.context.form;

        if (form) {
            form.onFocus(e);
        }

        this.setState({
            isFocus: true,
            isFloating: true
        });

    },

    onBlur: function (e) {

        var onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur(e);
        }

        var form = this.context.form;

        if (form) {
            form.onBlur(e);
        }

        this.setState({
            isFloating: !!e.target.value,
            isFocus: false
        });

    },

    onChange: function (e) {

        // 如果被控制了，那么就交给控制者管理
        if (this.isControlled()) {
            this.props.onChange(e);
        }
        // 如果没有被控制，那么数据自行使用状态管理
        // 这时多行文本框需要自行更新高度
        else {

            this.setState({value: e.target.value});

            if (this.props.multiline) {
                this.syncTextareaHeight();
            }

        }

        var form = this.context.form;

        if (form) {
            form.onChange(e);
        }

    },

    componentWillReceiveProps(nextProps) {

        // 多行文本框应该可以自动更新高度
        if (nextProps.multiline
            && this.isControlled()
            && this.props.value !== nextProps.value
        ) {
            syncTextareaHeight();
        }

    },

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    },

    syncTextareaHeight: function () {
        var dom = this.refs.input;
        dom.style.height = 'auto';
        dom.style.height = dom.scrollHeight + 'px';
    }


});

module.exports = require('./common/util/createControl')(TextBox);
