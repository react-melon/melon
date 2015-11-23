/**
 * @file melon/textbox/FloatingLabel
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const createComponent = require('../createComponent');
const cx = require('../common/util/classname');

function TextBoxFloatingLabel(props) {

    const {
        className,
        floating,
        focused,
        getStateClassName,
        label
    } = props;

    return (
        <label className={cx.createClassName(
            className,
            getStateClassName({
                focus: focused,
                floating
            })
        )}>
            {label}
        </label>
    );

}


const {PropTypes} = React;

TextBoxFloatingLabel.propTypes = {
    label: PropTypes.string.isRequired,
    floating: PropTypes.bool.isRequired
};

module.exports = createComponent('TextboxFloatingLabel', TextBoxFloatingLabel);
