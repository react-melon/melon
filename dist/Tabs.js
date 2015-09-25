define('melon/Tabs', [
    'exports',
    './babelHelpers',
    'react',
    './Component',
    './tabs/Tab',
    './tabs/Panel'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Tab = require('./tabs/Tab');
    var TabPanel = require('./tabs/Panel');
    var Tabs = function (_Component) {
        babelHelpers.inherits(Tabs, _Component);
        function Tabs(props) {
            babelHelpers.classCallCheck(this, Tabs);
            babelHelpers.get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).call(this, props);
            var initialIndex = this.props.initialSelectedIndex || 0;
            this.state = { selectedIndex: initialIndex };
        }
        babelHelpers.createClass(Tabs, [
            {
                key: 'getTabCount',
                value: function getTabCount() {
                    return React.Children.count(this.props.children);
                }
            },
            {
                key: 'getSelected',
                value: function getSelected(tab, index) {
                    return this.state.selectedIndex === index;
                }
            },
            {
                key: 'handleTabClick',
                value: function handleTabClick(index, e) {
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
                        this.props.onChange && this.props.onChange(index, e);
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
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
                                className: this.getPartClassName('panel'),
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
                }
            }
        ]);
        return Tabs;
    }(Component);
    Tab.propTypes = {
        initialSelectedIndex: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onBeforeChange: React.PropTypes.func
    };
    Tabs.Tab = Tab;
    module.exports = Tabs;
});