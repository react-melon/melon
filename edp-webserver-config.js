/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, header, proxyNoneExists */

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

require('babel/register');

var babel = require('babel');

var fs = require('fs');
var mime = require('mime');
var path = require('path');
var nib = require('nib');

var swig = require('swig');

swig.setDefaults({
    cache: false
});

var template = swig.compileFile(
    path.join(__dirname, 'example/common/tpl/base.swig')
);

function amdify(context) {
    context.content =  ''
        + 'define(function (require, exports, module) {\n'
        +     context.content
        + '\n});';
}

var ip = (function () {

    var ifaces = require('os').networkInterfaces();
    var defultAddress = '127.0.0.1';
    var ip = defultAddress;

    function x(details) {
        if (ip === defultAddress && details.family === 'IPv4') {
            ip = details.address;
        }
    }

    Object.keys(ifaces).forEach(function (key) {
        ifaces[key].forEach(x);
    });

    return ip;

})();

exports.stylus = require('stylus');

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
                    'resolve url': true
                })
            ]
        },
        {
            location: function (context) {
                return /^\/(src|example).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                amdify,
                function (context) {
                    try {
                        context.content = babel.transform(context.content).code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                }
            ]
        },
        // {
        //     location: /^(src|example).*?\.js$/,
        //     handler: [
        //         file(),
        //         amdify,

        //     ]
        // },
        // {
        //     location: /^\/example\/.*?\.jsx$/,
        //     handler: [
        //         function (context) {

        //             var docRoot  = context.conf.documentRoot;
        //             var pathname = context.request.pathname.replace(/\.js$/, '');
        //             var file = path.join(docRoot, pathname);

        //             if (fs.existsSync(file)) {

        //                 if (require.cache) {
        //                     delete require.cache[file];
        //                 }

        //                 var feRoot = 'http://' + ip + ':' + context.conf.port + '/example';

        //                 var component = path.basename(file, '.jsx');

        //                 // Compile a file and store it, rendering it later
        //                 context.header['content-type'] = mime.lookup('html');
        //                 context.content = template({
        //                     components: require('./example/common/conf/components.json'),
        //                     component: component + '.jsx',
        //                     feRoot: feRoot,
        //                     style: component + '.styl'
        //                 });

        //             }
        //             else {
        //                 context.status = 404;
        //                 context.content = '你想要的页面被外星人劫持了！';
        //             }

        //         }
        //     ]
        // },
        {
            location: function (req) {
                var pathname = req.pathname;
                return pathname.indexOf('/src') === 0 || pathname.indexOf('/example') === 0
                    ? /\.js($|\?)/.test(pathname)
                    : false;
            },
            handler: [
                file(),
                amdify
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

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
