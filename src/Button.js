/**
 * @file esui-react/Button
 * @author leon<lupengyu@baidu.com>
 */

var React = require('react');

var Component = require('./Component');
var TouchRipple = require('./ripples/TouchRipple');

class Button extends Component {

    getVariants(props) {
        let variants = super.getVariants(props);
        if (props.hasRipple) {
            variants.push('ripple');
        }
        return variants;
    }

    render() {

        var {
            props,
            hasRipple,
            label,
            children,
            ...other
        } = this.props;

        var content = label || children;

        var style = hasRipple
            ? {
                position: 'relative'
            }
            : {};

        return (
            <button {...other} className={this.getClassName()} style={style}>
                {hasRipple ? <TouchRipple /> : null}
                {content}
            </button>
        );

    }

}

Button.propTypes = {
    hasRipple: React.PropTypes.bool
};

module.exports = Button;
