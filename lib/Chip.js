(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Icon', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Icon'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Icon, global.cxBuilder, global.babelHelpers);
        global.Chip = mod.exports;
    }
})(this, function (exports, _react, _Icon, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    /**
     * @file Chip
     * @author Ma63d(chuck7liu@gmail.com)
     */

    // import {emphasize} from './common/util/color';

    var cx = (0, _cxBuilder.create)('Chip');

    var Chip = function (_Component) {
        babelHelpers.inherits(Chip, _Component);

        function Chip(props) {
            babelHelpers.classCallCheck(this, Chip);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.handleClick = function (event) {
                if (_this.props.onClick) {
                    _this.props.onClick(event);
                }
            };

            _this.handleRemoveIconClick = function (event) {
                event.stopPropagation();
                if (_this.props.onRemove) {
                    _this.props.onRemove(event);
                }
            };

            _this.renderAvatar = function () {

                var avatarUiClassName = cx.getPartClassName('avatar');

                var _this$props$avatar = _this.props.avatar,
                    avatar = _this$props$avatar === undefined ? null : _this$props$avatar;

                if (avatar) {
                    var className = avatar.props.className ? ~avatar.props.className.indexOf(avatarUiClassName) ? avatar.props.className : avatar.props.className + ' ' + avatarUiClassName : avatarUiClassName;

                    avatar = _react2['default'].cloneElement(avatar, {
                        className: className
                    });
                }

                return avatar;
            };

            _this.state = {
                active: false
            };
            // 当chip有onClick回调或onRemove回调时, hover和active时元素有相关样式变动
            if (_this.props.onClick || _this.props.onRemove) {
                _this.state.active = true;
            }

            return _this;
        }

        Chip.prototype.renderRemoveIcon = function renderRemoveIcon() {
            var _props = this.props,
                onRemove = _props.onRemove,
                removeIconStyle = _props.removeIconStyle;

            if (onRemove) {
                return _react2['default'].createElement(
                    'div',
                    {
                        className: cx.getPartClassName('icon') },
                    _react2['default'].createElement(_Icon2['default'], {
                        icon: 'close',
                        onClick: this.handleRemoveIconClick,
                        style: removeIconStyle })
                );
            }
        };

        Chip.prototype.renderLabel = function renderLabel() {
            // 如果有remove icon 那么label的padding-right为0
            var labelStyle = {};
            if (this.props.onRemove) {
                labelStyle.paddingRight = 0;
            }

            return _react2['default'].createElement(
                'span',
                {
                    className: cx.getPartClassName('label'),
                    style: labelStyle },
                this.props.children
            );
        };

        Chip.prototype.render = function render() {
            var active = this.state.active;
            var className = cx(this.props).addStates({
                active: active
            }).build();

            return _react2['default'].createElement(
                'div',
                { className: className, onClick: this.handleClick, style: this.props.style },
                _react2['default'].createElement(
                    'div',
                    { style: { display: 'table' } },
                    this.renderAvatar(),
                    this.renderLabel(),
                    this.renderRemoveIcon()
                )
            );
        };

        return Chip;
    }(_react.Component);

    Chip.displayName = 'Chip';
    Chip.propTypes = {
        style: _react.PropTypes.object,
        removeIconStyle: _react.PropTypes.object,
        avatar: _react.PropTypes.element,
        onClick: _react.PropTypes.func,
        onRemove: _react.PropTypes.func
    };
    exports['default'] = Chip;
});
//# sourceMappingURL=Chip.js.map
