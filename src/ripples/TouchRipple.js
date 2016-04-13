/**
 * @file melon/TouchRipple
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import RippleCircle from './RippleCircle';
import dom from '../common/util/dom';
import {create} from '../common/util/cxBuilder';
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

        const {
            top,
            left
        } = this.position;

        this.setState({
            center: [pageX - left - this.radius, pageY - top - this.radius],
            now: 't' + new Date().getTime()
        });

    }

    componentDidMount() {
        this.updatePosition();
    }

    componentDidUpdate() {
        this.updatePosition();
    }

    componentWillUnmount() {
        this.position = this.radius = null;
    }

    updatePosition() {
        let main = ReactDOM.findDOMNode(this);
        this.position = dom.getPosition(main);
        this.radius = Math.max(this.position.width, this.position.height) / 2;
    }

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, [60, 15]),
            scale: spring(2, [60, 15])
        };
    }

    render() {

        const {
            center: [centerX, centerY],
            now
        } = this.state;

        const styles = {
            [now]: {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }
        };

        const circleClassName = cx().part('circle').build();

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}>
                {circles =>
                    <div
                        onMouseDown={this.onMouseDown}
                        className={cx(this.props).build()}>
                        {Object.keys(circles).map(key => {
                            let {opacity, scale} = circles[key];
                            opacity = Math.round(opacity * 100) / 100;
                            scale = opacity <= 0.01 ? 2 : Math.round(scale * 100) / 100;
                            return (
                                <RippleCircle
                                    key={key}
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
    opacity: PropTypes.number
};
