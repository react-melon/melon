define('melon/Tooltip', [
    'exports',
    './babelHelpers',
    'react',
    'react-dom',
    './Component',
    './common/util/dom'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Component = require('./Component');
    var dom = require('./common/util/dom');
    var Tooltip = function (_Component) {
        babelHelpers.inherits(Tooltip, _Component);
        function Tooltip(props) {
            babelHelpers.classCallCheck(this, Tooltip);
            babelHelpers.get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
            this.state = babelHelpers._extends({}, this.state, { isShown: false });
        }
        babelHelpers.createClass(Tooltip, [
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var mode = props.mode;
                    var onClick = mode === 'click' ? this.onClick : null;
                    var onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
                    var onMouseLeave = mode === 'over' ? this.onMouseLeave : null;
                    return React.createElement('div', babelHelpers._extends({}, props, {
                        ref: 'main',
                        className: this.getClassName(),
                        onClick: onClick,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave
                    }), props.children);
                }
            },
            {
                key: 'renderPopup',
                value: function renderPopup(target, content) {
                    var styles = this.getPosition();
                    var content = React.createElement('div', {
                        className: this.getPartClassName('popup'),
                        style: styles
                    }, content);
                    ReactDOM.render(content, target);
                }
            },
            {
                key: 'getPosition',
                value: function getPosition() {
                    if (!this.isShown()) {
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
                    var position = dom.getPosition(this.refs.main);
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
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var popup = this.popup = Tooltip.createPopup();
                    this.renderPopup(popup, this.props.content);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    Tooltip.destroy(this.popup);
                    this.popup = null;
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.renderPopup(this.popup, this.props.content);
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(Tooltip.prototype), 'getStates', this).call(this, props);
                    var direction = props.direction;
                    states[direction] = true;
                    return states;
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    this.toggle();
                }
            },
            {
                key: 'onMouseEnter',
                value: function onMouseEnter(e) {
                    this.show();
                }
            },
            {
                key: 'onMouseLeave',
                value: function onMouseLeave(e) {
                    this.hide();
                }
            },
            {
                key: 'isShown',
                value: function isShown() {
                    return this.state.isShown;
                }
            },
            {
                key: 'toggle',
                value: function toggle() {
                    this.isShown() ? this.hide() : this.show();
                }
            },
            {
                key: 'show',
                value: function show() {
                    this.setState({ isShown: true });
                }
            },
            {
                key: 'hide',
                value: function hide() {
                    this.setState({ isShown: false });
                }
            }
        ]);
        return Tooltip;
    }(Component);
    var PropTypes = React.PropTypes;
    Tooltip.propTypes = {
        arrow: PropTypes.bool.isRequired,
        direction: PropTypes.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ]).isRequired,
        mode: PropTypes.oneOf([
            'over',
            'click'
        ])
    };
    Tooltip.defaultProps = babelHelpers._extends({}, Component.defaultProps, {
        arrow: true,
        direction: 'bottom',
        mode: 'over',
        offsetX: 14,
        offsetY: 14
    });
    var container;
    Tooltip.createPopup = function () {
        if (!container) {
            container = document.createElement('div');
            container.className = 'ui-tooltip-container';
            document.body.appendChild(container);
        }
        var popup = document.createElement('div');
        container.appendChild(popup);
        return popup;
    };
    Tooltip.destroyPopup = function (popup) {
        container.removeChild(popup);
    };
    module.exports = Tooltip;
});