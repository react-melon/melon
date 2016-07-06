/**
 * @file melon/Tree
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {Component, PropTypes, cloneElement, Children} from 'react';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';
import TreeNode from './tree/TreeNode';

const cx = create('Tree');

export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    }

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

    renderTreeNode(children, level) {

        if (!children) {
            return;
        }

        const expand = this.props.defaultExpandAll;

        return Children.map(children, function (child, index) {

            return cloneElement(child, {
                onClick: this.onTreeNodeClick,
                key: index,
                level: level,
                expand: expand
            }, this.renderTreeNode(child.props.children, level + 1));

        }, this);
    }

    render() {

        const {children, ...rest} = this.props;

        return (
            <ul {...rest} className={cx(this.props).build()}>
                {this.renderTreeNode(children, 1)}
            </ul>
        );

    }

}


Tree.TreeNode = TreeNode;

Tree.createTreeNodes = function (datasource, level) {

    level = level || 1;

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
