define('melon/common/util/cxBuilder', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    './classname',
    './hyphenate',
    './pascalize',
    '../../config'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var cx = require('./classname');
    var hyphenate = require('./hyphenate');
    var pascalize = require('./pascalize');
    var _require = require('../../config');
    var COMPONENT_CLASS_PREFIX = _require.COMPONENT_CLASS_PREFIX;
    var COMPONENT_SIZES = _require.COMPONENT_SIZES;
    var COMPONENT_VARIANT_PREFIX = _require.COMPONENT_VARIANT_PREFIX;
    var COMPONENT_STATE_PREFIX = _require.COMPONENT_STATE_PREFIX;
    function addPrefix(prefix) {
        return function () {
            return cx.createClasses.apply(null, arguments).map(function (className) {
                return prefix + '-' + className;
            }).join(' ');
        };
    }
    function resolveVariants(props) {
        var _props$variants = props.variants;
        var variants = _props$variants === undefined ? [] : _props$variants;
        var size = props.size;
        return COMPONENT_SIZES.indexOf(size) > -1 ? variants.concat('size-' + size) : variants;
    }
    function resolveStates(props) {
        var states = props.states;
        var hidden = props.hidden;
        var disabled = props.disabled;
        return babelHelpers._extends({}, states, {
            hidden: hidden,
            disabled: disabled
        });
    }
    exports.create = function (type) {
        var displayName = pascalize(type);
        var hyphenatedClassName = hyphenate(displayName);
        var getVariantClassName = addPrefix(COMPONENT_VARIANT_PREFIX);
        var getStateClassName = addPrefix(COMPONENT_STATE_PREFIX);
        function getPartClassName(part) {
            var prefix = COMPONENT_CLASS_PREFIX + '-' + hyphenatedClassName;
            return part ? prefix + '-' + part : prefix;
        }
        function createBuilder(props) {
            var part = '';
            var states = resolveStates(props);
            var variants = resolveVariants(props);
            var builder = {
                addStates: addStates,
                removeStates: removeStates,
                clearStates: clearStates,
                addVariants: addVariants,
                removeVariants: removeVariants,
                clearVariants: clearVariants,
                build: build,
                part: setPart
            };
            function setPart(p) {
                part = p;
                return builder;
            }
            function addStates(newStates) {
                states = babelHelpers._extends({}, states, newStates);
                return builder;
            }
            function removeStates(name) {
                states[name] = true;
                return builder;
            }
            function clearStates() {
                states = {};
                return builder;
            }
            function addVariants() {
                variants = variants.concat([].slice.call(arguments));
                return builder;
            }
            function removeVariants(variant) {
                variants = variants.filter(function (term) {
                    return term !== variant;
                });
                return builder;
            }
            function clearVariants() {
                variants = [];
                return builder;
            }
            function build() {
                return cx.createClassName(props.className, getPartClassName(part), getVariantClassName(variants), getStateClassName(states));
            }
            return builder;
        }
        function builder() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            return createBuilder(props);
        }
        builder.getPartClassName = getPartClassName;
        builder.getDisplayName = function getDisplayName() {
            return displayName;
        };
        return builder;
    };
});