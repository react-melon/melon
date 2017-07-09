/**
 * @file melon/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';
import omit from 'lodash/omit';

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

        let props = this.props;

        let {
            label,
            variants,
            states,
            expandIcon,
            unexpandIcon,
            children,
            level,
            icons,
            ...others
        } = props;

        let expand = this.state.expand;

        let icon = expand
            ? (expandIcon || icons[1])
            : (unexpandIcon || icons[0]);

        let iconStyle;
        let labelStyle;

        if (level) {
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

        const className = cx(props)
            .addVariants(variants)
            .addVariants('level' + props.level)
            .addStates(states)
            .build();

        return (
            <li
                {...omit(others, ['expand'])}
                data-role="tree-node"
                className={className}>
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
};

TreeNode.defaultProps = {
    label: '',
    expand: false,
    selected: false,
    icons: [
        'keyboard-arrow-right',
        'keyboard-arrow-down'
    ]
};
