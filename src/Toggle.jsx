/**
 * @file esui-react/Toggle
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var Icon  = require('./Icon.jsx');
var cx    = require('./common/util/classname');
var switches = require('./mixins/switches.jsx');

var Toggle = React.createClass({

    mixins: [switches],

    statics: {
        type: 'Toggle'
    },

    propTypes: {
        leftLabel: React.PropTypes.string
    },

    renderBar: function () {

        var checked = this.state.checked;
        var props = this.props;

        var barStyle = checked ? {
                backgroundColor: 'rgba(0, 188, 212, 0.498039)'
            } : null;

        var circleStyle = checked ? {
                left: '45%',
                backgroundColor: 'rgb(0, 188, 212)'
            } : null;

        var checkedString = checked ? 'checked' : '';

        var onClick = (props.disabled || props.readOnly) ? _.noop : this.handleOnClick;

        return (
            <div className={cx.createPrimaryClass('toggle-bar-container')} onClick={onClick}>
                <div className={cx.createPrimaryClass('toggle-bar')} style={barStyle} />
                <div className={cx.createPrimaryClass('toggle-circle')} style={circleStyle} />
            </div>
        )

    },

    renderLabel: function (isLeft) {

        var props = this.props;

        var label = isLeft ? props.leftLabel : props.label;
        var classname = cx.createPrimaryClass('toggle-label');

        if (!label) {
            return;
        }

        if (isLeft) {
            classname += ' ' + cx.createPrimaryClass('toggle-label-left');
        }

        return (
            <label className={classname}>
                {label}
            </label>
        )

    },

    renderInput: function () {

        var props = this.props;
        var className = cx.createPrimaryClass('toggle-input');
        var checked = this.state.checked;

        var input = <input type="checkbox" name={props.name} value={props.value}
                        className={className} checked={checked} readOnly />;

        return input;

    },

    render: function() {

        var props = this.props;

        return (
            <div {...props}>
                {this.renderInput()}
                {this.renderLabel(true)}
                {this.renderBar()}
                {this.renderLabel(false)}
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(Toggle);
