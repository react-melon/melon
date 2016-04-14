/**
 * @file melon/Link
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';

import {create} from './common/util/cxBuilder';

const cx = create('Link');

/* eslint-disable fecs-prefer-class */

export default function Link(props) {

    return (
        <a {...props} className={cx(props).build()} />
    );

}

/* eslint-enable fecs-prefer-class */
