/**
 * @file config edp-build
 * @author EFE
 */

/* globals
    LessCompiler, CssCompressor, JsCompressor,
    PathMapper, AddCopyright, ModuleCompiler,
    TplMerge, BabelProcessor,
    AmdWrapper
*/

'use strict';

exports.input = __dirname;

var path = require('path');
exports.output = path.resolve(__dirname, 'output');

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    // var jsProcessor = new JsCompressor();
    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();

    var babel = new BabelProcessor({
        files: ['src/**/*.js'],
        compileOptions: {
            compact: false,
            ast: false,
            plugins: [
                'external-helpers',
                'transform-es2015-modules-umd',
                'transform-es3-property-literals',
                'transform-es3-member-expression-literals'
            ],
            moduleId: '',
            getModuleId: function (filename) {
                return filename.replace('src/', '');
            }
        }
    });

    return {
        'default': [
            babel,
            pathMapperProcessor,
            // jsProcessor,
            addCopyright
        ]
    };
};

exports.exclude = [
    '*.log',
    '*.md',
    'dist',
    'README',
    '.*',
    '*.json',
    'dep',
    'example',
    'tool',
    'doc',
    'test',
    'coverage',
    'module.conf',
    'node_modules',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
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
    global.BabelProcessor = require('./tool/BabelProcessor.js');
};
