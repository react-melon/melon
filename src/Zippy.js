/**
 * @file Zippy
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Zippy');


/**
 * melon/Zippy
 *
 * @extends {React.Component}
 * @class
 */
export default class Zippy extends Component {

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;

        const {
            expand,
            direction,
            variants,
            states,
            ...others
        } = props;

        const className = cx()
            .addVariants(variants)
            .addStates(states)
            .addVariants(direction)
            .addStates({close: !expand})
            .build();

        let style = this.props.style;
        let isVertical = direction === 'vertical';
        let transform = `scale(${isVertical ? 1 : 0}, ${isVertical ? 0 : 1})`;

        if (!expand) {
            style = {
                ...style,
                WebkitTransform: transform,
                MozTransform: transform,
                msTransform: transform,
                transform
            };
        }

        return (
            <div {...others} style={style} className={className} />
        );

    }

}

Zippy.displayName = 'Zippy';

Zippy.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    expand: PropTypes.bool
};

Zippy.defaultProps = {
    direction: 'vertical',
    expand: false
};
