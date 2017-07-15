/**
 * @file MenuItem
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from '../Icon';
import TouchRipple from '../ripples/TouchRipple';

const cx = create('MenuItem');

export default class MenuItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

        let {
            type,
            checked,
            disabled,
            radioGroup,
            onClick,
            onClose
        } = this.props;

        e.stopPropagation();

        if (disabled) {
            return;
        }

        if (onClick) {

            switch (type) {
                case 'radio':
                    onClick({
                        checked: true,
                        radioGroup
                    });
                    break;
                case 'checkbox':
                    onClick({checked: !checked});
                    break;
                default:
                    onClick();
                    break;
            }

        }

        onClose && onClose();

    }

    renderIconPlaceHolder() {
        return (
            <b className={cx.getPartClassName('icon-placeholder')} />
        );
    }

    renderIcon(icon) {
        return typeof icon === 'string'
            ? <Icon icon={icon} className={cx.getPartClassName('left-icon')} />
            : icon;
    }

    render() {

        let {
            hotKey,
            icon,
            label,
            type,
            checked,
            disabled,
            indent,
            cascading
        } = this.props;

        let className = cx(this.props)
            .addVariants({cascading})
            .build();

        if (type !== 'command' && checked) {
            icon = 'check';
        }

        icon = icon
            ? this.renderIcon(icon)
            : indent && this.renderIconPlaceHolder();

        return (
            <div className={className} onClick={this.onClick}>
                {icon}
                <span className={cx.getPartClassName('label')}>{label}</span>
                {hotKey}
                {disabled ? null : <TouchRipple />}
            </div>
        );

    }

}

MenuItem.propTypes = {

    /**
     * 是否有 icon 缩进
     *
     * @protected
     * @type {boolean?}
     */
    indent: PropTypes.bool,

    /**
     * 是否为级联
     *
     * @protected
     * @type {boolean?}
     */
    cascading: PropTypes.bool,

    /**
     * 左侧 icon
     *
     * @type {(string|ReactElement)?}
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * 是否为已选中
     *
     * @type {boolean?}
     */
    checked: PropTypes.bool,

    /**
     * 是否禁用
     *
     * @type {boolean?}
     */
    disabled: PropTypes.bool,

    /**
     * 点击回调函数
     *
     * @type {Function?}
     */
    onClick: PropTypes.func,


    label(props, propName, componentName) {
        if (!props.label && !props.children) {
            return new Error(`${componentName} must have 'label' or 'children'.`);
        }
    },

    type(props, propName, componentName) {

        if (props[propName] === 'radio') {
            if (!props.radioGroup) {
                return new Error(`${componentName} needs '${propName}' to be set along with prop 'radioGroup'`);
            }
        }

    },

    hotKey: PropTypes.string

};

MenuItem.defaultProps = {
    type: 'command'
};
