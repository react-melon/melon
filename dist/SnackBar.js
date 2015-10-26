define('melon/SnackBar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './Component',
    './Button',
    './common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Component = require('./Component');
    var Button = require('./Button');
    var dom = require('./common/util/dom');
    var PropTypes = React.PropTypes;
    var SnackBar = function (_Component) {
        babelHelpers.inherits(SnackBar, _Component);
        babelHelpers.createClass(SnackBar, null, [{
                key: 'displayName',
                value: 'SnackBar',
                enumerable: true
            }]);
        function SnackBar(props) {
            babelHelpers.classCallCheck(this, SnackBar);
            babelHelpers.get(Object.getPrototypeOf(SnackBar.prototype), 'constructor', this).call(this, props);
            this.state = { open: props.open };
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onShow = this.onShow.bind(this);
            this.onHide = this.onHide.bind(this);
            this.autoHideTimer = null;
        }
        babelHelpers.createClass(SnackBar, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    dom.on(document.body, 'mouseup', this.onMouseUp);
                    if (this.props.openOnMount) {
                        this.onShow();
                    }
                    this.locate();
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    dom.off(document.body, 'mouseup', this.onMouseUp);
                    if (this.autoHideTimer) {
                        clearTimeout(this.autoHideTimer);
                    }
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.locate();
                }
            },
            {
                key: 'locate',
                value: function locate() {
                    var _props = this.props;
                    var open = _props.open;
                    var direction = _props.direction;
                    var main = ReactDOM.findDOMNode(this);
                    if (open) {
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
                    }
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var open = nextProps.open;
                    if (open === this.state.open) {
                        return;
                    }
                    open ? this.onShow() : this.onHide();
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    var onHide = this.props.onHide;
                    this.setState({ open: false }, function () {
                        if (onHide) {
                            onHide();
                        }
                    });
                }
            },
            {
                key: 'onShow',
                value: function onShow() {
                    var _props2 = this.props;
                    var onShow = _props2.onShow;
                    var autoHideDuration = _props2.autoHideDuration;
                    this.setState({ open: true }, function () {
                        if (onShow) {
                            onShow();
                        }
                        if (autoHideDuration > 0) {
                            var onHide = this.onHide;
                            this.autoHideTimer = setTimeout(function () {
                                onHide();
                            }, autoHideDuration);
                        }
                    });
                }
            },
            {
                key: 'onMouseUp',
                value: function onMouseUp(e) {
                    if (!this.state.open) {
                        return;
                    }
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    var main = ReactDOM.findDOMNode(this);
                    if (main !== target && !dom.contains(main, target)) {
                        this.onHide();
                        return;
                    }
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(SnackBar.prototype), 'getStates', this).call(this, props);
                    states.open = this.state.open;
                    return states;
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(SnackBar.prototype), 'getVariants', this).call(this, props);
                    var direction = props.direction;
                    variants.push('direction-' + direction);
                    return variants;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props3 = this.props;
                    var message = _props3.message;
                    var action = _props3.action;
                    return React.createElement('div', { className: this.getClassName() }, React.createElement('span', { className: this.getPartClassName('message') }, message), React.createElement(Button, {
                        variants: ['snackbar'],
                        className: this.getPartClassName('action'),
                        onClick: this.onHide
                    }, action));
                }
            }
        ]);
        return SnackBar;
    }(Component);
    SnackBar.defaultProps = {
        autoHideDuration: 0,
        action: '\u5173\u95ED',
        direction: 'bl'
    };
    SnackBar.propTypes = {
        action: PropTypes.string,
        autoHideDuration: PropTypes.number,
        message: PropTypes.string,
        openOnMount: PropTypes.bool,
        onHide: PropTypes.func,
        onShow: PropTypes.func,
        direction: PropTypes.oneOf([
            'tr',
            'rt',
            'rb',
            'br',
            'bl',
            'lb',
            'lt',
            'tl',
            'tc',
            'rc',
            'bc',
            'lc'
        ])
    };
    SnackBar.show = function (message, duration, direction) {
        duration = duration || 0;
        direction = direction || 'bl';
        var doc = document;
        var body = doc.body;
        var container = doc.createElement('div');
        body.appendChild(container);
        var snackbar = React.createElement(SnackBar, {
            autoHideDuration: duration,
            message: message,
            direction: direction,
            onHide: function (e) {
                setTimeout(function () {
                    ReactDOM.unmountComponentAtNode(container);
                    body.removeChild(container);
                    body = doc = container = snackbar = null;
                }, 400);
            }
        });
        ReactDOM.render(snackbar, container, function () {
            snackbar = React.cloneElement(snackbar, { open: true });
            setTimeout(function () {
                ReactDOM.render(snackbar, container);
            }, 10);
        });
        return snackbar;
    };
    module.exports = SnackBar;
});