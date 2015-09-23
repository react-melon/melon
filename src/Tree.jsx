/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var ReactDOM = require('react-dom');

var TreeNode = require('./tree/TreeNode.jsx');
var MainClickAware = require('./MainClickAware.jsx');

class Tree extends MainClickAware {

    constructor(props) {
        super(props);
    }

    getStates() {
        // nothing
    }

    onMainClick(e) {

        e = e || window.event;
        var target = e.target || e.srcElement;
        var role = target.getAttribute('data-role');
        var main = ReactDOM.findDOMNode(this);

        if (role !== 'tree-node-label') {
            return;
        }

        _.map(main.querySelectorAll('[data-role=tree-node-label]'), function (ele) {
            var className = ele.className.split(' ');
            ele.className = _.without(className, 'state-selected').join(' ');
        });

        target.className += ' state-selected';

    }

    renderTreeNode(data, level) {
        if (_.isObject(data) && data.id && level === 1) {
            data = [data];
        }
        if (!_.isArray(data)) {
            return;
        }

        return _.map(data, function (item, index) {

            return (
                <TreeNode
                    level={level}
                    label={item.text}
                    expand={this.props.defaultExpandAll}
                    key={item.id} >
                    {this.renderTreeNode(item.children, level + 1)}
               </TreeNode>
            );

        }, this)
    }

    render() {

        var props = this.props;
        var children = props.children;

        if (React.Children.count(children) === 0) {
            children = this.renderTreeNode(props.datasource, 1);
        }

        return (
            <ul {...props} className={this.getClassName()}>
                {children}
            </ul>
        );

    }

}

Tree.defaultProps = {

    ...MainClickAware.defaultProps,

    /**
     * 默认展开树
     * @type {Boolean}
     */
    defaultExpandAll: false,

    /**
     * 数据源，格式同ESUI
     * @type {Array}
     */
    datasource: {}
};

Tree.propTypes = {
    defaultExpandAll: React.PropTypes.bool,
    datasource: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

Tree.TreeNode = TreeNode;

module.exports = Tree;
