define('melon/MainClickAware', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react-dom',
    './Component',
    './common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var ReactDOM = require('react-dom');
    var Component = require('./Component');
    var dom = require('./common/util/dom');
    var MainClickAware = function (_Component) {
        babelHelpers.inherits(MainClickAware, _Component);
        babelHelpers.createClass(MainClickAware, null, [{
                key: 'displayName',
                value: 'MainClickAware',
                enumerable: true
            }]);
        function MainClickAware(props) {
            babelHelpers.classCallCheck(this, MainClickAware);
            _Component.call(this, props);
            this.onMainClick = this.onMainClick.bind(this);
        }
        MainClickAware.prototype.componentDidMount = function componentDidMount() {
            var main = ReactDOM.findDOMNode(this);
            dom.on(main, 'click', this.onMainClick);
        };
        MainClickAware.prototype.componentWillUnmount = function componentWillUnmount() {
            var main = ReactDOM.findDOMNode(this);
            dom.off(main, 'click', this.onMainClick);
        };
        MainClickAware.prototype.onMainClick = function onMainClick(e) {
            throw new Error('MainClickAware onMainClick need implement');
        };
        return MainClickAware;
    }(Component);
    MainClickAware.defaultProps = babelHelpers._extends({}, Component.defaultProps);
    module.exports = MainClickAware;
});