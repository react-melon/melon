(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './menu/MenuItem', './Divider', 'melon-core/classname/cxBuilder', './Icon', 'react-motion', 'dom-align', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./menu/MenuItem'), require('./Divider'), require('melon-core/classname/cxBuilder'), require('./Icon'), require('react-motion'), require('dom-align'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.MenuItem, global.Divider, global.cxBuilder, global.Icon, global.reactMotion, global.domAlign, global.babelHelpers);
        global.Menu = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _MenuItem, _Divider, _cxBuilder, _Icon, _reactMotion, _domAlign, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.MenuItem = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _MenuItem2 = babelHelpers.interopRequireDefault(_MenuItem);

    var _Divider2 = babelHelpers.interopRequireDefault(_Divider);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _domAlign2 = babelHelpers.interopRequireDefault(_domAlign);

    /**
     * @file Menu
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Menu');

    function getChildMenuKey(index) {
        return 'child-menu-' + index;
    }

    var Menu = function (_Component) {
        babelHelpers.inherits(Menu, _Component);

        function Menu() {
            babelHelpers.classCallCheck(this, Menu);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onMainMenuItemClick = _this.onMainMenuItemClick.bind(_this);
            _this.onChildMenuItemClick = _this.onChildMenuItemClick.bind(_this);
            _this.onChildMenuOpen = _this.onChildMenuOpen.bind(_this);
            _this.onChildMenuClose = _this.onChildMenuClose.bind(_this);
            _this.onMotionEnd = _this.onMotionEnd.bind(_this);
            _this.setMainRef = _this.setRef.bind(_this, 'main');
            _this.setLayerRef = _this.setRef.bind(_this, 'layer');
            _this.state = {
                closing: false
            };
            return _this;
        }

        Menu.prototype.componentWillMount = function componentWillMount() {
            this.setState(this.getChildState(this.props));
        };

        Menu.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                children = _props.children,
                open = _props.open;


            // 如果属性 children 发生变化，那么更新子结点相关的状态
            if (nextProps.children !== children) {
                this.setState(this.getChildState(nextProps));
            }

            if (nextProps.open !== open) {

                // 激活关闭动画
                this.setState({
                    closing: !nextProps.open
                });

                // 关闭所有的子菜单
                this.openChildMenu(null);
            }
        };

        Menu.prototype.componentDidUpdate = function componentDidUpdate() {
            var main = this.main,
                layer = this.layer;


            if (main && layer) {
                var _props2 = this.props,
                    anchorAlignment = _props2.anchorAlignment,
                    layerAlignment = _props2.layerAlignment;


                (0, _domAlign2['default'])(layer, main, {
                    points: [layerAlignment, anchorAlignment],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                });
            }
        };

        Menu.prototype.onMainMenuItemClick = function onMainMenuItemClick(e) {
            var _props3 = this.props,
                onOpen = _props3.onOpen,
                onClose = _props3.onClose,
                open = _props3.open,
                index = _props3.index;

            var handler = open ? onClose : onOpen;
            handler && handler(index);
        };

        Menu.prototype.onChildMenuItemClick = function onChildMenuItemClick() {
            var _props4 = this.props,
                onClose = _props4.onClose,
                index = _props4.index;

            onClose && onClose(index, true);
        };

        Menu.prototype.onChildMenuOpen = function onChildMenuOpen(childIndex) {
            this.openChildMenu(childIndex);
        };

        Menu.prototype.onChildMenuClose = function onChildMenuClose(childIndex) {
            var closeAncestors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            this.openChildMenu(null);

            if (closeAncestors) {
                var _props5 = this.props,
                    onClose = _props5.onClose,
                    index = _props5.index;

                onClose && onClose(index, closeAncestors);
            }
        };

        Menu.prototype.onMotionEnd = function onMotionEnd() {
            this.setState({ closing: false });
        };

        Menu.prototype.setRef = function setRef(name, ref) {
            this[name] = ref;
        };

        Menu.prototype.getChildState = function getChildState(_ref) {
            var children = _ref.children,
                cascading = _ref.cascading;


            children = _react.Children.toArray(children) || [];

            // 过滤掉没用的子结点
            children = children.filter(function (child) {
                return child.type === Menu || child.type === _MenuItem2['default'] || child.type === _Divider2['default'];
            });

            // 如果有任意一个子组件有 icon，那么所有的子组件都是 indent 的
            var indent = children.some(function (child) {
                return child.type === _MenuItem2['default'] && !!child.props.icon;
            });

            // 如果有任意一个子组件是 menu，那么此 menu 是级联 menu
            if (!cascading) {
                cascading = children.some(function (child) {
                    return child.type === Menu;
                });
            }

            // 生成子结点的索引
            var childMenuIndex = children.filter(function (child) {
                return child.type === Menu;
            }).reduce(function (menuState, child, index) {
                menuState[getChildMenuKey(index)] = false;
                return menuState;
            }, {});

            return {
                indent: indent,
                cascading: cascading,
                children: children,
                childMenuIndex: childMenuIndex
            };
        };

        Menu.prototype.openChildMenu = function openChildMenu(childIndex) {

            var childMenuIndex = Object.keys(this.state.childMenuIndex).reduce(function (nextChildMenuIndex, childKey) {
                nextChildMenuIndex[childKey] = childIndex != null && getChildMenuKey(childIndex) === childKey;
                return nextChildMenuIndex;
            }, {});

            this.setState({
                childMenuIndex: childMenuIndex
            });
        };

        Menu.prototype.renderChildren = function renderChildren() {
            var _this2 = this;

            var _state = this.state,
                indent = _state.indent,
                cascading = _state.cascading,
                children = _state.children,
                childMenuIndex = _state.childMenuIndex;


            var menuIndex = 0;

            // 给子组件附加属性
            return children.map(function (child, index) {

                var extraProps = {
                    level: _this2.props.level + (child.type === Menu ? 1 : 0),
                    indent: indent,
                    cascading: cascading
                };

                if (child.type === _MenuItem2['default']) {
                    extraProps.onClose = _this2.onChildMenuItemClick;
                } else if (child.type === Menu) {
                    extraProps.onOpen = _this2.onChildMenuOpen;
                    extraProps.onClose = _this2.onChildMenuClose;
                    extraProps.open = childMenuIndex[getChildMenuKey(menuIndex)];
                    extraProps.index = menuIndex++;
                }

                return (0, _react.cloneElement)(child, extraProps);
            });
        };

        Menu.prototype.renderLayer = function renderLayer() {
            var _this3 = this;

            var open = this.props.open;
            var closing = this.state.closing;

            var begin = open && !closing ? 0 : 1;
            var end = open && !closing ? 1 : 0;

            var content = this.renderChildren();

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
                function (_ref2) {
                    var scale = _ref2.scale,
                        opacity = _ref2.opacity;
                    return _react2['default'].createElement(
                        'div',
                        {
                            ref: _this3.setLayerRef,
                            className: cx.getPartClassName('children-popover'),
                            style: {
                                opacity: opacity,
                                transform: 'scale(' + scale + ', ' + scale + ')'
                            } },
                        content
                    );
                }
            );
        };

        Menu.prototype.render = function render() {
            var _props6 = this.props,
                level = _props6.level,
                label = _props6.label,
                style = _props6.style,
                icon = _props6.icon,
                open = _props6.open;


            var closing = this.state.closing;

            var className = cx(this.props).addVariants('level-' + level);

            if (level === 0) {
                return _react2['default'].createElement(
                    'div',
                    {
                        className: className.build(),
                        style: style },
                    this.renderChildren()
                );
            }

            // 如果 level 不是 0 级，那么把这货做成一个 MenuItem + Popover 的形式
            return _react2['default'].createElement(
                'div',
                {
                    className: className.addVariants('item').build(),
                    ref: this.setMainRef },
                _react2['default'].createElement(_MenuItem2['default'], {
                    type: 'command',
                    icon: icon,
                    label: label,
                    indent: this.props.indent,
                    cascading: true,
                    onClick: this.onMainMenuItemClick }),
                _react2['default'].createElement(_Icon2['default'], {
                    icon: 'arrow-drop-down',
                    className: cx.getPartClassName('cascading-icon') }),
                open || closing ? this.renderLayer() : null
            );
        };

        return Menu;
    }(_react.Component);

    exports['default'] = Menu;


    var ARCHOR_DIRECTIONS = ['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'];

    Menu.propTypes = {
        width: _propTypes2['default'].number,
        icon: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
        label: _propTypes2['default'].string,
        disabled: _propTypes2['default'].bool,
        open: _propTypes2['default'].bool.isRequired,
        level: _propTypes2['default'].number,
        layerAlignment: _propTypes2['default'].oneOf(ARCHOR_DIRECTIONS),
        anchorAlignment: _propTypes2['default'].oneOf(ARCHOR_DIRECTIONS)
    };

    Menu.defaultProps = {
        level: 0,
        width: 300,
        open: false,
        layerAlignment: 'tl',
        anchorAlignment: 'tr'
    };

    exports.MenuItem = _MenuItem2['default'];
});
//# sourceMappingURL=Menu.js.map
