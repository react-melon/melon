(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Popover', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Popover'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Popover, global.babelHelpers);
        global.Tooltip = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Popover, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    /**
     * @file melon/Tooltip
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Tooltip');

    var DIRECTION_ALIGNMENT_MAP = {
        top: ['tc', 'bc'],
        bottom: ['bc', 'tc'],
        left: ['cl', 'cr'],
        right: ['cr', 'cl']
    };

    var DIRECTION_OFFSET_MAP = {
        top: [0, -1],
        bottom: [0, 1],
        left: [-1, 0],
        right: [1, 0]
    };

    var MODES = {
        over: 'over',
        click: 'click'
    };

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
            _this.onRequestClose = _this.onRequestClose.bind(_this);
            _this.hide = _this.hide.bind(_this);

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = {
                open: false
            };

            return _this;
        }

        /**
         * 点击时的处理
         *
         * @protected
         * @param  {Object} e 事件对象
         */


        Tooltip.prototype.onClick = function onClick(e) {
            this.toggle();
        };

        Tooltip.prototype.onMouseEnter = function onMouseEnter(e) {
            this.show();
        };

        Tooltip.prototype.onMouseLeave = function onMouseLeave(e) {
            this.hide();
        };

        Tooltip.prototype.onRequestClose = function onRequestClose() {
            if (this.props.mode === 'click') {
                this.hide();
            }
        };

        Tooltip.prototype.toggle = function toggle() {
            this.state.open ? this.hide() : this.show();
        };

        Tooltip.prototype.show = function show() {
            this.setState({ open: true });
        };

        Tooltip.prototype.hide = function hide() {
            this.setState({ open: false });
        };

        Tooltip.prototype.getPopoverAlignment = function getPopoverAlignment() {
            var _props = this.props,
                offset = _props.offset,
                direction = _props.direction;
            var _DIRECTION_ALIGNMENT_ = DIRECTION_ALIGNMENT_MAP[direction],
                layerAlignment = _DIRECTION_ALIGNMENT_[0],
                anchorAlignment = _DIRECTION_ALIGNMENT_[1];

            var layerOffset = DIRECTION_OFFSET_MAP[direction].map(function (i) {
                return i * offset;
            });

            return {
                layerAlignment: layerAlignment,
                anchorAlignment: anchorAlignment,
                layerOffset: layerOffset
            };
        };

        Tooltip.prototype.render = function render() {
            var _props2 = this.props,
                mode = _props2.mode,
                direction = _props2.direction,
                children = _props2.children,
                style = _props2.style,
                content = _props2.content,
                maxHeight = _props2.maxHeight,
                closeDelay = _props2.closeDelay;


            var eventHanlders = mode === MODES.click ? {
                onClick: this.onClick
            } : {
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave
            };

            var innerEventHandlers = mode === MODES.over ? eventHanlders : null;

            var className = cx(this.props).addVariants(direction).build();
            var alignment = this.getPopoverAlignment();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, eventHanlders, {
                    ref: 'main',
                    style: style,
                    className: className }),
                children,
                _react2['default'].createElement(
                    _Popover2['default'],
                    babelHelpers['extends']({}, alignment, {
                        closeDelay: closeDelay,
                        open: this.state.open,
                        variants: ['tooltip'],
                        maxHeight: maxHeight,
                        autoWidth: true,
                        useLayerMask: false,
                        anchor: this.refs.main,
                        onRequestClose: this.onRequestClose }),
                    _react2['default'].createElement(
                        'div',
                        babelHelpers['extends']({}, innerEventHandlers, {
                            className: cx.getPartClassName('popover') }),
                        content
                    )
                )
            );
        };

        return Tooltip;
    }(_react.Component);

    exports['default'] = Tooltip;


    Tooltip.displayName = 'Tooltip';

    Tooltip.propTypes = {
        direction: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
        mode: _react.PropTypes.oneOf(['over', 'click']),
        content: _react.PropTypes.node.isRequired,
        offset: _react.PropTypes.number,
        closeDelay: _react.PropTypes.number
    };

    Tooltip.defaultProps = {
        direction: 'bottom',
        mode: 'over',
        offset: 14
    };
});
//# sourceMappingURL=Tooltip.js.map
