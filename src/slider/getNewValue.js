/**
 * @file 获取新值
 * @author cxtom <cxtom2008@gmail.com>
 */

import {getPosition} from '../common/util/dom';

export default function getNewValue(dom, clientX, max, min, step) {

    const position = getPosition(dom);

    const percent = (clientX - position.left) / position.width;
    let newValue = min + (max - min) * percent;

    return Math.round(newValue / step) * step;
}
