/**
 * @file melon Base Component
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('../util/classname');

var SIZES = {
    'xs': 1,
    's': 1,
    'm': 1,
    'l': 1,
    'xl': 1,
    'xxl': 1,
    'xxxl': 1
};

var Base = React.createClass({

    propTypes: {
        children: React.PropTypes.func.isRequired,
        originProps: React.PropTypes.object,
        displayName: React.PropTypes.string,
        variants: React.PropTypes.arrayOf(React.PropTypes.string),
        states: React.PropTypes.object,
        size: React.PropTypes.oneOf(Object.keys(SIZES))
    },

    render: function() {

        var props = this.props;

        return props.children(
            props.originProps,
            {
                className: this.getClassName()
            }
        );

    },

    getClassName: function () {

        var props = this.props;

        return cx.createComponentClass(
            props.displayName,
            this.getVariants(props.originProps),
            this.getStates(props.originProps)
        );

    },

    getVariants: function (props) {

        var variants = props.variants || [];

        var size = props.size;

        if (size in SIZES) {
            variants.push('size-' + size);
        }

        return variants;

    },

    getStates: function (props) {

        var states = props.states || {};

        if (props.disabled) {
            states.disabled = props.disabled;
        }

        if (props.readOnly) {
            states.readOnly = props.readOnly;
        }

        return states;
    }

});

module.exports = Base;
