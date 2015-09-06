/**
 * @file esui-react/Progress
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var cx    = require('./common/util/classname');
var _     = require('underscore');

var SIZES = {
    'xs': 0.75,
    's': 0.875,
    'm': 0.9375,
    'l': 1.125,
    'xl': 1.25,
    'xxl': 1.375,
    'xxxl': 1.5,
    'xxxl': 2.25
};

var Progress = React.createClass({

    statics: {
        type: 'Progress'
    },

    propTypes: {
        shape: React.PropTypes.oneOf(['circle', 'linear']),
        mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
        value: React.PropTypes.number,
        min:  React.PropTypes.number,
        max:  React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            shape: 'linear',
            mode: 'determinate',
            value: 0,
            min: 0,
            max: 100,
        };
    },

    barUpdate: function (step, barElement, stepValues) {

        step = step || 0;
        step %= 4;

        if (!this.isMounted()){
            return;
        }

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

    },

    scalePath: function (path, step) {
        step = step || 0;
        step %= 3;

        setTimeout(this.scalePath.bind(this, path, step + 1), step ? 750 : 250);

        if (!this.isMounted()){
            return;
        }

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
    },

    rotateWrapper: function (wrapper) {

        setTimeout(this.rotateWrapper.bind(this, wrapper), 10050);

        if (!this.isMounted()){
            return;
        }

        wrapper.style.transitionDuration = '0ms';
        wrapper.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            wrapper.style.transitionDuration = '10s';
            wrapper.style.transform = 'rotate(1800deg)';
            wrapper.style.transitionTimingFunction = 'linear';
        }, 50);
    },

    componentDidMount: function () {

        if (this.isDeterminate()) {
            return;
        }

        var isCircle = this.props.shape.toLowerCase() === 'circle';

        if (isCircle) {

            var wrapper = React.findDOMNode(this.refs.wrapper);
            var path = React.findDOMNode(this.refs.path);

            this.scalePath(path);
            this.rotateWrapper(wrapper);
        }
        else {
            var bar1 = React.findDOMNode(this.refs.bar1);
            var bar2 = React.findDOMNode(this.refs.bar2);

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
    },

    getRelativeValue: function () {
        var value = this.props.value;
        var min = this.props.min;
        var max = this.props.max;

        var clampedValue = Math.min(Math.max(min, value), max);
        var rangeValue = max - min;
        var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
        return relValue * 100;
    },

    isDeterminate: function () {
        return this.props.mode.toLowerCase() === 'determinate';
    },

    renderLinear: function () {

        var className;
        var children;
        var style;

        if (this.isDeterminate()) {
            className = cx.createPrimaryClass('progress-determinate-bar');
            style = {
                width: this.getRelativeValue() + '%'
            };
        }
        else {
            className = cx.createPrimaryClass('progress-indeterminate-bar');
            children = ([
                <div ref="bar1" className={cx.createPrimaryClass('progress-bar1')} key="bar1" />,
                <div ref="bar2" className={cx.createPrimaryClass('progress-bar2')} key="bar2" />
            ]);
        }

        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    },

    renderCircle: function () {
        var zoom = SIZES[this.props.size] || 1;
        var svgStyle={
            transform: 'scale(' + zoom + ')'
        };

        var pathStyle = {};

        if (this.isDeterminate()) {
            var relVal = this.getRelativeValue();
            pathStyle.strokeDasharray = Math.round(relVal * 1.25) + ',200';
        }

        return (
            <div ref="wrapper" className={cx.createPrimaryClass('progress-wapper')}>
                <svg className={cx.createPrimaryClass('progress-svg')} style={svgStyle}>
                    <circle ref="path" cx="25" cy="25" className={cx.createPrimaryClass('progress-path')}
                        style={pathStyle} r="20" fill="none" strokeWidth="2.5" strokeMiterlimit="10" />
                </svg>
            </div>
        );
    },

    render: function() {

        var props = this.props;

        var isCircle = props.shape.toLowerCase() === 'circle';
        var shape = isCircle ? 'circle' : 'linear';

        var variants = props.variants || [];

        variants.push(props.mode);

        var classNames = props.className + ' ' + cx.createComponentClass('progress-' + shape, variants);

        return (
            <div {...props} className={classNames}>
                {isCircle ? this.renderCircle() : this.renderLinear()}
            </div>
        );

    }

});

module.exports = require('./common/util/createControl')(Progress);
