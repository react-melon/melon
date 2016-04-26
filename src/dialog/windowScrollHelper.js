/**
 * @file melon/dialog/windowScrollHelper
 * @author leon(ludafa@outlook.com)
 */

const originalHTMLBodySize = {};

function stopWindowScrolling(name) {
    const element = document.getElementsByTagName(name)[0];
    originalHTMLBodySize[name] = {
        width: element.style.width,
        height: element.style.height,
        overflow: element.style.overflow
    };
    element.style.width = '100%';
    element.style.height = '100%';
    return element;
}

function restoreWindowScrolling(name) {
    const element = document.getElementsByTagName(name)[0];
    const size = originalHTMLBodySize[name];
    element.style.width = size.width;
    element.style.height = size.height;
    element.style.overflow = size.overflow;
    delete originalHTMLBodySize[name];
    return element;
}

export function stop() {
    stopWindowScrolling('body').style.overflow = 'hidden';
    stopWindowScrolling('html');
}

export function restore() {
    if (!originalHTMLBodySize.body || !originalHTMLBodySize.html) {
        return;
    }
    restoreWindowScrolling('body');
    restoreWindowScrolling('html');
}

export function update() {
    stop();
    restore();
}
