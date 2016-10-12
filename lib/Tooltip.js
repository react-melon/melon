(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './common/util/dom', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./common/util/dom'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.dom, global.cxBuilder, global.babelHelpers);
        global.Tooltip = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _dom, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    /**
     * @file melon/Tooltip
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Tooltip');

    /**
     * melon/Tooltip
     *
     * @extends {React.Component}
     * @class
     */

    var Tooltip = function (_Component) {
        babelHelpers.inherits(Tooltip, _Component);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         */
        function Tooltip(props) {
            babelHelpers.classCallCheck(this, Tooltip);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            _this.onMouseEnter = _this.onMouseEnter.bind(_this);
            _this.onMouseLeave = _this.onMouseLeave.bind(_this);

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = {
                isShown: false
            };

            return _this;
        }

        /**
         * 将要Mount时的处理
         *
         * @public
         * @override
         */


        Tooltip.prototype.componentDidMount = function componentDidMount() {
            var popup = this.popup = Tooltip.createPopup();
            this.renderPopup(popup, this.props.content);
        };

        Tooltip.prototype.componentWillUnmount = function componentWillUnmount() {
            Tooltip.destroyPopup(this.popup);

            /**
             * 弹出层的dom
             *
             * @protected
             * @type {HTMLElement}
             */
            this.popup = null;
        };

        Tooltip.prototype.componentDidUpdate = function componentDidUpdate() {
            this.renderPopup(this.popup, this.props.content);
        };

        Tooltip.prototype.onClick = function onClick(e) {
            this.toggle();
        };

        Tooltip.prototype.onMouseEnter = function onMouseEnter(e) {
            this.show();
        };

        Tooltip.prototype.onMouseLeave = function onMouseLeave(e) {
            this.hide();
        };

        Tooltip.prototype.isShown = function isShown() {
            return this.state.isShown;
        };

        Tooltip.prototype.toggle = function toggle() {
            this.isShown() ? this.hide() : this.show();
        };

        Tooltip.prototype.show = function show() {
            this.setState({ isShown: true });
        };

        Tooltip.prototype.hide = function hide() {
            this.setState({ isShown: false });
        };

        Tooltip.prototype.getPosition = function getPosition() {

            var main = this.main;

            if (!this.isShown() || !main) {
                return {
                    left: -10000,
                    top: 0,
                    opacity: 0,
                    width: 'auto',
                    height: 'auto'
                };
            }

            var props = this.props;

            var direction = props.direction;
            var offsetX = props.offsetX;
            var offsetY = props.offsetY;


            var popup = this.popup.childNodes[0];

            var position = _dom2['default'].getPosition(main);

            var offsetWidth = popup.offsetWidth;
            var offsetHeight = popup.offsetHeight;


            var styles = { opacity: 1 };

            switch (direction) {
                case 'top':
                    styles.left = position.left + (position.width - offsetWidth) / 2;
                    styles.top = position.top - offsetHeight - offsetY;
                    break;
                case 'bottom':
                    styles.left = (position.width - offsetWidth) / 2 + position.left;
                    styles.top = position.top + position.height + offsetY;
                    break;
                case 'left':
                    styles.top = (position.height - offsetHeight) / 2 + position.top;
                    styles.left = position.left - offsetWidth - offsetY;
                    break;
                case 'right':
                    styles.top = (position.height - offsetHeight) / 2 + position.top;
                    styles.left = position.left + position.width + offsetX;
                    break;
            }

            return styles;
        };

        Tooltip.prototype.renderPopup = function renderPopup(target, content) {

            _reactDom2['default'].render(_react2['default'].createElement(
                'div',
                {
                    className: cx().part('popup').build(),
                    style: this.getPosition() },
                content
            ), target);
        };

        Tooltip.prototype.render = function render() {
            var _this2 = this;

            var props = this.props;

            var mode = props.mode;
            var direction = props.direction;
            var children = props.children;
            var style = props.style;


            var onClick = mode === 'click' ? this.onClick : null;
            var onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
            var onMouseLeave = mode === 'over' ? this.onMouseLeave : null;

            return _react2['default'].createElement(
                'div',
                {
                    ref: function ref(main) {
                        if (main) {
                            _this2.main = main;
                        }
                    },
                    style: style,
                    className: cx(props).addStates({ direction: direction }).build(),
                    onClick: onClick,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave },
                children
            );
        };

        return Tooltip;
    }(_react.Component);

    exports['default'] = Tooltip;


    Tooltip.displayName = 'Tooltip';

    Tooltip.propTypes = {
        arrow: _react.PropTypes.bool.isRequired,
        direction: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
        mode: _react.PropTypes.oneOf(['over', 'click']),
        content: _react.PropTypes.node.isRequired
    };

    Tooltip.defaultProps = {
        arrow: true,
        direction: 'bottom',
        mode: 'over',
        offsetX: 14,
        offsetY: 14
    };

    (function () {

        var container = void 0;

        Tooltip.createPopup = function () {

            if (!container) {
                container = document.createElement('div');
                container.className = cx().part('container').build();
                document.body.appendChild(container);
            }

            var popup = document.createElement('div');

            container.appendChild(popup);

            return popup;
        };

        Tooltip.destroyPopup = function (popup) {
            _reactDom2['default'].unmountComponentAtNode(popup);
            container.removeChild(popup);
        };
    })();
});
//# sourceMappingURL=Tooltip.js.map
