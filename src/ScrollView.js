/**
 * @file melon/ScrollView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import Bar from './scrollview/Bar';
import {create} from './common/util/cxBuilder';

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

        const {
            position
        } = this.state;

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
                let pos = {};
                pos[direction] = position;
                this.setScrollPercent(pos);
                break;
        }
    }

    onWheel(e) {

        let directions = this.getDirections();

        let {
            wheelSpeed
        } = this.props;

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
        const {direction} = this.props;
        const directions = direction === 'both' ? Object.keys(DIRECTIONS) : [direction];
        return directions;
    }

    renderScrollBar() {

        const directions = this.getDirections();

        const {position} = this.state;

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
            others,
            height,
            width
        } = this.props;

        return (
            <div
                {...others}
                className={cx(this.props).addVariants(this.getDirections()).build()}
                style={{height, width}}
                onWheel={this.onWheel}
                ref="main">
                {this.renderScrollBar()}
                <div ref="content" className={cx().part('main').build()}>
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
