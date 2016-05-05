/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.windowScrollHelper = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.stop = stop;
    exports.restore = restore;
    exports.update = update;

    /**
     * @file melon/dialog/windowScrollHelper
     * @author leon(ludafa@outlook.com)
     */

    var originalHTMLBodySize = {};

    function stopWindowScrolling(name) {

        var element = document.getElementsByTagName(name)[0];

        var lockNum = element.getAttribute('data-lock') || '0';
        lockNum = parseInt(lockNum, 10);

        element.setAttribute('data-lock', lockNum + 1);

        if (lockNum === 0) {
            originalHTMLBodySize[name] = {
                width: element.style.width,
                height: element.style.height,
                overflow: element.style.overflow
            };
            element.style.width = '100%';
            element.style.height = '100%';

            if (name !== 'html') {
                element.style.overflow = 'hidden';
            }
        }

        return element;
    }

    function restoreWindowScrolling(name) {

        var element = document.getElementsByTagName(name)[0];
        var lockNum = element.getAttribute('data-lock') || '0';
        lockNum = parseInt(lockNum, 10);

        if (lockNum > 1) {
            element.setAttribute('data-lock', lockNum - 1);
        } else {
            element.removeAttribute('data-lock');
            var size = originalHTMLBodySize[name];
            element.style.width = size.width;
            element.style.height = size.height;

            if (name !== 'html') {
                element.style.overflow = size.overflow;
            }
            delete originalHTMLBodySize[name];
        }

        return element;
    }

    function stop() {
        stopWindowScrolling('body');
        stopWindowScrolling('html');
    }

    function restore() {
        if (!originalHTMLBodySize.body || !originalHTMLBodySize.html) {
            return;
        }
        restoreWindowScrolling('body');
        restoreWindowScrolling('html');
    }

    function update() {
        stop();
        restore();
    }
});