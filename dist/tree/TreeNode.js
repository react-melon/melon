define('melon/tree/TreeNode', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/classname',
    '../Icon',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/classname');
    var Icon = require('../Icon');
    var Component = require('../Component');
    var TreeNode = function (_Component) {
        babelHelpers.inherits(TreeNode, _Component);
        function TreeNode(props) {
            babelHelpers.classCallCheck(this, TreeNode);
            babelHelpers.get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
            this.state = { expand: props.expand || false };
            this.handleOnClick = this.handleOnClick.bind(this);
        }
        babelHelpers.createClass(TreeNode, [
            {
                key: 'getStates',
                value: function getStates() {
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(TreeNode.prototype), 'getVariants', this).call(this, props);
                    variants.push('level' + props.level);
                    return variants;
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(props) {
                    if (props.expand === this.props.expand) {
                        return;
                    }
                    this.setState({ expand: props.expand });
                }
            },
            {
                key: 'handleOnClick',
                value: function handleOnClick(e) {
                    var state = this.state;
                    var expand = state.expand;
                    this.setState({ expand: !expand });
                }
            },
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps, nextState) {
                    return nextState.expand !== this.state.expand;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var expand = this.state.expand;
                    var icon = expand ? props.expandIcon || TreeNode.ICON[1] : props.unexpandIcon || TreeNode.ICON[0];
                    var children = props.children;
                    var iconStyle;
                    var labelStyle;
                    if (props.level) {
                        var level = props.level - 0;
                        labelStyle = { paddingLeft: level * 1.2 + 0.4 + 'em' };
                        iconStyle = { left: 0.25 + (level - 1) * 1.2 + 'em' };
                    }
                    if (React.Children.count(children) > 0) {
                        children = [
                            React.createElement(Icon, {
                                key: 'icon',
                                icon: icon,
                                onClick: this.handleOnClick,
                                style: iconStyle
                            }),
                            React.createElement('span', {
                                onClick: this.handleOnClick,
                                key: 'label',
                                'data-role': 'tree-node-label',
                                style: labelStyle,
                                className: cx.create(this.getPartClassName('label'), cx.createVariantClass(['parent']), cx.createStateClass({ expand: expand }))
                            }, props.label),
                            React.createElement('ul', {
                                className: cx.create(this.getPartClassName('root'), cx.createStateClass({ expand: expand })),
                                key: 'root',
                                ref: 'list'
                            }, children)
                        ];
                    } else {
                        children = React.createElement('span', {
                            onClick: this.handleOnClick,
                            key: 'label',
                            'data-role': 'tree-node-label',
                            style: labelStyle,
                            className: this.getPartClassName('label')
                        }, props.label);
                    }
                    return React.createElement('li', babelHelpers._extends({}, props, {
                        'data-role': 'tree-node',
                        className: this.getClassName()
                    }), children);
                }
            }
        ]);
        return TreeNode;
    }(Component);
    TreeNode.ICON = [
        'chevron-right',
        'expand-more'
    ];
    TreeNode.defaultProps = {
        label: '',
        expand: false,
        selected: false
    };
    TreeNode.propTypes = {
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        expandIcon: React.PropTypes.string,
        unexpandIcon: React.PropTypes.string,
        expand: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        level: React.PropTypes.number
    };
    module.exports = TreeNode;
});