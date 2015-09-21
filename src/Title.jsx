/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component.jsx');

class Title extends Component {

    render() {

        var {level, ...rest} = this.props;
        var tag = 'h' + level;

        return React.createElement(
            tag,
            {...rest, className: this.getClassName()}
        );

    }

}

Title.propsTypes = {
    level: React.PropTypes.number.isRequired
};

module.exports = Title;
