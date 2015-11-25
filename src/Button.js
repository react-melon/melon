/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Button');
const TouchRipple = require('./ripples/TouchRipple');

function Button(props) {

    const {
        hasRipple,
        label,
        children,
        disabled,
        ...others
    } = props;

    const className = cx(props).addVariants({ripple: hasRipple && !disabled}).build();

    return (
        <button
            {...others}
            disabled={disabled}
            className={className}>
            {hasRipple ? <TouchRipple /> : null}
            {label || children}
        </button>
    );

}

Button.defaultProps = {
    hasRipple: true
};

Button.propTypes = {
    hasRipple: React.PropTypes.bool
};

module.exports = Button;
