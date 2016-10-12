/**
 * @file melon/dialog/windowScrollHelper
 * @author leon(ludafa@outlook.com)
 */

const originalHTMLBodySize = {};

/* eslint-disable fecs-valid-dom-style */

function stopWindowScrolling(name) {

    const element = document.getElementsByTagName(name)[0];

    let lockNum = element.getAttribute('data-lock') || '0';
    lockNum = parseInt(lockNum, 10);

    element.setAttribute('data-lock', lockNum + 1);

    if (lockNum === 0) {
        originalHTMLBodySize[name] = {
            width: element.style.width,
            height: element.style.height,
            overflow: element.style.overflow
        };
        element.style.width = '100%';
        element.style.height = '100%';

        if (name !== 'html') {
            element.style.overflow = 'hidden';
        }
    }

    return element;
}

function restoreWindowScrolling(name) {

    const element = document.getElementsByTagName(name)[0];
    let lockNum = element.getAttribute('data-lock') || '0';
    lockNum = parseInt(lockNum, 10);

    if (lockNum > 1) {
        element.setAttribute('data-lock', lockNum - 1);
    }
    else {
        element.removeAttribute('data-lock');
        const size = originalHTMLBodySize[name];
        element.style.width = size.width;
        element.style.height = size.height;

        if (name !== 'html') {
            element.style.overflow = size.overflow;
        }
        delete originalHTMLBodySize[name];
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
