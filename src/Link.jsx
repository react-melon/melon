/**
 * @file melon/Link
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component.jsx');

class Link extends Component {

    render() {
        var props = this.props;
        return (
            <a {...props} className={this.getClassName()}>
                {props.children}
            </a>
        );
    }

}

module.exports = Link;
