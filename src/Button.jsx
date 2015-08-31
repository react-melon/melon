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
        type: React.PropTypes.string,
        onKeyboardFocus: React.PropTypes.func,
        onMouseEnter: React.PropTypes.func,
        onMouseLeave: React.PropTypes.func,
        onTouchStart: React.PropTypes.func
    },

    render: function() {

        var props = this.props;

        return (
            <button
                className={props.className}
                disabled={props.disabled}
                type={props.type}>
                {props.label || props.children}
            </button>
        );

    }

});

module.exports = require('./common/util/createControl')(Button);
