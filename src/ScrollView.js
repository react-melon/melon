/**
 * @file esui-react/ScrollView
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const Bar = require('./scrollview/Bar');
const cx = require('./common/util/cxBuilder').create('scrollview');

const _ = require('underscore');

const DIRECTIONS = {
    vertical: 'deltaY',
    horizontal: 'deltaX'
};

const SIZES = {
    vertical: 'offsetHeight',
    horizontal: 'offsetWidth'
};

const ScrollView = React.createClass({

    displayName: 'ScrollView',

    getInitialState() {

        this.thumbSize = {
            vertical: 0,
            horizontal: 0
        };

        this.timer = null;

        return {
            position: {
                vertical: 0,
                horizontal: 0
            }
        };

    },

    componentDidMount() {
        this.updateContentSize();
        this.setState({position: {
            vertical: 0,
            horizontal: 0
        }});
    },

    componentDidUpdate() {
        this.updateContentSize();
    },

    updateContentSize() {

        let {
            main,
            content
        } = this.refs;

        let {
            position
        } = this.state;

        _.each(this.getDirections(), function (key) {
            let contentSize = content[SIZES[key]];
            let mainSize = main[SIZES[key]];
            this.thumbSize[key] = mainSize === contentSize
                            ? 0
                            : Math.round(mainSize * mainSize / contentSize);

            let top = Math.round(position[key] * contentSize * (1 - mainSize / contentSize));
            content.style[key === 'vertical' ? 'top' : 'left'] = (-top) + 'px';
        }, this);
    },

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
    },

    onWheel(e) {

        let directions = this.getDirections();

        let {
            wheelSpeed
        } = this.props;

        let current = this.state.position;

        _.each(directions, function (name) {
            let percentDelta = e[DIRECTIONS[name]] * wheelSpeed;
            current[name] += percentDelta;
            let percent = current[name];
            if (percent >= 0.005 && percent <= 0.995) {
                e.preventDefault();
            }
        });

        this.setScrollPercent(current);

        if (directions.length === 2) {
            e.preventDefault();
        }

    },

    setScrollPercent(percent) {

        let position = this.state.position;

        _.each(Object.keys(percent), function (key) {
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
                position,
                target: this
            });
        });
    },

    getDirections() {
        let {
            direction
        } = this.props;

        return direction === 'both' ? Object.keys(DIRECTIONS) : [direction];
    },

    renderScrollBar() {

        let directions = this.getDirections();

        let {
            position
        } = this.state;

        return directions.map(function (dir, index) {

            let size = this.thumbSize[dir];

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
        }, this);
    },

    render() {

        const props = this.props;

        const {
            children,
            ...others
        } = props;

        const styles = _.pick(props, 'height', 'width');

        return (
            <div
                {...others}
                className={cx(props).addVariants(this.getDirections()).build()}
                style={styles}
                onWheel={this.onWheel}
                ref="main">
                {this.renderScrollBar()}
                <div ref="content" className={cx().part('main').build()}>
                    {children}
                </div>
            </div>
        );

    }

});

const PropTypes = React.PropTypes;

ScrollView.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
    wheelSpeed: PropTypes.number,
    onScroll: PropTypes.func
};

ScrollView.defaultProps = {
    direction: 'vertical',
    wheelSpeed: 0.005
};

module.exports = ScrollView;
