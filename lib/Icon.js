(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.omit, global.babelHelpers);
        global.Icon = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Icon;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/Icon
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Icon');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Icon
     *
     * @class
     * @param {Object} props     属性
     * @param {string} props.icon icon名称
     * @return {ReactElement}
     */
    function Icon(props) {
        var icon = props.icon,
            rest = babelHelpers.objectWithoutProperties(props, ['icon']);


        return _react2['default'].createElement('i', babelHelpers['extends']({}, (0, _omit2['default'])(rest, ['states', 'variants']), {
            'data-icon': icon,
            className: cx(props).build() }));
    }

    Icon.propTypes = {
        icon: _propTypes2['default'].string.isRequired
    };

    Icon.displayName = 'Icon';
});
//# sourceMappingURL=Icon.js.map
