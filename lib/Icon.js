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
        global.Icon = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Icon;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/Icon
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Icon');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Icon
     *
     * @param {Object} props     属性
     * @param {string} props.icon icon名称
     * @return {ReactElement}
     */
    function Icon(props) {
        var icon = props.icon;
        var rest = babelHelpers.objectWithoutProperties(props, ['icon']);


        return _react2['default'].createElement('i', babelHelpers['extends']({}, rest, { 'data-icon': icon, className: cx(props).build() }));
    }

    Icon.propTypes = {
        icon: _react.PropTypes.string.isRequired
    };

    Icon.displayName = 'Icon';
});
//# sourceMappingURL=Icon.js.map
