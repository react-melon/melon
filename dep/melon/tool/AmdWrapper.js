/**
 * @file AmdWrapper
 * @author leon(ludafa@outlook.com)
 */

var util = require('util');


/**
 * 添加版权声明的构建器
 *
 * @constructor
 * @param {Object} options 初始化参数
 */
function AmdWrapper(options) {
    AbstractProcessor.call(this, options);
}

util.inherits(AmdWrapper, AbstractProcessor);

AmdWrapper.DEFAULT_OPTIONS = {
    name: 'amdwrapper',
    files: ['*.js']
};

/**
 * 构建处理
 *
 * @param {FileInfo} file 文件信息对象
 * @param {ProcessContext} processContext 构建环境对象
 * @param {Function} callback 处理完成回调函数
 */
AmdWrapper.prototype.process = function (file, processContext, callback) {
    var data = 'define(function (require, exports, module) {\n' + file.data + '\n})';
    file.setData(data);
    callback && callback();
};


module.exports = AmdWrapper;
