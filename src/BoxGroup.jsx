/**
 * @file esui-react/BoxGroup
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');


var BoxGroup = React.createClass({

    statics: {
        type: 'BoxGroup'
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.array,
        name: React.PropTypes.string.isRequired,
        datasource: React.PropTypes.array
    },

    getDefaultProps: function () {

        return {
            disabled: false,
            onChange: _.noop,
            radio: false,
            datasource: [],
            value: []
        }
    },

    getInitialState: function (){

        return {
            value: this.props.value
        };
    },

    componentWillReceiveProps: function (nextProps) {
        var difference = _.intersection(nextProps.value, this.state.value);
        if (difference.length > 0) {
            this.setValue(nextProps.value);
        }
    },

    setValue: function (value) {

        this.setState({
            value: value
        }, function () {
            if (_.isFunction(this.props.onChange)) {
                this.props.onChange({
                    target: this,
                    value: value
                });
            }
        });

    },

    handleOnBeforeChange: function (child, e) {
        var value = e.target.getValue();
        var checked = e.checked;


        if (child.type.displayName === 'Radio') {

            if (_.indexOf(this.state.value, value) >= 0 && !checked) {
                return false;
            }

            value = [value];
        }
        else {

            value = checked
                ? _.union(this.state.value, [value])
                : _.difference(this.state.value, [value]);

        }

        this.setValue(value);

    },

    getValue: function () {
        return this.state.value;
    },

    render: function() {

        var props = this.props;

        var disabled = props.disabled || false;
        var readOnly = props.readOnly || false;

        var children = React.Children.map(props.children, function (child, index) {

            var index = _.indexOf(this.state.value, child.props.value);

            var checked = index >= 0;

            var child = React.cloneElement(
                child,
                {
                    name: props.name,
                    onBeforeChange: this.handleOnBeforeChange.bind(this, child),
                    onChange: _.noop,
                    checked: checked,
                    disabled: disabled,
                    readOnly: readOnly
                }
            );

            return child;

        }, this);

        return (
            <div {...props}>
                {children}
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(BoxGroup);
