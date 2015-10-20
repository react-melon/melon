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

        this.type = 'center-ripple';
    }

    animate() {
        this.setState({
            now: 't' + Date.now()
        });
    }

    willLeave(key, valOfKey) {
        return {
            ...valOfKey,
            opacity: spring(0, [80, 15]),
            scale: spring(2, [80, 15])
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
                    <div
                        onMouseDown={this.onMouseDown}
                        className={this.getClassName()}>
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
    now: 0
};

CenterRipple.propTypes = {
    opacity: PropTypes.number,
    now: PropTypes.number
};

module.exports = CenterRipple;
