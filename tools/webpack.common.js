/**
 * @file webpack 公共配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const nib = require('nib');

module.exports = {

    resolve: {
        extensions: ['', '.js', '.styl'],
        modulesDirectories: ['node_modules', 'dep']
    },

    stylus: {
        'use': [nib()],
        'import': ['~nib/lib/nib/index.styl']
    }
};
