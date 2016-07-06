/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'melon-core/classname/cxBuilder', './tree/TreeNode', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('./tree/TreeNode'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.TreeNode, global.babelHelpers);
        global.Tree = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _cxBuilder, _TreeNode, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _TreeNode2 = babelHelpers.interopRequireDefault(_TreeNode);

    /**
     * @file melon/Tree
     * @author cxtom<cxtom2008@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Tree');

    var Tree = function (_Component) {
        babelHelpers.inherits(Tree, _Component);

        function Tree(props) {
            babelHelpers.classCallCheck(this, Tree);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onTreeNodeClick = _this.onTreeNodeClick.bind(_this);
            return _this;
        }

        Tree.prototype.onTreeNodeClick = function onTreeNodeClick(e) {

            var target = e.currentTarget;
            var main = _reactDom2['default'].findDOMNode(this);

            e.stopPropagation();

            var elements = main.querySelectorAll('[data-role=tree-node]');

            for (var i = 0, len = elements.length; i < len; ++i) {

                elements[i].className = elements[i].className.split(' ').filter(function (className) {
                    return className !== 'state-selected';
                }).join(' ');
            }

            target.className += ' state-selected';
        };

        Tree.prototype.renderTreeNode = function renderTreeNode(children, level) {

            if (!children) {
                return;
            }

            var expand = this.props.defaultExpandAll;

            return _react.Children.map(children, function (child, index) {

                return (0, _react.cloneElement)(child, {
                    onClick: this.onTreeNodeClick,
                    key: index,
                    level: level,
                    expand: expand
                }, this.renderTreeNode(child.props.children, level + 1));
            }, this);
        };

        Tree.prototype.render = function render() {
            var _props = this.props;
            var children = _props.children;
            var rest = babelHelpers.objectWithoutProperties(_props, ['children']);


            return _react2['default'].createElement(
                'ul',
                babelHelpers['extends']({}, rest, { className: cx(this.props).build() }),
                this.renderTreeNode(children, 1)
            );
        };

        return Tree;
    }(_react.Component);

    exports['default'] = Tree;


    Tree.TreeNode = _TreeNode2['default'];

    Tree.createTreeNodes = function (datasource, level) {

        level = level || 1;

        if (datasource == null) {
            return null;
        }

        if (!Array.isArray(datasource)) {
            datasource = [datasource];
        }

        return datasource.map(function (item, index) {

            return _react2['default'].createElement(
                _TreeNode2['default'],
                {
                    level: level,
                    label: item.text,
                    key: item.id },
                Tree.createTreeNodes(item.children, level + 1)
            );
        });
    };

    Tree.displayName = 'Tree';

    Tree.propTypes = {
        defaultExpandAll: _react.PropTypes.bool,
        datasource: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
    }, Tree.defaultProps = {

        /**
         * 默认展开树
         * @type {Boolean}
         */
        defaultExpandAll: false

    };
});