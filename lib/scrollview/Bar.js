(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../common/util/dom', '../common/util/fn', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../common/util/dom'), require('../common/util/fn'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.dom, global.fn, global.babelHelpers);
        global.Bar = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _dom, _fn, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var dom = babelHelpers.interopRequireWildcard(_dom);
    /**
     * @file melon/ScrollViewBar
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('ScrollviewBar');

    var ScrollViewBar = function (_Component) {
        babelHelpers.inherits(ScrollViewBar, _Component);

        function ScrollViewBar(props) {
            babelHelpers.classCallCheck(this, ScrollViewBar);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.removeStateShow = (0, _fn.throttle)(_this.removeStateShow.bind(_this), 100);

            _this.onBarMouseDown = _this.onBarMouseDown.bind(_this);
            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onMouseUp = _this.onMouseUp.bind(_this);
            _this.onMouseMove = _this.onMouseMove.bind(_this);

            _this.state = {};

            return _this;
        }

        ScrollViewBar.prototype.componentDidMount = function componentDidMount() {
            this.positionThumb();
        };

        ScrollViewBar.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return Math.abs(nextProps.position - this.props.position) > 0.0005;
        };

        ScrollViewBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            if (Math.abs(nextProps.position - this.props.position) > 0.0005) {
                dom.addClass(this.refs.main, 'state-show');
                this.removeStateShow();
            }
        };

        ScrollViewBar.prototype.componentDidUpdate = function componentDidUpdate() {
            this.positionThumb();
        };

        ScrollViewBar.prototype.componentWillUnmount = function componentWillUnmount() {
            this.clearTimer();
        };

        ScrollViewBar.prototype.positionThumb = function positionThumb() {
            var _refs = this.refs,
                main = _refs.main,
                thumb = _refs.thumb;
            var _props = this.props,
                direction = _props.direction,
                position = _props.position,
                thumbSize = _props.thumbSize;


            var isVertical = direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';
            this.barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
            thumb.style[isVertical ? 'height' : 'width'] = thumbSize + 'px';
            thumb.style[axis] = Math.round(position * this.barSize) + 'px';
        };

        ScrollViewBar.prototype.getMousePosition = function getMousePosition(e, isVertical) {
            if (isVertical) {
                return e.pageY || e.clientY;
            }
            return e.pageX || e.clientX;
        };

        ScrollViewBar.prototype.clearTimer = function clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                this.removeStateShow.cancel();
            }
        };

        ScrollViewBar.prototype.removeStateShow = function removeStateShow() {
            var _this2 = this;

            this.clearTimer();
            this.timer = setTimeout(function () {
                dom.removeClass(_this2.refs.main, 'state-show');
            }, 1800);
        };

        ScrollViewBar.prototype.onBarMouseDown = function onBarMouseDown(e) {
            var target = e.target;

            if (target === this.refs.thumb) {
                return;
            }

            var _props2 = this.props,
                direction = _props2.direction,
                thumbSize = _props2.thumbSize;


            var main = this.refs.main;

            var me = this;
            var isVertical = direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';

            var barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
            var mousePos = this.getMousePosition(e, isVertical) - dom.getPosition(main)[axis];

            var pos = mousePos - thumbSize / 2;

            pos = pos > barSize ? barSize : pos;
            pos = pos < 0 ? 0 : pos;
            me.fireAction('change', pos / barSize);

            e.preventDefault();
        };

        ScrollViewBar.prototype.onMouseDown = function onMouseDown(e) {
            var body = document.body;
            dom.addClass(body, 'ui-noselect');

            var isVertical = this.props.direction === 'vertical';
            var axis = isVertical ? 'top' : 'left';

            this.thumbStart = parseInt(this.refs.thumb.style[axis], 10) || 0;
            this.moveStart = this.getMousePosition(e, isVertical);

            body.addEventListener('mousemove', this.onMouseMove);
            body.addEventListener('mouseup', this.onMouseUp);

            e.preventDefault();
        };

        ScrollViewBar.prototype.onMouseMove = function onMouseMove(e) {
            e = e || window.event;
            var isVertical = this.props.direction === 'vertical';

            var moveLength = this.getMousePosition(e, isVertical);
            moveLength -= this.moveStart;

            var pos = Math.min(this.barSize, Math.max(0, this.thumbStart + moveLength));
            this.fireAction('change', pos / this.barSize);
        };

        ScrollViewBar.prototype.onMouseUp = function onMouseUp(e) {
            var body = document.body;
            dom.removeClass(body, 'ui-noselect');
            body.removeEventListener('mousemove', this.onMouseMove);
            body.removeEventListener('mouseup', this.onMouseUp);
            this.thumbStart = this.moveStart = 0;
        };

        ScrollViewBar.prototype.fireAction = function fireAction(action, pos) {
            var e = {
                action: action,
                position: pos,
                target: this
            };

            var onAction = this.props.onAction;

            onAction && onAction(e);
        };

        ScrollViewBar.prototype.render = function render() {

            return _react2['default'].createElement(
                'div',
                {
                    ref: 'main',
                    className: cx(this.props).addVariants(this.props.direction).build(),
                    onMouseDown: this.onBarMouseDown },
                _react2['default'].createElement('div', {
                    ref: 'thumb',
                    className: cx.getPartClassName('thumb'),
                    onMouseDown: this.onMouseDown })
            );
        };

        return ScrollViewBar;
    }(_react.Component);

    exports['default'] = ScrollViewBar;


    ScrollViewBar.displayName = 'ScrollViewBar';

    ScrollViewBar.propTypes = {
        direction: _propTypes2['default'].oneOf(['vertical', 'horizontal']).isRequired,
        position: _propTypes2['default'].number.isRequired,
        thumbSize: _propTypes2['default'].number,
        show: _propTypes2['default'].bool,
        onAction: _propTypes2['default'].func
    };
});
//# sourceMappingURL=Bar.js.map
