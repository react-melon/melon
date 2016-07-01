/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Progress = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/Progress
     * @author cxtom<cxtom2010@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Progress');

    var Progress = function (_Component) {
        babelHelpers.inherits(Progress, _Component);

        function Progress(props) {
            babelHelpers.classCallCheck(this, Progress);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.timers = {};
            return _this;
        }

        Progress.prototype.componentDidMount = function componentDidMount() {
            var _this2 = this;

            if (this.isDeterminate()) {
                return;
            }

            var isCircle = this.props.shape.toLowerCase() === 'circle';

            if (isCircle) {
                this.scalePath(this.refs.path);
                this.rotateWrapper(this.refs.wrapper);
                return;
            }

            this.barUpdate(0, 'bar1', [[-35, 100], [100, -90]]);

            this.timers.bar2 = setTimeout(function () {
                _this2.barUpdate(0, 'bar2', [[-200, 100], [107, -8]]);
            }, 850);
        };

        Progress.prototype.componentWillUnmount = function componentWillUnmount() {
            var _this3 = this;

            Object.keys(this.timers).forEach(function (name) {
                clearTimeout(_this3.timers[name]);
                _this3.timers[name] = null;
            });

            this.timers = {};
        };

        Progress.prototype.barUpdate = function barUpdate(step, barName, stepValues) {

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
        };

        Progress.prototype.scalePath = function scalePath(path, step) {

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
        };

        Progress.prototype.rotateWrapper = function rotateWrapper(wrapper) {

            this.timers.wrapper = setTimeout(this.rotateWrapper.bind(this, wrapper), 10050);

            wrapper.style.transitionDuration = '0ms';
            wrapper.style.transform = 'rotate(0deg)';

            this.timers.wrapperUpdater = setTimeout(function () {
                wrapper.style.transitionDuration = '10s';
                wrapper.style.transform = 'rotate(1800deg)';
                wrapper.style.transitionTimingFunction = 'linear';
            }, 50);
        };

        Progress.prototype.getRelativeValue = function getRelativeValue() {
            var _props = this.props;
            var value = _props.value;
            var min = _props.min;
            var max = _props.max;


            var clampedValue = Math.min(Math.max(min, value), max);
            var rangeValue = max - min;
            var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;

            return relValue * 100;
        };

        Progress.prototype.isDeterminate = function isDeterminate() {
            return this.props.mode.toLowerCase() === 'determinate';
        };

        Progress.prototype.renderLinear = function renderLinear() {

            var children = void 0;
            var style = void 0;

            if (this.isDeterminate()) {
                style = {
                    width: this.getRelativeValue() + '%'
                };
            } else {
                children = [_react2['default'].createElement('div', { ref: 'bar1', className: cx().part('bar1').build(), key: 'bar1' }), _react2['default'].createElement('div', { ref: 'bar2', className: cx().part('bar2').build(), key: 'bar2' })];
            }

            return _react2['default'].createElement(
                'div',
                { className: cx().part('bar').build(), style: style },
                children
            );
        };

        Progress.prototype.getZoom = function getZoom() {
            return Progress.SIZES[this.props.size] || 1;
        };

        Progress.prototype.renderCircle = function renderCircle() {
            var zoom = this.getZoom();
            var r = 14 * zoom;
            var strokeWidth = 2 * zoom;
            var c = 16 * zoom;

            var pathStyle = {};

            if (this.isDeterminate()) {
                var relVal = this.getRelativeValue();
                pathStyle.strokeDasharray = Math.round(relVal * 1.25 * zoom) + ',' + 200 * zoom;
            }

            return _react2['default'].createElement(
                'div',
                { ref: 'wrapper', className: cx().part('wapper').build() },
                _react2['default'].createElement(
                    'svg',
                    { className: cx().part('svg').build() },
                    _react2['default'].createElement('circle', { ref: 'path',
                        cx: c,
                        cy: c,
                        r: r,
                        className: cx().part('path').build(),
                        style: pathStyle,
                        fill: 'none',
                        strokeWidth: strokeWidth,
                        strokeMiterlimit: '10' })
                )
            );
        };

        Progress.prototype.render = function render() {
            var props = this.props;
            var shape = props.shape;
            var mode = props.mode;


            var className = cx(props).addVariants(shape, mode).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, props, { className: className }),
                shape === 'circle' ? this.renderCircle() : this.renderLinear()
            );
        };

        return Progress;
    }(_react.Component);

    exports['default'] = Progress;


    Progress.displayName = 'Progress';

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
        shape: _react.PropTypes.oneOf(['circle', 'linear']),
        mode: _react.PropTypes.oneOf(['determinate', 'indeterminate']),
        value: _react.PropTypes.number,
        min: _react.PropTypes.number,
        max: _react.PropTypes.number,
        size: _react.PropTypes.oneOf(Object.keys(Progress.SIZES))
    };
});