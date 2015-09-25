define('melon/dialog/windowScrollHelper', [
    'exports',
    '../babelHelpers'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var originalHTMLBodySize = {};
    function stop(name) {
        var element = document.getElementsByTagName(name)[0];
        originalHTMLBodySize[name] = {
            width: element.style.width,
            height: element.style.height
        };
        element.style.width = '100%';
        element.style.height = '100%';
        return element;
    }
    function restore(name) {
        var element = document.getElementsByTagName(name)[0];
        var size = originalHTMLBodySize[name];
        element.style.width = size.width;
        element.style.height = size.height;
        delete originalHTMLBodySize[name];
        return element;
    }
    exports.update = function () {
        exports.stop();
        exports.restore();
    };
    exports.stop = function () {
        stop('body');
        stop('html').style.overflow = 'hidden';
    };
    exports.restore = function () {
        if (!originalHTMLBodySize.body || !originalHTMLBodySize.html) {
            return;
        }
        restore('body');
        restore('html').style.overflow = '';
    };
});