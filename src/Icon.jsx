/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Icon = React.createClass({

    propTypes: {
        className: React.PropTypes.string
    },

    render: function() {

        var props = this.props;

        return (
            <i {...props} className='ui-icon' data-icon={props.icon} />
        );
    }

});

module.exports = Icon;
