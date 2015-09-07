/**
 * @file esui-react/CheckBox
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var Icon  = require('./Icon.jsx');
var cx    = require('./common/util/classname');
var switches = require('./mixins/switches.jsx');


var ICONS = {
    checked: 'check-box',
    unchecked: 'check-box-outline-blank'
};

var CheckBox = React.createClass({

    mixins: [switches],

    statics: {
        type: 'CheckBox'
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
