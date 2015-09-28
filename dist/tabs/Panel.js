define('melon/tabs/Panel', [
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
    var Panel = function (_Component) {
        babelHelpers.inherits(Panel, _Component);
        function Panel() {
            babelHelpers.classCallCheck(this, Panel);
            babelHelpers.get(Object.getPrototypeOf(Panel.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Panel, [
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = {};
                    if (props.active) {
                        states.active = true;
                    }
                    return states;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('div', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
                }
            }
        ]);
        return Panel;
    }(Component);
    Panel.propTypes = { active: React.PropTypes.bool };
    module.exports = Panel;
});