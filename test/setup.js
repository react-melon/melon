/**
 * @file 添加jsdom测试环境
 * @author chenxiao07(chenxiao07@baidu.com)
 */

import {jsdom} from 'jsdom';

global.document = jsdom(
    '<!doctype html><html><head><meta charset="UTF-8"></head><body><div id="app"></div></body></html>'
);

global.window = document.defaultView;
global.navigator = window.navigator;

document.documentElement.clientWidth = window.innerWidth;
document.documentElement.clientHeight = window.innerHeight;
document.documentElement.clientTop = 0;
document.documentElement.clientLeft = 0;
document.documentElement.scrollTop = 0;
document.documentElement.scrollLeft = 0;

// patch
Object.defineProperties(window.HTMLElement.prototype, {
    scrollIntoView: {
        get() {
            return () => {};
        }
    },
    getBoundingClientRect: {
        get() {
            return () => {
                return {
                    top: 0,
                    left: 0,
                    width: parseFloat(window.getComputedStyle(this).width) || 0,
                    height: parseFloat(window.getComputedStyle(this).height) || 0
                };
            };
        }
    },
    offsetLeft: {
        get() {
            return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
        }
    },
    offsetTop: {
        get() {
            return parseFloat(window.getComputedStyle(this).marginTop) || 0;
        }
    },
    offsetHeight: {
        get() {
            return parseFloat(window.getComputedStyle(this).height) || 0;
        }
    },
    offsetWidth: {
        get() {
            return parseFloat(window.getComputedStyle(this).width) || 0;
        }
    }
});

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(window);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) {
            continue;
        }
        if (key in global) {
            continue;
        }

        global[key] = window[key];
    }
}
