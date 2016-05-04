/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-motion', '../common/util/dom', '../common/util/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-motion'), require('../common/util/dom'), require('../common/util/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactMotion, global.dom, global.cxBuilder, global.babelHelpers);
        global.SeparatePopup = mod.exports;
    }
})(this, function (exports, _react, _reactMotion, _dom, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    /**
     * @file melon/select/SeparatePopup
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('SeparatePopup');

    var SelectSeparatePopup = function (_Component) {
        babelHelpers.inherits(SelectSeparatePopup, _Component);

        function SelectSeparatePopup(props) {
            babelHelpers.classCallCheck(this, SelectSeparatePopup);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            // 做一个可以随时释放的 debounce 啦
            _this.onWindowResize = function () {

                var handler = _this.onWindowResize.bind(_this);

                return function () {
                    clearTimeout(_this.windowResizeTimer);
                    _this.windowResizeTimer = setTimeout(handler, 500);
                };
            }();

            _this.id = Date.now();

            _this.state = {
                styles: {
                    top: 0,
                    left: -5000,
                    height: 0,
                    opacity: 0,
                    width: 0
                }
            };

            _this.onClick = _this.onClick.bind(_this);
            _this.onWindowResize = _this.onWindowResize.bind(_this);

            return _this;
        }

        SelectSeparatePopup.prototype.componentDidMount = function componentDidMount() {
            _dom2['default'].on(document.body, 'click', this.onClick);
        };

        SelectSeparatePopup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var open = nextProps.open;


            _dom2['default'][open ? 'on' : 'off'](window, 'resize', this.onWindowResize);

            this.setState(babelHelpers['extends']({}, this.state, {
                styles: this.getStyle(open)
            }));
        };

        SelectSeparatePopup.prototype.componentWillUnmount = function componentWillUnmount() {
            _dom2['default'].off(window, 'resize', this.onWindowResize);
            _dom2['default'].off(window, 'click', this.onClick);
        };

        SelectSeparatePopup.prototype.getStyle = function getStyle(open) {

            if (!open) {
                return babelHelpers['extends']({}, this.state.styles, {
                    height: 0,
                    opacity: 0
                });
            }

            var target = this.props.target;
            var main = this.main;


            var targetPosition = _dom2['default'].getPosition(target);

            var _main$style = main.style;
            var top = _main$style.top;
            var left = _main$style.left;
            var width = _main$style.width;
            var height = _main$style.height;
            var overflow = _main$style.overflow;


            // 先把这个货弄走，展开计算它的宽度和高度
            main.style.top = '0';
            main.style.left = '-5000px';
            main.style.overflow = 'visible';
            main.style.height = 'auto';
            main.style.width = 'auto';

            var popupPosition = _dom2['default'].getPosition(main);

            main.style.top = top;
            main.style.left = left;
            main.style.overflow = overflow;
            main.style.height = height;
            main.style.width = width;

            var scrollTop = _dom2['default'].getScrollTop();
            var scrollLeft = _dom2['default'].getScrollLeft();
            var clientWidth = _dom2['default'].getClientWidth();
            var clientHeight = _dom2['default'].getClientHeight();

            var rTop = void 0;
            var rLeft = void 0;

            // 首先计算垂直位置
            // 如垂直位置从目标的上边缘开始，如果加上浮层高度，未溢出视野，那么就取目标上边缘
            if (targetPosition.top + popupPosition.height < scrollTop + clientHeight) {
                rTop = targetPosition.top;
            }
            // 否则尽量贴在视野的底边上，如果此时浮层顶部溢出了视野，那说明视野就是太小了。。。
            else {
                    rTop = clientHeight + scrollTop - popupPosition.height - 20;
                }

            // 然后计算水平位置
            // 尝试以目标的左边缘开始，如果加上浮层宽宽未溢出视野，那么取目标左边缘
            if (targetPosition.left + popupPosition.width < clientWidth + scrollLeft) {
                rLeft = targetPosition.left;
            }
            // 否则尽量贴在视野的右边，如果此时浮层左侧溢出视野，那说明视野就是太小了。
            else {
                    rLeft = clientWidth + scrollLeft - popupPosition.width - 20;
                }

            return {
                opacity: 1,
                top: rTop,
                left: rLeft,
                height: popupPosition.height,
                width: Math.max(targetPosition.width, popupPosition.width)
            };
        };

        SelectSeparatePopup.prototype.onClick = function onClick(e) {
            var target = e.target;
            var main = this.main;
            var _props = this.props;
            var onHide = _props.onHide;
            var open = _props.open;


            if (open && main !== target && !_dom2['default'].contains(main, target)) {
                onHide && onHide();
            }
        };

        SelectSeparatePopup.prototype.onWindowResize = function onWindowResize() {
            this.setState(babelHelpers['extends']({}, this.state, {
                styles: this.getStyle(true)
            }));
        };

        SelectSeparatePopup.prototype.render = function render() {
            var _this2 = this;

            var children = this.props.children;


            var className = cx(this.props).build();
            var contentClassName = cx().part('content').build();

            var styles = this.state.styles;
            var height = styles.height;
            var opacity = styles.opacity;


            return _react2['default'].createElement(
                _reactMotion.Motion,
                {
                    style: babelHelpers['extends']({}, styles, {
                        height: (0, _reactMotion.spring)(height, { stiffness: 120, damping: 15 }),
                        opacity: (0, _reactMotion.spring)(opacity, { stiffness: 120, damping: 15 })
                    }) },
                function (style) {

                    return _react2['default'].createElement(
                        'div',
                        {
                            className: className,
                            style: babelHelpers['extends']({}, style, {
                                visibility: style.opacity < 0.1 ? 'hidden' : 'visible'
                            }),
                            ref: function ref(main) {
                                if (main) {
                                    _this2.main = main;
                                }
                            } },
                        _react2['default'].createElement(
                            'div',
                            { className: contentClassName },
                            children
                        )
                    );
                }
            );
        };

        return SelectSeparatePopup;
    }(_react.Component);

    exports['default'] = SelectSeparatePopup;


    SelectSeparatePopup.displayName = 'SelectSeparatePopup';

    SelectSeparatePopup.propTypes = {
        target: _react.PropTypes.object.isRequired,
        onHide: _react.PropTypes.func.isRequired
    };
});