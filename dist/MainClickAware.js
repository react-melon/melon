define('melon/MainClickAware', [
    'exports',
    './babelHelpers',
    'react',
    'react-dom',
    './Component',
    './common/util/dom'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Component = require('./Component');
    var dom = require('./common/util/dom');
    var MainClickAware = function (_Component) {
        babelHelpers.inherits(MainClickAware, _Component);
        function MainClickAware(props) {
            babelHelpers.classCallCheck(this, MainClickAware);
            babelHelpers.get(Object.getPrototypeOf(MainClickAware.prototype), 'constructor', this).call(this, props);
            this.onMainClick = this.onMainClick.bind(this);
        }
        babelHelpers.createClass(MainClickAware, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var main = ReactDOM.findDOMNode(this);
                    dom.on(main, 'click', this.onMainClick);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var main = ReactDOM.findDOMNode(this);
                    dom.off(main, 'click', this.onMainClick);
                }
            },
            {
                key: 'onMainClick',
                value: function onMainClick(e) {
                    throw new Error('MainClickAware onMainClick need implement');
                }
            }
        ]);
        return MainClickAware;
    }(Component);
    MainClickAware.defaultProps = babelHelpers._extends({}, Component.defaultProps);
    module.exports = MainClickAware;
});