define('melon/common/util/classname', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function classnames() {
        var classes = [];
        var toString = Object.prototype.toString;
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
                    if (arg.hasOwnProperty(key) && arg[key]) {
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
        return classnames.apply(null, arguments).join(' ');
    };
});