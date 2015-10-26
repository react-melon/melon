define('melon/Progress', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Progress = function (_Component) {
        babelHelpers.inherits(Progress, _Component);
        babelHelpers.createClass(Progress, null, [{
                key: 'displayName',
                value: 'Progress',
                enumerable: true
            }]);
        function Progress(props) {
            babelHelpers.classCallCheck(this, Progress);
            babelHelpers.get(Object.getPrototypeOf(Progress.prototype), 'constructor', this).call(this, props);
            this.timers = {};
        }
        babelHelpers.createClass(Progress, [
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(Progress.prototype), 'getVariants', this).call(this, props) || [];
                    var shape = props.shape;
                    var mode = props.mode;
                    variants.push(shape);
                    variants.push(mode);
                    return variants;
                }
            },
            {
                key: 'barUpdate',
                value: function barUpdate(step, barName, stepValues) {
                    step = step || 0;
                    step %= 4;
                    var element = this.refs[barName];
                    switch (step) {
                    case 0:
                        element.style.left = stepValues[0][0] + '%';
                        element.style.right = stepValues[0][1] + '%';
                        break;
                    case 1:
                        element.style.transitionDuration = '840ms';
                        break;
                    case 2:
                        element.style.left = stepValues[1][0] + '%';
                        element.style.right = stepValues[1][1] + '%';
                        break;
                    case 3:
                        element.style.transitionDuration = '0ms';
                        break;
                    }
                    this.timers[barName] = setTimeout(this.barUpdate.bind(this, step + 1, barName, stepValues), 420);
                }
            },
            {
                key: 'scalePath',
                value: function scalePath(path, step) {
                    step = step || 0;
                    step %= 3;
                    this.timers.path = setTimeout(this.scalePath.bind(this, path, step + 1), step ? 750 : 250);
                    if (step === 0) {
                        path.style.strokeDasharray = '1, 200';
                        path.style.strokeDashoffset = 0;
                        path.style.transitionDuration = '0ms';
                        return;
                    }
                    if (step === 1) {
                        path.style.strokeDasharray = '89, 200';
                        path.style.strokeDashoffset = -35;
                        path.style.transitionDuration = '750ms';
                        return;
                    }
                    path.style.strokeDasharray = '89, 200';
                    path.style.strokeDashoffset = -124;
                    path.style.transitionDuration = '850ms';
                }
            },
            {
                key: 'rotateWrapper',
                value: function rotateWrapper(wrapper) {
                    this.timers.wrapper = setTimeout(this.rotateWrapper.bind(this, wrapper), 10050);
                    wrapper.style.transitionDuration = '0ms';
                    wrapper.style.transform = 'rotate(0deg)';
                    this.timers.wrapperUpdater = setTimeout(function () {
                        wrapper.style.transitionDuration = '10s';
                        wrapper.style.transform = 'rotate(1800deg)';
                        wrapper.style.transitionTimingFunction = 'linear';
                    }, 50);
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this = this;
                    if (this.isDeterminate()) {
                        return;
                    }
                    var isCircle = this.props.shape.toLowerCase() === 'circle';
                    if (isCircle) {
                        this.scalePath(this.refs.path);
                        this.rotateWrapper(this.refs.wrapper);
                        return;
                    }
                    this.barUpdate(0, 'bar1', [
                        [
                            -35,
                            100
                        ],
                        [
                            100,
                            -90
                        ]
                    ]);
                    this.timers.bar2 = setTimeout(function () {
                        _this.barUpdate(0, 'bar2', [
                            [
                                -200,
                                100
                            ],
                            [
                                107,
                                -8
                            ]
                        ]);
                    }, 850);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var _this2 = this;
                    Object.keys(this.timers).forEach(function (name) {
                        clearTimeout(_this2.timers[name]);
                        _this2.timers[name] = null;
                    });
                    this.timers = {};
                }
            },
            {
                key: 'getRelativeValue',
                value: function getRelativeValue() {
                    var value = this.props.value;
                    var min = this.props.min;
                    var max = this.props.max;
                    var clampedValue = Math.min(Math.max(min, value), max);
                    var rangeValue = max - min;
                    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
                    return relValue * 100;
                }
            },
            {
                key: 'isDeterminate',
                value: function isDeterminate() {
                    return this.props.mode.toLowerCase() === 'determinate';
                }
            },
            {
                key: 'renderLinear',
                value: function renderLinear() {
                    var children;
                    var style;
                    if (this.isDeterminate()) {
                        style = { width: this.getRelativeValue() + '%' };
                    } else {
                        children = [
                            React.createElement('div', {
                                ref: 'bar1',
                                className: this.getPartClassName('bar1'),
                                key: 'bar1'
                            }),
                            React.createElement('div', {
                                ref: 'bar2',
                                className: this.getPartClassName('bar2'),
                                key: 'bar2'
                            })
                        ];
                    }
                    return React.createElement('div', {
                        className: this.getPartClassName('bar'),
                        style: style
                    }, children);
                }
            },
            {
                key: 'getZoom',
                value: function getZoom() {
                    return Progress.SIZES[this.props.size] || 1;
                }
            },
            {
                key: 'renderCircle',
                value: function renderCircle() {
                    var zoom = this.getZoom();
                    var r = 14 * zoom;
                    var strokeWidth = 2 * zoom;
                    var c = 16 * zoom;
                    var pathStyle = {};
                    if (this.isDeterminate()) {
                        var relVal = this.getRelativeValue();
                        pathStyle.strokeDasharray = Math.round(relVal * 1.25 * zoom) + ',' + 200 * zoom;
                    }
                    return React.createElement('div', {
                        ref: 'wrapper',
                        className: this.getPartClassName('wapper')
                    }, React.createElement('svg', { className: this.getPartClassName('svg') }, React.createElement('circle', {
                        ref: 'path',
                        cx: c,
                        cy: c,
                        r: r,
                        className: this.getPartClassName('path'),
                        style: pathStyle,
                        fill: 'none',
                        strokeWidth: strokeWidth,
                        strokeMiterlimit: '10'
                    })));
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var shape = props.shape.toLowerCase();
                    var isCircle = shape === 'circle';
                    return React.createElement('div', babelHelpers._extends({}, props, { className: this.getClassName() }), isCircle ? this.renderCircle() : this.renderLinear());
                }
            }
        ]);
        return Progress;
    }(Component);
    Progress.SIZES = {
        xxs: 0.75,
        xs: 0.875,
        s: 0.9375,
        l: 1.125,
        xl: 1.25,
        xxl: 1.375,
        xxxl: 1.5
    };
    Progress.defaultProps = {
        shape: 'linear',
        mode: 'determinate',
        value: 0,
        min: 0,
        max: 100
    };
    Progress.propTypes = {
        shape: React.PropTypes.oneOf([
            'circle',
            'linear'
        ]),
        mode: React.PropTypes.oneOf([
            'determinate',
            'indeterminate'
        ]),
        value: React.PropTypes.number,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        size: React.PropTypes.oneOf(Object.keys(Progress.SIZES))
    };
    module.exports = Progress;
});