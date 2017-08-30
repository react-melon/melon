(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'react-dom', 'melon-core/classname/cxBuilder', './tree/TreeNode', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('./tree/TreeNode'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.reactDom, global.cxBuilder, global.TreeNode, global.babelHelpers);
        global.Tree = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _reactDom, _cxBuilder, _TreeNode, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _TreeNode2 = babelHelpers.interopRequireDefault(_TreeNode);

    /**
     * @file melon/Tree
     * @author cxtom<cxtom2008@gmail.com>
     *         leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Tree');

    /**
     * melon/Tree
     *
     * @extends {React.Component}
     * @class
     */

    var Tree = function (_Component) {
        babelHelpers.inherits(Tree, _Component);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         */
        function Tree(props) {
            babelHelpers.classCallCheck(this, Tree);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onTreeNodeClick = _this.onTreeNodeClick.bind(_this);
            return _this;
        }

        /**
         * 节点点击的处理
         *
         * @protected
         * @param  {Object} e 事件对象
         */


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
            var _this2 = this;

            var expand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            if (!children) {
                return;
            }

            return _react.Children.map(children, function (child, index) {
                return (0, _react.cloneElement)(child, {
                    onClick: _this2.onTreeNodeClick,
                    key: index,
                    level: level,
                    expand: expand
                }, _react.Children.count(child.props.children) ? _this2.renderTreeNode(child.props.children, level + 1, expand) : null);
            });
        };

        Tree.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                variants = _props.variants,
                states = _props.states,
                defaultExpandAll = _props.defaultExpandAll,
                rest = babelHelpers.objectWithoutProperties(_props, ['children', 'variants', 'states', 'defaultExpandAll']);


            var className = cx().addVariants(variants).addStates(states).build();

            return _react2['default'].createElement(
                'ul',
                babelHelpers['extends']({}, rest, { className: className }),
                this.renderTreeNode(children, 1, defaultExpandAll)
            );
        };

        return Tree;
    }(_react.Component);

    exports['default'] = Tree;


    Tree.TreeNode = _TreeNode2['default'];

    Tree.createTreeNodes = function (datasource) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


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
        defaultExpandAll: _propTypes2['default'].bool,
        datasource: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].object])
    }, Tree.defaultProps = {

        /**
         * 默认展开树
         * @type {Boolean}
         */
        defaultExpandAll: false

    };
});
//# sourceMappingURL=Tree.js.map
