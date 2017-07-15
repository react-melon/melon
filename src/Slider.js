/**
 * @file melon/Slider
 * @author cxtom <cxtom2008@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';
import SliderBar from './slider/Bar';
import getNewValue from './slider/getNewValue';

const cx = create('Slider');


/**
 * melon/Slider
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class Slider extends InputComponent {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     * @param  {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseChange = this.onMouseChange.bind(this);

        const {maximum, minimum} = props;
        const value = this.state.value;

        this.state.value = value > maximum ? maximum : value;
        this.state.value = value < minimum ? minimum : value;

        /**
         * 状态
         *
         * @protected
         * @type {Object}
         */
        this.state = {
            ...this.state,
            active: false
        };
    }

    /**
     * 将要Unmount时的处理
     *
     * @public
     * @override
     */
    componentWillUnmount() {

        /**
         * bar
         *
         * @protected
         * @type {HTMLElement}
         */
        this.slider = null;
    }

    /**
     * 鼠标抬起时的处理
     *
     * @protected
     */
    onMouseUp() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseChange);
        this.setState({active: false});
    }

    /**
     * 鼠标移动时的处理
     *
     * @protected
     * @param  {{clientX: number}} e 事件对象
     */
    onMouseChange(e) {

        const clientX = e.clientX;

        const {maximum, minimum, step} = this.props;
        const value = this.state.value;

        const newValue = getNewValue(this.slider, clientX, maximum, minimum, step);

        if (value === newValue || newValue > maximum || newValue < minimum) {
            return;
        }

        this.onSliderChange(newValue);
    }

    /**
     * 数值改变时调用
     *
     * @protected
     * @param  {number} newValue 新值
     */
    onSliderChange(newValue) {
        super.onChange({
            type: 'change',
            target: this,
            value: newValue
        });
    }

    /**
     * 鼠标按下时的处理
     *
     * @protected
     * @param  {Object} e 事件对象
     * @return {undefined}
     */
    onMouseDown(e) {

        if (this.props.disable || this.props.readOnly || e.button !== 0) {
            return;
        }

        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseChange);

        this.onMouseChange(e);

        this.setState({active: true});
    }

    /**
     * 获得当前值
     *
     * @public
     * @return {number} 当前值
     */
    getSliderValue() {
        return this.state.value;
    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement}
     */
    renderHiddenInput() {

        const value = this.state.value;

        return (
            <input
                type="hidden"
                value={value} />
        );
    }

    /**
     * 渲染bar
     *
     * @protected
     * @return {ReactElement}
     */
    renderBar() {

        return (
            <SliderBar
                {...this.props}
                ref={slider => {
                    this.slider = ReactDOM.findDOMNode(slider);
                }}
                active={this.state.active}
                onMouseDown={this.onMouseDown}
                value={this.getSliderValue()} />
        );
    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            width,
            style = {}
        } = this.props;

        const className = cx(this.props)
            .addStates(this.getStyleStates())
            .build();

        return (
            <div
                style={{...style, width}}
                className={className}>
                {this.renderHiddenInput()}
                {this.renderBar()}
            </div>
        );

    }
}

Slider.displayName = 'Slider';

Slider.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: 0,
    maximum: 100,
    minimum: 0,
    step: 1,
    width: '100%',
    height: 2
};

Slider.propTypes = {
    ...InputComponent.propTypes,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    maximum: PropTypes.number,
    minimum: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pointerSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
