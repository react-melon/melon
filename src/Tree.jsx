/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var dom   = require('./common/util/dom');
var _     = require('underscore');

var TreeNode = require('./TreeNode.jsx');

var Tree = React.createClass({

    statics: {
        type: 'Tree'
    },

    propTypes: {
        defaultExpandAll: React.PropTypes.bool,
        datasource: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),
    },

    getDefaultProps: function () {
        return {
            defaultExpandAll: false,
            datasource: []
        };
    },

    componentDidMount: function () {
        dom.on(document.body, 'click', this.onClick);
    },

    componentWillUnmount: function () {
        dom.off(document.body, 'click', this.onClick);
    },

    onClick: function (e) {

        // @hack 这里你妹的在ie8上有问题。
        // 虽然我们添加了`componentWillUnmount`的，但是还会有已经`unmount`的控件的`click`被回调。
        // 所以我们加上这个吧。。。
        if (!this.isMounted()) {
            return;
        }

        e = e || window.event;
        var target = e.target || e.srcElement;
        var role = target.getAttribute('data-role');
        var main = React.findDOMNode(this);

        if (!dom.contains(main, target) || role !== 'tree-node-label') {
            return;
        }

        _.map(main.querySelectorAll('[data-role=tree-node-label]'), function (ele) {
            var className = ele.className.split(' ');
            ele.className = _.without(className, 'state-selected').join(' ');
        });

        target.className += ' state-selected';

        console.log(target);

    },

    renderTreeNode: function (data, level) {
        if (_.isObject(data) && data.id && level === 1) {
            data = [data];
        }
        if (!_.isArray(data)) {
            return;
        }

        return _.map(data, function (item, index) {

            return <TreeNode
                        level={level}
                        label={item.text}
                        isOpen={this.props.defaultExpandAll}
                        key={item.id} >

                        {this.renderTreeNode(item.children, level + 1)}
                   </TreeNode>
        }, this)
    },

    render: function() {

        var props = this.props;
        var children = props.children;

        if (React.Children.count(children) === 0) {
            children = this.renderTreeNode(props.datasource, 1);
        }

        return (
            <ul {...props}>
                {children}
            </ul>
        );

    }

});

module.exports = require('./common/util/createControl')(Tree);
