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
                    dom.on(document.body, 'click', this.onMouseUp);
                    if (this.props.openOnMount) {
                        this.onShow();
                    }
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    dom.off(document.body, 'click', this.onMouseUp);
                    if (this.autoHideTimer) {
                        clearTimeout(this.autoHideTimer);
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
                    var _props = this.props;
                    var onShow = _props.onShow;
                    var autoHideDuration = _props.autoHideDuration;
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
                key: 'render',
                value: function render() {
                    var _props2 = this.props;
                    var message = _props2.message;
                    var action = _props2.action;
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
        action: '\u5173\u95ED'
    };
    SnackBar.propTypes = {
        action: PropTypes.string,
        autoHideDuration: PropTypes.number,
        message: PropTypes.string,
        openOnMount: PropTypes.bool,
        onHide: PropTypes.func,
        onShow: PropTypes.func
    };
    module.exports = SnackBar;
});