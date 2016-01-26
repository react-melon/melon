define('melon/tree/TreeNode', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    '../Icon'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TreeNode');
    var Icon = require('../Icon');
    var PropTypes = React.PropTypes;
    var TreeNode = React.createClass({
        displayName: 'TreeNode',
        propTypes: {
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            expandIcon: PropTypes.string,
            unexpandIcon: PropTypes.string,
            expand: PropTypes.bool,
            selected: PropTypes.bool,
            level: PropTypes.number
        },
        getDefaultProps: function () {
            return {
                label: '',
                expand: false,
                selected: false
            };
        },
        getInitialState: function () {
            var props = this.props;
            return { expand: props.expand || false };
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return nextState.expand !== this.state.expand;
        },
        componentWillReceiveProps: function (props) {
            if (props.expand === this.props.expand) {
                return;
            }
            this.setState({ expand: props.expand });
        },
        handleOnClick: function (e) {
            var state = this.state;
            var expand = state.expand;
            this.setState({ expand: !expand });
        },
        render: function () {
            var props = this.props;
            var label = props.label;
            var children = props.children;
            var expandIcon = props.expandIcon;
            var unexpandIcon = props.unexpandIcon;
            var others = babelHelpers.objectWithoutProperties(props, [
                'label',
                'children',
                'expandIcon',
                'unexpandIcon'
            ]);
            var expand = this.state.expand;
            var icon = expand ? expandIcon || TreeNode.ICON[1] : unexpandIcon || TreeNode.ICON[0];
            var iconStyle = undefined;
            var labelStyle = undefined;
            var content = undefined;
            if (props.level) {
                var level = props.level - 0;
                labelStyle = { paddingLeft: level * 1.2 + 0.4 + 'em' };
                iconStyle = { left: 0.25 + (level - 1) * 1.2 + 'em' };
            }
            if (React.Children.count(children) > 0) {
                content = [
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
                        className: cx().part('label').addVariants('parent').addStates({ expand: expand }).build()
                    }, label),
                    React.createElement('ul', {
                        className: cx().part('root').addStates({ expand: expand }).build(),
                        key: 'root',
                        ref: 'list'
                    }, children)
                ];
            } else {
                content = React.createElement('span', {
                    onClick: this.handleOnClick,
                    key: 'label',
                    'data-role': 'tree-node-label',
                    style: labelStyle,
                    className: cx().part('label').build()
                }, label);
            }
            return React.createElement('li', babelHelpers._extends({}, others, {
                'data-role': 'tree-node',
                className: cx(props).addVariants('level' + props.level).build()
            }), content);
        }
    });
    TreeNode.ICON = [
        'chevron-right',
        'expand-more'
    ];
    module.exports = TreeNode;
});