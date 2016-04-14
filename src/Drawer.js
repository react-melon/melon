/**
 * @file Drawer
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import Mask from './Mask';
import {create} from './common/util/cxBuilder';
import domUtil from './common/util/dom';

const cx = create('Drawer');

const REVERT_POSITION = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

export default class Drawer extends Component {

    render() {

        const {
            children,
            open,
            position,
            size,
            mask,
            onHide,
            maskClickClose
        } = this.props;

        let posValue = open ? 0 : -size;

        if (size <= 0) {
            const clientSize = position === 'bottom' || position === 'top'
                    ? domUtil.getClientHeight()
                    : domUtil.getClientWidth();
            posValue = open ? -size : clientSize;
        }

        const style = size > 0
            ? {
                top: position === 'bottom' ? null : posValue,
                bottom: position === 'top' ? null : posValue,
                left: position === 'right' ? null : posValue,
                right: position === 'left' ? null : posValue,
                height: position === 'bottom' || position === 'top' ? size : null,
                width: position === 'left' || position === 'right' ? size : null
            }
            : {
                top: position === 'bottom' ? posValue : 0,
                bottom: position === 'top' ? posValue : 0,
                left: position === 'right' ? posValue : 0,
                right: position === 'left' ? posValue : 0,
                height: null,
                width: null
            };

        const visibilityTransitionDelay = open ? '0ms' : '400ms';
        const transitionStyle = size > 0 ? position : REVERT_POSITION[position];

        const transition = ''
                +  transitionStyle + ' 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, '
                +  'opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, '
                +  'visibility 0ms cubic-bezier(0.23, 1, 0.32, 1) ' + visibilityTransitionDelay;

        const masker = mask
            ? <Mask
                show={open}
                onClick={maskClickClose && onHide ? onHide : null} />
            : null;

        return (
            <div className={cx(this.props).build()}>
                <div
                    className={cx().part('window').build()}
                    style={{
                        ...style,
                        opacity: open ? 1 : 0,
                        visibility: open ? 'visible' : 'hidden',
                        transition: transition,
                        WebkitTransition: transition,
                        MozTransition: transition,
                        msTransition: transition
                    }}>
                    {children}
                </div>
                {masker}
            </div>
        );

    }

}

Drawer.displayName = 'Drawer';

Drawer.propTypes = {
    position: PropTypes.oneOf(Object.keys(REVERT_POSITION)).isRequired,
    open: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    mask: PropTypes.bool,
    maskClickClose: PropTypes.bool,
    onHide: PropTypes.func.isRequired
};

Drawer.defaultProps = {
    position: 'left',
    open: false,
    size: 300,
    mask: true,
    maskClickClose: true
};
