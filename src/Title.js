/**
 * @file melon/Title
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component');

class Title extends Component {

    static displayName = 'Title';

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
