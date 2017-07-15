/**
 * @file melon/TouchRipple
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RippleCircle from './RippleCircle';
import * as dom from '../common/util/dom';
import {create} from 'melon-core/classname/cxBuilder';
import {spring, TransitionMotion} from 'react-motion';

const cx = create('TouchRipple');

export default class TouchRipple extends Component {

    constructor(props) {

        super(props);

        this.state = {
            now: 't' + 0,
            center: [0, 0]
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.willLeave = this.willLeave.bind(this);
    }

    onMouseDown({pageX, pageY}) {

        this.setState({
            center: this.getCenter(pageX, pageY),
            now: 't' + new Date().getTime()
        });
    }

    sholdComponentUpdate(nextProps, nextState) {
        const {props, state} = this;
        return props.opacity !== nextProps.opacity
            || state.now !== nextState.now;
    }

    getCenter(pageX, pageY) {

        const main = ReactDOM.findDOMNode(this);
        const position = dom.getPosition(main);
        const radius = Math.max(position.width, position.height) / 2;

        this.radius = radius;

        return [
            pageX - position.left - radius,
            pageY - position.top - radius
        ];
    }

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, {stiffness: 60, damping: 15}),
            scale: spring(2, {stiffness: 60, damping: 15})
        };
    }

    render() {

        const {
            center: [centerX, centerY],
            now
        } = this.state;

        const styles = [{
            key: now,
            style: {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }
        }];

        const circleClassName = cx().part('circle').build();

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}
                didLeave={this.props.onMotionEnd}>
                {interpolatedStyles =>
                    <div
                        onMouseDown={this.onMouseDown}
                        className={cx(this.props).build()}>
                        {interpolatedStyles.map(config => {
                            let {opacity, scale} = config.style;
                            return (
                                <RippleCircle
                                    key={config.key}
                                    className={circleClassName}
                                    opacity={opacity}
                                    scale={scale}
                                    style={{
                                        width: this.radius * 2 || 0,
                                        height: this.radius * 2 || 0,
                                        left: centerX,
                                        top: centerY
                                    }} />
                            );
                        })}
                    </div>
                }
            </TransitionMotion>
        );

    }

}

TouchRipple.defaultProps = {
    opacity: 0.3
};

TouchRipple.propTypes = {
    opacity: PropTypes.number,
    onMotionEnd: PropTypes.func
};
