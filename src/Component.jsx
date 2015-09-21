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
        var props = this.props;
        return cx.create(
            this.props.className,
            this.getPartClassName(),
            this.getVariantClasses(props, props.variants),
            this.getStateClasses(props, props.states)
        );
    }

    getPartClassName(part) {

        return joinByStrike(
            config.COMPONENT_CLASS_PREFIX,
            this.type,
            part
        );

    }

    getVariantClasses(props = {}, variants = []) {

        var size = props.size;

        if (size in config.COMPONENT_SIZES) {
            variants.push('size-' + size);
        }

        return variants
            .map(function (variant) {
                return joinByStrike(config.COMPONENT_VARIANT_PREFIX, variant);
            });

    }

    getVariantClassName(props = {}, variants = []) {
        return this.getVariantClasses(props, variants).join(' ');
    }

    getStateClasses(props = {}, states = {}) {

        if (props.disabled) {
            states.disabled = props.disabled;
        }

        if (props.readOnly) {
            states.readOnly = props.readOnly;
        }

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

};

Component.propTypes = {
    variants: React.PropTypes.arrayOf(React.PropTypes.string),
    states: React.PropTypes.object,
    size: React.PropTypes.oneOf(require('./config').COMPONENT_SIZES)
};

module.exports = Component;
