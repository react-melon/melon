/**
 * @file Card
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import {create} from './common/util/cxBuilder';

const cx = create('Card');

/* eslint-disable fecs-prefer-class */
export default function Card(props) {

    const {children} = props;

    return (
        <div className={cx(props).build()}>
            {children}
        </div>
    );

}
/* eslint-enable fecs-prefer-class */
