/**
 * @file esui-react/Progress
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var Component = require('./Component.jsx');

var _     = require('underscore');


class Progress extends Component {

    constructor(props) {
        super(props);
    }

    getVariants(props) {

        let variants = super.getVariants(props) || [];

        let {
            shape,
            mode
        } = props;

        variants.push(shape);
        variants.push(mode);

        return variants;
    }

    getStates(props) {
        // no states
        return null;
    }

    barUpdate(step, barElement, stepValues) {

        step = step || 0;
        step %= 4;

        // if (!this.isMounted()){
        //     return;
        // }

        var timerID = setTimeout(this.barUpdate.bind(this, step + 1, barElement, stepValues), 420);

        if (step === 0) {
            barElement.style.left = stepValues[0][0] + '%';
            barElement.style.right = stepValues[0][1] + '%';
        }
        else if (step === 1) {
            barElement.style.transitionDuration = '840ms';
        }
        else if (step === 2) {
            barElement.style.left = stepValues[1][0] + '%';
            barElement.style.right = stepValues[1][1] + '%';
        }
        else if (step === 3) {
            barElement.style.transitionDuration = '0ms';
        }

    }

    scalePath(path, step) {
        step = step || 0;
        step %= 3;

        setTimeout(this.scalePath.bind(this, path, step + 1), step ? 750 : 250);

        // if (!this.isMounted()){
        //     return;
        // }

        if (step === 0) {
            path.style.strokeDasharray = '1, 200';
            path.style.strokeDashoffset = 0;
            path.style.transitionDuration = '0ms';
        }
        else if (step === 1) {
            path.style.strokeDasharray = '89, 200';
            path.style.strokeDashoffset = -35;
            path.style.transitionDuration = '750ms';
        }
        else {
            path.style.strokeDasharray = '89,200';
            path.style.strokeDashoffset = -124;
            path.style.transitionDuration = '850ms';
        }
    }

    rotateWrapper(wrapper) {

        setTimeout(this.rotateWrapper.bind(this, wrapper), 10050);

        // if (!this.isMounted()){
        //     return;
        // }

        wrapper.style.transitionDuration = '0ms';
        wrapper.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            wrapper.style.transitionDuration = '10s';
            wrapper.style.transform = 'rotate(1800deg)';
            wrapper.style.transitionTimingFunction = 'linear';
        }, 50);
    }

    componentDidMount() {

        if (this.isDeterminate()) {
            return;
        }

        var isCircle = this.props.shape.toLowerCase() === 'circle';

        if (isCircle) {

            this.scalePath(this.refs.path);
            this.rotateWrapper(this.refs.wrapper);
        }
        else {
            var bar1 = this.refs.bar1;
            var bar2 = this.refs.bar2;

            this.barUpdate(0, bar1, [
                [-35, 100],
                [100, -90],
            ]);

            setTimeout(() => {
                this.barUpdate(0, bar2, [
                    [-200, 100],
                    [107, -8],
                ]);
            }, 850);
        }
    }

    getRelativeValue() {
        var value = this.props.value;
        var min = this.props.min;
        var max = this.props.max;

        var clampedValue = Math.min(Math.max(min, value), max);
        var rangeValue = max - min;
        var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
        return relValue * 100;
    }

    isDeterminate() {
        return this.props.mode.toLowerCase() === 'determinate';
    }

    renderLinear() {

        var className;
        var children;
        var style;

        if (this.isDeterminate()) {
            style = {
                width: this.getRelativeValue() + '%'
            };
        }
        else {
            children = ([
                <div ref="bar1" className={this.getPartClassName('bar1')} key="bar1" />,
                <div ref="bar2" className={this.getPartClassName('bar2')} key="bar2" />
            ]);
        }

        return (
            <div className={this.getPartClassName('bar')} style={style}>
                {children}
            </div>
        );
    }

    renderCircle() {
        var zoom = Progress.SIZES[this.props.size] || 1;
        var svgStyle={
            transform: 'scale(' + zoom + ')'
        };

        var pathStyle = {};

        if (this.isDeterminate()) {
            var relVal = this.getRelativeValue();
            pathStyle.strokeDasharray = Math.round(relVal * 1.25) + ',200';
        }

        return (
            <div ref="wrapper" className={this.getPartClassName('wapper')}>
                <svg className={this.getPartClassName('svg')} style={svgStyle}>
                    <circle ref="path" cx="25" cy="25" className={this.getPartClassName('path')}
                        style={pathStyle} r="20" fill="none" strokeWidth="2.5" strokeMiterlimit="10" />
                </svg>
            </div>
        );
    }

    render() {

        var props = this.props;

        var shape = props.shape.toLowerCase();
        var isCircle = shape === 'circle';

        return (
            <div {...props} className={this.getClassName()}>
                {isCircle ? this.renderCircle() : this.renderLinear()}
            </div>
        );

    }

}

Progress.SIZES = {
    'xs': 0.75,
    's': 0.875,
    'm': 0.9375,
    'l': 1.125,
    'xl': 1.25,
    'xxl': 1.375,
    'xxxl': 1.5,
    'xxxl': 2.25
};

Progress.defaultProps = {
    shape: 'linear',
    mode: 'determinate',
    value: 0,
    min: 0,
    max: 100
};

Progress.propTypes = {
    shape: React.PropTypes.oneOf(['circle', 'linear']),
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    value: React.PropTypes.number,
    min:  React.PropTypes.number,
    max:  React.PropTypes.number
};

module.exports = Progress;
