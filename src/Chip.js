/**
 * @file Chip
 * @author Ma63d(chuck7liu@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

import {create} from 'melon-core/classname/cxBuilder';
const cx = create('Chip');


export default class Chip extends Component {

    static displayName = 'Chip';

    static propTypes = {
        style: PropTypes.object,
        removeIconStyle: PropTypes.object,
        avatar: PropTypes.element,
        onClick: PropTypes.func,
        onRemove: PropTypes.func
    }

    handleClick = event => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    handleRemoveIconClick = event => {
        event.stopPropagation();
        if (this.props.onRemove) {
            this.props.onRemove(event);
        }
    }


    renderAvatar = () => {

        let avatarUiClassName = cx.getPartClassName('avatar');

        let {avatar = null} = this.props;
        if (avatar) {
            let className = avatar.props.className
                ? ~avatar.props.className.indexOf(avatarUiClassName)
                    ? avatar.props.className
                    : `${avatar.props.className} ${avatarUiClassName}`
                : avatarUiClassName;

            avatar = React.cloneElement(avatar, {
                className
            });
        }

        return avatar;
    }

    renderRemoveIcon() {
        const {
            onRemove,
            removeIconStyle
        } = this.props;
        if (onRemove) {
            return (
                <div
                    className={cx.getPartClassName('icon')}>
                    <Icon
                        icon="close"
                        onClick={this.handleRemoveIconClick}
                        style={removeIconStyle}/>
                </div>
            );
        }
    }

    renderLabel() {
        // 如果有remove icon 那么label的padding-right为0
        let labelStyle = {};
        if (this.props.onRemove) {
            labelStyle.paddingRight = 0;
        }

        return (
            <span
                className={cx.getPartClassName('label')}
                style={labelStyle}>
                    {this.props.children}
            </span>
        );
    }

    render() {

        let {onClick, onRemove, style} = this.props;

        let className = cx(this.props)
            .addStates({
                active: !!(onClick || onRemove)
            })
            .build();

        return (
            <div
                className={className}
                onClick={this.handleClick}
                style={style}>
                <div style={{display: 'table'}}>
                    {this.renderAvatar()}
                    {this.renderLabel()}
                    {this.renderRemoveIcon()}
                </div>
            </div>

        );
    }

}
