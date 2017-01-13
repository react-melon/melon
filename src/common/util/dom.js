/**
 * @file melon dom 相关的小工具
 * @author leon(ludafa@outlook.com)
 */

/**
 * 获取文档的兼容根节点
 *
 * @inner
 * @param {?HTMLElement=} el 节点引用，跨 frame 时需要
 * @return {HTMLElement} 兼容的有效根节点
 */
function getCompatElement(el) {
    let doc = el && el.ownerDocument || document;
    let compatMode = doc.compatMode;
    return !compatMode || compatMode === 'CSS1Compat'
        ? doc.documentElement
        : doc.body;
}

export function getClientHeight() {
    return getCompatElement().clientHeight;
}

export function getClientWidth() {
    return getCompatElement().clientWidth;
}

export function getPosition(element) {

    let bound = element.getBoundingClientRect();

    let root = document.documentElement;
    let body = document.body;

    let clientTop = root.clientTop || body.clientTop || 0;
    let clientLeft = root.clientLeft || body.clientLeft || 0;
    let scrollTop = window.pageYOffset || root.scrollTop;
    let scrollLeft = window.pageXOffset || root.scrollLeft;

    return {
        left: parseFloat(bound.left) + scrollLeft - clientLeft,
        top: parseFloat(bound.top) + scrollTop - clientTop,
        width: bound.width,
        height: bound.height
    };

}

export function hasClass(element, cls) {
    return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(element, cls) {
    if (!this.hasClass(element, cls)) {
        element.className += ' ' + cls;
    }
}

export function removeClass(element, cls) {
    if (this.hasClass(element, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}
