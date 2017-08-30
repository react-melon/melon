(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', 'react-dom', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('react-dom'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.reactDom, global.babelHelpers);
        global.Layer = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _reactDom, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    /**
     * @file Layer
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Layer');

    var Layer = function (_Component) {
        babelHelpers.inherits(Layer, _Component);

        function Layer() {
            babelHelpers.classCallCheck(this, Layer);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onClickAway = _this.onClickAway.bind(_this);
            return _this;
        }

        Layer.prototype.componentDidMount = function componentDidMount() {
            this.renderLayer();
        };

        Layer.prototype.componentDidUpdate = function componentDidUpdate() {
            this.renderLayer();
        };

        Layer.prototype.componentWillUnmount = function componentWillUnmount() {
            this.unmountLayer();
        };

        Layer.prototype.onClickAway = function onClickAway(e) {
            var target = e.target,
                defaultPrevented = e.defaultPrevented;
            var _props = this.props,
                onClickAway = _props.onClickAway,
                open = _props.open;

            var layer = this.layer;

            if (defaultPrevented || !open || !layer) {
                return;
            }

            if (target === layer || !layer.contains(target)) {
                onClickAway && onClickAway();
            }
        };

        Layer.prototype.renderLayer = function renderLayer() {
            var _this2 = this;

            var _props2 = this.props,
                open = _props2.open,
                render = _props2.render,
                useLayerMask = _props2.useLayerMask;


            if (!open) {
                this.unmountLayer();
                return;
            }

            var layer = this.layer;

            if (!layer) {

                layer = this.layer = document.createElement('div');

                // 如果使用一个 div 作为遮罩，那么这里给 div 加 click 绑定
                if (useLayerMask) {
                    layer.addEventListener('click', this.onClickAway);
                }
                // 否则我们给 window 加事件绑定
                else {

                        // 这么干是因为 Layer 通常是被 click 触发展现的
                        // 事件会继续冒泡到 window 上，这样我们这里就会被直接关闭掉
                        // 所以，这里用 setTimeout 做事件绑定
                        setTimeout(function () {
                            window.addEventListener('click', _this2.onClickAway);
                        }, 0);
                    }

                layer.className = cx(this.props).addVariants(useLayerMask ? 'mask' : null).build();

                document.body.appendChild(layer);
            }

            this.layerContent = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, render(), layer);
        };

        Layer.prototype.unmountLayer = function unmountLayer() {

            var layer = this.layer;

            if (!layer) {
                return;
            }

            layer.removeEventListener('click', this.onClickAway);
            window.removeEventListener('click', this.onClickAway);

            (0, _reactDom.unmountComponentAtNode)(layer);
            document.body.removeChild(layer);
            this.layer = null;
        };

        Layer.prototype.getLayer = function getLayer() {
            return this.layer;
        };

        Layer.prototype.render = function render() {
            return null;
        };

        return Layer;
    }(_react.Component);

    exports['default'] = Layer;


    Layer.propTypes = {
        onClickAway: _propTypes2['default'].func,
        open: _propTypes2['default'].bool.isRequired,
        render: _propTypes2['default'].func.isRequired,
        useLayerMask: _propTypes2['default'].bool.isRequired
    };

    Layer.defaultProps = {
        open: false,
        useLayerMask: true
    };
});
//# sourceMappingURL=Layer.js.map
