/**
 * @file demo nav
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Nav = React.createClass({

    propsTypes: {
        components: React.PropTypes.array.isRequired
    },

    render: function() {
        return (
            <nav className="nav">
                <h1>melon</h1>
                <ul>
                    {this.props.components.map(function (component) {
                        var name = component.name;
                        return <li key={name}><a href={name + '.jsx'}>{name}</a></li>;
                    })}
                </ul>
            </nav>
        );
    }

});

module.exports = Nav;
