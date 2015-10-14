/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var ReactDOM = require('react-dom');

var Component = require('./Component');
var TreeNode = require('./tree/TreeNode');
var MainClickAware = require('./MainClickAware');

class Tree extends Component {

    constructor(props) {
        super(props);
        this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    }

    getStates(props) {

        var states = {};

        if (props.selected) {
            states.selected = true;
        }

        return states;
    }

    onTreeNodeClick(e) {

        var target = e.currentTarget;
        var main = ReactDOM.findDOMNode(this);

        e.stopPropagation();

        _.each(main.querySelectorAll('[data-role=tree-node]'), function (ele) {
            var className = ele.className.split(' ');
            ele.className = _.without(className, 'state-selected').join(' ');
        });

        target.className += ' state-selected';
    }

    renderTreeNode(children, level) {

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
    }

    render() {

        var props = this.props;
        var children = props.children;

        return (
            <ul {...props} className={this.getClassName()}>
                {this.renderTreeNode(children, 1)}
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
    defaultExpandAll: false
};

Tree.propTypes = {
    defaultExpandAll: React.PropTypes.bool,
    datasource: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

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
