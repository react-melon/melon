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
        name: React.PropTypes.string.isRequired
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
        var difference = _.difference(nextProps.value, this.state.value);
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

    getChild: function (child, childProps) {

        var props = this.props;

        return React.cloneElement(child,
            _.extend({}, {
                onBeforeChange: this.handleOnBeforeChange.bind(this, child),
                onChange: _.noop,
                disabled: props.disabled,
                readOnly: props.readOnly,
                name: props.name
            }, childProps)
        );
    },

    render: function() {

        var props = this.props;

        var children;

        if (React.Children.count(props.children) === 0) {

            var isRadio = props.isRadio || false;
            var tagName = isRadio ? 'Radio' : 'CheckBox';

            var Box = require('./' + tagName + '.jsx');

            children = _.map(props.datasource, function (item, index) {

                var i = _.indexOf(this.state.value, item.value);

                var childProps = {
                    checked: i >= 0,
                    label: item.name,
                    disabled: item.disabled,
                    key: index,
                    value: item.value
                };

                return this.getChild(<Box />, childProps);

            }, this)

        }
        else {

            children = React.Children.map(props.children, function (child, index) {

                var index = _.indexOf(this.state.value, child.props.value);

                var checked = index >= 0;

                var childProps = {
                    checked: checked
                };

                return this.getChild(child, childProps);

            }, this);
        }

        return (
            <div {...props}>
                {children}
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(BoxGroup);
