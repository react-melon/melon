/**
 * @file melon 样式相关的小工具
 * @author leon(ludafa@outlook.com)
 */

function classnames() {

    let classes = [];
    const toString = Object.prototype.toString;

    for (let i = 0, len = arguments.length; i < len; i++) {

        const arg = arguments[i];

        if (!arg) {
            continue;
        }

        switch (toString.call(arg).slice(8, -1)) {

            case 'String':
            case 'Number':
                classes.push(arg);
                break;

            case 'Array':
                classes = classes.concat(classnames.apply(null, arg));
                break;

            case 'Object':
                for (var key in arg) {
                    if (arg.hasOwnProperty(key) && arg[key]) {
                        classes.push(key);
                    }
                }
                break;
        }

    }

    return classes;
}

// const {
//     COMPONENT_VARIANT_PREFIX,
//     COMPONENT_STATE_PREFIX
// } = require('./config');

// function addVariantPrefix(variant) {
//     return `${COMPONENT_VARIANT_PREFIX}-${variant}`;
// }

// function createVariantsClasses() {
//     return classnames.apply(null, arguments).map(addVariantPrefix);
// }

// exports.addVariantPrefix = addVariantPrefix;
// exports.createVariantClasses = createVariantsClasses;
// exports.createVariantClassName = () => {
//     return createVariantsClasses(arguments).join(' ');
// };

// function addStatePrefix(state) {
//     return `${COMPONENT_STATE_PREFIX}-${state}`;
// }

// function createStateClasses() {
//     return classnames.apply(null, arguments).map(addStatePrefix);
// }

// function createStateClassName() {
//     return createStateClasses(arguments).join(' ');
// }

// exports.addStatePrefix = addStatePrefix;
// exports.createStateClasses = createStateClasses;
// exports.createStateClassName = createStateClassName;

exports.createClasses = classnames;

exports.createClassName = function () {
    return classnames.apply(null, arguments).join(' ');
};
