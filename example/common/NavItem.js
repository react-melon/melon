/**
 * @file melon/example/NavItem
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

class NavItem extends React.Component {
    render() {
        var {name, current} = this.props;
        return (
            <li>
                <a
                     className={current ? 'current' : ''}
                     href={'#/' + name}>
                     {name}
                </a>
            </li>
        );
    }
}

module.exports = NavItem;
