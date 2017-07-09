/**
 * @file melon/Tooltip
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Popover from './Popover';

const cx = create('Tooltip');

const DIRECTION_ALIGNMENT_MAP = {
    top: ['tc', 'bc'],
    bottom: ['bc', 'tc'],
    left: ['cl', 'cr'],
    right: ['cr', 'cl']
};

const DIRECTION_OFFSET_MAP = {
    top: [0, -1],
    bottom: [0, 1],
    left: [-1, 0],
    right: [1, 0]
};

const MODES = {
    over: 'over',
    click: 'click'
};

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
        this.onRequestClose = this.onRequestClose.bind(this);
        this.hide = this.hide.bind(this);

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            open: false
        };

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

    onRequestClose() {
        if (this.props.mode === 'click') {
            this.hide();
        }
    }

    /**
     * 改变当前显示状态
     *
     * @public
     */
    toggle() {
        this.state.open ? this.hide() : this.show();
    }

    /**
     * 显示tip
     *
     * @public
     */
    show() {
        this.setState({open: true});
    }

    /**
     * 隐藏tip
     *
     * @public
     */
    hide() {
        this.setState({open: false});
    }

    getPopoverAlignment() {

        let {
            offset,
            direction
        } = this.props;

        let [layerAlignment, anchorAlignment] = DIRECTION_ALIGNMENT_MAP[direction];
        let layerOffset = DIRECTION_OFFSET_MAP[direction].map(i => i * offset);

        return {
            layerAlignment,
            anchorAlignment,
            layerOffset
        };

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        let {
            mode,
            direction,
            children,
            style,
            content,
            maxHeight,
            closeDelay
        } = this.props;

        let eventHanlders = mode === MODES.click
            ? {
                onClick: this.onClick
            }
            : {
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave
            };

        let innerEventHandlers = mode === MODES.over ? eventHanlders : null;

        let className = cx(this.props).addVariants(direction).build();
        let alignment = this.getPopoverAlignment();

        return (
            <div
                {...eventHanlders}
                ref="main"
                style={style}
                className={className}>
                {children}
                <Popover
                    {...alignment}
                    closeDelay={closeDelay}
                    open={this.state.open}
                    variants={['tooltip']}
                    maxHeight={maxHeight}
                    autoWidth={true}
                    useLayerMask={false}
                    anchor={this.refs.main}
                    onRequestClose={this.onRequestClose}>
                    <div
                        {...innerEventHandlers}
                        className={cx.getPartClassName('popover')}>
                        {content}
                    </div>
                </Popover>
            </div>
        );
    }

}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
    direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    mode: PropTypes.oneOf(['over', 'click']),
    content: PropTypes.node.isRequired,
    offset: PropTypes.number,
    closeDelay: PropTypes.number
};

Tooltip.defaultProps = {
    direction: 'bottom',
    mode: 'over',
    offset: 14
};
