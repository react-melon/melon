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
            selectedIndex
        };

    },

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
    },

    handleTabClick(index, e) {

        if (index === this.state.selectedIndex) {
            return;
        }

        let {onBeforeChange, onChange} = this.props;

        e.selectedIndex = index;

        if (onBeforeChange) {

            onBeforeChange(e);

            if (e.isDefaultPrevented()) {
                return;
            }
        }

        this.setState({selectedIndex: index}, function () {
            onChange && onChange(e);
        });

    },

    getTabCount() {
        return React.Children.count(this.props.children);
    },

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    },

    render() {

        const props = this.props;
        const percent = 1 / this.getTabCount() * 100 + '%';
        let tabIndex = 0;
        let tabContent = [];

        const tabs = React.Children.map(props.children, function (tab, index) {

            const selected = this.getSelected(tab, index);
            const {
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

            let options = {
                key: index,
                selected,
                tabIndex: index,
                style: {width: percent}
            };

            if (!disabled) {
                options.onClick = this.handleTabClick.bind(this, index);
            }

            return React.cloneElement(tab, options);

        }, this);

        const InkBarStyles = {
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
