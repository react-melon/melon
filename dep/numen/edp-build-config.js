/**
 * @file ei edp build config
 * @author leon(ludafa@outlook.com)
 */

require('babel/register');

exports.input = __dirname;
exports.output = require('path').resolve(__dirname, 'output');

/* globals LessCompiler, CssCompressor, JsCompressor, PathMapper, AmdWrapper, AbstractProcessor */
/* globals AddCopyright, ModuleCompiler, TplMerge, BabelProcessor, MainModule, OutputCleaner */

exports.getProcessors = function () {

    var module = new ModuleCompiler({
        bizId: 'numen'
    });

    var path = new PathMapper({
        from: 'src',
        to: 'dist'
    });

    var babel = new BabelProcessor({
        files: ['src/**/*.js'],
        compileOptions: {
            stage: 0,
            modules: 'common',
            compact: false,
            ast: false,
            blacklist: ['strict'],
            externalHelpers: true,
            moduleId: '',
            getModuleId: function (filename) {
                return filename.replace('src/', '');
            }
        }
    });

    var amdWrapper = new AmdWrapper({
        files: ['src/**/*.js']
    });

    return {
        'default': [
            babel,
            amdWrapper,
            module,
            // js,
            path
        ]
    };
};

exports.exclude = [
    'coverage',
    'example',
    'node_modules',
    '.*',
    '*.json',
    '*.log',
    '*.md',
    '*.txt',
    'tool',
    'doc',
    'test',
    'mock',
    '*.conf',
    'dep/est',
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

exports.injectProcessor = function (processors) {

    /* eslint-disable guard-for-in */
    for (var key in processors) {
        global[key] = processors[key];
    }

    global.AmdWrapper = require('./tool/AmdWrapper.js');
    global.BabelProcessor = require('./tool/BabelProcessor.js');

};
