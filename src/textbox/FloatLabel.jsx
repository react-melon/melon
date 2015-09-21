/**
 * @file melon/textbox/FloatingLabel
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Component = require('../Component.jsx');

class TextBoxFloatingLabel extends Component {

    render() {

        var props = this.props;

        return (
            <label
                onClick={props.onClick}
                className={this.getClassName()}>
                {props.label}
            </label>
        );
    }

}

var PropTypes = React.PropTypes;

TextBoxFloatingLabel.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired
};

module.exports = TextBoxFloatingLabel;
