define('melon/Button', [
    'exports',
    './babelHelpers',
    'react',
    './Component'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Button = function (_Component) {
        babelHelpers.inherits(Button, _Component);
        function Button() {
            babelHelpers.classCallCheck(this, Button);
            babelHelpers.get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Button, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('button', babelHelpers._extends({}, props, { className: this.getClassName() }), props.label || props.children);
                }
            }]);
        return Button;
    }(Component);
    module.exports = Button;
});