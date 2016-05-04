/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './common/util/cxBuilder', './validator/Validity', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./common/util/cxBuilder'), require('./validator/Validity'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Validity, global.babelHelpers);
        global.Validity = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Validity, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Validity;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file melon/Validity
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Validity');

    /* eslint-disable fecs-prefer-class */
    function Validity(props) {
        var validity = props.validity;


        var isValid = validity ? validity.isValid() : true;
        var message = validity ? validity.getMessage() : null;

        var statefulClassName = cx(props).addStates({
            valid: isValid,
            invalid: !isValid
        }).build();

        return _react2['default'].createElement(
            'div',
            { className: statefulClassName },
            message
        );
    }

    Validity.displayName = 'Validity';

    Validity.propTypes = {
        validity: _react.PropTypes.instanceOf(_Validity2['default'])
    };
});