define('melon/Link', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Link');
    function Link(props) {
        return React.createElement('a', babelHelpers._extends({}, props, { className: cx(props).build() }));
    }
    module.exports = Link;
});