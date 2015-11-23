/**
 * @file esui-react/Tabs
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Tabs');

const Tab = require('./tabs/Tab');
const TabPanel = require('./tabs/Panel');

const {PropTypes} = React;

const Tabs = React.createClass({

    propTypes: {
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func,
        onBeforeChange: PropTypes.func
    },

    getDefaultProps() {
        return {
            selectedIndex: 0
        };
    },

    getInitialState() {

        let {selectedIndex} = this.props;

        return {
            selectedIndex: selectedIndex
        };

    },

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }

    },


    getTabCount() {
        return React.Children.count(this.props.children);
    },

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    },

    handleTabClick(index, e) {

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

        this.setState({selectedIndex: index}, function () {
            this.props.onChange && this.props.onChange({
                target: this,
                selectedIndex: index
            });
        });

    },

    render() {

        var props = this.props;
        var percent = 1 / this.getTabCount() * 100 + '%';
        var tabIndex = 0;
        var tabContent = [];

        var tabs = React.Children.map(props.children, function (tab, index) {

            var selected = this.getSelected(tab, index);
            var {
                disabled,
                children
            } = tab.props;

            if (selected) {
                tabIndex = index;
            }

            if (children) {
                tabContent.push(
                    <TabPanel
                        key={index}
                        active={selected} >
                        {children}
                    </TabPanel>
                );
            }

            return React.cloneElement(tab, {
                key: index,
                selected: selected,
                disabled: disabled,
                tabIndex: index,
                style: {width: percent},
                onClick: disabled ? null : this.handleTabClick.bind(this, index),
                className: cx().part('item').build()
            });

        }, this);

        var InkBarStyles = {
            width: percent,
            left: 'calc(' + percent + '*' + tabIndex + ')'
        };

        return (
            <div {...props} className={cx(props).build()}>
                <ul>
                    {tabs}
                    <li className={cx().part('inkbar').build()} style={InkBarStyles}></li>
                </ul>
                {tabContent}
            </div>
        );

    }

});

Tabs.Tab = Tab;

module.exports = Tabs;
