/**
 * @file melon/Tabs
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, cloneElement, Children} from  'react';
import PropTypes from 'prop-types';
import Tab from './tabs/Tab';
import TabPanel from  './tabs/Panel';
import {create} from 'melon-core/classname/cxBuilder';
import omit from 'lodash/omit';

const cx = create('Tabs');

/**
 * melon/Tabs
 *
 * @extends {React.Component}
 * @class
 */
class Tabs extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param {*} props 属性
     */
    constructor(props) {

        super(props);

        const selectedIndex = props.selectedIndex;

        /**
         * 状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            selectedIndex
        };

        this.onTabClick = this.onTabClick.bind(this);

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     */
    componentWillReceiveProps({selectedIndex}) {

        if (selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex
            });
        }
    }

    /**
     * 处理 Tab 点击事件
     *
     * @private
     * @param {number} index tab 序号
     */
    onTabClick(index) {

        if (index === this.state.selectedIndex) {
            return;
        }

        let onChange = this.props.onChange;

        this.setState({selectedIndex: index}, () => {
            onChange && onChange({
                type: 'change',
                selectedIndex: index,
                target: this
            });
        });

    }

    /**
     * 获取 Tab 总数
     *
     * @protected
     * @return {number}
     */
    getTabCount() {
        return Children.count(this.props.children);
    }

    /**
     * 指定序号的标签是否被选中
     *
     * @protected
     * @param {number} index 序号
     * @return {boolean}
     */
    isTabSelected(index) {
        return this.state.selectedIndex === index;
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        let props = this.props;
        let tabIndex = 0;
        let percent = 1 / this.getTabCount() * 100 + '%';
        let tabContents = [];
        let tabs = [];

        let {
            variants,
            states,
            children,
            ...rest
        } = props;

        children = Children.toArray(props.children);

        let selectedIndex = this.state.selectedIndex;

        for (let i = 0, len = children.length; i < len; ++i) {

            let tab = children[i];

            let selected = selectedIndex === i;

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

            tabs.push(
                cloneElement(
                    tab,
                    {
                        key: i,
                        selected: selected,
                        index: i,
                        style: {width: percent},
                        onClick: this.onTabClick
                    }
                )
            );

        }

        const InkBarStyles = {
            width: percent,
            left: 'calc(' + percent + '*' + tabIndex + ')'
        };

        const className = cx()
            .addVariants(variants)
            .addStates(states)
            .build();

        return (
            <div
                {...omit(rest, ['selectedIndex'])}
                className={className}>
                <ul>
                    {tabs}
                    <li
                        className={cx.getPartClassName('inkbar')}
                        style={InkBarStyles} />
                </ul>
                {tabContents}
            </div>
        );

    }

}

/**
 * propTypes
 *
 * @property {number}   selectedIndex  选中标签的序号
 * @property {Function} onChange       选中标签发生变化后处理函数
 * @property {Function} onBeforeChange 选中标签发生变化前处理函数
 */
Tabs.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func
};

Tabs.defaultProps = {
    selectedIndex: 0
};

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export {
    Tabs as default,
    Tab,
    TabPanel
};
