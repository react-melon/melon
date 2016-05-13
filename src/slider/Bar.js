/**
 * @file Slider/SliderBar
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';

const cx = create('SliderBar');

export default function SliderBar(props) {

    const {
        height,
        max,
        min,
        value
    } = props;

    const percent = ((value - min) / (max - min) * 100) + '%';

    const activeStyle = {
        width: percent
    };

    const pointerStyle = {
        left: percent
    };

    return (
        <div style={{height}} className={cx(props).build()}>
            <div style={activeStyle} className={cx().part('active').build()} />
            <div style={pointerStyle} className={cx().part('pointer').build()} />
            <div style={pointerStyle} className={cx().part('pointer-outer').build()} />
        </div>
    );

}

SliderBar.displayName = 'SliderBar';

SliderBar.propTypes = {
    height: PropTypes.number
};
