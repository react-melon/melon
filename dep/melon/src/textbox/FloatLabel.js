/**
 * @file melon/textbox/FloatingLabel
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('TextBoxFloatingLabel');

function TextBoxFloatingLabel(props) {

    const {
        floating,
        focused,
        label
    } = props;

    const className = cx(props)
        .addStates({
            focus: focused,
            floating
        })
        .build();

    return (
        <label className={className}>
            {label}
        </label>
    );

}


const {PropTypes} = React;

TextBoxFloatingLabel.propTypes = {
    label: PropTypes.string.isRequired,
    floating: PropTypes.bool.isRequired
};

module.exports = TextBoxFloatingLabel;
