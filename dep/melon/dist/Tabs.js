define('melon/Tabs', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder',
    './tabs/Tab',
    './tabs/Panel'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Tabs');
    var Tab = require('./tabs/Tab');
    var TabPanel = require('./tabs/Panel');
    var PropTypes = React.PropTypes;
    var Tabs = React.createClass({
        displayName: 'Tabs',
        propTypes: {
            selectedIndex: PropTypes.number,
            onChange: PropTypes.func,
            onBeforeChange: PropTypes.func
        },
        getDefaultProps: function () {
            return { selectedIndex: 0 };
        },
        getInitialState: function () {
            var selectedIndex = this.props.selectedIndex;
            return { selectedIndex: selectedIndex };
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.selectedIndex !== this.state.selectedIndex) {
                this.setState({ selectedIndex: nextProps.selectedIndex });
            }
        },
        handleTabClick: function (index, e) {
            if (index === this.state.selectedIndex) {
                return;
            }
            var _props = this.props;
            var onBeforeChange = _props.onBeforeChange;
            var onChange = _props.onChange;
            e.selectedIndex = index;
            if (onBeforeChange) {
                onBeforeChange(e);
                if (e.isDefaultPrevented()) {
                    return;
                }
            }
            this.setState({ selectedIndex: index }, function () {
                onChange && onChange(e);
            });
        },
        getTabCount: function () {
            return React.Children.count(this.props.children);
        },
        getSelected: function (tab, index) {
            return this.state.selectedIndex === index;
        },
        render: function () {
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
                var options = {
                    key: index,
                    selected: selected,
                    tabIndex: index,
                    style: { width: percent }
                };
                if (!disabled) {
                    options.onClick = this.handleTabClick.bind(this, index);
                }
                return React.cloneElement(tab, options);
            }, this);
            var InkBarStyles = {
                width: percent,
                left: 'calc(' + percent + '*' + tabIndex + ')'
            };
            return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).build() }), React.createElement('ul', null, tabs, React.createElement('li', {
                className: cx().part('inkbar').build(),
                style: InkBarStyles
            })), tabContent);
        }
    });
    Tabs.Tab = Tab;
    module.exports = Tabs;
});