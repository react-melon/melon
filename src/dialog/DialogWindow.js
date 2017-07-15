/**
 * @file melon/Dialog/DialogWindow
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import shallowEqual from 'melon-core/util/shallowEqual';

const cx = create('DialogWindow');

export default class DialogWindow extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    render() {

        const {
            children,
            title,
            footer,
            width,
            style,
            ...others
        } = this.props;

        return (
            <div
                {...others}
                style={{...style, width: `${width}px`}}
                className={cx(this.props).build()}>
                {title}{children}{footer}
            </div>
        );
    }

}

DialogWindow.propTypes = {
    footer: PropTypes.element,
    title: PropTypes.element
};
