define('melon/SnackBar', [
    'require',
    'exports',
    'module',
    'react',
    'react-dom',
    './Button',
    './common/util/dom',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Button = require('./Button');
    var dom = require('./common/util/dom');
    var cx = require('./common/util/cxBuilder').create('SnackBar');
    var SnackBar = React.createClass({
        displayName: 'SnackBar',
        getInitialState: function () {
            this.autoHideTimer = null;
            return { open: this.props.open };
        },
        componentDidMount: function () {
            dom.on(document.body, 'mouseup', this.onMouseUp);
            if (this.props.openOnMount) {
                this.onShow();
            }
            this.locate();
        },
        componentWillUnmount: function () {
            dom.off(document.body, 'mouseup', this.onMouseUp);
            if (this.autoHideTimer) {
                clearTimeout(this.autoHideTimer);
            }
        },
        componentDidUpdate: function () {
            this.locate();
        },
        componentWillReceiveProps: function (nextProps) {
            var open = nextProps.open;
            if (open === this.state.open) {
                return;
            }
            open ? this.onShow() : this.onHide();
        },
        locate: function () {
            var direction = this.props.direction;
            var open = this.state.open;
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
        },
        onHide: function () {
            var onHide = this.props.onHide;
            this.setState({ open: false }, function () {
                if (onHide) {
                    onHide();
                }
            });
        },
        onShow: function () {
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
        },
        onMouseUp: function (e) {
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
        },
        render: function () {
            var _props2 = this.props;
            var message = _props2.message;
            var action = _props2.action;
            var direction = _props2.direction;
            var open = this.state.open;
            var className = cx(this.props).addStates({ open: open }).addVariants('direction-' + direction).build();
            return React.createElement('div', { className: className }, React.createElement('span', { className: cx().part('message').build() }, message), React.createElement(Button, {
                variants: ['snackbar'],
                className: cx().part('action').build(),
                onClick: this.onHide
            }, action));
        }
    });
    var PropTypes = React.PropTypes;
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