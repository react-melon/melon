/**
 * @file esui-react/CenterRipple
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const Component = require('../Component');
const RippleCircle = require('./RippleCircle');

const {
    spring,
    TransitionMotion
} = require('react-motion');

class CenterRipple extends Component {

    static displayName = 'CenterRipple';

    constructor(props) {
        super(props);

        this.state = {
            now: 't' + 0
        };

        this.willLeave = this.willLeave.bind(this);

        this.type = 'center-ripple';
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

        const {
            now
        } = this.state;

        const styles = {
            [now]: {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }
        };

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}>
                {circles =>
                    <div className={this.getClassName()}>
                        {Object.keys(circles).map(key => {
                            let {opacity, scale} = circles[key];
                            opacity = Math.round(opacity * 100) / 100;
                            scale = opacity <= 0.01 ? this.props.scale : Math.round(scale * 100) / 100;
                            return (
                                <RippleCircle
                                    key={key}
                                    className={this.getPartClassName('circle')}
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

}

const PropTypes = React.PropTypes;

CenterRipple.defaultProps = {
    opacity: 0.5,
    scale: 2
};

CenterRipple.propTypes = {
    opacity: PropTypes.number,
    scale: PropTypes.number,
    flag: PropTypes.bool
};

module.exports = CenterRipple;
