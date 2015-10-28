define('melon/select/SeparatePopup', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    'react-motion',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var domUtil = require('../common/util/dom');
    var SelectSeparatePopup = function (_Component) {
        babelHelpers.inherits(SelectSeparatePopup, _Component);
        babelHelpers.createClass(SelectSeparatePopup, null, [{
                key: 'displayName',
                value: 'SelectSeparatePopup',
                enumerable: true
            }]);
        function SelectSeparatePopup(props) {
            var _this = this;
            babelHelpers.classCallCheck(this, SelectSeparatePopup);
            babelHelpers.get(Object.getPrototypeOf(SelectSeparatePopup.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.onWindowResize = function () {
                var handler = _this.onWindowResize.bind(_this);
                return function () {
                    clearTimeout(_this.windowResizeTimer);
                    _this.windowResizeTimer = setTimeout(handler, 500);
                };
            }();
            this.id = Date.now();
            this.state = babelHelpers._extends({}, this.state, {
                styles: {
                    top: 0,
                    left: -5000,
                    height: 0,
                    opacity: 0,
                    width: 0
                }
            });
        }
        babelHelpers.createClass(SelectSeparatePopup, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    domUtil.on(document.body, 'click', this.onClick);
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var open = nextProps.open;
                    domUtil[open ? 'on' : 'off'](window, 'resize', this.onWindowResize);
                    this.setState(babelHelpers._extends({}, this.state, { styles: this.getStyle(open) }));
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    domUtil.off(window, 'resize', this.onWindowResize);
                    domUtil.off(document.body, 'click', this.onClick);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var children = this.props.children;
                    var styles = this.state.styles;
                    var className = this.getPartClassName('content');
                    var _styles = styles;
                    var height = _styles.height;
                    var opacity = _styles.opacity;
                    styles = babelHelpers._extends({}, styles, {
                        height: spring(height, [
                            120,
                            15
                        ]),
                        opacity: spring(opacity, [
                            120,
                            15
                        ])
                    });
                    return React.createElement(Motion, { style: styles }, function (style) {
                        style = babelHelpers._extends({}, style, { visibility: style.opacity < 0.1 ? 'hidden' : 'visible' });
                        return React.createElement('div', {
                            ref: function (main) {
                                _this2.main = main;
                            },
                            className: _this2.getClassName(),
                            style: style
                        }, React.createElement('div', { className: className }, children));
                    });
                }
            },
            {
                key: 'getStyle',
                value: function getStyle(open) {
                    if (!open) {
                        return babelHelpers._extends({}, this.state.styles, {
                            height: 0,
                            opacity: 0
                        });
                    }
                    var target = this.props.target;
                    var main = this.main;
                    var targetPosition = domUtil.getPosition(target);
                    var _main$style = main.style;
                    var top = _main$style.top;
                    var left = _main$style.left;
                    var width = _main$style.width;
                    var height = _main$style.height;
                    var overflow = _main$style.overflow;
                    main.style.top = '0';
                    main.style.left = '-5000px';
                    main.style.overflow = 'visible';
                    main.style.height = 'auto';
                    main.style.width = 'auto';
                    var popupPosition = domUtil.getPosition(main);
                    main.style.top = top;
                    main.style.left = left;
                    main.style.overflow = overflow;
                    main.style.height = height;
                    main.style.width = width;
                    var scrollTop = domUtil.getScrollTop();
                    var scrollLeft = domUtil.getScrollLeft();
                    var clientWidth = domUtil.getClientWidth();
                    var clientHeight = domUtil.getClientHeight();
                    var rTop = undefined;
                    var rLeft = undefined;
                    if (targetPosition.top + popupPosition.height < scrollTop + clientHeight) {
                        rTop = targetPosition.top;
                    } else {
                        rTop = clientHeight + scrollTop - popupPosition.height - 20;
                    }
                    if (targetPosition.left + popupPosition.width < clientWidth + scrollLeft) {
                        rLeft = targetPosition.left;
                    } else {
                        rLeft = clientWidth + scrollLeft - popupPosition.width - 20;
                    }
                    return {
                        opacity: 1,
                        top: rTop,
                        left: rLeft,
                        height: popupPosition.height,
                        width: Math.max(targetPosition.width, popupPosition.width)
                    };
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    var target = e.target;
                    var main = this.main;
                    var _props = this.props;
                    var onHide = _props.onHide;
                    var open = _props.open;
                    if (open && main !== target && !domUtil.contains(main, target)) {
                        onHide && onHide();
                    }
                }
            },
            {
                key: 'onWindowResize',
                value: function onWindowResize() {
                    this.setState(babelHelpers._extends({}, this.state, { styles: this.getStyle(true) }));
                }
            }
        ]);
        return SelectSeparatePopup;
    }(Component);
    var PropTypes = React.PropTypes;
    SelectSeparatePopup.propTypes = babelHelpers._extends({}, Component.propTypes, {
        target: PropTypes.object.isRequired,
        onHide: PropTypes.func.isRequired
    });
    module.exports = SelectSeparatePopup;
});