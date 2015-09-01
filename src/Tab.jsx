/**
 * @file esui-react/Tab
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var createControl = require('./common/util/createControl');

var Tab = React.createClass({

    statics: {
        type: 'Tab'
    },

    propTypes: {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        selected: React.PropTypes.bool,
        onTouchTap: React.PropTypes.func,
        label: React.PropTypes.string,
        tabIndex: React.PropTypes.number
    },

    render: function() {

        var props = this.props;

        return (
            <li {...props}>
                {props.label}
            </li>
        );

    }

});

module.exports = createControl(Tab);
