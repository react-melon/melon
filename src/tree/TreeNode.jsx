/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var cx    = require('../common/util/classname');
var Icon  = require('../Icon.jsx');

var Component = require('../Component.jsx');

class TreeNode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: this.props.expand || false
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    getStates() {
        // nothing
    }

    handleOnClick(e) {
        var state = this.state;

        var expand = state.expand;

        this.setState({expand: !expand});
    }

    render() {

        var props = this.props;
        var expand = this.state.expand;

        var icon = expand ?
            (props.expandIcon || TreeNode.ICON[1]) :
            (props.unexpandIcon || TreeNode.ICON[0]);

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
            }
        }

        // 是否还有子节点
        if (React.Children.count(children) > 0) {
            children = [
                <Icon key="icon" icon={icon} onClick={this.handleOnClick} style={iconStyle} />,
                <span
                    onClick={this.handleOnClick}
                    key="label"
                    data-role="tree-node-label"
                    style={labelStyle}
                    className={cx.create(
                        this.getPartClassName('label'),
                        cx.createVariantClass(['parent']),
                        cx.createStateClass({expand: expand})
                    )}>
                    {props.label}
                </span>,
                <ul className={cx.create(this.getPartClassName('root'), cx.createStateClass({expand: expand}))} key="root" ref="list">
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
                    className={this.getPartClassName('label')}>
                    {props.label}
                </span>
            );
        }

        return <li {...props} data-role="tree-node" className={this.getClassName()}>{children}</li>;

    }

}

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
