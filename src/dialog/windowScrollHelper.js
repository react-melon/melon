/**
 * @file melon/dialog/windowScrollHelper
 * @author leon(ludafa@outlook.com)
 */

const originalHTMLBodySize = {};

/* eslint-disable fecs-valid-dom-style */

function stopWindowScrolling(name) {

    let element = document.getElementsByTagName(name)[0];

    let lockNum = +element.getAttribute('data-lock') || 0;

    element.setAttribute('data-lock', lockNum + 1);

    if (lockNum === 0) {
        originalHTMLBodySize[name] = {
            width: element.style.width,
            height: element.style.height,
            overflow: element.style.overflow
        };

        element.style.height = '100%';

        if (name !== 'html') {
            element.style.marginRight = `${window.innerWidth - element.offsetWidth}px`;
            element.style.overflow = 'hidden';
        }
    }

    return element;
}

function restoreWindowScrolling(name) {

    let element = document.getElementsByTagName(name)[0];
    let lockNum = +element.getAttribute('data-lock') || 0;

    if (lockNum > 1) {
        element.setAttribute('data-lock', lockNum - 1);
    }
    else {
        element.removeAttribute('data-lock');
        let size = originalHTMLBodySize[name];
        element.style.height = size.height;

        if (name !== 'html') {
            element.style.marginRight = '';
            element.style.overflow = '';
        }
        /* eslint-disable */
        delete originalHTMLBodySize[name];
        /* eslint-enable */
    }

    return element;
}

export function stop() {
    stopWindowScrolling('body');
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
