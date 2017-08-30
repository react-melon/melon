(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../Icon', '../ripples/TouchRipple', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('../ripples/TouchRipple'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Icon, global.TouchRipple, global.babelHelpers);
        global.MenuItem = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Icon, _TouchRipple, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _TouchRipple2 = babelHelpers.interopRequireDefault(_TouchRipple);

    /**
     * @file MenuItem
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('MenuItem');

    var MenuItem = function (_PureComponent) {
        babelHelpers.inherits(MenuItem, _PureComponent);

        function MenuItem(props, context) {
            babelHelpers.classCallCheck(this, MenuItem);

            var _this = babelHelpers.possibleConstructorReturn(this, _PureComponent.call(this, props, context));

            _this.state = {};
            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        MenuItem.prototype.onClick = function onClick(e) {
            var _props = this.props,
                type = _props.type,
                checked = _props.checked,
                disabled = _props.disabled,
                radioGroup = _props.radioGroup,
                onClick = _props.onClick,
                onClose = _props.onClose;


            e.stopPropagation();

            if (disabled) {
                return;
            }

            if (onClick) {

                switch (type) {
                    case 'radio':
                        onClick({
                            checked: true,
                            radioGroup: radioGroup
                        });
                        break;
                    case 'checkbox':
                        onClick({ checked: !checked });
                        break;
                    default:
                        onClick();
                        break;
                }
            }

            onClose && onClose();
        };

        MenuItem.prototype.renderIconPlaceHolder = function renderIconPlaceHolder() {
            return _react2['default'].createElement('b', { className: cx.getPartClassName('icon-placeholder') });
        };

        MenuItem.prototype.renderIcon = function renderIcon(icon) {
            return typeof icon === 'string' ? _react2['default'].createElement(_Icon2['default'], { icon: icon, className: cx.getPartClassName('left-icon') }) : icon;
        };

        MenuItem.prototype.render = function render() {
            var _props2 = this.props,
                hotKey = _props2.hotKey,
                icon = _props2.icon,
                label = _props2.label,
                type = _props2.type,
                checked = _props2.checked,
                disabled = _props2.disabled,
                indent = _props2.indent,
                cascading = _props2.cascading;


            var className = cx(this.props).addVariants({ cascading: cascading }).build();

            if (type !== 'command' && checked) {
                icon = 'check';
            }

            icon = icon ? this.renderIcon(icon) : indent && this.renderIconPlaceHolder();

            return _react2['default'].createElement(
                'div',
                { className: className, onClick: this.onClick },
                icon,
                _react2['default'].createElement(
                    'span',
                    { className: cx.getPartClassName('label') },
                    label
                ),
                hotKey,
                disabled ? null : _react2['default'].createElement(_TouchRipple2['default'], null)
            );
        };

        return MenuItem;
    }(_react.PureComponent);

    exports['default'] = MenuItem;


    MenuItem.propTypes = {

        /**
         * 是否有 icon 缩进
         *
         * @protected
         * @type {boolean?}
         */
        indent: _propTypes2['default'].bool,

        /**
         * 是否为级联
         *
         * @protected
         * @type {boolean?}
         */
        cascading: _propTypes2['default'].bool,

        /**
         * 左侧 icon
         *
         * @type {(string|ReactElement)?}
         */
        icon: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),

        /**
         * 是否为已选中
         *
         * @type {boolean?}
         */
        checked: _propTypes2['default'].bool,

        /**
         * 是否禁用
         *
         * @type {boolean?}
         */
        disabled: _propTypes2['default'].bool,

        /**
         * 点击回调函数
         *
         * @type {Function?}
         */
        onClick: _propTypes2['default'].func,

        label: function label(props, propName, componentName) {
            if (!props.label && !props.children) {
                return new Error(componentName + ' must have \'label\' or \'children\'.');
            }
        },
        type: function type(props, propName, componentName) {

            if (props[propName] === 'radio') {
                if (!props.radioGroup) {
                    return new Error(componentName + ' needs \'' + propName + '\' to be set along with prop \'radioGroup\'');
                }
            }
        },


        hotKey: _propTypes2['default'].string

    };

    MenuItem.defaultProps = {
        type: 'command'
    };
});
//# sourceMappingURL=MenuItem.js.map
