/**
 * @file melon Window事件监听配置小工具
 *       From Material UI https://github.com/callemall/material-ui
 * @author cxtom(cxtom@outlook.com)
 */


var dom = require('../common/util/dom');
var _   = require('underscore');

module.exports = {

    componentDidMount: function () {
        var listeners = this.windowListeners;

        _.mapObject(listeners, function (callbackName, eventName) {
            dom.on(window, eventName, this[callbackName]);
        }, this);
    },

    componentWillUnmount: function () {
        var listeners = this.windowListeners;

        _.mapObject(listeners, function (callbackName, eventName) {
            dom.off(window, eventName, this[callbackName]);
        }, this);
    }

};
