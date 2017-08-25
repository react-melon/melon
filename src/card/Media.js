/**
 * @file CardMedia
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CardMedia');

export default function CardMedia(props) {
    let {image, children, ...rest} = props;
    return (
        <div {...rest} className={cx(props).build()}>
            <img src={image} className={cx.getPartClassName('image')} />
            <div className={cx.getPartClassName('overlay')}>
                {children}
            </div>
        </div>
    );
}

CardMedia.propTypes = {
    image: PropTypes.string.isRequired
};

CardMedia.defaultProps = {

};
