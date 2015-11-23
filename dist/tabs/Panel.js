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
    var TabsPanel = function (_Component) {
        babelHelpers.inherits(TabsPanel, _Component);
        function TabsPanel() {
            babelHelpers.classCallCheck(this, TabsPanel);
            _Component.apply(this, arguments);
        }
        TabsPanel.prototype.getStates = function getStates(props) {
            var states = {};
            if (props.active) {
                states.active = true;
            }
            return states;
        };
        TabsPanel.prototype.render = function render() {
            var props = this.props;
            return React.createElement('div', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
        };
        babelHelpers.createClass(TabsPanel, null, [{
                key: 'displayName',
                value: 'TabsPanel',
                enumerable: true
            }]);
        return TabsPanel;
    }(Component);
    TabsPanel.propTypes = { active: React.PropTypes.bool };
    module.exports = TabsPanel;
});