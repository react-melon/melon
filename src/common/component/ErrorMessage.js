/**
 * @file ErrorMessage
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import Icon from 'melon/Icon';

const cx = require('melon-core/classname/cxBuilder').create('ErrorMessage');

export default class ErrorMessage extends React.Component {

    static displayName = 'ErrorMessage';

    render() {

        let {
            statusInfo,
            message,
            stack,
            debug
        } = this.props.error;

        return (
            <div className={cx(this.props).build()}>
                <Icon icon="error" />
                {statusInfo || message || '啊哦，发生了一些奇怪的事，请稍候再试'}
                {debug ? <p>{stack}</p> : null}
            </div>
        );

    }
}

let {PropTypes} = React;

ErrorMessage.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
    debug: PropTypes.bool
};
