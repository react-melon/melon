define('melon/breadcrumb/Item', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('BreadcrumbItem');
    function BreadcrumbItem(props) {
        return React.createElement('a', babelHelpers._extends({}, props, { className: cx(props).build() }));
    }
    BreadcrumbItem.propTypes = { href: React.PropTypes.string };
    module.exports = BreadcrumbItem;
});