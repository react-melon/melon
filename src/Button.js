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

    const className = cx(props)
        .addVariants({
            icon: React.Children.count(children) === 1
                && typeof children === 'object'
                && children.type.displayName === 'Icon',
            ripple: hasRipple && !disabled
        })
        .build();

    return (
        <button
            {...others}
            disabled={disabled}
            className={className}>
            {label || children}
            {hasRipple ? <TouchRipple /> : null}
        </button>
    );

}

Button.defaultProps = {
    hasRipple: true,
    disabled: false
};

Button.propTypes = {
    hasRipple: React.PropTypes.bool,
    disabled: React.PropTypes.bool
};

module.exports = Button;
