define('melon/tabs/Tab', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Tab = function (_Component) {
        babelHelpers.inherits(Tab, _Component);
        babelHelpers.createClass(Tab, null, [{
                key: 'displayName',
                value: 'Tab',
                enumerable: true
            }]);
        function Tab(props) {
            babelHelpers.classCallCheck(this, Tab);
            _Component.call(this, props);
        }
        Tab.prototype.getStates = function getStates(props) {
            var states = {};
            if (props.selected) {
                states.selected = true;
            }
            if (props.disabled) {
                states.disabled = true;
            }
            return states;
        };
        Tab.prototype.render = function render() {
            var props = this.props;
            return React.createElement('li', babelHelpers._extends({}, props, { className: this.getClassName() }), props.label);
        };
        return Tab;
    }(Component);
    Tab.propTypes = {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        selected: React.PropTypes.bool,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func,
        tabIndex: React.PropTypes.number
    };
    module.exports = Tab;
});