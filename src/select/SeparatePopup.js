/**
 * @file melon/select/SeparatePopup
 * @author leon(ludafa@outlook.com)
 */

let React = require('react');
let Component = require('../Component');
let {Motion, spring} = require('react-motion');
let domUtil = require('../common/util/dom');

class SelectSeparatePopup extends Component {

    static displayName = 'SelectSeparatePopup';

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        // 做一个可以随时释放的 debounce 啦
        this.onWindowResize = (() => {

            let handler = this.onWindowResize.bind(this);

            return () => {
                clearTimeout(this.windowResizeTimer);
                this.windowResizeTimer = setTimeout(handler, 500);
            };

        })();

        this.id = Date.now();

        this.state = {
            ...this.state,
            styles: {
                top: 0,
                left: -5000,
                height: 0,
                opacity: 0,
                width: 0
            }
        };

    }

    componentDidMount() {
        domUtil.on(document.body, 'click', this.onClick);
    }

    componentWillReceiveProps(nextProps) {

        let {open} = nextProps;

        domUtil[open ? 'on' : 'off'](window, 'resize', this.onWindowResize);

        this.setState({
            ...this.state,
            styles: this.getStyle(open)
        });

    }

    componentWillUnmount() {
        domUtil.off(window, 'resize', this.onWindowResize);
        domUtil.off(document.body, 'click', this.onClick);
    }

    render() {

        let {children} = this.props;
        let {styles} = this.state;

        let className = this.getPartClassName('content');

        let {height, opacity} = styles;

        styles = {
            ...styles,
            height: spring(height, [120, 15]),
            opacity: spring(opacity, [120, 15])
        };

        return (
            <Motion
                style={styles}>
                {(style) => {

                    style = {
                        ...style,
                        visibility: style.opacity < 0.1 ? 'hidden' : 'visible'
                    };

                    return (
                        <div
                            ref={(main) => {
                                this.main = main;
                            }}
                            className={this.getClassName()}
                            style={style}>
                            <div className={className} >
                                {children}
                            </div>
                        </div>
                    );
                }}
            </Motion>
        );

    }

    getStyle(open) {

        if (!open) {
            return {
                ...this.state.styles,
                height: 0,
                opacity: 0
            };
        }

        let target = this.props.target;
        let {main} = this;

        let targetPosition = domUtil.getPosition(target);

        let {
            top,
            left,
            width,
            height,
            overflow
        } = main.style;

        // 先把这个货弄走，展开计算它的宽度和高度
        main.style.top = '0';
        main.style.left = '-5000px';
        main.style.overflow = 'visible';
        main.style.height = 'auto';
        main.style.width = 'auto';

        let popupPosition = domUtil.getPosition(main);

        main.style.top = top;
        main.style.left = left;
        main.style.overflow = overflow;
        main.style.height = height;
        main.style.width = width;

        let scrollTop = domUtil.getScrollTop();
        let scrollLeft = domUtil.getScrollLeft();
        let clientWidth = domUtil.getClientWidth();
        let clientHeight = domUtil.getClientHeight();

        let rTop;
        let rLeft;

        // 首先计算垂直位置
        // 如垂直位置从目标的上边缘开始，如果加上浮层高度，未溢出视野，那么就取目标上边缘
        if (targetPosition.top + popupPosition.height < scrollTop + clientHeight) {
            rTop = targetPosition.top;
        }
        // 否则尽量贴在视野的底边上，如果此时浮层顶部溢出了视野，那说明视野就是太小了。。。
        else {
            rTop = clientHeight + scrollTop - popupPosition.height - 20;
        }

        // 然后计算水平位置
        // 尝试以目标的左边缘开始，如果加上浮层宽宽未溢出视野，那么取目标左边缘
        if (targetPosition.left + popupPosition.width < clientWidth + scrollLeft) {
            rLeft = targetPosition.left;
        }
        // 否则尽量贴在视野的右边，如果此时浮层左侧溢出视野，那说明视野就是太小了。
        else {
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

    onClick(e) {

        let {target} = e;
        let {main} = this;
        let {onHide, open} = this.props;

        if (open && main !== target && !domUtil.contains(main, target)) {
            onHide && onHide();
        }

    }

    onWindowResize() {
        this.setState({
            ...this.state,
            styles: this.getStyle(true)
        });
    }

}

let {PropTypes} = React;

SelectSeparatePopup.propTypes = {
    ...Component.propTypes,
    target: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired
};

module.exports = SelectSeparatePopup;
