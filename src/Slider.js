/**
 * @file melon/Slider
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';

import InputComponent from './InputComponent';
import Validity from './Validity';
import {create} from './common/util/cxBuilder';
import domUtil from './common/util/dom';

import SliderBar from './slider/Bar';

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

    onMouseUp() {
        const main = this.refs.main;
        domUtil.off(main, 'mouseup', this.onMouseUp);
        domUtil.off(main, 'mousemove', this.onMouseChange);
        this.setState({active: false});
    }

    onMouseChange({clientX}) {

        const main = this.refs.main;
        const position = domUtil.getPosition(main);

        const {max, min, step} = this.props;
        const value = this.state.value;

        const percent = (clientX - position.left) / position.width;
        let newValue = min + (max - min) * percent;
        newValue = Math.round(newValue / step) * step;

        if (value === newValue || newValue > max || newValue < min) {
            return;
        }

        super.onChange({
            type: 'change',
            target: this,
            value: newValue + ''
        });
    }

    onMouseDown(e) {
        const main = this.refs.main;
        domUtil.on(main, 'mouseup', this.onMouseUp);
        domUtil.on(main, 'mousemove', this.onMouseChange);
        this.onMouseChange(e);

        this.setState({active: true});
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

        const value = +this.state.value;

        return (
            <SliderBar
                {...this.props}
                value={value} />
        );
    }

    render() {

        const validity = this.state.validity;

        /* eslint-disable fecs-min-vars-per-destructure */

        const {
            width,
            style = {}
        } = this.props;

        const active = this.state.active;

        const className = cx(this.props)
            .addStates({active})
            .build();

        return (
            <div
                ref="main"
                style={{...style, width}}
                onMouseDown={this.onMouseDown}
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
    defaultValue: '0',
    max: 100,
    min: 0,
    step: 1,
    width: '100%',
    height: 2
};

Slider.propTypes = {
    ...InputComponent.propTypes,
    max: PropTypes.number,
    min: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
