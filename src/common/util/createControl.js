/**
 * @file melon createControl
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Base = require('../component/Base.jsx');

function camelToDash(str) {
    return str
        .replace(/[A-Z]/g, function (all, index) {
            return (index === 0 ? '' : '-') + all.toLowerCase();
        });

}

module.exports = function (Component) {

    var displayName = Component.displayName;
    var dashDisplayName = camelToDash(displayName);

    return React.createClass({

        displayName: displayName,

        render: function () {

            return React.createElement(
                Base,
                {
                    originProps: this.props,
                    displayName: dashDisplayName
                },
                function (props, extraProps) {
                    return React.createElement(
                        Component,
                        React.__spread({}, props, extraProps)
                    );
                }
            );

        }

    });

};
