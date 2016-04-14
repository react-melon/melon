/**
 * @file melon 样式相关的小工具
 * @author leon(ludafa@outlook.com)
 */

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function createClasses(...args) {

    let classes = [];

    for (let i = 0, len = args.length; i < len; i++) {

        const arg = args[i];

        if (!arg) {
            continue;
        }

        switch (toString.call(arg).slice(8, -1)) {

            case 'String':
            case 'Number':
                classes.push(arg);
                break;

            case 'Array':
                classes = classes.concat(createClasses.apply(null, arg));
                break;

            case 'Object':
                for (const key in arg) {
                    if (hasOwnProperty.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
                break;
        }

    }

    return classes;

}

export function createClassName(...args) {
    return createClasses(...args).join(' ');
}
