/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, header, proxyNoneExists, proxy */

exports.port = 8878;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var babel = require('babel-core');
var path = require('path');

var nib = require('nib');

exports.getLocations = function () {
    return [
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    'use': nib(),
                    'resolve url': true,
                    'paths': [path.join(__dirname, 'dep')],
                    'include css': true
                })
            ]
        },
        {
            location: /\.txt.js($|\?)/,
            handler: [
                function (context) {
                    context.request.pathname = context.request.pathname.replace(/\.js/, '');
                },
                file(),
                function (context) {
                    var content = context.content;
                    context.content = ''
                        + 'define(function (require, exports, module) {\n\n'
                        +     'module.exports="' + escape(content) + '";'
                        + '\n\n});';
                }
            ]
        },
        {
            location: function (context) {
                return /^\/(src).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel
                            .transform(context.content, {
                                compact: false,
                                ast: false,
                                presets: ['es2015', 'es2015-loose', 'react', 'stage-1'],
                                plugins: [
                                    'transform-es3-property-literals',
                                    'transform-es3-member-expression-literals'
                                ],
                                moduleId: '',
                                getModuleId: function (filename) {
                                    return filename.replace('src/', '');
                                }
                            })
                            .code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                },
                function (context) {
                    context.content = ''
                        + 'define(function (require, exports, module) {\n\n'
                        +     context.content
                        + '\n\n});';
                }
            ]
        },
        {
            location: /\.(ttf|woff|eot|svg)($|\?)/,
            handler: [
                header({
                    'Access-Control-Allow-Origin': '*'
                }),
                file()
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

exports.stylus = require('stylus');

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
