/**
 * @file 添加jsdom测试环境
 * @author chenxiao07(chenxiao07@baidu.com)
 */

import {jsdom} from 'jsdom';

global.document = jsdom('<!doctype html><html><head><meta charset="UTF-8"></head><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

document.documentElement.clientWidth = window.innerWidth;
document.documentElement.clientHeight = window.innerHeight;
document.documentElement.clientTop = 0;
document.documentElement.clientLeft = 0;

