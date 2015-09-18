/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var PropTypes = React.PropTypes;

var Icon = React.createClass({

    render: function() {

        var props = this.props;

        return (
            <i {...props} className={props.className} data-icon={props.icon} />
        );
    }

});

Icon = require('./common/util/createControl')(Icon);

Icon.propTypes = {
    icon: PropTypes.string.isRequired
};

module.exports = Icon;
