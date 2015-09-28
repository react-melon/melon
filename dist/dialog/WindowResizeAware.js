define('melon/dialog/WindowResizeAware', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var dom = require('../common/util/dom');
    var WindowResizeAware = function (_Component) {
        babelHelpers.inherits(WindowResizeAware, _Component);
        function WindowResizeAware(props) {
            babelHelpers.classCallCheck(this, WindowResizeAware);
            babelHelpers.get(Object.getPrototypeOf(WindowResizeAware.prototype), 'constructor', this).call(this, props);
            this.onWindowResize = this.onWindowResize.bind(this);
        }
        babelHelpers.createClass(WindowResizeAware, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    dom.on(window, 'resize', this.onWindowResize);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    dom.off(window, 'resize', this.onWindowResize);
                }
            },
            {
                key: 'onWindowResize',
                value: function onWindowResize(e) {
                    throw new Error('WindowResizeAware onWindowResize need implement');
                }
            }
        ]);
        return WindowResizeAware;
    }(Component);
    WindowResizeAware.defaultProps = babelHelpers._extends({}, Component.defaultProps);
    module.exports = WindowResizeAware;
});