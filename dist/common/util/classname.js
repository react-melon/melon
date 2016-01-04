define('melon/common/util/classname', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var toString = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function classnames() {
        var classes = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
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
        return classnames.apply(undefined, arguments).join(' ');
    };
});