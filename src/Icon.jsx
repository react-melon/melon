/**
 * @file melon/Icon
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component.jsx');

class Icon extends Component {

    render() {

        var props = this.props;

        return (
            <i {...props} className={this.getClassName()} data-icon={props.icon} />
        );
    }

}

Icon.propTypes = {
    icon: React.PropTypes.string.isRequired
};

module.exports = Icon;
