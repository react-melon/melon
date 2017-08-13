/**
 * @file demo nav
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let PropTypes = require('prop-types');

let NavItem = require('./NavItem');

class Nav extends React.Component {

    render() {

        let {components, name} = this.props;

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
    components: PropTypes.array.isRequired
};

module.exports = Nav;
