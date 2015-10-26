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
            babelHelpers.get(Object.getPrototypeOf(TabsPanel.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(TabsPanel, [
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
        ], [{
                key: 'displayName',
                value: 'TabsPanel',
                enumerable: true
            }]);
        return TabsPanel;
    }(Component);
    TabsPanel.propTypes = { active: React.PropTypes.bool };
    module.exports = TabsPanel;
});