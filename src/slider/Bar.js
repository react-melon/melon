/**
 * @file Slider/SliderBar
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import Tooltip from '../Tooltip';

const cx = create('SliderBar');

export default class SliderBar extends Component {

    render() {

        const {
            height,
            maximum,
            minimum,
            value,
            disableFocusRipple,
            pointerSize,
            active,
            ...rest
        } = this.props;

        const percent = ((value - minimum) / (maximum - minimum) * 100) + '%';

        const activeStyle = {
            width: percent
        };

        let pointerStyle = {};
        let outerPointerStyle = {};

        if (pointerSize) {
            pointerStyle.width = pointerStyle.height = pointerSize;

            if (typeof pointerSize === 'string') {
                const unit = pointerSize.replace(/\d(\.)?\d*/, '');
                const value = parseFloat(pointerSize);
                outerPointerStyle.width = outerPointerStyle.height = (value * 2) + unit;
                outerPointerStyle.marginTop = (-value) + unit;
                pointerStyle.marginTop = (-value / 2) + unit;
            }
            else {
                outerPointerStyle.width = outerPointerStyle.height = pointerSize * 2;
                outerPointerStyle.marginTop = -pointerSize;
                pointerStyle.marginTop = -pointerSize / 2;
            }
        }

        return (
            <div {...rest} className={cx().part('wrapper').addStates({active}).build()}>
                <div style={{height}} className={cx(this.props).build()}>
                    <div style={activeStyle} className={cx().part('active').build()} />
                    <Tooltip
                        content={value}
                        style={{left: percent, ...pointerStyle}}
                        className={cx().part('pointer').build()} />
                    {disableFocusRipple
                        ? null
                        : <div
                            style={{left: percent, ...outerPointerStyle}}
                            className={cx().part('pointer-outer').build()} />
                    }
                </div>
            </div>
        );
    }

}

SliderBar.displayName = 'SliderBar';

SliderBar.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maximum: PropTypes.number,
    minimum: PropTypes.number,
    disableFocusRipple: PropTypes.bool
};

SliderBar.defaultProps = {
    height: 2,
    width: '100%',
    disableFocusRipple: false
};
