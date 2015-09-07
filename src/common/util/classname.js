/**
 * @file melon 样式相关的小工具
 * @author leon(ludafa@outlook.com)
 */

var config = require('../../config');

exports.createClassName = function (type, value) {
    return config[type] + '-' + value;
};

exports.createVariantClass = function (variants) {

    return []
        .concat(variants)
        .map(function (variant) {
            return config.variantPrefix + '-' + variant;
        })
        .join(' ');

};

function classNames() {

    var classes = [];

    for (var i = 0, len = arguments.length; i < len; i++) {

        var arg = arguments[i];

        if (!arg) {
            continue;
        }

        switch (Object.prototype.toString.call(arg).slice(8, -1)) {

            case 'String':
            case 'Number':
                classes.push(arg);
                break;

            case 'Array':
                classes = classes.concat(classNames.apply(null, arg));
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

exports.create = function () {
    return classNames.apply(null, arguments).join(' ');
};

exports.createComponentClass = function (type, variants, states) {

    return exports.create(
        this.createPrimaryClass(type),
        this.createVariantClass(variants),
        this.createStateClass(states)
    );

};

exports.createPrimaryClass = function (type) {
    return config.uiClassPrefix + '-' + classNames(type)[0].toLowerCase();
};

exports.createPartClass = function (type, part) {
    return exports.createPrimaryClass(type) + '-' + part.toLowerCase();
};

exports.createVariantClass = function () {
    return classNames
        .apply(null, arguments)
        .map(function (classname) {
            return config.variantPrefix + '-' + classname;
        })
        .join(' ')
        .toLowerCase();
};

exports.createStateClass = function () {

    return classNames
        .apply(null, arguments)
        .map(function (classname) {
            return config.statePrefix + '-' + classname;
        })
        .join(' ')
        .toLowerCase();

};
