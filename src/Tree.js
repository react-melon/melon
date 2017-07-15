/**
 * @file melon/Tree
 * @author cxtom<cxtom2008@gmail.com>
 *         leon<ludafa@outlook.com>
 */

import React, {Component, cloneElement, Children} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';
import TreeNode from './tree/TreeNode';

const cx = create('Tree');

/**
 * melon/Tree
 *
 * @extends {React.Component}
 * @class
 */
export default class Tree extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     */
    constructor(props) {
        super(props);
        this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    }

    /**
     * 节点点击的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onTreeNodeClick(e) {

        const target = e.currentTarget;
        const main = ReactDOM.findDOMNode(this);

        e.stopPropagation();

        const elements = main.querySelectorAll('[data-role=tree-node]');

        for (let i = 0, len = elements.length; i < len; ++i) {

            elements[i].className = elements[i]
                .className
                .split(' ')
                .filter(function (className) {
                    return className !== 'state-selected';
                })
                .join(' ');

        }

        target.className += ' state-selected';

    }

    /**
     * 渲染树节点
     *
     * @protected
     * @param  {Array<ReactElement>} children 所有子节点
     * @param  {number}              level    层级
     * @param  {boolean}             expand   是否展开
     * @return {?Array}
     */
    renderTreeNode(children, level, expand = false) {

        if (!children) {
            return;
        }

        return Children.map(
            children,
            (child, index) => cloneElement(
                child,
                {
                    onClick: this.onTreeNodeClick,
                    key: index,
                    level,
                    expand
                },
                Children.count(child.props.children)
                    ? this.renderTreeNode(
                        child.props.children,
                        level + 1,
                        expand
                    )
                    : null
            )
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            children,
            variants,
            states,
            defaultExpandAll,
            ...rest
        } = this.props;

        const className = cx()
            .addVariants(variants)
            .addStates(states)
            .build();

        return (
            <ul {...rest} className={className}>
                {this.renderTreeNode(children, 1, defaultExpandAll)}
            </ul>
        );

    }

}


Tree.TreeNode = TreeNode;

Tree.createTreeNodes = function (datasource, level = 1) {

    if (datasource == null) {
        return null;
    }

    if (!Array.isArray(datasource)) {
        datasource = [datasource];
    }

    return datasource.map(function (item, index) {

        return (
            <TreeNode
                level={level}
                label={item.text}
                key={item.id} >
                {Tree.createTreeNodes(item.children, level + 1)}
           </TreeNode>
        );

    });

};

Tree.displayName = 'Tree';

Tree.propTypes = {
    defaultExpandAll: PropTypes.bool,
    datasource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
},

Tree.defaultProps = {

    /**
     * 默认展开树
     * @type {Boolean}
     */
    defaultExpandAll: false

};
