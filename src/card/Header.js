/**
 * @file Card Header
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CardHeader');

export default function CardHeader(props) {
    let {title, subtitle, avatar} = props;
    return (
        <div className={cx(props).build()}>
            {avatar ? <Avatar image={avatar} /> : null}
            <div className={cx.getPartClassName('title')}>
                <h4>{title}</h4>
                <div>{subtitle}</div>
            </div>
        </div>
    );
}

CardHeader.propTypes = {
    avatar: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

CardHeader.defaultProps = {

};
