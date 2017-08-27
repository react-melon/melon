/**
 * @file melon/TouchRipple
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import Circle from './Circle';
import {create} from 'melon-core/classname/cxBuilder';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const cx = create('TouchRipple');

export default class TouchRipple extends PureComponent {

    constructor(props) {

        super(props);

        this.state = {
            ripples: [],
            index: 0
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.removeRipple = this.removeRipple.bind(this);
        this.renderRipple = this.renderRipple.bind(this);

    }

    onMouseDown(e) {
        let {clientX, clientY, button} = e;
        if (button !== 0) {
            return;
        }
        let main = findDOMNode(this);
        let {top, left, width, height} = main.getBoundingClientRect();

        left = clientX - left;
        top = clientY - top;

        this.addRipple({
            left,
            top,
            width: Math.max(left, width - left) * 2,
            height: Math.max(top, height - top) * 2
        });

    }

    addRipple(ripple) {
        let {ripples, index} = this.state;
        this.setState({
            ripples: [
                ...ripples,
                {...ripple, id: index}
            ],
            index: index + 1
        });
    }

    removeRipple() {
        if (this.state.ripples.length) {
            this.setState({
                ripples: this.state.ripples.slice(1)
            });
        }
    }

    renderRipple({left, top, width, height, id}) {
        return (
            <Circle
                key={id}
                left={left}
                top={top}
                size={Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))}
                color={this.props.color}
            />
        );
    }

    render() {
        return (
            <TransitionGroup
                className={cx(this.props).build()}
                component="div"
                onMouseDown={this.onMouseDown}
                onMouseUp={this.removeRipple}
                onMouseLeave={this.removeRipple}>
                {this.state.ripples.map(this.renderRipple)}
            </TransitionGroup>
        );
    }

}

TouchRipple.defaultProps = {
    color: '#000'
};

TouchRipple.propTypes = {
    color: PropTypes.string
};
