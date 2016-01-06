/**
 * @file RawWrapper
 * @author leon(ludafa@outlook.com)
 */

/* globals AbstractProcessor */

var util = require('util');
// var fs = require('fs');

/**
 * 添加版权声明的构建器
 *
 * @constructor
 * @param {Object} options 初始化参数
 */
function RawWrapper(options) {
    AbstractProcessor.call(this, options);
}

util.inherits(RawWrapper, AbstractProcessor);

RawWrapper.DEFAULT_OPTIONS = {
    name: 'RawWrapper',
    files: ['*.txt']
};

/**
 * 构建处理
 *
 * @param {FileInfo} file 文件信息对象
 * @param {ProcessContext} processContext 构建环境对象
 * @param {Function} callback 处理完成回调函数
 */
RawWrapper.prototype.process = function (file, processContext, callback) {

    var data = 'return "' + escape(file.data) + '";';

    file.setData(data);
    file.outputPath = file.outputPath.replace(file.extname, file.extname + '.js');
    processContext.addFileLink(file.path, file.outputPath);

    // fs.writeFileSync(file.outputPath, data);

    callback();
};


module.exports = RawWrapper;
