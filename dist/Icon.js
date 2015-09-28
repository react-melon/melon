define('melon/Icon', [
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
    var Icon = function (_Component) {
        babelHelpers.inherits(Icon, _Component);
        function Icon() {
            babelHelpers.classCallCheck(this, Icon);
            babelHelpers.get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Icon, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('i', babelHelpers._extends({}, props, {
                        className: this.getClassName(),
                        'data-icon': props.icon
                    }));
                }
            }]);
        return Icon;
    }(Component);
    Icon.propTypes = { icon: React.PropTypes.string.isRequired };
    module.exports = Icon;
});