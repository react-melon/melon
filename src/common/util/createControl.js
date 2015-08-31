/**
 * @file melon createControl
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Base = require('../component/Base.jsx');

module.exports = function (Component) {

    return React.createClass({

        displayName: Component.displayName,

        render: function () {

            return React.createElement(
                Base,
                {
                    originProps: this.props,
                    displayName: Component.displayName
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
