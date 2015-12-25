/**
 * @file 通用的表单提交按钮防手抖（重复提交）数据处理器
 * @author leon(ludafa@outlook.com)
 */

import composeReducer from '../util/composeReducer';

export default (disableTypes, enableTypes) => {

    function disable() {
        return true;
    }

    function enable() {
        return false;
    }

    let config = {};

    config = disableTypes.reduce(
        (config, type) => {
            config[type] = disable;
            return config;
        },
        config
    );

    config = enableTypes.reduce(
        (config, type) => {
            config[type] = enable;
            return config;
        },
        config
    );

    console.log(config);

    return composeReducer(config);

};
