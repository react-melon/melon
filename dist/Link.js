define('melon/Link', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Link = function (_Component) {
        babelHelpers.inherits(Link, _Component);
        function Link() {
            babelHelpers.classCallCheck(this, Link);
            babelHelpers.get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Link, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('a', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
                }
            }]);
        return Link;
    }(Component);
    module.exports = Link;
});