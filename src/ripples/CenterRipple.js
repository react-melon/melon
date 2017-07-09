/**
 * @file melon/CenterRipple
 * @author cxtom<cxtom2008@gmail.com>
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
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

    shouldCompoenntUpdate(nextProps, nextState) {
        return this.props.opacity !== nextProps.opacity
            || this.props.scale !== nextProps.scale
            || this.props.flag !== nextProps.flag
            || this.state.now !== nextState.now;
    }

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, {stiffness: 60, damping: 15}),
            scale: spring(this.props.scale, {stiffness: 60, damping: 15})
        };
    }

    render() {

        const {opacity, children} = this.props;
        const now = this.state.now;

        const styles = [{
            key: now,
            style: {
                opacity: spring(opacity),
                scale: spring(0)
            }
        }];

        const className = cx(this.props).build();
        const circleClassName = cx().part('circle').build();

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}>
                {interpolatedStyles =>
                    <div className={className}>
                        {interpolatedStyles.map(config => {
                            let {opacity, scale} = config.style;
                            return (
                                <RippleCircle
                                    key={config.key}
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
