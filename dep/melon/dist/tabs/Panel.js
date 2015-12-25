define('melon/tabs/Panel', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TabsPanel');
    function TabsPanel(props) {
        var active = props.active;
        var others = babelHelpers.objectWithoutProperties(props, ['active']);
        return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ active: active }).build() }));
    }
    module.exports = TabsPanel;
});