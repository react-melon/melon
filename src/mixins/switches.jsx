/**
 * @file esui-react/mixins/switches
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');

module.exports = {

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
    }
};
