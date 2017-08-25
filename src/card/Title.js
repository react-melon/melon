/**
 * @file CardTitle
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CardTitle');

export default function CardTitle(props) {
    let {title, subtitle, ...rest} = props;
    return (
        <div {...rest} className={cx(props).build()}>
            <h4 className={cx.getPartClassName('title')}>{title}</h4>
            <div className={cx.getPartClassName('subtitle')}>{subtitle}</div>
        </div>
    );
}

CardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};
