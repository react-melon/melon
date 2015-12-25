define('melon/Drawer', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Mask',
    './common/util/cxBuilder',
    './common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Mask = require('./Mask');
    var cx = require('./common/util/cxBuilder').create('Drawer');
    var domUtil = require('./common/util/dom');
    var PropTypes = React.PropTypes;
    var REVERT_POSITION = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
    };
    var Drawer = React.createClass({
        displayName: 'Drawer',
        propTypes: {
            position: PropTypes.oneOf([
                'top',
                'right',
                'bottom',
                'left'
            ]).isRequired,
            open: PropTypes.bool.isRequired,
            size: PropTypes.number.isRequired,
            mask: PropTypes.bool,
            maskClickClose: PropTypes.bool
        },
        onMaskClick: function () {
            var _props = this.props;
            var onHide = _props.onHide;
            var maskClickClose = _props.maskClickClose;
            if (maskClickClose && onHide) {
                onHide();
            }
        },
        render: function () {
            var props = this.props;
            var children = props.children;
            var open = props.open;
            var position = props.position;
            var size = props.size;
            var mask = props.mask;
            var posValue = open ? 0 : -size;
            if (size <= 0) {
                var clientSize = position === 'bottom' || position === 'top' ? domUtil.getClientHeight() : domUtil.getClientWidth();
                posValue = open ? -size : clientSize;
            }
            var style = size > 0 ? {
                top: position === 'bottom' ? null : posValue,
                bottom: position === 'top' ? null : posValue,
                left: position === 'right' ? null : posValue,
                right: position === 'left' ? null : posValue,
                height: position === 'bottom' || position === 'top' ? size : null,
                width: position === 'left' || position === 'right' ? size : null
            } : {
                top: position === 'bottom' ? posValue : 0,
                bottom: position === 'top' ? posValue : 0,
                left: position === 'right' ? posValue : 0,
                right: position === 'left' ? posValue : 0,
                height: null,
                width: null
            };
            var visibilityTransitionDelay = open ? '0ms' : '400ms';
            var transitionStyle = size > 0 ? position : REVERT_POSITION[position];
            var transition = '' + transitionStyle + ' 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, ' + 'opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, ' + 'visibility 0ms cubic-bezier(0.23, 1, 0.32, 1) ' + visibilityTransitionDelay;
            return React.createElement('div', { className: cx(props).build() }, React.createElement('div', {
                className: cx().part('window').build(),
                style: babelHelpers._extends({}, style, {
                    opacity: open ? 1 : 0,
                    visibility: open ? 'visible' : 'hidden',
                    transition: transition,
                    WebkitTransition: transition,
                    MozTransition: transition,
                    msTransition: transition
                })
            }, children), mask ? React.createElement(Mask, {
                show: open,
                onClick: this.onMaskClick
            }) : null);
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
});