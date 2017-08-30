(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Card = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Card;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Card
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Card');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Card
     *
     * @class
     * @param {Object}  props           属性
     * @return {ReactElement}
     */
    function Card(props) {

        var children = props.children;

        return _react2['default'].createElement(
            'div',
            { className: cx(props).build() },
            children
        );
    }
    /* eslint-enable fecs-prefer-class */

    Card.displayName = 'Card';
});
//# sourceMappingURL=Card.js.map
