define('melon/Tree', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'underscore',
    'react-dom',
    './common/util/cxBuilder',
    './tree/TreeNode'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _ = require('underscore');
    var ReactDOM = require('react-dom');
    var cx = require('./common/util/cxBuilder').create('Tree');
    var TreeNode = require('./tree/TreeNode');
    var Tree = React.createClass({
        displayName: 'Tree',
        propTypes: {
            defaultExpandAll: React.PropTypes.bool,
            datasource: React.PropTypes.oneOfType([
                React.PropTypes.array,
                React.PropTypes.object
            ])
        },
        getDefaultProps: function () {
            return { defaultExpandAll: false };
        },
        onTreeNodeClick: function (e) {
            var target = e.currentTarget;
            var main = ReactDOM.findDOMNode(this);
            e.stopPropagation();
            _.each(main.querySelectorAll('[data-role=tree-node]'), function (ele) {
                var className = ele.className.split(' ');
                ele.className = _.without(className, 'state-selected').join(' ');
            });
            target.className += ' state-selected';
        },
        renderTreeNode: function (children, level) {
            if (!children) {
                return;
            }
            var expand = this.props.defaultExpandAll;
            return React.Children.map(children, function (child, index) {
                return React.cloneElement(child, {
                    onClick: this.onTreeNodeClick,
                    key: index,
                    level: level,
                    expand: expand
                }, this.renderTreeNode(child.props.children, level + 1));
            }, this);
        },
        render: function () {
            var props = this.props;
            var children = props.children;
            return React.createElement('ul', babelHelpers._extends({}, props, { className: cx(props).build() }), this.renderTreeNode(children, 1));
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
            return React.createElement(TreeNode, {
                level: level,
                label: item.text,
                key: item.id
            }, Tree.createTreeNodes(item.children, level + 1));
        }, this);
    };
    module.exports = Tree;
});