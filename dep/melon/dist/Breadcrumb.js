define('melon/Breadcrumb', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder',
    './breadcrumb/Item'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Breadcrumb');
    var Item = require('./breadcrumb/Item');
    var Breadcrumb = function Breadcrumb(props) {
        var children = props.children;
        var rest = babelHelpers.objectWithoutProperties(props, ['children']);
        return React.createElement('div', babelHelpers._extends({}, rest, { className: cx(props).build() }), React.Children.map(children, function (child, index) {
            return child && child.type === Item ? React.cloneElement(child, {
                key: index,
                level: index
            }) : null;
        }));
    };
    Breadcrumb.Item = Item;
    module.exports = Breadcrumb;
});