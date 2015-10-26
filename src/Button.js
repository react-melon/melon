/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

var React = require('react');

var Component = require('./Component');
var TouchRipple = require('./ripples/TouchRipple');

class Button extends Component {

    static displayName = 'Button';

    getVariants(props) {
        let variants = super.getVariants(props);
        if (props.hasRipple) {
            variants.push('ripple');
        }
        return variants;
    }

    render() {

        var {
            hasRipple,
            label,
            children,
            ...other
        } = this.props;

        var content = label || children;
        var useRipple = hasRipple && !other.disabled;

        var style = useRipple
            ? {
                position: 'relative'
            }
            : {};

        return (
            <button {...other} className={this.getClassName()} style={style}>
                {useRipple ? <TouchRipple /> : null}
                {content}
            </button>
        );

    }

}

Button.defaultProps = {
    hasRipple: true
};

Button.propTypes = {
    hasRipple: React.PropTypes.bool
};

module.exports = Button;
