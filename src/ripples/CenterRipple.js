/**
 * @file melon/CenterRipple
 * @author cxtom<cxtom2010@gmail.com>
 */


import React, {Component, PropTypes} from 'react';
import {create} from '../common/util/cxBuilder';
import RippleCircle from './RippleCircle';
import {spring, TransitionMotion} from 'react-motion';

const cx = create('CenterRipple');

export default class CenterRipple extends Component {

    constructor(props) {

        super(props);

        this.state = {
            now: 't' + 0
        };

        this.willLeave = this.willLeave.bind(this);

    }

    animate() {
        this.setState({
            now: 't' + Date.now()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.flag === !this.props.flag) {
            this.animate();
        }
    }

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, [60, 15]),
            scale: spring(this.props.scale, [60, 15])
        };
    }

    render() {

        const {opacity, children} = this.props;
        const {now} = this.state;

        const styles = {
            [now]: {
                opacity: spring(opacity),
                scale: spring(0)
            }
        };

        const className = cx(this.props).build();
        const circleClassName = cx().part('circle').build();

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}>
                {circles =>
                    <div className={className}>
                        {Object.keys(circles).map(key => {
                            let {opacity, scale} = circles[key];
                            opacity = Math.round(opacity * 100) / 100;
                            scale = opacity <= 0.01
                                ? this.props.scale
                                : Math.round(scale * 100) / 100;
                            return (
                                <RippleCircle
                                    key={key}
                                    className={circleClassName}
                                    opacity={opacity}
                                    scale={scale} />
                            );
                        })}
                        {children}
                    </div>
                }
            </TransitionMotion>
        );

    }

}

CenterRipple.defaultProps = {
    opacity: 0.5,
    scale: 2
};

CenterRipple.propTypes = {
    opacity: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    flag: PropTypes.bool
};

CenterRipple.displayName = 'CenterRipple';
