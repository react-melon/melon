(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './Button', './common/util/dom', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./Button'), require('./common/util/dom'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Button, global.dom, global.cxBuilder, global.babelHelpers);
        global.SnackBar = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Button, _dom, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var dom = babelHelpers.interopRequireWildcard(_dom);
    /**
     * @file melon/SnackBar
     * @author cxtom<cxtom2008@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('SnackBar');

    /**
     * melon/SnackBar
     *
     * @extends {React.Component}
     * @class
     */

    var SnackBar = function (_Component) {
        babelHelpers.inherits(SnackBar, _Component);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         */
        function SnackBar(props) {
            babelHelpers.classCallCheck(this, SnackBar);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            /**
             * timeoutId
             *
             * @type {?number}
             */
            _this.autoHideTimer = null;

            _this.onMouseUp = _this.onMouseUp.bind(_this);
            _this.onHide = _this.onHide.bind(_this);

            /**
             * 状态
             *
             * @type {Object}
             */
            _this.state = {
                open: props.open
            };

            return _this;
        }

        /**
         * Mount时的处理
         *
         * @public
         * @override
         */


        SnackBar.prototype.componentDidMount = function componentDidMount() {

            window.addEventListener('mouseup', this.onMouseUp);

            if (this.props.openOnMount) {
                this.onShow();
            }

            this.locate();
        };

        SnackBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var open = nextProps.open;

            if (open === this.state.open) {
                return;
            }

            open ? this.onShow() : this.onHide();
        };

        SnackBar.prototype.componentDidUpdate = function componentDidUpdate() {
            this.locate();
        };

        SnackBar.prototype.componentWillUnmount = function componentWillUnmount() {

            window.removeEventListener('mouseup', this.onMouseUp);

            if (this.autoHideTimer) {
                clearTimeout(this.autoHideTimer);
            }
        };

        SnackBar.prototype.locate = function locate() {

            var direction = this.props.direction;

            var open = this.state.open;

            var main = _reactDom2['default'].findDOMNode(this);

            if (open) {
                return;
            }

            switch (direction) {
                case 'bc':
                case 'tc':
                    main.style.marginTop = '';
                    main.style.marginLeft = -main.offsetWidth / 2 + 'px';
                    break;
                case 'lc':
                case 'rc':
                    main.style.marginLeft = '';
                    main.style.marginTop = -main.offsetHeight / 2 + 'px';
                    break;
            }
        };

        SnackBar.prototype.onHide = function onHide() {

            var onHide = this.props.onHide;

            this.setState({ open: false }, function () {
                if (onHide) {
                    onHide();
                }
            });
        };

        SnackBar.prototype.onShow = function onShow() {
            var _props = this.props,
                onShow = _props.onShow,
                autoHideDuration = _props.autoHideDuration;


            this.setState({ open: true }, function () {
                var _this2 = this;

                if (onShow) {
                    onShow();
                }

                if (autoHideDuration > 0) {

                    this.autoHideTimer = setTimeout(function () {
                        _this2.onHide();
                    }, autoHideDuration);
                }
            });
        };

        SnackBar.prototype.onMouseUp = function onMouseUp(e) {

            if (!this.state.open) {
                return;
            }

            e = e || window.event;

            var target = e.target || e.srcElement;

            var main = _reactDom2['default'].findDOMNode(this);

            // 点击不在 snackBar 内部
            if (main !== target && !main.contains(target)) {
                this.onHide();
                return;
            }
        };

        SnackBar.prototype.render = function render() {
            var _props2 = this.props,
                message = _props2.message,
                action = _props2.action,
                direction = _props2.direction;


            var open = this.state.open;

            var className = cx(this.props).addStates({ open: open }).addVariants('direction-' + direction).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(
                    'span',
                    { className: cx().part('message').build() },
                    message
                ),
                _react2['default'].createElement(
                    _Button2['default'],
                    {
                        variants: ['snackbar'],
                        className: cx().part('action').build(),
                        onClick: this.onHide },
                    action
                )
            );
        };

        return SnackBar;
    }(_react.Component);

    exports['default'] = SnackBar;


    SnackBar.displayName = 'SnackBar';

    SnackBar.defaultProps = {
        autoHideDuration: 0,
        action: '关闭',
        direction: 'bl'
    };

    SnackBar.propTypes = {
        action: _react.PropTypes.string,
        autoHideDuration: _react.PropTypes.number,
        message: _react.PropTypes.node.isRequired,
        openOnMount: _react.PropTypes.bool,
        onHide: _react.PropTypes.func,
        onShow: _react.PropTypes.func,
        direction: _react.PropTypes.oneOf(['tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt', 'tl', 'tc', 'rc', 'bc', 'lc'])
    };

    SnackBar.show = function (message) {
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bl';


        var doc = document;
        var body = doc.body;
        var container = doc.createElement('div');

        body.appendChild(container);

        var snackbar = _react2['default'].createElement(SnackBar, {
            autoHideDuration: duration,
            message: message,
            direction: direction,
            onHide: function onHide() {

                // 这里 delay 400 是因为要等动画搞完
                setTimeout(function () {
                    if (container) {
                        _reactDom2['default'].unmountComponentAtNode(container);
                        body.removeChild(container);
                        body = doc = container = snackbar = null;
                    }
                }, 400);
            } });

        _reactDom2['default'].render(snackbar, container, function () {
            snackbar = _react2['default'].cloneElement(snackbar, { open: true });
            setTimeout(function () {
                _reactDom2['default'].render(snackbar, container);
            }, 0);
        });

        return snackbar;
    };
});
//# sourceMappingURL=SnackBar.js.map
