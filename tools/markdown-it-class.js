/**
 * @file 给 markdown 的每个元素加上样式名
 * @author leon <ludafa@outlook.com>
 */

module.exports = function (md, className) {

    let renderer = md.renderer;
    let renderAttrs = renderer.renderAttrs;

    md.renderer.renderAttrs = function (token) {

        if (token.nesting === -1) {
            return '';
        }

        let attrs = token.attrs;

        if (!attrs) {
            attrs = token.attrs = [];
        }

        let hasClassName = false;
        for (let i = 0, len = attrs.length; i < len; i++) {
            if (attrs[i][0] === 'class') {
                attrs[i][1] += ` ${className}`;
                hasClassName = true;
                break;
            }
        }

        if (!hasClassName) {
            attrs.push(['class', className]);
        }

        return renderAttrs.call(renderer, token);

    };
};
