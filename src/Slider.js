/**
 * @file melon/Slider
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import InputComponent from './InputComponent';
import Validity from './Validity';
import {create} from './common/util/cxBuilder';
import domUtil from './common/util/dom';

import SliderBar from './slider/Bar';
import getNewValue from './slider/getNewValue';

const cx = create('Slider');

export default class Slider extends InputComponent {

    constructor(props, context) {

        super(props, context);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseChange = this.onMouseChange.bind(this);

        this.state = {
            ...this.state,
            active: false
        };
    }

    componentWillUnmount() {
        this.slider = null;
    }

    onMouseUp() {
        domUtil.off(window, 'mouseup', this.onMouseUp);
        domUtil.off(window, 'mousemove', this.onMouseChange);
        this.setState({active: false});
    }

    onMouseChange({clientX}) {

        const {max, min, step} = this.props;
        const value = this.state.value;

        const newValue = getNewValue(this.slider, clientX, max, min, step);

        if (value === newValue || newValue > max || newValue < min) {
            return;
        }

        this.onSliderChange(newValue);
    }

    onSliderChange(newValue) {
        super.onChange({
            type: 'change',
            target: this,
            value: newValue
        });
    }

    onMouseDown(e) {
        domUtil.on(window, 'mouseup', this.onMouseUp);
        domUtil.on(window, 'mousemove', this.onMouseChange);
        this.onMouseChange(e);

        this.setState({active: true});
    }

    getSliderValue() {
        return this.state.value;
    }

    renderHiddenInput() {

        const value = this.state.value;

        return (
            <input
                type="hidden"
                value={value} />
        );
    }

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

    render() {

        const validity = this.state.validity;

        /* eslint-disable fecs-min-vars-per-destructure */

        const {
            width,
            style = {}
        } = this.props;

        const className = cx(this.props).build();

        return (
            <div
                style={{...style, width}}
                className={className}>
                {this.renderHiddenInput()}
                {this.renderBar()}
                <Validity validity={validity} />
            </div>
        );

    }
}

Slider.displayName = 'Slider';

Slider.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: 0,
    max: 100,
    min: 0,
    step: 1,
    width: '100%',
    height: 2
};

Slider.propTypes = {
    ...InputComponent.propTypes,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pointerSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
