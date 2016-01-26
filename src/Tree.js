/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const _     = require('underscore');
const ReactDOM = require('react-dom');
const cx = require('./common/util/cxBuilder').create('Tree');

const TreeNode = require('./tree/TreeNode');

const Tree = React.createClass({

    displayName: 'Tree',

    propTypes: {
        defaultExpandAll: React.PropTypes.bool,
        datasource: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ])
    },

    getDefaultProps() {

        return {
            /**
             * 默认展开树
             * @type {Boolean}
             */
            defaultExpandAll: false
        };
    },

    onTreeNodeClick(e) {

        const target = e.currentTarget;
        const main = ReactDOM.findDOMNode(this);

        e.stopPropagation();

        _.each(main.querySelectorAll('[data-role=tree-node]'), function (ele) {
            const className = ele.className.split(' ');
            ele.className = _.without(className, 'state-selected').join(' ');
        });

        target.className += ' state-selected';
    },

    renderTreeNode(children, level) {

        if (!children) {
            return;
        }

        const expand = this.props.defaultExpandAll;

        return React.Children.map(children, function (child, index) {

            return React.cloneElement(child, {
                onClick: this.onTreeNodeClick,
                key: index,
                level,
                expand
            }, this.renderTreeNode(child.props.children, level + 1));

        }, this);
    },

    render() {

        const props = this.props;
        const children = props.children;

        return (
            <ul {...props} className={cx(props).build()}>
                {this.renderTreeNode(children, 1)}
            </ul>
        );

    }

});


Tree.TreeNode = TreeNode;

Tree.createTreeNodes = function (datasource, level) {

    level = level || 1;

    if (_.isObject(datasource) && datasource.id && level === 1) {
        datasource = [datasource];
    }
    if (!_.isArray(datasource)) {
        return;
    }

    return _.map(datasource, function (item, index) {

        return (
            <TreeNode
                level={level}
                label={item.text}
                key={item.id} >
                {Tree.createTreeNodes(item.children, level + 1)}
           </TreeNode>
        );

    }, this);

};

module.exports = Tree;
