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
                className={this.getClassName()}>
                {props.label}
            </label>
        );

    }

    getStates(props) {
        var states = super.getStates(props);
        states.floating = props.floating;
        states.focus = props.focused;
        return states;
    }

}

var PropTypes = React.PropTypes;

TextBoxFloatingLabel.propTypes = {
    label: PropTypes.string.isRequired,
    floating: PropTypes.bool.isRequired
};

module.exports = TextBoxFloatingLabel;
