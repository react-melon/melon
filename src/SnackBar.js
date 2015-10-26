/**
 * @file esui-react/SnackBar
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Component = require('./Component');
var Button = require('./Button');

var dom = require('./common/util/dom');
var PropTypes = React.PropTypes;

class SnackBar extends Component {

    static displayName = 'SnackBar';

    constructor(props) {
        super(props);

        this.state = {
            open: props.open
        };

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);

        this.autoHideTimer = null;
    }

    componentDidMount() {
        dom.on(document.body, 'mouseup', this.onMouseUp);

        if (this.props.openOnMount) {
            this.onShow();
        }

        this.locate();
    }

    componentWillUnmount() {
        dom.off(document.body, 'mouseup', this.onMouseUp);

        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }
    }

    componentDidUpdate() {
        this.locate();
    }

    locate() {
        var {
            open,
            direction
        } = this.props;

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

    componentWillReceiveProps(nextProps) {

        var open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        open ? this.onShow() : this.onHide();

    }

    onHide() {
        var onHide = this.props.onHide;

        this.setState({open: false}, function () {
            if (onHide) {
                onHide();
            }
        });
    }

    onShow() {
        var {
            onShow,
            autoHideDuration
        } = this.props;

        this.setState({open: true}, function () {
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

    onMouseUp(e) {

        if (!this.state.open) {
            return;
        }

        e = e || window.event;
        var target = e.target || e.srcElement;

        var main = ReactDOM.findDOMNode(this);

        // 点击不在 snackBar 内部
        if (main !== target && !dom.contains(main, target)) {
            this.onHide();
            return;
        }
    }

    getStates(props) {

        var states = super.getStates(props);
        states.open = this.state.open;

        return states;
    }

    getVariants(props) {

        var variants = super.getVariants(props);

        var direction = props.direction;
        variants.push('direction-' + direction);

        return variants;
    }

    render() {

        var {
            message,
            action
        } = this.props;

        return (
            <div className={this.getClassName()}>
                <span className={this.getPartClassName('message')}>{message}</span>
                <Button
                    variants={['snackbar']}
                    className={this.getPartClassName('action')}
                    onClick={this.onHide} >
                    {action}
                </Button>
            </div>
        );

    }

}

SnackBar.defaultProps = {
    autoHideDuration: 0,
    action: '关闭',
    direction: 'bl'
};

SnackBar.propTypes = {
    action: PropTypes.string,
    autoHideDuration: PropTypes.number,
    message: PropTypes.string,
    openOnMount: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    direction: PropTypes.oneOf(['tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt', 'tl', 'tc', 'rc', 'bc', 'lc'])
};


SnackBar.show = function (message, duration, direction) {
    duration = duration || 0;
    direction = direction || 'bl';

    var doc = document;
    var body = doc.body;
    var container = doc.createElement('div');

    body.appendChild(container);

    var snackbar = (
        <SnackBar
            autoHideDuration={duration}
            message={message}
            direction={direction}
            onHide={function (e) {
                setTimeout(function () {
                    ReactDOM.unmountComponentAtNode(container);
                    body.removeChild(container);
                    body = doc = container = snackbar = null;
                }, 400);
            }} />
    );

    ReactDOM.render(snackbar, container, function () {
        snackbar = React.cloneElement(snackbar, {open: true});
        setTimeout(function () {
            ReactDOM.render(snackbar, container);
        }, 10);
    });

    return snackbar;
};

module.exports = SnackBar;
