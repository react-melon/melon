/**
 * @file esui-react/CenterRipple
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const Component = require('../Component');

const {
    spring,
    TransitionMotion
} = require('react-motion');

class CenterRipple extends Component {

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
            opacity: spring(0, [80, 15]),
            scale: spring(this.props.scale, [80, 15])
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
                            const {opacity, scale} = circles[key];
                            return (
                                <div
                                    key={key}
                                    className={this.getPartClassName('circle')}
                                    style={{
                                        opacity: opacity,
                                        transform: `scale(${scale})`,
                                        WebkitTransform: `scale(${scale})`
                                    }} />
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
