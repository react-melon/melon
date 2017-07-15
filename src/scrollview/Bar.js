/**
 * @file melon/ScrollViewBar
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import * as dom from '../common/util/dom';
import {throttle} from '../common/util/fn';

const cx = create('ScrollviewBar');

export default class ScrollViewBar extends Component {

    constructor(props) {

        super(props);

        this.removeStateShow = throttle(this.removeStateShow.bind(this), 100);

        this.onBarMouseDown = this.onBarMouseDown.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.state = {};

    }

    componentDidMount() {
        this.positionThumb();
    }

    shouldComponentUpdate(nextProps) {
        return Math.abs(nextProps.position - this.props.position) > 0.0005;
    }

    componentWillReceiveProps(nextProps) {

        if (Math.abs(nextProps.position - this.props.position) > 0.0005) {
            dom.addClass(this.refs.main, 'state-show');
            this.removeStateShow();
        }

    }

    componentDidUpdate() {
        this.positionThumb();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    positionThumb() {

        let {
            main,
            thumb
        } = this.refs;

        let {
            direction,
            position,
            thumbSize
        } = this.props;

        let isVertical = direction === 'vertical';
        let axis = isVertical ? 'top' : 'left';
        this.barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
        thumb.style[isVertical ? 'height' : 'width'] = thumbSize + 'px';
        thumb.style[axis] = Math.round(position * this.barSize) + 'px';

    }

    getMousePosition(e, isVertical) {
        if (isVertical) {
            return e.pageY || e.clientY;
        }
        return e.pageX || e.clientX;
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
            this.removeStateShow.cancel();
        }
    }

    removeStateShow() {
        this.clearTimer();
        this.timer = setTimeout(() => {
            dom.removeClass(this.refs.main, 'state-show');
        }, 1800);
    }

    /**
     * 点击滚动轨道触发
     *
     * @param  {Object} e MouseEvent
     */
    onBarMouseDown(e) {
        let target = e.target;

        if (target === this.refs.thumb) {
            return;
        }

        let {
            direction,
            thumbSize
        } = this.props;

        let main = this.refs.main;

        let me = this;
        let isVertical = direction === 'vertical';
        let axis = isVertical ? 'top' : 'left';

        let barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
        let mousePos = this.getMousePosition(e, isVertical) - dom.getPosition(main)[axis];

        let pos = mousePos - thumbSize / 2;

        pos = pos > barSize ? barSize : pos;
        pos = pos < 0 ? 0 : pos;
        me.fireAction('change', pos / barSize);

        e.preventDefault();
    }

    onMouseDown(e) {
        let body = document.body;
        dom.addClass(body, 'ui-noselect');

        let isVertical = this.props.direction === 'vertical';
        let axis = isVertical ? 'top' : 'left';

        this.thumbStart = parseInt(this.refs.thumb.style[axis], 10) || 0;
        this.moveStart = this.getMousePosition(e, isVertical);

        body.addEventListener('mousemove', this.onMouseMove);
        body.addEventListener('mouseup', this.onMouseUp);

        e.preventDefault();
    }

    onMouseMove(e) {
        e = e || window.event;
        let isVertical = this.props.direction === 'vertical';

        let moveLength = this.getMousePosition(e, isVertical);
        moveLength -= this.moveStart;

        let pos = Math.min(this.barSize, Math.max(0, this.thumbStart + moveLength));
        this.fireAction('change', pos / this.barSize);
    }

    onMouseUp(e) {
        let body = document.body;
        dom.removeClass(body, 'ui-noselect');
        body.removeEventListener('mousemove', this.onMouseMove);
        body.removeEventListener('mouseup', this.onMouseUp);
        this.thumbStart = this.moveStart = 0;
    }

    fireAction(action, pos) {
        let e = {
            action: action,
            position: pos,
            target: this
        };

        let onAction = this.props.onAction;

        onAction && onAction(e);
    }

    render() {

        return (
            <div
                ref="main"
                className={cx(this.props).addVariants(this.props.direction).build()}
                onMouseDown={this.onBarMouseDown}>
                <div
                    ref="thumb"
                    className={cx.getPartClassName('thumb')}
                    onMouseDown={this.onMouseDown} />
            </div>
        );

    }

}

ScrollViewBar.displayName = 'ScrollViewBar';

ScrollViewBar.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    position: PropTypes.number.isRequired,
    thumbSize: PropTypes.number,
    show: PropTypes.bool,
    onAction: PropTypes.func
};
