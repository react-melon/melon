(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Dialog', './Button', './dialog/commander', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Dialog'), require('./Button'), require('./dialog/commander'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Dialog, global.Button, global.commander, global.babelHelpers);
        global.Alert = mod.exports;
    }
})(this, function (exports, _react, _Dialog, _Button, _commander, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Alert;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Dialog2 = babelHelpers.interopRequireDefault(_Dialog);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _commander2 = babelHelpers.interopRequireDefault(_commander);

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Alert
     *
     * @class
     * @param {Object}  props 属性
     * @return {ReactElement}
     */
    /**
     * @file melon/dialog/Alert
     * @author cxtom(cxtom2008@gmail.com)
     */

    function Alert(props) {
        var _babelHelpers$extends;

        var _props$variants = props.variants,
            variants = _props$variants === undefined ? [] : _props$variants,
            _props$buttonVariants = props.buttonVariants,
            buttonVariants = _props$buttonVariants === undefined ? [] : _props$buttonVariants,
            size = props.size,
            onConfirm = props.onConfirm,
            rest = babelHelpers.objectWithoutProperties(props, ['variants', 'buttonVariants', 'size', 'onConfirm']);


        var actions = _react2['default'].createElement(_Button2['default'], {
            label: '\u786E\u5B9A',
            key: 'submit',
            size: size,
            type: 'button',
            onClick: onConfirm ? function (e) {
                return onConfirm();
            } : null,
            variants: buttonVariants });

        return _react2['default'].createElement(_Dialog2['default'], babelHelpers['extends']({}, rest, (_babelHelpers$extends = {
            size: size,
            actions: actions,
            variants: [].concat(variants, ['alert'])
        }, _babelHelpers$extends['size'] = size, _babelHelpers$extends)));
    }
    /* eslint-enable fecs-prefer-class */

    Alert.displayName = 'Alert';

    Alert.propTypes = babelHelpers['extends']({}, _Dialog2['default'].propTypes, {
        onConfirm: _react.PropTypes.func,
        buttonText: _react.PropTypes.string.isRequired,
        buttonVariants: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
    });

    Alert.defaultProps = babelHelpers['extends']({}, _Dialog2['default'].defaultProps, {
        maskClickClose: false,
        buttonText: '确定',
        buttonVariants: ['primary']
    });

    /**
     * 命令式显示一个警告框
     *
     * @example
     * const clean = Alert.show({
     *     title: 'xxx',
     *     children: <div>12321</div>,
     *     onConfirm: function () {
     *         同步操作
     *         异步操作.then(function () {
     *            clean();
     *         })
     *     }
     * });
     * @param {Object} options 警告窗参数
     * @return {Function} 清理函数
     */
    Alert.show = (0, _commander2['default'])(Alert);
});
//# sourceMappingURL=Alert.js.map
