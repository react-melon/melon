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
        global.Title = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Title;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/Title
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Title');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Title
     *
     * @param {Object}  props       属性
     * @param {Object}  props.level 级别
     * @return {ReactElement}
     */
    function Title(props) {
        var level = props.level;
        var rest = babelHelpers.objectWithoutProperties(props, ['level']);


        return _react2['default'].createElement('h' + level, babelHelpers['extends']({}, rest, {
            className: cx(props).build()
        }));
    }

    Title.propsTypes = {
        level: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired
    };

    Title.defaultProps = {
        level: 1
    };
});
//# sourceMappingURL=Title.js.map
