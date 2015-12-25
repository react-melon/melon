define('melon/Card', [
    'require',
    'exports',
    'module',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Card');
    function Card(props) {
        var children = props.children;
        return React.createElement('div', { className: cx(props).build() }, children);
    }
    module.exports = Card;
});