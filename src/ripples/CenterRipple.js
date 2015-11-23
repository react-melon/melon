/**
 * @file esui-react/CenterRipple
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CenterRipple');
const RippleCircle = require('./RippleCircle');
const {PropTypes} = React;

const {
    spring,
    TransitionMotion
} = require('react-motion');

const CenterRipple = React.createClass({

    displayName: 'CenterRipple',

    getInitialState() {

        this.state = {
            now: 't' + 0
        };

    },

    defaultProps: {
        opacity: 0.5,
        scale: 2
    },

    propTypes: {
        opacity: PropTypes.number,
        scale: PropTypes.number,
        flag: PropTypes.bool
    },

    animate() {
        this.setState({
            now: 't' + Date.now()
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.flag === !this.props.flag) {
            this.animate();
        }
    },

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, [60, 15]),
            scale: spring(this.props.scale, [60, 15])
        };
    },

    render() {

        const {now} = this.state;

        const styles = {
            [now]: {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }
        };

        const className = cx(this.props).build();
        const circleClassName = cx().part('circle');

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
                        {this.props.children}
                    </div>
                }
            </TransitionMotion>
        );

    }

});

module.exports = CenterRipple;
