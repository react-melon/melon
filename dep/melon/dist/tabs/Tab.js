define('melon/tabs/Tab', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TabsItem');
    function Tab(props) {
        var selected = props.selected;
        var disabled = props.disabled;
        var label = props.label;
        var others = babelHelpers.objectWithoutProperties(props, [
            'selected',
            'disabled',
            'label'
        ]);
        return React.createElement('li', babelHelpers._extends({}, others, {
            className: cx(props).addStates({
                selected: selected,
                disabled: disabled
            }).build()
        }), label);
    }
    module.exports = Tab;
});