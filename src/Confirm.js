/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import Button from './Button';
import createCommand from './dialog/commander';

/* eslint-disable fecs-prefer-class */

/**
 * melon/Confirm
 *
 * @extends {React.Component}
 * @class
 * @param {Object} props 属性
 */
export default function Confirm(props) {


    const {
        size,
        buttonVariants,
        variants = [],
        onConfirm,
        onCancel,
        cancelButtonText,
        confirmButtonText,
        ...rest
    } = props;

    const actions = [
        <Button
            label={cancelButtonText}
            key="cancel"
            size={size}
            type="button"
            onClick={onCancel ? () => onCancel() : null}
            variants={[...buttonVariants, 'cancel']} />,
        <Button
            label={confirmButtonText}
            key="submit"
            type="button"
            size={size}
            onClick={onConfirm ? () => onConfirm() : null}
            variants={[...buttonVariants, 'confirm']} />
    ];

    return (
        <Dialog
            {...rest}
            size={size}
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

Confirm.show = createCommand(Confirm, ['onConfirm', 'onCancel']);
