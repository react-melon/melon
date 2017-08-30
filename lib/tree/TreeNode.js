(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../Icon', 'lodash/omit', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('lodash/omit'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Icon, global.omit, global.babelHelpers);
        global.TreeNode = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Icon, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/Tree
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TreeNode');

    var TreeNode = function (_Component) {
        babelHelpers.inherits(TreeNode, _Component);

        function TreeNode(props) {
            babelHelpers.classCallCheck(this, TreeNode);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);

            _this.state = {
                expand: props.expand || false
            };

            return _this;
        }

        TreeNode.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return nextState.expand !== this.state.expand;
        };

        TreeNode.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {

            if (props.expand === this.props.expand) {
                return;
            }

            this.setState({ expand: props.expand });
        };

        TreeNode.prototype.onClick = function onClick(e) {
            this.setState({ expand: !this.state.expand });
        };

        TreeNode.prototype.render = function render() {

            var props = this.props;

            var label = props.label,
                variants = props.variants,
                states = props.states,
                expandIcon = props.expandIcon,
                unexpandIcon = props.unexpandIcon,
                children = props.children,
                level = props.level,
                icons = props.icons,
                others = babelHelpers.objectWithoutProperties(props, ['label', 'variants', 'states', 'expandIcon', 'unexpandIcon', 'children', 'level', 'icons']);


            var expand = this.state.expand;

            var icon = expand ? expandIcon || icons[1] : unexpandIcon || icons[0];

            var iconStyle = void 0;
            var labelStyle = void 0;

            if (level) {
                labelStyle = {
                    paddingLeft: level * 1.2 + 0.4 + 'em'
                };
                iconStyle = {
                    left: 0.25 + (level - 1) * 1.2 + 'em'
                };
            }

            // 是否还有子节点
            if (_react.Children.count(children) > 0) {
                children = [_react2['default'].createElement(_Icon2['default'], {
                    key: 'icon',
                    icon: icon,
                    onClick: this.onClick,
                    style: iconStyle }), _react2['default'].createElement(
                    'span',
                    {
                        onClick: this.onClick,
                        key: 'label',
                        'data-role': 'tree-node-label',
                        style: labelStyle,
                        className: cx().part('label').addVariants('parent').addStates({ expand: expand }).build() },
                    label
                ), _react2['default'].createElement(
                    'ul',
                    {
                        className: cx().part('root').addStates({ expand: expand }).build(),
                        key: 'root',
                        ref: 'list' },
                    children
                )];
            } else {
                children = _react2['default'].createElement(
                    'span',
                    {
                        onClick: this.onClick,
                        key: 'label',
                        'data-role': 'tree-node-label',
                        style: labelStyle,
                        className: cx().part('label').build() },
                    label
                );
            }

            var className = cx(props).addVariants(variants).addVariants('level' + props.level).addStates(states).build();

            return _react2['default'].createElement(
                'li',
                babelHelpers['extends']({}, (0, _omit2['default'])(others, ['expand']), {
                    'data-role': 'tree-node',
                    className: className }),
                children
            );
        };

        return TreeNode;
    }(_react.Component);

    exports['default'] = TreeNode;


    TreeNode.propTypes = {
        label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
        expandIcon: _propTypes2['default'].string,
        unexpandIcon: _propTypes2['default'].string,
        expand: _propTypes2['default'].bool,
        selected: _propTypes2['default'].bool,
        level: _propTypes2['default'].number
    };

    TreeNode.defaultProps = {
        label: '',
        expand: false,
        selected: false,
        icons: ['keyboard-arrow-right', 'keyboard-arrow-down']
    };
});
//# sourceMappingURL=TreeNode.js.map
