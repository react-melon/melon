/**
 * @file esui-react/RippleCircle
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

class RippleCircle extends React.Component {

    static displayName = 'RippleCircle';

    shouldComponentUpdate(nextProps) {

        let {
            opacity,
            scale
        } = this.props;

        return opacity !== nextProps.opacity || scale !== nextProps.scale;
    }

    render() {

        let {
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

const {PropTypes} = React;

RippleCircle.defaultProps = {
    opacity: 0.3,
    scale: 2
};

RippleCircle.propTypes = {
    opacity: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};

module.exports = RippleCircle;
