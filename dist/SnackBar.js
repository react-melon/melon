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
            _Component.call(this, props);
            this.state = { open: props.open };
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onShow = this.onShow.bind(this);
            this.onHide = this.onHide.bind(this);
            this.autoHideTimer = null;
        }
        SnackBar.prototype.componentDidMount = function componentDidMount() {
            dom.on(document.body, 'mouseup', this.onMouseUp);
            if (this.props.openOnMount) {
                this.onShow();
            }
            this.locate();
        };
        SnackBar.prototype.componentWillUnmount = function componentWillUnmount() {
            dom.off(document.body, 'mouseup', this.onMouseUp);
            if (this.autoHideTimer) {
                clearTimeout(this.autoHideTimer);
            }
        };
        SnackBar.prototype.componentDidUpdate = function componentDidUpdate() {
            this.locate();
        };
        SnackBar.prototype.locate = function locate() {
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
        };
        SnackBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var open = nextProps.open;
            if (open === this.state.open) {
                return;
            }
            open ? this.onShow() : this.onHide();
        };
        SnackBar.prototype.onHide = function onHide() {
            var onHide = this.props.onHide;
            this.setState({ open: false }, function () {
                if (onHide) {
                    onHide();
                }
            });
        };
        SnackBar.prototype.onShow = function onShow() {
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
        };
        SnackBar.prototype.onMouseUp = function onMouseUp(e) {
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
        };
        SnackBar.prototype.getStates = function getStates(props) {
            var states = _Component.prototype.getStates.call(this, props);
            states.open = this.state.open;
            return states;
        };
        SnackBar.prototype.getVariants = function getVariants(props) {
            var variants = _Component.prototype.getVariants.call(this, props);
            var direction = props.direction;
            variants.push('direction-' + direction);
            return variants;
        };
        SnackBar.prototype.render = function render() {
            var _props3 = this.props;
            var message = _props3.message;
            var action = _props3.action;
            return React.createElement('div', { className: this.getClassName() }, React.createElement('span', { className: this.getPartClassName('message') }, message), React.createElement(Button, {
                variants: ['snackbar'],
                className: this.getPartClassName('action'),
                onClick: this.onHide
            }, action));
        };
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
        message: PropTypes.node.isRequired,
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
    SnackBar.show = function (message) {
        var duration = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var direction = arguments.length <= 2 || arguments[2] === undefined ? 'bl' : arguments[2];
        var doc = document;
        var body = doc.body;
        var container = doc.createElement('div');
        body.appendChild(container);
        var snackbar = React.createElement(SnackBar, {
            autoHideDuration: duration,
            message: message,
            direction: direction,
            onHide: function () {
                setTimeout(function () {
                    if (container) {
                        ReactDOM.unmountComponentAtNode(container);
                        body.removeChild(container);
                        body = doc = container = snackbar = null;
                    }
                }, 400);
            }
        });
        ReactDOM.render(snackbar, container, function () {
            snackbar = React.cloneElement(snackbar, { open: true });
            setTimeout(function () {
                ReactDOM.render(snackbar, container);
            }, 0);
        });
        return snackbar;
    };
    module.exports = SnackBar;
});