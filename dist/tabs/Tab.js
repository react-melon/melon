define('melon/tabs/Tab', [
    'exports',
    '../babelHelpers',
    'react',
    '../Component'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Tab = function (_Component) {
        babelHelpers.inherits(Tab, _Component);
        function Tab(props) {
            babelHelpers.classCallCheck(this, Tab);
            babelHelpers.get(Object.getPrototypeOf(Tab.prototype), 'constructor', this).call(this, props);
        }
        babelHelpers.createClass(Tab, [
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = {};
                    if (props.selected) {
                        states.selected = true;
                    }
                    if (props.disabled) {
                        states.disabled = true;
                    }
                    return states;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('li', babelHelpers._extends({}, props, { className: this.getClassName() }), props.label);
                }
            }
        ]);
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