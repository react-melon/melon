/**
 * @file esui-react/SnackBar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');
const Button = require('./Button');
const dom = require('./common/util/dom');
const cx = require('./common/util/cxBuilder').create('SnackBar');

const SnackBar = React.createClass({

    displayName: 'SnackBar',

    getInitialState() {

        this.autoHideTimer = null;

        return {
            open: this.props.open
        };

    },

    componentDidMount() {

        dom.on(document.body, 'mouseup', this.onMouseUp);

        if (this.props.openOnMount) {
            this.onShow();
        }

        this.locate();
    },

    componentWillUnmount() {
        dom.off(document.body, 'mouseup', this.onMouseUp);

        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }
    },

    componentDidUpdate() {
        this.locate();
    },

    componentWillReceiveProps(nextProps) {

        const open = nextProps.open;

        if (open === this.state.open) {
            return;
        }

        open ? this.onShow() : this.onHide();

    },

    locate() {
        const {
            direction
        } = this.props;

        const {open} = this.state;

        const main = ReactDOM.findDOMNode(this);

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

    onHide() {
        const {
            onHide,
            autoHideDuration
        } = this.props;

        const autoHideTimer = this.autoHideTimer;

        this.setState({open: false}, function () {
            if (onHide) {
                onHide();
            }

            if (autoHideDuration > 0 && autoHideTimer) {
                clearTimeout(autoHideTimer);
            }
        });
    },

    onShow() {
        const {
            onShow,
            autoHideDuration
        } = this.props;

        this.setState({open: true}, function () {
            if (onShow) {
                onShow();
            }

            if (autoHideDuration > 0) {
                const onHide = this.onHide;
                this.autoHideTimer = setTimeout(function () {
                    onHide();
                }, autoHideDuration);
            }
        });
    },

    onMouseUp(e) {

        if (!this.state.open) {
            return;
        }

        e = e || window.event;
        const target = e.target || e.srcElement;

        const main = ReactDOM.findDOMNode(this);

        // 点击不在 snackBar 内部
        if (main !== target && !dom.contains(main, target)) {
            this.onHide();
            return;
        }
    },

    render() {

        let {
            message,
            action,
            direction
        } = this.props;

        let {open} = this.state;

        const className = cx(this.props)
            .addStates({open})
            .addVariants(`direction-${direction}`)
            .build();

        return (
            <div className={className}>
                <span className={cx().part('message').build()}>
                    {message}
                </span>
                <Button
                    variants={['snackbar']}
                    className={cx().part('action').build()}
                    onClick={this.onHide} >
                    {action}
                </Button>
            </div>
        );

    }

});

const {PropTypes} = React;

SnackBar.defaultProps = {
    autoHideDuration: 0,
    action: '关闭',
    direction: 'bl'
};

SnackBar.propTypes = {
    action: PropTypes.string,
    autoHideDuration: PropTypes.number,
    message: PropTypes.node.isRequired,
    openOnMount: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    direction: PropTypes.oneOf(['tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt', 'tl', 'tc', 'rc', 'bc', 'lc'])
};


SnackBar.show = function (message, duration = 0, direction = 'bl') {

    let doc = document;
    let body = doc.body;
    let container = doc.createElement('div');

    body.appendChild(container);

    let snackbar = (
        <SnackBar
            autoHideDuration={duration}
            message={message}
            direction={direction}
            onHide={() => {

                // 这里 delay 400 是因为要等动画搞完
                setTimeout(
                    () => {
                        if (container) {
                            ReactDOM.unmountComponentAtNode(container);
                            body.removeChild(container);
                            body = doc = container = snackbar = null;
                        }
                    },
                    400
                );

            }} />
    );

    ReactDOM.render(snackbar, container, () => {
        snackbar = React.cloneElement(snackbar, {open: true});
        setTimeout(
            () => {
                ReactDOM.render(snackbar, container);
            },
            0
        );
    });

    return snackbar;
};

module.exports = SnackBar;
