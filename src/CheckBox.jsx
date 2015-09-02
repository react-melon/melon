/**
 * @file esui-react/CheckBox
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var Icon  = require('./Icon.jsx');
var cx    = require('./common/util/classname');


var ICONS = {
    checked: 'check-box',
    unchecked: 'check-box-outline-blank'
};

var CheckBox = React.createClass({

    statics: {
        type: 'CheckBox'
    },

    propTypes: {
        checked: React.PropTypes.bool,
        defaultChecked: React.PropTypes.bool,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onBeforeChange: React.PropTypes.func
    },


    getInitialState: function (){

        return {
            checked:
                this.props.checked ||
                this.props.defaultChecked ||
                false
        };
    },

    getValue: function () {
        return this.props.value || '';
    },

    setValue: function (value) {
        this.props.value = value;
    },

    renderCheckIcon: function () {

        var checked = this.state.checked;

        var checkedString = checked ? 'checked' : '';

        var checkedStyle = checked ? null : {opacity: 0};
        var uncheckedStyle = checked ? {opacity: 0} : null;


        return ([
            <Icon icon={ICONS['checked']} key={'checked'} variants={[checkedString]} style={checkedStyle} />,
            <Icon icon={ICONS['unchecked']} key={'unchecked'} style={uncheckedStyle} />
        ]);
    },


    renderLabel: function () {

        var props = this.props;

        return props.label ?
            <label className={cx.createPrimaryClass('checkbox-label')}>{props.label}</label>
            : <div className={cx.createPrimaryClass('checkbox-label')}>{props.children}</div>

    },

    renderInput: function () {

        var props = this.props;
        var className = cx.createPrimaryClass('checkbox-input');
        var checked = this.state.checked;

        var input = <input type="checkbox" name={props.name} value={props.value}
                        className={className} checked={checked} readOnly />;

        return input;

    },

    componentWillReceiveProps: function (nextProps) {
        var checked = nextProps.checked;
        if (checked === !this.state.checked) {
            this.setChecked(checked);
        }
    },

    setChecked: function(checked) {

        if (this.props.disabled) {
            return;
        }

        this.setState({checked: checked}, function () {

            if (!_.isFunction(this.props.onChange)) {
                return;
            }

            this.props.onChange({
                target: this,
                checked: checked
            });
        });
    },

    handleOnClick: function (e) {

        var checked = this.state.checked;

        if (_.isFunction(this.props.onBeforeChange)) {
            var cancel = this.props.onBeforeChange({
                target: this,
                checked: !checked
            });
            if (cancel === false) {
                return;
            }
        }

        this.setChecked(!checked);
    },

    render: function() {

        var props = this.props;

        var onClick = (props.disabled || props.readOnly) ? _.noop : this.handleOnClick;

        return (
            <div {...props} onClick={onClick}>
                {this.renderCheckIcon()}
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(CheckBox);
