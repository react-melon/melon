/**
 * @file color
 * @author Ma63d(chuck7liu@gmail.com)
 */

import tinycolor from 'tinycolor2';

/**
 *  加重一种颜色
 *
 *  @param {string} cssColor, css里某颜色的字符串,如#xxx, rgb(), hsl()等
 *  @param {number} factor, 系数 0-1之间
 *  @return {string} cssColor, rgb形式的
 * */
export function emphasize(cssColor, factor) {
    let color = tinycolor(cssColor);

    if (color.isValid()) {
        let hsl = color.toHsl();

        // 颜色有深浅, 亮度大于0.5的深色则加深,反之则提亮
        let lightness = color.getLuminance() > 0.5
            ? (1 - factor) * hsl.l
            : (1 - hsl.l) * factor + hsl.l;
        color = tinycolor({
            ...hsl,
            l: lightness
        });
        return color.toString();
    }

    // 如果传入invalid的css 字符串,则返回空字符串
    return '';
}
