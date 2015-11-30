define('melon/Drawer', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Mask',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Mask = require('./Mask');
    var cx = require('./common/util/cxBuilder').create('Drawer');
    var PropTypes = React.PropTypes;
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
            var style = size > 0 ? {
                top: position === 'bottom' ? null : 0,
                bottom: position === 'top' ? null : 0,
                left: position === 'right' ? null : 0,
                right: position === 'left' ? null : 0,
                height: position === 'bottom' || position === 'top' ? size : null,
                width: position === 'left' || position === 'right' ? size : null
            } : {
                top: position === 'bottom' ? -size : 0,
                bottom: position === 'top' ? -size : 0,
                left: position === 'right' ? -size : 0,
                right: position === 'left' ? -size : 0,
                height: null,
                width: null
            };
            return React.createElement('div', { className: cx(props).build() }, React.createElement('div', {
                className: cx().part('window').build(),
                style: babelHelpers._extends({}, style, {
                    opacity: open ? 1 : 0,
                    visibility: open ? 'visible' : 'hidden'
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