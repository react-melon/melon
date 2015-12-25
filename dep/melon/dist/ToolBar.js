define('melon/ToolBar', [
    'require',
    'exports',
    'module',
    'react',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('ToolBar');
    var ToolBar = React.createClass({
        displayName: 'ToolBar',
        render: function () {
            var props = this.props;
            var children = props.children;
            return React.createElement('div', { className: cx(props).build() }, children);
        }
    });
    module.exports = ToolBar;
});