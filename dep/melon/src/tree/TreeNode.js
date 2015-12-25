/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('TreeNode');
const Icon  = require('../Icon');

const {PropTypes} = React;

const TreeNode = React.createClass({

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

    getDefaultProps() {
        return {
            label: '',
            expand: false,
            selected: false
        };
    },

    getInitialState() {

        let props = this.props;

        return {
            expand: props.expand || false
        };

    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.expand !== this.state.expand;
    },

    componentWillReceiveProps(props) {

        if (props.expand === this.props.expand) {
            return;
        }

        this.setState({expand: props.expand});
    },

    handleOnClick(e) {
        var state = this.state;

        var expand = state.expand;

        this.setState({expand: !expand});
    },

    render() {

        var props = this.props;
        var {label, ...others} = props;
        var expand = this.state.expand;

        var icon = expand
            ? (props.expandIcon || TreeNode.ICON[1])
            : (props.unexpandIcon || TreeNode.ICON[0]);

        var children = props.children;

        var iconStyle;
        var labelStyle;

        if (props.level) {
            var level = props.level - 0;
            labelStyle = {
                paddingLeft: level * 1.2 + 0.4 + 'em'
            };
            iconStyle = {
                left: (0.25 + (level - 1) * 1.2) + 'em'
            };
        }

        // 是否还有子节点
        if (React.Children.count(children) > 0) {
            children = [
                <Icon
                    key="icon"
                    icon={icon}
                    onClick={this.handleOnClick}
                    style={iconStyle} />,
                <span
                    onClick={this.handleOnClick}
                    key="label"
                    data-role="tree-node-label"
                    style={labelStyle}
                    className={cx().part('label').addVariants('parent').addStates({expand}).build()}>
                    {label}
                </span>,
                <ul
                    className={cx().part('root').addStates({expand}).build()}
                    key="root"
                    ref="list" >
                    {children}
                </ul>
            ];
        }
        else {
            children = (
                <span
                    onClick={this.handleOnClick}
                    key="label"
                    data-role="tree-node-label"
                    style={labelStyle}
                    className={cx().part('label').build()}>
                    {label}
                </span>
            );
        }

        return (
            <li
                {...others}
                data-role="tree-node"
                className={cx(props).addVariants('level' + props.level).build()}>
                {children}
            </li>
        );

    }

});

TreeNode.ICON = [
    'chevron-right',
    'expand-more'
];

module.exports = TreeNode;
