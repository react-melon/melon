(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../Icon', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Icon, global.babelHelpers);
        global.TreeNode = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Icon, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

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
            /* eslint-disable fecs-min-vars-per-destructure */
            var label = props.label;
            var others = babelHelpers.objectWithoutProperties(props, ['label']);

            /* eslint-enable fecs-min-vars-per-destructure */
            var expand = this.state.expand;

            var icon = expand ? props.expandIcon || TreeNode.ICON[1] : props.unexpandIcon || TreeNode.ICON[0];

            var children = props.children;

            var iconStyle = void 0;
            var labelStyle = void 0;

            if (props.level) {
                var level = props.level - 0;
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

            return _react2['default'].createElement(
                'li',
                babelHelpers['extends']({}, others, {
                    'data-role': 'tree-node',
                    className: cx(props).addVariants('level' + props.level).build() }),
                children
            );
        };

        return TreeNode;
    }(_react.Component);

    exports['default'] = TreeNode;


    TreeNode.propTypes = {
        label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
        expandIcon: _react.PropTypes.string,
        unexpandIcon: _react.PropTypes.string,
        expand: _react.PropTypes.bool,
        selected: _react.PropTypes.bool,
        level: _react.PropTypes.number
    }, TreeNode.defaultProps = {
        label: '',
        expand: false,
        selected: false
    };

    TreeNode.ICON = ['expand-less', 'expand-more'];
});
//# sourceMappingURL=TreeNode.js.map
