define('melon/Tree', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'underscore',
    'react-dom',
    './Component',
    './tree/TreeNode',
    './MainClickAware'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _ = require('underscore');
    var ReactDOM = require('react-dom');
    var Component = require('./Component');
    var TreeNode = require('./tree/TreeNode');
    var MainClickAware = require('./MainClickAware');
    var Tree = function (_Component) {
        babelHelpers.inherits(Tree, _Component);
        function Tree(props) {
            babelHelpers.classCallCheck(this, Tree);
            babelHelpers.get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
            this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
        }
        babelHelpers.createClass(Tree, [
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = {};
                    if (props.selected) {
                        states.selected = true;
                    }
                    return states;
                }
            },
            {
                key: 'onTreeNodeClick',
                value: function onTreeNodeClick(e) {
                    var target = e.currentTarget;
                    var main = ReactDOM.findDOMNode(this);
                    _.each(main.querySelectorAll('[data-role=tree-node]'), function (ele) {
                        var className = ele.className.split(' ');
                        ele.className = _.without(className, 'state-selected').join(' ');
                    });
                    target.className += ' state-selected';
                }
            },
            {
                key: 'renderTreeNode',
                value: function renderTreeNode(children, level) {
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
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var children = props.children;
                    return React.createElement('ul', babelHelpers._extends({}, props, { className: this.getClassName() }), this.renderTreeNode(children, 1));
                }
            }
        ]);
        return Tree;
    }(Component);
    Tree.defaultProps = babelHelpers._extends({}, MainClickAware.defaultProps, { defaultExpandAll: false });
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
            return React.createElement(TreeNode, {
                level: level,
                label: item.text,
                key: item.id
            }, Tree.createTreeNodes(item.children, level + 1));
        }, this);
    };
    module.exports = Tree;
});