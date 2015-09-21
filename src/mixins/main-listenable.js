/**
 * @file melon main事件监听配置小工具
 * @author cxtom(cxtom@outlook.com)
 */


var dom = require('../common/util/dom');
var _   = require('underscore');
var ReactDOM = require('react-dom');

module.exports = {

    componentDidMount: function () {
        var listeners = this.windowListeners;
        var main = ReactDOM.findDOMNode(this);

        _.mapObject(listeners, function (callbackName, eventName) {
            dom.on(main, eventName, this[callbackName]);
        }, this);
    },

    componentWillUnmount: function () {
        var listeners = this.windowListeners;
        var main = ReactDOM.findDOMNode(this);

        _.mapObject(listeners, function (callbackName, eventName) {
            dom.off(main, eventName, this[callbackName]);
        }, this);
    }

};
