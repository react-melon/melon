/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import Dialog from './Dialog';
import Button from './Button';

/* eslint-disable fecs-prefer-class */
export default function Alert(props) {

    const {
        variants = [],
        buttonVariants = [],
        size,
        onConfirm,
        ...rest
    } = props;

    const actions = (
        <Button
            label="确定"
            key="submit"
            size={size}
            type="button"
            onClick={onConfirm ? e => onConfirm() : null}
            variants={buttonVariants} />
    );

    return (
        <Dialog
            {...rest}
            actions={actions}
            variants={[...variants, 'alert']}
            size={size} />
    );

}
/* eslint-enable fecs-prefer-class */

Alert.displayName = 'Alert';

Alert.propTypes = {
    ...Dialog.propTypes,
    onConfirm: PropTypes.func,
    buttonText: PropTypes.string.isRequired,
    buttonVariants: PropTypes.arrayOf(PropTypes.string).isRequired
};

Alert.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null,
    buttonText: '确定',
    buttonVariants: ['primary']
};
