/**
 * @file BabelProcessor.js
 * @author leon(ludafa@outlook.com)
 */

/* globals AbstractProcessor*/

var babel = require('babel');
var path = require('path');

function Babel(options) {
    AbstractProcessor.call(this, options);
}

Babel.prototype = new AbstractProcessor();
Babel.prototype.name = 'Babel';

Babel.prototype.beforeAll = function (processContext) {
    AbstractProcessor.prototype.beforeAll.call(this, processContext);
    processContext.usedHelpers = [];
};

var FileInfo;

Babel.prototype.process = function (file, processContext, callback) {

    FileInfo = file.constructor;

    var baseDir = processContext.baseDir;
    var fullPath = path.join(baseDir, 'babelHelpers.js');

    var babelHelperRelativePath = path.relative(file.fullPath, fullPath).slice(4).slice(0, -3);

    babelHelperRelativePath = path.normalize(babelHelperRelativePath);

    babelHelperRelativePath = babelHelperRelativePath.indexOf('.') !== 0
        ? './' + babelHelperRelativePath
        : babelHelperRelativePath;

    var filePath = file.path;

    var result = babel.transform(
        file.data,
        {
            ...this.compileOptions,
            filename: file.path,
            optional: ['es7.classProperties']
        }
    );

    var code = result.code;

    if (result.metadata.usedHelpers.length) {
        var prefix = 'var babelHelpers = require("' + babelHelperRelativePath + '");\n';
        code = prefix + code;
        processContext.usedHelpers = processContext
            .usedHelpers
            .concat(result.metadata.usedHelpers);
    }

    file.setData(code);

    processContext.addFileLink(filePath, file.outputPath);

    callback();

};

Babel.prototype.afterAll = function (processContext) {

    var usedHelpers = ''
        + babel.buildExternalHelpers(processContext.usedHelpers, 'var')
        + '\nmodule.exports = babelHelpers;';

    var baseDir = processContext.baseDir;
    var relativePath = path.relative(baseDir, 'src/babelHelpers.js');
    var fullPath = path.join(baseDir, relativePath);

    var helperFile = new FileInfo({
        data: usedHelpers,
        extname: 'js',
        path: relativePath,
        fullPath: fullPath,
        outputPath: relativePath
    });

    processContext.addFile(helperFile);

    processContext.usedHelpers = null;
};

module.exports = Babel;
