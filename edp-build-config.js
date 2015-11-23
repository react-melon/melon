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

exports.input = __dirname;

require('babel/register');

var path = require('path');
exports.output = path.resolve(__dirname, 'output');

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler();
    var cssProcessor = new CssCompressor();
    var moduleProcessor = new ModuleCompiler({
        bizId: 'melon'
    });
    var jsProcessor = new JsCompressor();
    var pathMapperProcessor = new PathMapper();
    var addCopyright = new AddCopyright();

    var amdWrapper = new AmdWrapper({
        files: ['src/**/*.js']
    });

    var babel = new BabelProcessor({
        files: ['src/**/*.js'],
        compileOptions: {
            stage: 0,
            modules: 'commonStrict',
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

    return {
        amd: [
            babel,
            amdWrapper,
            moduleProcessor,
            pathMapperProcessor
        ],
        release: [
            lessProcessor, cssProcessor, moduleProcessor,
            jsProcessor, pathMapperProcessor, addCopyright
        ]
    };
};

exports.exclude = [
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
    global.AmdWrapper = require('./tool/AmdWrapper.js');
};
