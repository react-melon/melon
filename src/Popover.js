/**
 * @file Popover
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layer from './Layer';
import align from 'dom-align';
import {Motion, spring} from 'react-motion';
import {throttle} from './common/util/fn';
import {getClientHeight, getClientWidth} from './common/util/dom';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Popover');

const ALIGNMENT_TRANSFORM_ORIGIN_MAP = {
    t: 'top',
    l: 'left',
    b: 'bottom',
    r: 'right',
    c: '50%'
};

export default class Popover extends Component {

    constructor(props, context) {

        super(props, context);

        this.onWindowResizeOrScroll = throttle(
            this.onWindowResizeOrScroll.bind(this),
            300,
            {
                leading: true,
                trailing: true
            }
        );

        this.onMotionEnd = this.onMotionEnd.bind(this);
        this.renderLayer = this.renderLayer.bind(this);

        this.setLayer = this.setRef.bind(this, 'layer');

        this.state = {
            closing: false,
            open: props.open
        };

    }

    componentWillReceiveProps(nextProps) {

        let {open, closeDelay} = nextProps;
        let closing = this.state.closing;

        // 从展开状态到关闭: 切换到关闭中
        if (this.state.open !== open) {

            if (!open && closeDelay != null) {
                this.closeTimer = setTimeout(
                    () => this.setState({
                        open,
                        closing: !open && !closing
                    }),
                    closeDelay
                );
                return;
            }

            this.setState({
                open,
                closing: !open && !closing
            });

        }

        // 如果正在延迟收起，又转为展开状态，就把 delayTimer 去掉
        if (open && this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }

    }

    componentDidUpdate() {

        let {
            anchor,
            autoWidth,
            maxHeight
        } = this.props;

        let open = this.state.open;

        let layer = this.layer;

        if (open && anchor && layer) {

            this.alignLayerToAnchor(layer, anchor);

            if (maxHeight != null) {
                layer.style.maxHeight = `${maxHeight}px`;
                layer.style.overflowY = 'auto';
            }
            else {
                layer.style.overflowY = layer.style.maxHeight = '';
            }

            if (!autoWidth) {
                this.adjustWidth(layer, anchor);
            }

            this.bindToWindowResizeAndScroll();
            return;
        }

        this.unbindToWindowResizeAndScroll();

    }

    componentWillUnmount() {

        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }

        this.unbindToWindowResizeAndScroll();

    }

    onWindowResizeOrScroll() {

        let {
            anchor,
            onRequestClose
        } = this.props;

        let layer = this.layer;

        if (!this.state.open || !layer || !anchor) {
            return;
        }

        let {
            bottom,
            top,
            left,
            right
        } = anchor.getBoundingClientRect();

        let windowHeight = getClientHeight();
        let windowWidth = getClientWidth();

        // 在视野内
        if (
            top > 0
            && bottom < windowHeight
            && left > 0
            && right < windowWidth
        ) {

            this.alignLayerToAnchor(layer, anchor);
            return;
        }

        onRequestClose && onRequestClose();

    }

    onMotionEnd() {

        if (!this.state.closing) {
            return;
        }

        this.setState({
            closing: false
        });

    }

    bindToWindowResizeAndScroll() {
        window.addEventListener('resize', this.onWindowResizeOrScroll);
        window.addEventListener('scroll', this.onWindowResizeOrScroll);
    }

    unbindToWindowResizeAndScroll() {
        window.removeEventListener('resize', this.onWindowResizeOrScroll);
        window.removeEventListener('scroll', this.onWindowResizeOrScroll);
    }

    alignLayerToAnchor(layer, anchor) {

        let {
            anchorAlignment,
            layerAlignment,
            anchorOffset,
            layerOffset
        } = this.props;

        let transform = layer.style.transform;

        layer.style.transform = '';

        align(
            layer,
            anchor,
            {
                points: [anchorAlignment, layerAlignment],
                overflow: {
                    adjustX: true,
                    adjustY: true
                },
                offset: layerOffset,
                anchorOffset: anchorOffset
            }
        );

        layer.style.transform = transform;

    }

    /* eslint-disable fecs-prefer-destructure */
    /**
     * 调整浮层的宽度，尝试与锚点宽度保持一致
     *
     * @param  {DOM} layer  浮层
     * @param  {DOM} anchor 锚点
     */
    adjustWidth(layer, anchor) {

        let layerOffsetWidth = layer.offsetWidth;
        let anchorOffsetWidth = anchor.offsetWidth;

        if (layerOffsetWidth < anchorOffsetWidth) {
            layer.style.width = `${anchorOffsetWidth}px`;
        }

    }
    /* eslint-enable fecs-prefer-destructure */


    setRef(prop, obj) {
        this[prop] = obj;
    }

    getLayer() {
        return this.layer;
    }

    renderLayer() {

        let className = cx.getPartClassName('layer');
        let {open, closing} = this.state;

        let begin = open && !closing ? 0 : 1;
        let end = open && !closing ? 1 : 0;

        let transformOrigin = this.props.anchorAlignment
            .split('')
            .map(direction => ALIGNMENT_TRANSFORM_ORIGIN_MAP[direction])
            // 我们的方向是先垂直再水平，和 css 中的 tranform-origin 是反的，所以要 reverse 一下
            .reverse()
            .join(' ');

        return (
            <Motion
                defaultStyle={{
                    opacity: begin,
                    scale: begin
                }}
                style={{
                    opacity: spring(end),
                    scale: spring(end, {stiffness: 260, damping: 20})
                }}
                onRest={this.onMotionEnd}>
                {({scale, opacity}) => (
                    <div
                        className={className}
                        ref={this.setLayer}
                        style={{
                            opacity: opacity,
                            transform: `scale(${scale}, ${scale})`,
                            transformOrigin
                        }}>
                        {this.props.children}
                    </div>
                )}
            </Motion>
        );
    }

    render() {

        let {
            onRequestClose,
            useLayerMask,
            anchor,
            variants
        } = this.props;

        let {open, closing} = this.state;

        return (
            <Layer
                variants={variants}
                render={this.renderLayer}
                open={anchor && (open || closing)}
                useLayerMask={useLayerMask}
                onClickAway={onRequestClose} />
        );

    }

}

export const alignments = [
    'tl', 'tc', 'tr',
    'cl', 'cc', 'cr',
    'bl', 'bc', 'br'
];

Popover.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    useLayerMask: PropTypes.bool,
    anchorAlignment: PropTypes.oneOf(alignments),
    layerAlignment: PropTypes.oneOf(alignments),
    anchorOffset: PropTypes.arrayOf(PropTypes.number),
    layerOffset: PropTypes.arrayOf(PropTypes.number),
    autoWidth: PropTypes.bool,
    closeDelay: PropTypes.number
};

Popover.defaultProps = {
    open: false,
    anchorAlignment: 'tl',
    layerAlignment: 'tl',
    useLayerMask: false,
    autoWidth: false
};
