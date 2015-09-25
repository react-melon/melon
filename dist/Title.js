define('melon/Title', [
    'exports',
    './babelHelpers',
    'react',
    './Component'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Title = function (_Component) {
        babelHelpers.inherits(Title, _Component);
        function Title() {
            babelHelpers.classCallCheck(this, Title);
            babelHelpers.get(Object.getPrototypeOf(Title.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Title, [{
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var level = _props.level;
                    var rest = babelHelpers.objectWithoutProperties(_props, ['level']);
                    var tag = 'h' + level;
                    return React.createElement(tag, babelHelpers._extends({}, rest, { className: this.getClassName() }));
                }
            }]);
        return Title;
    }(Component);
    Title.propsTypes = { level: React.PropTypes.number.isRequired };
    module.exports = Title;
});