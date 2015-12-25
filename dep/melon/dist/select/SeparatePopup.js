define('melon/select/SeparatePopup', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    'react-motion',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('SeparatePopup');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var domUtil = require('../common/util/dom');
    var SelectSeparatePopup = React.createClass({
        displayName: 'SelectSeparatePopup',
        getInitialState: function () {
            var _this = this;
            this.onWindowResize = function () {
                var handler = _this.onWindowResize;
                return function () {
                    clearTimeout(_this.windowResizeTimer);
                    _this.windowResizeTimer = setTimeout(handler, 500);
                };
            }();
            this.id = Date.now();
            return {
                styles: {
                    top: 0,
                    left: -5000,
                    height: 0,
                    opacity: 0,
                    width: 0
                }
            };
        },
        componentDidMount: function () {
            domUtil.on(document.body, 'click', this.onClick);
        },
        componentWillReceiveProps: function (nextProps) {
            var open = nextProps.open;
            domUtil[open ? 'on' : 'off'](window, 'resize', this.onWindowResize);
            this.setState(babelHelpers._extends({}, this.state, { styles: this.getStyle(open) }));
        },
        componentWillUnmount: function () {
            domUtil.off(window, 'resize', this.onWindowResize);
            domUtil.off(document.body, 'click', this.onClick);
        },
        getStyle: function (open) {
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
        },
        onClick: function (e) {
            var target = e.target;
            var main = this.main;
            var _props = this.props;
            var onHide = _props.onHide;
            var open = _props.open;
            if (open && main !== target && !domUtil.contains(main, target)) {
                onHide && onHide();
            }
        },
        onWindowResize: function () {
            this.setState(babelHelpers._extends({}, this.state, { styles: this.getStyle(true) }));
        },
        render: function () {
            var _this2 = this;
            var children = this.props.children;
            var className = cx(this.props).build();
            var contentClassName = cx().part('content').build();
            var styles = this.state.styles;
            var height = styles.height;
            var opacity = styles.opacity;
            return React.createElement(Motion, {
                style: babelHelpers._extends({}, styles, {
                    height: spring(height, [
                        120,
                        15
                    ]),
                    opacity: spring(opacity, [
                        120,
                        15
                    ])
                })
            }, function (style) {
                return React.createElement('div', {
                    className: className,
                    style: babelHelpers._extends({}, style, { visibility: style.opacity < 0.1 ? 'hidden' : 'visible' }),
                    ref: function (main) {
                        _this2.main = main;
                    }
                }, React.createElement('div', { className: contentClassName }, children));
            });
        }
    });
    var PropTypes = React.PropTypes;
    SelectSeparatePopup.propTypes = {
        target: PropTypes.object.isRequired,
        onHide: PropTypes.func.isRequired
    };
    module.exports = SelectSeparatePopup;
});