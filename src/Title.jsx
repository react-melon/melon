/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Title = React.createClass({

    propsTypes: {
        level: React.PropTypes.number
    },

    render: function () {

        var level = this.props.level;
        var tag = 'h' + level;

        return React.createElement(
            tag,
            {
                className: 'ui-title'
            },
            this.props.children
        );

    }

});

module.exports = Title;
