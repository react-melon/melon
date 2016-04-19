/**
 * @file melon/Tabs
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {Component, PropTypes, cloneElement, Children} from  'react';
import Tab from './tabs/Tab';
import TabPanel from  './tabs/Panel';
import {create} from './common/util/cxBuilder';

const cx = create('Tabs');

export default class Tabs extends Component {

    constructor(props) {

        super(props);

        const {selectedIndex} = props;

        this.state = {
            selectedIndex
        };

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
    }

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

    }

    getTabCount() {
        return Children.count(this.props.children);
    }

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    }

    render() {

        const props = this.props;
        let tabIndex = 0;
        const percent = 1 / this.getTabCount() * 100 + '%';
        const tabContents = [];
        const tabs = [];
        const children = Children.toArray(props.children);

        for (let i = 0, len = children.length; i < len; ++i) {

            let tab = children[i];

            const selected = this.getSelected(tab, i);

            if (selected) {
                tabIndex = i;
            }

            if (children) {
                tabContents.push(
                    <TabPanel key={i} active={selected}>
                        {tab.props.children}
                    </TabPanel>
                );
            }

            tabs.push(cloneElement(tab, {
                key: i,
                selected: selected,
                tabIndex: i,
                style: {width: percent},
                onClick: tab.props.disabled ? null : this.handleTabClick.bind(this, i)
            }));

        }

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
                {tabContents}
            </div>
        );

    }

}

Tabs.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onBeforeChange: PropTypes.func
};

Tabs.defaultProps = {
    selectedIndex: 0
};

Tabs.Tab = Tab;
