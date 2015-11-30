/**
 * @file Drawer
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const Mask = require('./Mask');

const cx = require('./common/util/cxBuilder').create('Drawer');

const {PropTypes} = React;

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

        const style = size > 0
            ? {
                top: position === 'bottom' ? null : 0,
                bottom: position === 'top' ? null : 0,
                left: position === 'right' ? null : 0,
                right: position === 'left' ? null : 0,
                height: position === 'bottom' || position === 'top' ? size : null,
                width: position === 'left' || position === 'right' ? size : null
            }
            : {
                top: position === 'bottom' ? -size : 0,
                bottom: position === 'top' ? -size : 0,
                left: position === 'right' ? -size : 0,
                right: position === 'left' ? -size : 0,
                height: null,
                width: null
            };

        return (
            <div className={cx(props).build()}>
                <div
                    className={cx().part('window').build()}
                    style={{
                        ...style,
                        opacity: open ? 1 : 0,
                        visibility: open ? 'visible' : 'hidden'
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
