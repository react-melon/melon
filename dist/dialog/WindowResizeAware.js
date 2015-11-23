define('melon/dialog/WindowResizeAware', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    '../Component',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var Component = require('../Component');
    var dom = require('../common/util/dom');
    var WindowResizeAware = function (_Component) {
        babelHelpers.inherits(WindowResizeAware, _Component);
        babelHelpers.createClass(WindowResizeAware, null, [{
                key: 'displayName',
                value: 'WindowResizeAware',
                enumerable: true
            }]);
        function WindowResizeAware(props) {
            babelHelpers.classCallCheck(this, WindowResizeAware);
            _Component.call(this, props);
            this.onWindowResize = this.onWindowResize.bind(this);
        }
        WindowResizeAware.prototype.componentDidMount = function componentDidMount() {
            dom.on(window, 'resize', this.onWindowResize);
        };
        WindowResizeAware.prototype.componentWillUnmount = function componentWillUnmount() {
            dom.off(window, 'resize', this.onWindowResize);
        };
        WindowResizeAware.prototype.onWindowResize = function onWindowResize(e) {
            throw new Error('WindowResizeAware onWindowResize need implement');
        };
        return WindowResizeAware;
    }(Component);
    WindowResizeAware.defaultProps = babelHelpers._extends({}, Component.defaultProps);
    module.exports = WindowResizeAware;
});