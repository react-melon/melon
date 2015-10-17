define('melon/ScrollView', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './scrollview/Bar',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Bar = require('./scrollview/Bar');
    var _ = require('underscore');
    var DIRECTIONS = {
        vertical: 'deltaY',
        horizontal: 'deltaX'
    };
    var SIZES = {
        vertical: 'offsetHeight',
        horizontal: 'offsetWidth'
    };
    var ScrollView = function (_Component) {
        babelHelpers.inherits(ScrollView, _Component);
        function ScrollView(props) {
            babelHelpers.classCallCheck(this, ScrollView);
            babelHelpers.get(Object.getPrototypeOf(ScrollView.prototype), 'constructor', this).call(this, props);
            this.state = {
                position: {
                    vertical: 0,
                    horizontal: 0
                }
            };
            this.onWheel = this.onWheel.bind(this);
            this.thumbSize = {
                vertical: 0,
                horizontal: 0
            };
            this.timer = null;
        }
        babelHelpers.createClass(ScrollView, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.updateContentSize();
                    this.setState({
                        position: {
                            vertical: 0,
                            horizontal: 0
                        }
                    });
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.updateContentSize();
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(ScrollView.prototype), 'getVariants', this).call(this, props);
                    variants = variants.concat(this.getDirections());
                    return variants;
                }
            },
            {
                key: 'updateContentSize',
                value: function updateContentSize() {
                    var _refs = this.refs;
                    var main = _refs.main;
                    var content = _refs.content;
                    var position = this.state.position;
                    _.each(this.getDirections(), function (key) {
                        var contentSize = content[SIZES[key]];
                        var mainSize = main[SIZES[key]];
                        this.thumbSize[key] = mainSize === contentSize ? 0 : Math.round(mainSize * mainSize / contentSize);
                        var top = Math.round(position[key] * contentSize * (1 - mainSize / contentSize));
                        content.style[key === 'vertical' ? 'top' : 'left'] = -top + 'px';
                    }, this);
                }
            },
            {
                key: 'onAction',
                value: function onAction(direction, e) {
                    var action = e.action;
                    var position = e.position;
                    switch (action) {
                    case 'change':
                        var pos = {};
                        pos[direction] = position;
                        this.setScrollPercent(pos);
                        break;
                    }
                }
            },
            {
                key: 'onWheel',
                value: function onWheel(e) {
                    var directions = this.getDirections();
                    var wheelSpeed = this.props.wheelSpeed;
                    var current = this.state.position;
                    _.each(directions, function (name) {
                        var percentDelta = e[DIRECTIONS[name]] * wheelSpeed;
                        current[name] += percentDelta;
                        var percent = current[name];
                        if (percent >= 0.005 && percent <= 0.995) {
                            e.preventDefault();
                        }
                    });
                    this.setScrollPercent(current);
                    if (directions.length === 2) {
                        e.preventDefault();
                    }
                }
            },
            {
                key: 'setScrollPercent',
                value: function setScrollPercent(percent) {
                    var position = this.state.position;
                    _.each(Object.keys(percent), function (key) {
                        var pos = percent[key];
                        if (pos < 0.005) {
                            pos = 0;
                        } else if (1 - pos < 0.005) {
                            pos = 1;
                        }
                        position[key] = pos;
                    });
                    this.setState({ position: position }, function () {
                        var onScroll = this.props.onScroll;
                        onScroll && onScroll({
                            position: position,
                            target: this
                        });
                    });
                }
            },
            {
                key: 'getDirections',
                value: function getDirections() {
                    var direction = this.props.direction;
                    return direction === 'both' ? Object.keys(DIRECTIONS) : [direction];
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var children = props.children;
                    var others = props.others;
                    var styles = _.pick(props, 'height', 'width');
                    return React.createElement('div', babelHelpers._extends({}, others, {
                        className: this.getClassName(),
                        style: styles,
                        onWheel: this.onWheel,
                        ref: 'main'
                    }), this.renderScrollBar(), React.createElement('div', {
                        ref: 'content',
                        className: this.getPartClassName('main')
                    }, children));
                }
            },
            {
                key: 'renderScrollBar',
                value: function renderScrollBar() {
                    var directions = this.getDirections();
                    var position = this.state.position;
                    return directions.map(function (dir, index) {
                        var size = this.thumbSize[dir];
                        if (!size) {
                            return;
                        }
                        return React.createElement(Bar, {
                            key: dir,
                            thumbSize: size,
                            onAction: this.onAction.bind(this, dir),
                            position: position[dir],
                            direction: dir
                        });
                    }, this);
                }
            }
        ]);
        return ScrollView;
    }(Component);
    var PropTypes = React.PropTypes;
    ScrollView.propTypes = {
        direction: PropTypes.oneOf([
            'vertical',
            'horizontal',
            'both'
        ]),
        wheelSpeed: PropTypes.number,
        onScroll: PropTypes.func
    };
    ScrollView.defaultProps = {
        direction: 'vertical',
        wheelSpeed: 0.005
    };
    module.exports = ScrollView;
});