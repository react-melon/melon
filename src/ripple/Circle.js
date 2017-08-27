/**
 * @file melon/ripple/Circle
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Ripple');

export default class Ripple extends PureComponent {

    constructor(...args) {
        super(...args);
        this.state = {
            stage: 'appearing'
        };
        this.onTransitionEnter = this.onTransitionEnter.bind(this);
        this.onTransitionExit = this.onTransitionExit.bind(this);
    }

    onTransitionEnter() {
        // @HACK
        // 强制触发 reflow 来保证 entering 的 transition 触发
        this.main && this.main.offsetWidth;
        this.setState({
            stage: 'entering'
        });
    }
    onTransitionExit() {
        this.setState({
            stage: 'exiting'
        });
    }

    render() {

        let {
            left,
            top,
            size,
            color,
            ...rest
        } = this.props;

        let {stage} = this.state;

        let className = cx(this.props).addStates({[stage]: true}).build();

        return (
            <Transition
                {...rest}
                timeout={450}
                onEnter={this.onTransitionEnter}
                onExit={this.onTransitionExit}>
                <div
                    className={className}
                    ref={main => (this.main = main)}
                    style={{
                        left: `${Math.round(left - size / 2)}px`,
                        top: `${Math.round(top - size / 2)}px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        color
                    }}
                />
            </Transition>
        );


    }

}

Ripple.displayName = 'Ripple';

Ripple.propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string
};
