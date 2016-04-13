/**
 * @file melon/Validity
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';
import {create} from './common/util/cxBuilder';
import {default as V} from './validator/Validity';

const cx = create('Validity');

/* eslint-disable fecs-prefer-class */
export default function Validity(props) {

    const {validity} = props;

    const isValid = validity ? validity.isValid() : true;
    const message = validity ? validity.getMessage() : null;

    const statefulClassName = cx(props)
        .addStates({
            valid: isValid,
            invalid: !isValid
        })
        .build();

    return (
        <div className={statefulClassName}>
            {message}
        </div>
    );

}

Validity.displayName = 'Validity';

Validity.propTypes = {
    validity: PropTypes.instanceOf(V)
};
