/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, header, proxyNoneExists, proxy */

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var babel = require('babel');

exports.getLocations = function () {
    return [
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: function (context) {
                return /^\/(src|example).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel.transform(context.content, {modules: 'common'}).code;
                    }
                    catch (e) {
                        process.stderr.write(e.stack);
                        context.status = 500;
                    }
                },
                function (context) {
                    context.content = ''
                        + 'define(function (require, exports, module) {'
                        +     context.content
                        + '});';
                }
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
