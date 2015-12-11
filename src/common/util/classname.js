/**
 * @file melon 样式相关的小工具
 * @author leon(ludafa@outlook.com)
 */

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function classnames() {

    let classes = [];

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
                    if (hasOwnProperty.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
                break;
        }

    }

    return classes;
}

exports.createClasses = classnames;

exports.createClassName = function () {
    return classnames(...arguments).join(' ');
};
