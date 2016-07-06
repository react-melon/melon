/**
 * @file melon/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, PropTypes, Children} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';

const cx = create('TreeNode');

export default class TreeNode extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            expand: props.expand || false
        };

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.expand !== this.state.expand;
    }

    componentWillReceiveProps(props) {

        if (props.expand === this.props.expand) {
            return;
        }

        this.setState({expand: props.expand});
    }

    onClick(e) {
        this.setState({expand: !this.state.expand});
    }

    render() {

        const props = this.props;
        /* eslint-disable fecs-min-vars-per-destructure */
        const {label, ...others} = props;
        /* eslint-enable fecs-min-vars-per-destructure */
        const expand = this.state.expand;

        const icon = expand
            ? (props.expandIcon || TreeNode.ICON[1])
            : (props.unexpandIcon || TreeNode.ICON[0]);

        let children = props.children;

        let iconStyle;
        let labelStyle;

        if (props.level) {
            const level = props.level - 0;
            labelStyle = {
                paddingLeft: level * 1.2 + 0.4 + 'em'
            };
            iconStyle = {
                left: (0.25 + (level - 1) * 1.2) + 'em'
            };
        }

        // 是否还有子节点
        if (Children.count(children) > 0) {
            children = [
                <Icon
                    key="icon"
                    icon={icon}
                    onClick={this.onClick}
                    style={iconStyle} />,
                <span
                    onClick={this.onClick}
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
                    onClick={this.onClick}
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

}

TreeNode.propTypes = {
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

TreeNode.defaultProps = {
    label: '',
    expand: false,
    selected: false
};

TreeNode.ICON = [
    'expand-less',
    'expand-more'
];
