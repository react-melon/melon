/**
 * @file Navigation
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './navigtaion/Item';
import NavigationHeader from './navigtaion/Header';
import Divider from './Divider';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from './Icon';
import Zippy from './Zippy';
import TouchRipple from './ripples/TouchRipple';

const cx = create('Navigation');

class Navigation extends Component {

    constructor(props, context) {
        super(props, context);
        this.onToggle = this.onToggle.bind(this);
        this.state = {
            open: props.open
        };
    }

    onToggle() {

        let {
            onClose,
            onOpen,
            openable
        } = this.props;

        if (!openable) {
            return;
        }

        this.setState({
            open: !this.state.open
        }, () => {
            let handler = this.state.open ? onOpen : onClose;
            handler && handler();
        });

    }

    render() {

        let {
            label,
            children,
            icon,
            level
        } = this.props;

        if (typeof icon === 'string') {
            icon = <Icon name={icon} />;
        }

        if (children) {
            children = Children
                .toArray(children)
                .filter(child => (
                    child.type === NavigationItem
                    || child.type === NavigationHeader
                    || child.type === Divider
                    || child.type === Navigation
                ))
                .map(child => (
                    child.type === Navigation
                        ? cloneElement(child, {level: level + 1})
                        : (
                            child.type === NavigationItem
                                ? cloneElement(child, {level})
                                : child
                        )
                ));
        }

        if (label && level > 0) {
            label = (
                <div
                    onClick={this.onToggle}
                    className={cx.getPartClassName('touchable')}>
                    {icon}
                    <span className={cx.getPartClassName('label')}>{label}</span>
                    <TouchRipple />
                </div>
            );
            children = (
                <Zippy
                    direction="vertical"
                    style={{transformOrigin: `${level}em top`}}
                    expand={this.state.open}>
                    {children}
                </Zippy>
            );
        }

        let className = cx(this.props).addVariants([`level-${level}`]).build();

        return (
            <div className={className}>
                {label}
                {children}
            </div>
        );

    }

}

Navigation.propTypes = {
    icon: PropTypes.node,
    open: PropTypes.bool,
    openable: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    label: PropTypes.string,
    active: PropTypes.bool,
    level: PropTypes.number
};

/* eslint-disable fecs-valid-map-set */
Navigation.defaultProps = {
    openable: true,
    open: true,
    level: 0
};
/* eslint-enable fecs-valid-map-set */

export {
    NavigationItem,
    NavigationHeader,
    Navigation as default
};
