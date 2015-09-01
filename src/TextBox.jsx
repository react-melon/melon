/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('./common/util/classname');

var TextBox = React.createClass({

    getInitialState: function () {
        return {
            height: null,
            isFloating: !!(this.props.value || this.props.defaultValue)
        };
    },

    render: function() {

        var props = this.props;

        var className = ''
            + props.className
            + ' '
            + cx.createStateClass(this.state.isFocus ? 'focus' : '');

        return (
            <div className={className}>
                {this.getFloatingLabel(this.props.floatingLabel)}
                {this.getInput()}
            </div>
        );

    },

    getInput: function() {

        var props = this.props;
        var height = this.state.height;
        var tag = 'input';

        if (props.multiline) {
            tag = 'textarea';
            props = React.__spread(
                {},
                props,
                {
                    ref: 'input',
                    rows: 1,
                    onChange: this.onChange
                }
            );
        }

        props = React.__spread({}, props, {
            className: cx.createPartClass('textbox', 'input'),
            onFocus: this.onFocus,
            onBlur: this.onBlur
        });

        return React.createElement(tag, props);

    },

    getFloatingLabel: function (floatingLabel) {

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

        this.setState({
            isFloating: !!e.target.value,
            isFocus: false
        });

    },

    onChange: function (e) {

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        if (this.props.multiline) {
            this.syncTextareaHeight();
        }

    },

    syncTextareaHeight: function () {
        var dom = React.findDOMNode(this.refs.input);
        dom.style.height = 'auto';
        dom.style.height = dom.scrollHeight + 'px';
    }


});

module.exports = require('./common/util/createControl')(TextBox);
