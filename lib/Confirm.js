(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './Dialog', './Button', './dialog/commander', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./Dialog'), require('./Button'), require('./dialog/commander'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Dialog, global.Button, global.commander, global.babelHelpers);
        global.Confirm = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Dialog, _Button, _commander, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Confirm;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Dialog2 = babelHelpers.interopRequireDefault(_Dialog);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _commander2 = babelHelpers.interopRequireDefault(_commander);

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Confirm
     *
     * @extends {React.Component}
     * @class
     * @param {Object} props 属性
     */
    /**
     * @file melon/dialog/Confirm
     * @author cxtom(cxtom2008@gmail.com)
     */

    function Confirm(props) {
        var size = props.size,
            buttonVariants = props.buttonVariants,
            _props$variants = props.variants,
            variants = _props$variants === undefined ? [] : _props$variants,
            onConfirm = props.onConfirm,
            onCancel = props.onCancel,
            cancelButtonText = props.cancelButtonText,
            confirmButtonText = props.confirmButtonText,
            rest = babelHelpers.objectWithoutProperties(props, ['size', 'buttonVariants', 'variants', 'onConfirm', 'onCancel', 'cancelButtonText', 'confirmButtonText']);


        var actions = [_react2['default'].createElement(_Button2['default'], {
            label: cancelButtonText,
            key: 'cancel',
            size: size,
            type: 'button',
            onClick: onCancel ? function () {
                return onCancel();
            } : null,
            variants: [].concat(buttonVariants, ['cancel']) }), _react2['default'].createElement(_Button2['default'], {
            label: confirmButtonText,
            key: 'submit',
            type: 'button',
            size: size,
            onClick: onConfirm ? function () {
                return onConfirm();
            } : null,
            variants: [].concat(buttonVariants, ['confirm']) })];

        return _react2['default'].createElement(_Dialog2['default'], babelHelpers['extends']({}, rest, {
            size: size,
            maskClickClose: false,
            actions: actions,
            variants: [].concat(variants, ['confirm']) }));
    }

    Confirm.displayName = 'Confirm';

    Confirm.propTypes = babelHelpers['extends']({}, _Dialog2['default'].propTypes, {
        onConfirm: _propTypes2['default'].func,
        onCancel: _propTypes2['default'].func,
        cancelButtonText: _propTypes2['default'].string,
        confirmButtonText: _propTypes2['default'].string,
        buttonVariants: _propTypes2['default'].arrayOf(_propTypes2['default'].string)
    });

    Confirm.defaultProps = babelHelpers['extends']({}, _Dialog2['default'].defaultProps, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        buttonVariants: ['primary']
    });

    Confirm.show = (0, _commander2['default'])(Confirm, ['onConfirm', 'onCancel']);
});
//# sourceMappingURL=Confirm.js.map
