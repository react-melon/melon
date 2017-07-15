/**
 * @file Navigation Item
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';
import TouchRipple from '../ripples/TouchRipple';

const cx = create('NavigationItem');

export default class NavigationItem extends Component {

    renderIcon(icon) {
        return typeof icon === 'string'
            ? <Icon icon={icon} />
            : icon;
    }

    render() {

        let {
            children,
            label,
            leftIcon,
            rightIcon,
            onClick,
            href,
            active,
            level
        } = this.props;

        children = Children.toArray(children);

        let className = cx(this.props)
            .addStates({active})
            .addVariants([`level-${level}`])
            .build();

        if (children && children.length) {
            return (
                <div
                    className={className}
                    onClick={onClick}>
                    {children}
                </div>
            );
        }

        leftIcon = this.renderIcon(leftIcon);
        rightIcon = this.renderIcon(rightIcon);
        label = <span className={cx.getPartClassName('label')}>{label}</span>;
        let touchableClassName = cx.getPartClassName('touchable');

        if (href) {
            return (
                <div className={className}>
                    <a
                        href={href}
                        onClick={onClick}
                        className={touchableClassName}>
                        {leftIcon}
                        {label}
                        {rightIcon}
                        <TouchRipple />
                    </a>
                </div>
            );
        }

        return (
            <div className={className}>
                <div onClick={onClick} className={touchableClassName}>
                    {leftIcon}
                    {label}
                    {rightIcon}
                    <TouchRipple />
                </div>
            </div>
        );

    }

}

NavigationItem.propTypes = {
    label: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
    level: PropTypes.number
};
