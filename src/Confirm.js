/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes} from 'react';
import Dialog from './Dialog';
import Button from './Button';
import createCommand from './dialog/commander';

// 这里我们尝试做过 function component
// 但是在 TestUtils 中渲染出来的组件树中找不到 funciton component，非常诡异；
// 先把这货改成正常的 component，后面再看能不能优化

/**
 * melon/Confirm
 *
 * @extends {React.Component}
 * @class
 */
export default class Confirm extends React.Component {

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;

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
                size={size}
                title={null}
                maskClickClose={false}
                actions={actions}
                variants={[...variants, 'confirm']} />
        );

    }

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

Confirm.show = createCommand(Confirm);
