/**
 * @file Drawer
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const Mask = require('./Mask');

const cx = require('./common/util/cxBuilder').create('Drawer');
const domUtil = require('./common/util/dom');

const {PropTypes} = React;

const REVERT_POSITION = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

const Drawer = React.createClass({

    displayName: 'Drawer',

    propTypes: {
        position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
        open: PropTypes.bool.isRequired,
        size: PropTypes.number.isRequired,
        mask: PropTypes.bool,
        maskClickClose: PropTypes.bool
    },

    onMaskClick() {

        const {onHide, maskClickClose} = this.props;

        if (maskClickClose && onHide) {
            onHide();
        }

    },

    render() {

        const {props} = this;
        const {children, open, position, size, mask} = props;

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

        return (
            <div className={cx(props).build()}>
                <div
                    className={cx().part('window').build()}
                    style={{
                        ...style,
                        opacity: open ? 1 : 0,
                        visibility: open ? 'visible' : 'hidden',
                        transition,
                        WebkitTransition: transition,
                        MozTransition: transition,
                        msTransition: transition
                    }}>
                    {children}
                </div>
                {mask ? <Mask show={open} onClick={this.onMaskClick} /> : null}
            </div>
        );

    }

});

Drawer.defaultProps = {
    position: 'left',
    open: false,
    size: 300,
    mask: true,
    maskClickClose: true
};


module.exports = Drawer;
