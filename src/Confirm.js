/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import Dialog from './Dialog';
import Button from './Button';

/* eslint-disable fecs-prefer-class */
export default function Confirm(props) {

    const {
        size,
        buttonVariants,
        variants = [],
        onConfirm,
        onCancel,
        ...rest
    } = props;

    const actions = [
        <Button
            label="取消"
            key="cancel"
            size={size}
            type="button"
            onClick={onCancel ? () => onCancel() : null}
            variants={[...buttonVariants, 'cancel']} />,
        <Button
            label="确定"
            key="submit"
            type="button"
            size={size}
            onClick={onConfirm ? () => onConfirm() : null}
            variants={[...buttonVariants, 'confirm']} />
    ];

    return (
        <Dialog
            {...rest}
            title={null}
            maskClickClose={false}
            actions={actions}
            variants={[...variants, 'confirm']} />
    );


}

Confirm.displayName = 'Confirm';

Confirm.propTypes = {
    ...Dialog.propTypes,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    buttonVariants: PropTypes.arrayOf(PropTypes.string)
};

Confirm.defaultProps = {
    ...Dialog.defaultProps,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    buttonVariants: ['primary']
};

module.exports = Confirm;
