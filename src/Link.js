/**
 * @file melon/Link
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component');

class Link extends Component {

    static displayName = 'Link';

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
