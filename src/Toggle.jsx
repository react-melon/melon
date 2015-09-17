/**
 * @file esui-react/Toggle
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var Icon  = require('./Icon.jsx');
var cx    = require('./common/util/classname');
var PropTypes = React.PropTypes;

var Toggle = React.createClass({

    getInitialState() {

        return this.isControlled()
            ? {}
            : {checked: this.props.defaultChecked};

    },

    isControlled() {
        var props = this.props;
        return props.checked != null && !!props.onChange;
    },

    propTypes: {
        checked: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        defaultChecked: PropTypes.bool
    },

    render() {

        var props = this.props;
        var isChecked = this.isChecked();

        return (
            <label className={props.className}>
                <input
                    type="checkbox"
                    name={props.name}
                    value={props.value}
                    onChange={this.onChange}
                    checked={isChecked} />
                {this.renderBar()}
            </label>
        );

    },

    isChecked() {
        return this.isControlled() ? this.props.checked : this.state.checked;
    },

    onChange(e) {

        var isChecked = e.target.checked;

        e = {
            target: this,
            checked: isChecked
        };

        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        this.setState({
            checked: isChecked
        }, function () {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        });

    },

    renderBar: function () {

        var checked = this.isChecked();

        var barStyle = checked
            ? {backgroundColor: 'rgba(0, 188, 212, 0.498039)'}
            : null;

        var circleStyle = checked
            ? {left: '45%', backgroundColor: 'rgb(0, 188, 212)'}
            : null;

        return (
            <div className={cx.createPrimaryClass('toggle-bar-container')}>
                <div className={cx.createPrimaryClass('toggle-bar')} style={barStyle} />
                <div className={cx.createPrimaryClass('toggle-circle')} style={circleStyle} />
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(Toggle);
