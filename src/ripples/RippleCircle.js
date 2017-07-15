/**
 * @file melon/RippleCircle
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RippleCircle extends Component {

    shouldComponentUpdate(nextProps) {

        const {
            opacity,
            scale
        } = this.props;

        return opacity !== nextProps.opacity || scale !== nextProps.scale;
    }

    render() {

        const {
            style,
            opacity,
            scale,
            ...other
        } = this.props;

        return (
            <div
                {...other}
                style={{
                    ...style,
                    opacity,
                    WebkitTransform: `scale(${scale})`,
                    MozTransform: `scale(${scale})`,
                    msTransform: `scale(${scale})`,
                    transform: `scale(${scale})`
                }} />
        );


    }

}

RippleCircle.displayName = 'RippleCircle';

RippleCircle.defaultProps = {
    opacity: 0.3,
    scale: 2
};

RippleCircle.propTypes = {
    opacity: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};
