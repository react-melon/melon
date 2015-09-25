define('melon/common/util/classname', [
    'exports',
    '../../babelHelpers',
    '../../config'
], function (exports) {
    var babelHelpers = require('../../babelHelpers');
    var config = require('../../config');
    exports.createClassName = function (type, value) {
        return config[type] + '-' + value;
    };
    exports.createVariantClass = function (variants) {
        return [].concat(variants).map(function (variant) {
            return config.COMPONENT_VARIANT_PREFIX + '-' + variant;
        }).join(' ');
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
        return exports.create(this.createPrimaryClass(type), this.createVariantClass(variants), this.createStateClass(states));
    };
    exports.createPrimaryClass = function (type) {
        return config.COMPONENT_CLASS_PREFIX + '-' + classNames(type)[0].toLowerCase();
    };
    exports.createPartClass = function (type, part) {
        return exports.createPrimaryClass(type) + '-' + part.toLowerCase();
    };
    exports.createVariantClass = function () {
        return classNames.apply(null, arguments).map(function (classname) {
            return config.COMPONENT_VARIANT_PREFIX + '-' + classname;
        }).join(' ').toLowerCase();
    };
    exports.createStateClass = function () {
        return classNames.apply(null, arguments).map(function (classname) {
            return config.COMPONENT_STATE_PREFIX + '-' + classname;
        }).join(' ').toLowerCase();
    };
});