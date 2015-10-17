/**
 * @file melon Base Component
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var config = require('./config');
var cx = require('./common/util/classname');

/**
 * 将参数用`-`连接成字符串
 *
 * @param {...string} args 需要连接的串
 * @return {string}
 * @ignore
 */
function joinByStrike() {

    var result = [];

    for (var i = 0, len = arguments.length; i < len; ++i) {
        var arg = arguments[i];
        if (arg) {
            result.push(arg);
        }
    }

    return result.join('-');

}

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.type = this.constructor.name.toLowerCase();
    }

    getClassName() {
        return cx.create(
            this.props.className,
            this.getPartClassName(),
            this.getVariantClasses(),
            this.getStateClasses()
        );
    }

    getPartClassName(part) {

        return joinByStrike(
            config.COMPONENT_CLASS_PREFIX,
            this.type,
            part
        );

    }

    getVariants(props) {

        let variants = props.variants ? props.variants.slice() : [];

        let size = props.size;

        if (config.COMPONENT_SIZES.indexOf(size) !== -1) {
            variants.push('size-' + size);
        }

        return variants;
    }

    getVariantClasses(variants = []) {

        variants = this.getVariants(this.props).concat(variants);

        return variants
            .map(function (variant) {
                return joinByStrike(config.COMPONENT_VARIANT_PREFIX, variant);
            });

    }

    getVariantClassName(props = {}, variants = []) {
        return this.getVariantClasses(props, variants).join(' ');
    }

    getStates(props) {
        let {states, hidden, disabled} = props;
        return {
            ...states,
            hidden,
            disabled
        };
    }

    getStateClasses(states = {}) {

        states = {
            ...this.getStates(this.props),
            ...states
        };

        return Object.keys(states)
            .reduce(
                function (result, name) {
                    var state = states[name];
                    if (state) {
                        result.push(joinByStrike(config.COMPONENT_STATE_PREFIX, name));
                    }
                    return result;
                },
                []
            );

    }

    getStateClassName() {
        return this.getStateClasses().join(' ');
    }

}

var PropTypes = React.PropTypes;

Component.propTypes = {
    variants: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.object,
    size: PropTypes.oneOf(require('./config').COMPONENT_SIZES),
    disabled: PropTypes.bool,
    hidden: PropTypes.bool
};

module.exports = Component;
