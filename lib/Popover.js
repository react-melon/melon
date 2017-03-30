(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Layer', 'dom-align', 'react-motion', './common/util/fn', './common/util/dom', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Layer'), require('dom-align'), require('react-motion'), require('./common/util/fn'), require('./common/util/dom'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Layer, global.domAlign, global.reactMotion, global.fn, global.dom, global.cxBuilder, global.babelHelpers);
        global.Popover = mod.exports;
    }
})(this, function (exports, _react, _Layer, _domAlign, _reactMotion, _fn, _dom, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.alignments = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Layer2 = babelHelpers.interopRequireDefault(_Layer);

    var _domAlign2 = babelHelpers.interopRequireDefault(_domAlign);

    /**
     * @file Popover
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Popover');

    var ALIGNMENT_TRANSFORM_ORIGIN_MAP = {
        t: 'top',
        l: 'left',
        b: 'bottom',
        r: 'right',
        c: '50%'
    };

    var Popover = function (_Component) {
        babelHelpers.inherits(Popover, _Component);

        function Popover(props, context) {
            babelHelpers.classCallCheck(this, Popover);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.onWindowResizeOrScroll = (0, _fn.throttle)(_this.onWindowResizeOrScroll.bind(_this), 300, {
                leading: true,
                trailing: true
            });

            _this.onMotionEnd = _this.onMotionEnd.bind(_this);
            _this.renderLayer = _this.renderLayer.bind(_this);

            _this.setLayer = _this.setRef.bind(_this, 'layer');

            _this.state = {
                closing: false,
                open: props.open
            };

            return _this;
        }

        Popover.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var open = nextProps.open,
                closeDelay = nextProps.closeDelay;

            var closing = this.state.closing;

            // 从展开状态到关闭: 切换到关闭中
            if (this.state.open !== open) {

                if (!open && closeDelay != null) {
                    this.closeTimer = setTimeout(function () {
                        return _this2.setState({
                            open: open,
                            closing: !open && !closing
                        });
                    }, closeDelay);
                    return;
                }

                this.setState({
                    open: open,
                    closing: !open && !closing
                });
            }

            // 如果正在延迟收起，又转为展开状态，就把 delayTimer 去掉
            if (open && this.closeTimer) {
                clearTimeout(this.closeTimer);
                this.closeTimer = null;
            }
        };

        Popover.prototype.componentDidUpdate = function componentDidUpdate() {
            var _props = this.props,
                anchor = _props.anchor,
                autoWidth = _props.autoWidth,
                maxHeight = _props.maxHeight;


            var open = this.state.open;

            var layer = this.layer;

            if (open && anchor && layer) {

                this.alignLayerToAnchor(layer, anchor);

                if (maxHeight != null) {
                    layer.style.maxHeight = maxHeight + 'px';
                    layer.style.overflowY = 'auto';
                } else {
                    layer.style.overflowY = layer.style.maxHeight = '';
                }

                if (!autoWidth) {
                    this.adjustWidth(layer, anchor);
                }

                this.bindToWindowResizeAndScroll();
                return;
            }

            this.unbindToWindowResizeAndScroll();
        };

        Popover.prototype.componentWillUnmount = function componentWillUnmount() {

            if (this.delayTimer) {
                clearTimeout(this.delayTimer);
                this.delayTimer = null;
            }

            this.unbindToWindowResizeAndScroll();
        };

        Popover.prototype.onWindowResizeOrScroll = function onWindowResizeOrScroll() {
            var _props2 = this.props,
                anchor = _props2.anchor,
                onRequestClose = _props2.onRequestClose;


            var layer = this.layer;

            if (!this.state.open || !layer || !anchor) {
                return;
            }

            var _anchor$getBoundingCl = anchor.getBoundingClientRect(),
                bottom = _anchor$getBoundingCl.bottom,
                top = _anchor$getBoundingCl.top,
                left = _anchor$getBoundingCl.left,
                right = _anchor$getBoundingCl.right;

            var windowHeight = (0, _dom.getClientHeight)();
            var windowWidth = (0, _dom.getClientWidth)();

            // 在视野内
            if (top > 0 && bottom < windowHeight && left > 0 && right < windowWidth) {

                this.alignLayerToAnchor(layer, anchor);
                return;
            }

            onRequestClose && onRequestClose();
        };

        Popover.prototype.onMotionEnd = function onMotionEnd() {

            if (!this.state.closing) {
                return;
            }

            this.setState({
                closing: false
            });
        };

        Popover.prototype.bindToWindowResizeAndScroll = function bindToWindowResizeAndScroll() {
            window.addEventListener('resize', this.onWindowResizeOrScroll);
            window.addEventListener('scroll', this.onWindowResizeOrScroll);
        };

        Popover.prototype.unbindToWindowResizeAndScroll = function unbindToWindowResizeAndScroll() {
            window.removeEventListener('resize', this.onWindowResizeOrScroll);
            window.removeEventListener('scroll', this.onWindowResizeOrScroll);
        };

        Popover.prototype.alignLayerToAnchor = function alignLayerToAnchor(layer, anchor) {
            var _props3 = this.props,
                anchorAlignment = _props3.anchorAlignment,
                layerAlignment = _props3.layerAlignment,
                anchorOffset = _props3.anchorOffset,
                layerOffset = _props3.layerOffset;


            var transform = layer.style.transform;

            layer.style.transform = '';

            (0, _domAlign2['default'])(layer, anchor, {
                points: [anchorAlignment, layerAlignment],
                overflow: {
                    adjustX: true,
                    adjustY: true
                },
                offset: layerOffset,
                anchorOffset: anchorOffset
            });

            layer.style.transform = transform;
        };

        Popover.prototype.adjustWidth = function adjustWidth(layer, anchor) {

            var layerOffsetWidth = layer.offsetWidth;
            var anchorOffsetWidth = anchor.offsetWidth;

            if (layerOffsetWidth < anchorOffsetWidth) {
                layer.style.width = anchorOffsetWidth + 'px';
            }
        };

        Popover.prototype.setRef = function setRef(prop, obj) {
            this[prop] = obj;
        };

        Popover.prototype.getLayer = function getLayer() {
            return this.layer;
        };

        Popover.prototype.renderLayer = function renderLayer() {
            var _this3 = this;

            var className = cx.getPartClassName('layer');
            var _state = this.state,
                open = _state.open,
                closing = _state.closing;


            var begin = open && !closing ? 0 : 1;
            var end = open && !closing ? 1 : 0;

            var transformOrigin = this.props.anchorAlignment.split('').map(function (direction) {
                return ALIGNMENT_TRANSFORM_ORIGIN_MAP[direction];
            })
            // 我们的方向是先垂直再水平，和 css 中的 tranform-origin 是反的，所以要 reverse 一下
            .reverse().join(' ');

            return _react2['default'].createElement(
                _reactMotion.Motion,
                {
                    defaultStyle: {
                        opacity: begin,
                        scale: begin
                    },
                    style: {
                        opacity: (0, _reactMotion.spring)(end),
                        scale: (0, _reactMotion.spring)(end, { stiffness: 260, damping: 20 })
                    },
                    onRest: this.onMotionEnd },
                function (_ref) {
                    var scale = _ref.scale,
                        opacity = _ref.opacity;
                    return _react2['default'].createElement(
                        'div',
                        {
                            className: className,
                            ref: _this3.setLayer,
                            style: {
                                opacity: opacity,
                                transform: 'scale(' + scale + ', ' + scale + ')',
                                transformOrigin: transformOrigin
                            } },
                        _this3.props.children
                    );
                }
            );
        };

        Popover.prototype.render = function render() {
            var _props4 = this.props,
                onRequestClose = _props4.onRequestClose,
                useLayerMask = _props4.useLayerMask,
                anchor = _props4.anchor,
                variants = _props4.variants;
            var _state2 = this.state,
                open = _state2.open,
                closing = _state2.closing;


            return _react2['default'].createElement(_Layer2['default'], {
                variants: variants,
                render: this.renderLayer,
                open: anchor && (open || closing),
                useLayerMask: useLayerMask,
                onClickAway: onRequestClose });
        };

        return Popover;
    }(_react.Component);

    exports['default'] = Popover;
    var alignments = exports.alignments = ['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'];

    Popover.propTypes = {
        open: _react.PropTypes.bool.isRequired,
        onRequestClose: _react.PropTypes.func,
        useLayerMask: _react.PropTypes.bool,
        anchorAlignment: _react.PropTypes.oneOf(alignments),
        layerAlignment: _react.PropTypes.oneOf(alignments),
        anchorOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
        layerOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
        autoWidth: _react.PropTypes.bool,
        closeDelay: _react.PropTypes.number
    };

    Popover.defaultProps = {
        open: false,
        anchorAlignment: 'tl',
        layerAlignment: 'tl',
        useLayerMask: false,
        autoWidth: false
    };
});
//# sourceMappingURL=Popover.js.map
