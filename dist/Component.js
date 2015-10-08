define('melon/Component', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './config',
    './common/util/classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var config = require('./config');
    var cx = require('./common/util/classname');
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
    var Component = function (_React$Component) {
        babelHelpers.inherits(Component, _React$Component);
        function Component(props) {
            babelHelpers.classCallCheck(this, Component);
            babelHelpers.get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, props);
            this.type = this.constructor.name.toLowerCase();
        }
        babelHelpers.createClass(Component, [
            {
                key: 'getClassName',
                value: function getClassName() {
                    var props = this.props;
                    return cx.create(this.props.className, this.getPartClassName(), this.getVariantClasses(), this.getStateClasses());
                }
            },
            {
                key: 'getPartClassName',
                value: function getPartClassName(part) {
                    return joinByStrike(config.COMPONENT_CLASS_PREFIX, this.type, part);
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = props.variants ? props.variants.slice() : [];
                    var size = props.size;
                    if (config.COMPONENT_SIZES.indexOf(size) !== -1) {
                        variants.push('size-' + size);
                    }
                    return variants;
                }
            },
            {
                key: 'getVariantClasses',
                value: function getVariantClasses() {
                    var variants = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    variants = this.getVariants(this.props).concat(variants);
                    return variants.map(function (variant) {
                        return joinByStrike(config.COMPONENT_VARIANT_PREFIX, variant);
                    });
                }
            },
            {
                key: 'getVariantClassName',
                value: function getVariantClassName() {
                    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var variants = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
                    return this.getVariantClasses(props, variants).join(' ');
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = {};
                    states.hidden = props.hidden;
                    states.disabled = props.disabled;
                    return states;
                }
            },
            {
                key: 'getStateClasses',
                value: function getStateClasses() {
                    var states = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    states = babelHelpers._extends({}, this.getStates(this.props), states);
                    return Object.keys(states).reduce(function (result, name) {
                        var state = states[name];
                        if (state) {
                            result.push(joinByStrike(config.COMPONENT_STATE_PREFIX, name));
                        }
                        return result;
                    }, []);
                }
            },
            {
                key: 'getStateClassName',
                value: function getStateClassName() {
                    return this.getStateClasses().join(' ');
                }
            }
        ]);
        return Component;
    }(React.Component);
    ;
    var PropTypes = React.PropTypes;
    Component.propTypes = {
        variants: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.object,
        size: PropTypes.oneOf(require('./config').COMPONENT_SIZES),
        disabled: PropTypes.bool,
        hidden: PropTypes.bool
    };
    module.exports = Component;
});