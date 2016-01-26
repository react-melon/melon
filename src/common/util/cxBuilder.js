/**
 * @file 实验一下。。。
 * @author leon(ludafa@outlook.com)
 */

const cx = require('./classname');

const hyphenate = require('./hyphenate');
const pascalize = require('./pascalize');

const {
    COMPONENT_CLASS_PREFIX,
    COMPONENT_SIZES,
    COMPONENT_VARIANT_PREFIX,
    COMPONENT_STATE_PREFIX
} = require('../../config');

function addPrefix(prefix) {
    return function () {
        return cx
            .createClasses
            .apply(null, arguments)
            .map(className => {
                return `${prefix}-${className}`;
            })
            .join(' ');
    };
}

/**
 * const builder = require('classnames').create('textbox');
 *
 * builder()
 *   .part('hehe')
 *   .addStates({invalid: true})
 *   .addVariants(1, 2, 3)
 *   .add('some other classname')
 *   .build()
 *
 * builder({states: {invalid: true}, variants: [12321, 12321], size: 'xx'}).build()
 *
 */

function resolveVariants(props) {
    let {variants = [], size} = props;
    return COMPONENT_SIZES.indexOf(size) > -1
        ? variants.concat(`size-${size}`)
        : variants;
}

function resolveStates(props) {
    const {states, hidden, disabled, validity} = props;

    const isValid = validity ? validity.isValid() : null;

    return {
        ...states,
        hidden,
        disabled,
        invalid: isValid === false,
        valid: isValid === true
    };
}

exports.create = type => {

    const displayName = pascalize(type);
    const hyphenatedClassName = hyphenate(displayName);
    const getVariantClassName = addPrefix(COMPONENT_VARIANT_PREFIX);
    const getStateClassName = addPrefix(COMPONENT_STATE_PREFIX);

    function getPartClassName(part) {
        const prefix = `${COMPONENT_CLASS_PREFIX}-${hyphenatedClassName}`;
        return part ? `${prefix}-${part}` : prefix;
    }

    function createBuilder(props) {

        let part = '';
        let states = resolveStates(props);
        let variants = resolveVariants(props);

        const builder = {
            addStates,
            removeStates,
            clearStates,
            addVariants,
            removeVariants,
            clearVariants,
            build,
            part: setPart
        };

        function setPart(p) {
            part = p;
            return builder;
        }

        function addStates(newStates) {
            states = {
                ...states,
                ...newStates
            };
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
            variants = variants.filter(term => {
                return term !== variant;
            });
            return builder;
        }

        function clearVariants() {
            variants = [];
            return builder;
        }

        function build() {
            return cx.createClassName(
                props.className,
                getPartClassName(part),
                getVariantClassName(variants),
                getStateClassName(states)
            );
        }

        return builder;

    }

    function builder(props = {}) {
        return createBuilder(props);
    }

    builder.getPartClassName = getPartClassName;

    builder.getDisplayName = function getDisplayName() {
        return displayName;
    };

    return builder;

};
