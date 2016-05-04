/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './scrollview/Bar', './common/util/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./scrollview/Bar'), require('./common/util/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Bar, global.cxBuilder, global.babelHelpers);
        global.ScrollView = mod.exports;
    }
})(this, function (exports, _react, _Bar, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Bar2 = babelHelpers.interopRequireDefault(_Bar);

    /**
     * @file melon/ScrollView
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('scrollview');

    var DIRECTIONS = {
        vertical: 'deltaY',
        horizontal: 'deltaX'
    };

    var SIZES = {
        vertical: 'offsetHeight',
        horizontal: 'offsetWidth'
    };

    var ScrollView = function (_Component) {
        babelHelpers.inherits(ScrollView, _Component);

        function ScrollView(props) {
            babelHelpers.classCallCheck(this, ScrollView);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.thumbSize = {
                vertical: 0,
                horizontal: 0
            };

            _this.timer = null;

            _this.onWheel = _this.onWheel.bind(_this);

            _this.state = {
                position: {
                    vertical: 0,
                    horizontal: 0
                }
            };

            return _this;
        }

        ScrollView.prototype.componentDidMount = function componentDidMount() {
            this.updateContentSize();
            this.setState({
                position: {
                    vertical: 0,
                    horizontal: 0
                }
            });
        };

        ScrollView.prototype.componentDidUpdate = function componentDidUpdate() {
            this.updateContentSize();
        };

        ScrollView.prototype.updateContentSize = function updateContentSize() {
            var _this2 = this;

            var _refs = this.refs;
            var main = _refs.main;
            var content = _refs.content;
            var position = this.state.position;


            this.getDirections().forEach(function (key) {
                var contentSize = content[SIZES[key]];
                var mainSize = main[SIZES[key]];
                _this2.thumbSize[key] = mainSize === contentSize ? 0 : Math.round(mainSize * mainSize / contentSize);

                var top = Math.round(position[key] * contentSize * (1 - mainSize / contentSize));
                content.style[key === 'vertical' ? 'top' : 'left'] = -top + 'px';
            });
        };

        ScrollView.prototype.onAction = function onAction(direction, e) {
            var action = e.action;
            var position = e.position;


            switch (action) {
                case 'change':
                    var pos = {};
                    pos[direction] = position;
                    this.setScrollPercent(pos);
                    break;
            }
        };

        ScrollView.prototype.onWheel = function onWheel(e) {

            var directions = this.getDirections();

            var wheelSpeed = this.props.wheelSpeed;


            var current = this.state.position;

            directions.forEach(function (name) {

                current[name] += e[DIRECTIONS[name]] * wheelSpeed;

                var percent = current[name];

                if (percent >= 0.005 && percent <= 0.995) {
                    e.preventDefault();
                }
            });

            this.setScrollPercent(current);

            if (directions.length === 2) {
                e.preventDefault();
            }
        };

        ScrollView.prototype.setScrollPercent = function setScrollPercent(percent) {

            var position = this.state.position;

            Object.keys(percent).forEach(function (key) {

                var pos = percent[key];

                if (pos < 0.005) {
                    pos = 0;
                } else if (1 - pos < 0.005) {
                    pos = 1;
                }

                position[key] = pos;
            });

            this.setState({ position: position }, function () {
                var onScroll = this.props.onScroll;
                onScroll && onScroll({
                    position: position,
                    target: this
                });
            });
        };

        ScrollView.prototype.getDirections = function getDirections() {
            var direction = this.props.direction;

            var directions = direction === 'both' ? Object.keys(DIRECTIONS) : [direction];
            return directions;
        };

        ScrollView.prototype.renderScrollBar = function renderScrollBar() {
            var _this3 = this;

            var directions = this.getDirections();

            var position = this.state.position;


            return directions.map(function (dir, index) {

                var size = _this3.thumbSize[dir];

                if (!size) {
                    return;
                }

                return _react2['default'].createElement(_Bar2['default'], {
                    key: dir,
                    thumbSize: size,
                    onAction: _this3.onAction.bind(_this3, dir),
                    position: position[dir],
                    direction: dir });
            });
        };

        ScrollView.prototype.render = function render() {
            var _props = this.props;
            var children = _props.children;
            var others = _props.others;
            var height = _props.height;
            var width = _props.width;


            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, {
                    className: cx(this.props).addVariants(this.getDirections()).build(),
                    style: { height: height, width: width },
                    onWheel: this.onWheel,
                    ref: 'main' }),
                this.renderScrollBar(),
                _react2['default'].createElement(
                    'div',
                    { ref: 'content', className: cx().part('main').build() },
                    children
                )
            );
        };

        return ScrollView;
    }(_react.Component);

    exports['default'] = ScrollView;


    ScrollView.displayName = 'ScrollView';

    ScrollView.propTypes = {
        direction: _react.PropTypes.oneOf(['vertical', 'horizontal', 'both']),
        wheelSpeed: _react.PropTypes.number,
        onScroll: _react.PropTypes.func
    };

    ScrollView.defaultProps = {
        direction: 'vertical',
        wheelSpeed: 0.005
    };
});