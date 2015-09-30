/**
 * @file esui-react/SnackBar
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Component = require('./Component');
var Button = require('./Button');

var dom = require('./common/util/dom');
var PropTypes = React.PropTypes;

class SnackBar extends Component {

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
        dom.on(document.body, 'click', this.onMouseUp);

        if (this.props.openOnMount) {
            this.onShow();
        }
    }

    componentWillUnmount() {
        dom.off(document.body, 'click', this.onMouseUp);

        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
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
    action: '关闭'
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
