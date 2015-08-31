/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

var React = require('react');

var Button = React.createClass({

    statics: {
        type: 'Button'
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string
    },

    render: function() {

        var props = this.props;

        return (
            <button {...props}>
                {props.label || props.children}
            </button>
        );

    }

});

module.exports = require('./common/util/createControl')(Button);
