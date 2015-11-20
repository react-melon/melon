/**
 * @file esui-react/TouchRipple
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Component = require('../Component');
const RippleCircle = require('./RippleCircle');

const {
    spring,
    TransitionMotion
} = require('react-motion');

const dom = require('../common/util/dom');

class TouchRipple extends Component {

    static displayName = 'TouchRipple';

    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.state = {
            now: 't' + 0,
            center: [0, 0]
        };

        this.type = 'touch-ripple';
    }

    onMouseDown({pageX, pageY}) {

        const {
            top,
            left
        } = this.position;

        this.setState({
            center: [pageX - left - this.radius, pageY - top - this.radius],
            now: 't' + Date.now()
        });
    }

    componentDidMount() {
        this.updatePosition();
    }

    componentDidUpdate() {
        this.updatePosition();
    }

    componentWillUnmount() {
        this.position = null;
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

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={styles}>
                {circles =>
                    <div
                        onMouseDown={this.onMouseDown}
                        className={this.getClassName()}>
                        {Object.keys(circles).map(key => {
                            let {opacity, scale} = circles[key];
                            opacity = Math.round(opacity * 100) / 100;
                            scale = opacity <= 0.01 ? 2 : Math.round(scale * 100) / 100;
                            return (
                                <RippleCircle
                                    key={key}
                                    className={this.getPartClassName('circle')}
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

const PropTypes = React.PropTypes;

TouchRipple.defaultProps = {
    opacity: 0.3
};

TouchRipple.propTypes = {
    opacity: PropTypes.number
};

module.exports = TouchRipple;
