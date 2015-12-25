define('ei/util/connect', [
    'require',
    'exports',
    'module',
    'react',
    '../component/ContextConnector'
], function (require, exports, module) {
    var React = require('react');
    var ContextConnector = require('../component/ContextConnector');
    function connect(Component, selector, actions) {
        return function SelectorAndActionBinder(props) {
            return React.createElement(ContextConnector, {
                selector: selector,
                actions: actions,
                originComponent: Component,
                originProps: props
            });
        };
    }
    module.exports = connect;
});