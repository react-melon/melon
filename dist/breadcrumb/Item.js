define('melon/breadcrumb/Item', [
    'exports',
    '../babelHelpers',
    'react',
    '../Component'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var BreadcrumbItem = function (_Component) {
        babelHelpers.inherits(BreadcrumbItem, _Component);
        function BreadcrumbItem() {
            babelHelpers.classCallCheck(this, BreadcrumbItem);
            babelHelpers.get(Object.getPrototypeOf(BreadcrumbItem.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(BreadcrumbItem, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('a', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
                }
            }]);
        return BreadcrumbItem;
    }(Component);
    var PropTypes = React.PropTypes;
    BreadcrumbItem.propTypes = babelHelpers._extends({}, Component.propTypes, { href: PropTypes.string });
    module.exports = BreadcrumbItem;
});