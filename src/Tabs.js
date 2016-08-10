/**
 * @file melon/Tabs
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, PropTypes, cloneElement, Children} from  'react';
import Tab from './tabs/Tab';
import TabPanel from  './tabs/Panel';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Tabs');

/**
 * melon/Tabs
 *
 * @class
 */
export default class Tabs extends Component {

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

    }

    /**
     * 接受新属性时的处理
     *
     * @public
     * @override
     * @param {*} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
    }

    /**
     * 处理 Tab 点击事件
     *
     * @private
     * @param {number} index tab 序号
     * @param {e}      e     原始点击事件
     */
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

        const props = this.props;
        let tabIndex = 0;
        const percent = 1 / this.getTabCount() * 100 + '%';
        const tabContents = [];
        const tabs = [];
        const children = Children.toArray(props.children);

        for (let i = 0, len = children.length; i < len; ++i) {

            let tab = children[i];

            const selected = this.isTabSelected(i);

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

/**
 * propTypes
 *
 * @property {number}   selectedIndex  选中标签的序号
 * @property {Function} onChange       选中标签发生变化后处理函数
 * @property {Function} onBeforeChange 选中标签发生变化前处理函数
 */
Tabs.propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onBeforeChange: PropTypes.func
};

Tabs.defaultProps = {
    selectedIndex: 0
};

Tabs.Tab = Tab;
