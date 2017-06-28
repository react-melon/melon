(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'tinycolor2', '../../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('tinycolor2'), require('../../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.tinycolor2, global.babelHelpers);
        global.color = mod.exports;
    }
})(this, function (exports, _tinycolor, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.emphasize = emphasize;

    var _tinycolor2 = babelHelpers.interopRequireDefault(_tinycolor);

    /**
     *  加重一种颜色
     *
     *  @param {string} cssColor, css里某颜色的字符串,如#xxx, rgb(), hsl()等
     *  @param {number} factor, 系数 0-1之间
     *  @return {string} cssColor, rgb形式的
     * */
    /**
     * @file color
     * @author Ma63d(chuck7liu@gmail.com)
     */

    function emphasize(cssColor, factor) {
        var color = (0, _tinycolor2['default'])(cssColor);

        if (color.isValid()) {
            var hsl = color.toHsl();

            // 颜色有深浅, 亮度大于0.5的深色则加深,反之则提亮
            var lightness = color.getLuminance() > 0.5 ? (1 - factor) * hsl.l : (1 - hsl.l) * factor + hsl.l;
            color = (0, _tinycolor2['default'])(babelHelpers['extends']({}, hsl, {
                l: lightness
            }));
            return color.toString();
        }

        // 如果传入invalid的css 字符串,则返回空字符串
        return '';
    }
});
//# sourceMappingURL=color.js.map
