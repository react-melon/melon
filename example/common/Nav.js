/**
 * @file demo nav
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var NavItem = require('./NavItem');

class Nav extends React.Component {

    render() {

        var {components, name} = this.props;

        return (
            <nav className="nav">
                <h1>melon</h1>
                <ul>
                    {components.map(function (component) {
                        return (
                            <NavItem
                                name={component}
                                key={component}
                                current={name === component} />
                        );
                    })}
                </ul>
            </nav>
        );
    }

}

Nav.propsTypes = {
    components: React.PropTypes.array.isRequired
};

module.exports = Nav;
