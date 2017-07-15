/**
 * @file melon/ScrollView
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Bar from './scrollview/Bar';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('scrollview');

const DIRECTIONS = {
    vertical: 'deltaY',
    horizontal: 'deltaX'
};

const SIZES = {
    vertical: 'offsetHeight',
    horizontal: 'offsetWidth'
};

export default class ScrollView extends Component {

    constructor(props) {

        super(props);

        this.thumbSize = {
            vertical: 0,
            horizontal: 0
        };

        this.timer = null;

        this.onWheel = this.onWheel.bind(this);

        this.state = {
            position: {
                vertical: 0,
                horizontal: 0
            }
        };


    }

    componentDidMount() {
        this.updateContentSize();
        this.setState({
            position: {
                vertical: 0,
                horizontal: 0
            }
        });
    }

    componentDidUpdate() {
        this.updateContentSize();
    }

    updateContentSize() {

        const {
            main,
            content
        } = this.refs;

        const position = this.state.position;

        this.getDirections().forEach(key => {
            let contentSize = content[SIZES[key]];
            let mainSize = main[SIZES[key]];
            this.thumbSize[key] = mainSize === contentSize
                            ? 0
                            : Math.round(mainSize * mainSize / contentSize);

            let top = Math.round(position[key] * contentSize * (1 - mainSize / contentSize));
            content.style[key === 'vertical' ? 'top' : 'left'] = (-top) + 'px';
        });

    }

    onAction(direction, e) {
        let {
            action,
            position
        } = e;

        switch (action) {
            case 'change':
                this.setScrollPercent({
                    [direction]: position
                });
                break;
        }
    }

    onWheel(e) {

        let directions = this.getDirections();

        let wheelSpeed = this.props.wheelSpeed;

        let current = this.state.position;

        directions.forEach(function (name) {

            current[name] += e[DIRECTIONS[name]] * wheelSpeed;

            const percent = current[name];

            if (percent >= 0.005 && percent <= 0.995) {
                e.preventDefault();
            }

        });

        this.setScrollPercent(current);

        if (directions.length === 2) {
            e.preventDefault();
        }

    }

    setScrollPercent(percent) {

        let position = this.state.position;

        Object.keys(percent).forEach(function (key) {

            let pos = percent[key];

            if (pos < 0.005) {
                pos = 0;
            }
            else if (1 - pos < 0.005) {
                pos = 1;
            }

            position[key] = pos;

        });

        this.setState({position}, function () {
            let onScroll = this.props.onScroll;
            onScroll && onScroll({
                position: position,
                target: this
            });
        });

    }

    getDirections() {
        const direction = this.props.direction;
        const directions = direction === 'both'
            ? Object.keys(DIRECTIONS)
            : [direction];
        return directions;
    }

    renderScrollBar() {

        const directions = this.getDirections();

        const position = this.state.position;

        return directions.map((dir, index) => {

            const size = this.thumbSize[dir];

            if (!size) {
                return;
            }

            return (
                <Bar
                    key={dir}
                    thumbSize={size}
                    onAction={this.onAction.bind(this, dir)}
                    position={position[dir]}
                    direction={dir} />
            );

        });
    }

    render() {

        const {
            children,
            height,
            width
        } = this.props;

        const className = cx(this.props)
            .addVariants(this.getDirections())
            .build();

        return (
            <div
                className={className}
                style={{height, width}}
                onWheel={this.onWheel}
                ref="main">
                {this.renderScrollBar()}
                <div ref="content" className={cx.getPartClassName('main')}>
                    {children}
                </div>
            </div>
        );

    }

}

ScrollView.displayName = 'ScrollView';

ScrollView.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
    wheelSpeed: PropTypes.number,
    onScroll: PropTypes.func
};

ScrollView.defaultProps = {
    direction: 'vertical',
    wheelSpeed: 0.005
};
