/**
 * @file esui-react/ScrollViewBar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('../common/util/cxBuilder').create('ScrollviewBar');

const dom = require('../common/util/dom');
const _ = require('underscore');

const ScrollViewBar = React.createClass({

    displayName: 'ScrollViewBar',

    getInitialState() {

        this.removeStateShow = _.throttle.call(this, this.removeStateShow, 100);

        return {};
    },

    componentDidMount() {
        this.positionThumb();
    },

    shouldComponentUpdate(nextProps) {
        if (Math.abs(nextProps.position - this.props.position) < 0.0005) {
            return false;
        }
        dom.addClass(this.refs.main, 'state-show');
        this.removeStateShow();
        return true;
    },

    componentDidUpdate() {
        this.positionThumb();
    },

    componentWillUnmount() {
        this.clearTimer();
    },

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
    },

    getMousePosition(e, isVertical) {
        if (isVertical) {
            return e.pageY || e.clientY;
        }
        return e.pageX || e.clientX;
    },

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    },

    removeStateShow() {
        this.clearTimer();
        let main = this.refs.main;
        this.timer = setTimeout(function () {
            dom.removeClass(main, 'state-show');
        }, 1800);
    },

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

        let {
            main
        } = this.refs;

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
    },

    onMouseDown(e) {
        let body = document.body;
        dom.addClass(body, 'ui-noselect');

        let isVertical = this.props.direction === 'vertical';
        let axis = isVertical ? 'top' : 'left';

        this.thumbStart = parseInt(this.refs.thumb.style[axis], 10) || 0;
        this.moveStart = this.getMousePosition(e, isVertical);

        dom.on(body, 'mousemove', this.onMouseMove);
        dom.on(body, 'mouseup', this.onMouseUp);

        e.preventDefault();
    },

    onMouseMove(e) {

        e = e || window.event;

        let isVertical = this.props.direction === 'vertical';

        let moveLength = this.getMousePosition(e, isVertical);
        moveLength -= this.moveStart;

        let pos = Math.min(this.barSize, Math.max(0, this.thumbStart + moveLength));
        this.fireAction('change', pos / this.barSize);
    },

    onMouseUp(e) {
        let body = document.body;
        dom.removeClass(body, 'ui-noselect');
        dom.off(body, 'mousemove', this.onMouseMove);
        dom.off(body, 'mouseup', this.onMouseUp);
        this.thumbStart = this.moveStart = 0;
    },

    fireAction(action, pos) {
        let e = {
            action,
            position: pos,
            target: this
        };

        let onAction = this.props.onAction;

        onAction && onAction(e);
    },

    render() {

        return (
            <div
                {...this.props}
                ref="main"
                className={cx(this.props).addVariants(this.props.direction).build()}
                onMouseDown={this.onBarMouseDown}>
                <div
                    ref="thumb"
                    className={cx().part('thumb').build()}
                    onMouseDown={this.onMouseDown} />
            </div>
        );

    }

});

const PropTypes = React.PropTypes;

ScrollViewBar.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    position: PropTypes.number.isRequired,
    thumbSize: PropTypes.number,
    show: PropTypes.bool,
    onAction: PropTypes.func
};

module.exports = ScrollViewBar;
