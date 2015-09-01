/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Icon = React.createClass({

    propTypes: {
        icon: React.PropTypes.string
    },

    render: function() {

        var props = this.props;

        return (
            <i {...props} className={props.className} data-icon={props.icon} />
        );
    }

});

module.exports = require('./common/util/createControl')(Icon);
