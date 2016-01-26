/**
 * @file config edp-build
 * @author EFE
 */

/* globals LessCompiler, CssCompressor, JsCompressor, PathMapper, AddCopyright, ModuleCompiler, TplMerge */
/* globals StylusCompiler, BabelProcessor, AmdWrapper, OutputCleaner, MD5Renamer, StringReplace, RawWrapper */

require('babel/register');

exports.input = __dirname;

var stylus = require('stylus');
var nib = require('nib');
var path = require('path');

exports.output = path.resolve(__dirname, 'output');

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {

    var cssProcessor = new CssCompressor({
        files: [
            'src/main.styl'
        ]
    });

    var moduleProcessor = new ModuleCompiler({
        files: ['src/**/*.js', '*.txt']
    });

    var jsProcessor = new JsCompressor({
        files: [
            'src/main.js',
            'src/bundle/*.js'
        ]
    });

    var embedBundle = new StringReplace({
        files: ['index.html'],
        replacements: [{
            from: /<!--embedbundle:([\{%$.|:\}\w/-]+\.js)-->/gi,
            to: function ($all, $1) {
                return '<script src="' + $1 + '"></script>';
            }
        }]
    });

    var relativePath = new StringReplace({
        files: ['index.html'],
        replacements: [{
            from: /\"asset\//gi,
            to: function ($all, $1) {
                return '\"./asset/';
            }
        }]
    });

    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();

    var stylusProcessor = new StylusCompiler({
        stylus: stylus,
        files: ['src/main.styl'],
        compileOptions: {
            use: function (style) {
                style.use(nib());
                style.define('url', stylus.resolver());
                style.include(path.join(__dirname, 'dep'));
                style.include('css', true);
            }
        }
    });

    var babel = new BabelProcessor({
        files: ['src/**/*.js', '!*.txt.js'],
        compileOptions: {
            stage: 0,
            modules: 'common',
            compact: false,
            ast: false,
            blacklist: ['strict'],
            externalHelpers: true,
            loose: 'all',
            moduleId: '',
            getModuleId: function (filename) {
                return filename.replace('src/', '');
            }
        }
    });

    var amdWrapper = new AmdWrapper({
        files: ['src/**/*.js', '!*.txt']
    });

    var clean = new OutputCleaner({
        files: [
            'src/**',
            'dep/**',
            '!src/common/img/**',
            '!dep/melon/dist/font/**',
            '!index.html',
            '!src/main.js',
            '!src/bundle/**/*.js',
            '!src/main.styl'
        ]
    });

    var rawWrapper = new RawWrapper();

    var renamer = new MD5Renamer({
        files: [
            'index.html',
            'src/main.styl',
            '!dep/**/index.html'
        ],
        resolve: function (file, url) {
            if (url.indexOf('/dep/') !== -1) {
                return false;
            }
            if (url.indexOf('favicon.png') !== -1) {
                return false;
            }
            // 以feRoot开头的本地资源，我们把它映射到本地资源
            if (/^{%\$tplData\.feRoot(\|escape:html)?%}(.+?)$/.exec(url)) {
                return RegExp.$2.slice(1);
            }
            // 绝对地址
            if (
                // 这种是由smarty直接输出的绝对地址
                /^{%[\$\.\|:\w]+%}(.*?)$/.test(url)
                // 这个是以http开头的直接引用
                || /^http/.test(url)
                // 这货是etpl的语法。。。
                || /^\$\{.+\}$/.test(url)
            ) {
                return false;
            }

            return path.join(file, url);
        },
        outputTemplate: '{basename}.{md5sum}{extname}'
    });

    return {
        'default': [
            embedBundle,
            stylusProcessor,
            cssProcessor,
            babel,
            rawWrapper,
            amdWrapper,
            moduleProcessor,
            // jsProcessor,
            addCopyright,
            renamer,
            clean,
            pathMapperProcessor,
            relativePath
        ]
    };
};

exports.exclude = [
    '.*',
    '*.md',
    'LICENSE.*',
    'LICENSE',
    'dep/**/*.html',
    'README',
    '*.json',
    'node_modules',
    'doc',
    'tools',
    'test',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

/* eslint-disable guard-for-in */
exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
    global.BabelProcessor = require('./tools/BabelProcessor');
    global.AmdWrapper = require('./tools/AmdWrapper');
    global.RawWrapper = require('./tools/RawWrapper');
};
