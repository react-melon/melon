define('melon/Tabs', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './tabs/Tab',
    './tabs/Panel'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Tab = require('./tabs/Tab');
    var TabPanel = require('./tabs/Panel');
    var Tabs = function (_Component) {
        babelHelpers.inherits(Tabs, _Component);
        babelHelpers.createClass(Tabs, null, [{
                key: 'displayName',
                value: 'Tabs',
                enumerable: true
            }]);
        function Tabs(props) {
            babelHelpers.classCallCheck(this, Tabs);
            _Component.call(this, props);
            var selectedIndex = this.props.selectedIndex;
            this.state = { selectedIndex: selectedIndex };
        }
        Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedIndex !== this.state.selectedIndex) {
                this.setState({ selectedIndex: nextProps.selectedIndex });
            }
        };
        Tabs.prototype.getTabCount = function getTabCount() {
            return React.Children.count(this.props.children);
        };
        Tabs.prototype.getSelected = function getSelected(tab, index) {
            return this.state.selectedIndex === index;
        };
        Tabs.prototype.handleTabClick = function handleTabClick(index, e) {
            if (index === this.state.selectedIndex) {
                return;
            }
            var onBeforeChange = this.props.onBeforeChange;
            if (onBeforeChange) {
                var cancel = onBeforeChange(index, e);
                if (cancel === false) {
                    return;
                }
            }
            this.setState({ selectedIndex: index }, function () {
                this.props.onChange && this.props.onChange({
                    target: this,
                    selectedIndex: index
                });
            });
        };
        Tabs.prototype.render = function render() {
            var props = this.props;
            var percent = 1 / this.getTabCount() * 100 + '%';
            var tabIndex = 0;
            var tabContent = [];
            var tabs = React.Children.map(props.children, function (tab, index) {
                var selected = this.getSelected(tab, index);
                var _tab$props = tab.props;
                var disabled = _tab$props.disabled;
                var children = _tab$props.children;
                if (selected) {
                    tabIndex = index;
                }
                if (children) {
                    tabContent.push(React.createElement(TabPanel, {
                        key: index,
                        active: selected
                    }, children));
                }
                return React.cloneElement(tab, {
                    key: index,
                    selected: selected,
                    disabled: disabled,
                    tabIndex: index,
                    style: { width: percent },
                    onClick: disabled ? null : this.handleTabClick.bind(this, index),
                    className: this.getPartClassName('item')
                });
            }, this);
            var InkBarStyles = {
                width: percent,
                left: 'calc(' + percent + '*' + tabIndex + ')'
            };
            return React.createElement('div', babelHelpers._extends({}, props, { className: this.getClassName() }), React.createElement('ul', null, tabs, React.createElement('li', {
                className: this.getPartClassName('inkbar'),
                style: InkBarStyles
            })), tabContent);
        };
        return Tabs;
    }(Component);
    Tabs.propTypes = {
        selectedIndex: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onBeforeChange: React.PropTypes.func
    };
    Tabs.defaultProps = { selectedIndex: 0 };
    Tabs.Tab = Tab;
    module.exports = Tabs;
});