define('melon/createComponent.bak', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './config',
    './common/util/classname',
    './common/util/hyphenate',
    './common/util/pascalize'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _require = require('./config');
    var COMPONENT_CLASS_PREFIX = _require.COMPONENT_CLASS_PREFIX;
    var COMPONENT_SIZES = _require.COMPONENT_SIZES;
    var COMPONENT_VARIANT_PREFIX = _require.COMPONENT_VARIANT_PREFIX;
    var COMPONENT_STATE_PREFIX = _require.COMPONENT_STATE_PREFIX;
    var cx = require('./common/util/classname');
    var hyphenate = require('./common/util/hyphenate');
    var pascalize = require('./common/util/pascalize');
    function addVariantClassNamePrefix(variant) {
        return COMPONENT_VARIANT_PREFIX + '-' + variant;
    }
    function getVariants(props) {
        var _props$variants = props.variants;
        var variants = _props$variants === undefined ? [] : _props$variants;
        var size = props.size;
        return COMPONENT_SIZES.indexOf(size) > -1 ? variants.concat('size-' + size) : variants;
    }
    function getVariantClasses(props) {
        return getVariants(props).map(addVariantClassNamePrefix);
    }
    function getVariantClassName() {
        return cx.createClasses.apply(null, arguments).map(addVariantClassNamePrefix).join(' ');
    }
    function addStateClassNamePrefix(state) {
        return COMPONENT_STATE_PREFIX + '-' + state;
    }
    function getStates(props) {
        var states = props.states;
        var hidden = props.hidden;
        var disabled = props.disabled;
        return babelHelpers._extends({}, states, {
            hidden: hidden,
            disabled: disabled
        });
    }
    function getStateClasses(props) {
        return cx.createClasses(getStates(props)).map(addStateClassNamePrefix);
    }
    function getStateClassName() {
        return cx.createClasses.apply(null, arguments).map(addStateClassNamePrefix).join(' ');
    }
    var PropTypes = React.PropTypes;
    var COMPONENT_PROP_TYPES = {
        variants: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.object,
        size: PropTypes.oneOf(require('./config').COMPONENT_SIZES),
        disabled: PropTypes.bool,
        hidden: PropTypes.bool
    };
    module.exports = function (type, OriginalComponent) {
        var displayName = pascalize(type);
        var hyphenatedClassName = hyphenate(displayName);
        function getPartClassName(part) {
            var prefix = COMPONENT_CLASS_PREFIX + '-' + hyphenatedClassName;
            return part ? prefix + '-' + part : prefix;
        }
        function getClassName(props) {
            var className = props.className;
            return cx.createClassName(className, getPartClassName(), getVariantClasses(props), getStateClasses(props));
        }
        function _render(props) {
            var variants = props.variants;
            var states = props.states;
            var rest = babelHelpers.objectWithoutProperties(props, [
                'variants',
                'states'
            ]);
            variants = getVariants(props);
            states = getStates(props);
            return React.createElement(OriginalComponent, babelHelpers._extends({}, rest, {
                variants: variants,
                states: states,
                className: getClassName(props),
                getStates: getStates,
                getVariants: getVariants,
                getPartClassName: getPartClassName,
                getVariantClassName: getVariantClassName,
                getStateClassName: getStateClassName
            }));
        }
        var Component = 'render' in OriginalComponent.prototype ? React.createClass({
            render: function render() {
                return _render(this.props);
            }
        }) : _render;
        Component.OriginalComponent = OriginalComponent;
        Component.displayName = displayName + 'ComponentWrapper';
        Component.propTypes = COMPONENT_PROP_TYPES;
        return Component;
    };
});