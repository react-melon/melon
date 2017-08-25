/**
 * @file Card
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Card');

/* eslint-disable fecs-prefer-class */

/**
 * melon/Card
 *
 * @class
 * @param {Object}  props           属性
 * @return {ReactElement}
 */
export default function Card(props) {

    const children = props.children;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}
/* eslint-enable fecs-prefer-class */

Card.displayName = 'Card';

export {default as CardActions} from './card/Actions';
export {default as CardHeader} from './card/Header';
export {default as CardTitle} from './card/Title';
export {default as CardMedia} from './card/Media';
export {default as CardText} from './card/Text';
