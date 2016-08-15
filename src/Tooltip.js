/**
 * @file melon/Tooltip
 * @author leon(ludafa@outlook.com)
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import dom from './common/util/dom';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Tooltip');

/**
 * melon/Tooltip
 *
 * @extends {React.Component}
 * @class
 */
export default class Tooltip extends Component {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     */
    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            isShown: false
        };

    }

    /**
     * 将要Mount时的处理
     *
     * @public
     * @override
     */
    componentDidMount() {
        const popup = this.popup = Tooltip.createPopup();
        this.renderPopup(popup, this.props.content);
    }

    /**
     * 将要Unmount时的处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {
        Tooltip.destroyPopup(this.popup);

        /**
         * 弹出层的dom
         *
         * @protected
         * @type {HTMLElement}
         */
        this.popup = null;
    }

    /**
     * 状态更新时的处理
     *
     * @public
     * @override
     */
    componentDidUpdate() {
        this.renderPopup(this.popup, this.props.content);
    }

    /**
     * 点击时的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onClick(e) {
        this.toggle();
    }

    /**
     * 鼠标进入时的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMouseEnter(e) {
        this.show();
    }

    /**
     * 点击离开的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     */
    onMouseLeave(e) {
        this.hide();
    }

    /**
     * 当前是否显示
     *
     * @public
     * @return {boolean}
     */
    isShown() {
        return this.state.isShown;
    }

    /**
     * 改变当前显示状态
     *
     * @public
     */
    toggle() {
        this.isShown() ? this.hide() : this.show();
    }

    /**
     * 显示tip
     *
     * @public
     */
    show() {
        this.setState({isShown: true});
    }

    /**
     * 隐藏tip
     *
     * @public
     */
    hide() {
        this.setState({isShown: false});
    }

    /**
     * 获取位置的样式
     *
     * @protected
     * @return {Object}
     */
    getPosition() {

        const main = this.main;

        if (!this.isShown() || !main) {
            return {
                left: -10000,
                top: 0,
                opacity: 0,
                width: 'auto',
                height: 'auto'
            };
        }

        const props = this.props;

        const {
            direction,
            offsetX,
            offsetY
        } = props;

        const popup = this.popup.childNodes[0];

        const position = dom.getPosition(main);

        const {offsetWidth, offsetHeight} = popup;

        const styles = {opacity: 1};

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

    /**
     * 渲染弹出层
     *
     * @protected
     * @param  {HTMLElement} target  目标dom
     * @param  {string|ReactElement} content 内容
     */
    renderPopup(target, content) {

        ReactDOM.render(
            <div
                className={cx().part('popup').build()}
                style={this.getPosition()}>
                {content}
            </div>,
            target
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;

        const {
            mode,
            direction,
            children,
            style
        } = props;

        const onClick = mode === 'click' ? this.onClick : null;
        const onMouseEnter = mode === 'over' ? this.onMouseEnter : null;
        const onMouseLeave = mode === 'over' ? this.onMouseLeave : null;

        return (
            <div
                ref={main => {
                    if (main) {
                        this.main = main;
                    }
                }}
                style={style}
                className={cx(props).addStates({direction}).build()}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </div>
        );
    }

}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
    arrow: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    mode: PropTypes.oneOf(['over', 'click']),
    content: PropTypes.node.isRequired
};

Tooltip.defaultProps = {
    arrow: true,
    direction: 'bottom',
    mode: 'over',
    offsetX: 14,
    offsetY: 14
};

(function () {

    let container;

    Tooltip.createPopup = function () {

        if (!container) {
            container = document.createElement('div');
            container.className = cx().part('container').build();
            document.body.appendChild(container);
        }

        const popup = document.createElement('div');

        container.appendChild(popup);

        return popup;

    };

    Tooltip.destroyPopup = function (popup) {
        ReactDOM.unmountComponentAtNode(popup);
        container.removeChild(popup);
    };

})();
