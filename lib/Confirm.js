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
        global.Confirm = mod.exports;
    }
})(this, function (exports, _react, _Dialog, _Button, _commander, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Dialog2 = babelHelpers.interopRequireDefault(_Dialog);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _commander2 = babelHelpers.interopRequireDefault(_commander);

    var Confirm = function (_React$Component) {
        babelHelpers.inherits(Confirm, _React$Component);

        function Confirm() {
            babelHelpers.classCallCheck(this, Confirm);
            return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        Confirm.prototype.render = function render() {

            var props = this.props;

            var size = props.size,
                buttonVariants = props.buttonVariants,
                _props$variants = props.variants,
                variants = _props$variants === undefined ? [] : _props$variants,
                onConfirm = props.onConfirm,
                onCancel = props.onCancel,
                rest = babelHelpers.objectWithoutProperties(props, ['size', 'buttonVariants', 'variants', 'onConfirm', 'onCancel']);


            var actions = [_react2['default'].createElement(_Button2['default'], {
                label: '\u53D6\u6D88',
                key: 'cancel',
                size: size,
                type: 'button',
                onClick: onCancel ? function () {
                    return onCancel();
                } : null,
                variants: [].concat(buttonVariants, ['cancel']) }), _react2['default'].createElement(_Button2['default'], {
                label: '\u786E\u5B9A',
                key: 'submit',
                type: 'button',
                size: size,
                onClick: onConfirm ? function () {
                    return onConfirm();
                } : null,
                variants: [].concat(buttonVariants, ['confirm']) })];

            return _react2['default'].createElement(_Dialog2['default'], babelHelpers['extends']({}, rest, {
                size: size,
                title: null,
                maskClickClose: false,
                actions: actions,
                variants: [].concat(variants, ['confirm']) }));
        };

        return Confirm;
    }(_react2['default'].Component);

    exports['default'] = Confirm;


    Confirm.displayName = 'Confirm';

    Confirm.propTypes = babelHelpers['extends']({}, _Dialog2['default'].propTypes, {
        onConfirm: _react.PropTypes.func,
        onCancel: _react.PropTypes.func,
        cancelButtonText: _react.PropTypes.string,
        confirmButtonText: _react.PropTypes.string,
        buttonVariants: _react.PropTypes.arrayOf(_react.PropTypes.string)
    });

    Confirm.defaultProps = babelHelpers['extends']({}, _Dialog2['default'].defaultProps, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        buttonVariants: ['primary']
    });

    Confirm.show = (0, _commander2['default'])(Confirm);
});
//# sourceMappingURL=Confirm.js.map
