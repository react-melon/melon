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
        babelHelpers.createClass(ScrollView, null, [{
                key: 'displayName',
                value: 'ScrollView',
                enumerable: true
            }]);
        function ScrollView(props) {
            babelHelpers.classCallCheck(this, ScrollView);
            _Component.call(this, props);
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
        ScrollView.prototype.componentDidMount = function componentDidMount() {
            this.updateContentSize();
            this.setState({
                position: {
                    vertical: 0,
                    horizontal: 0
                }
            });
        };
        ScrollView.prototype.componentDidUpdate = function componentDidUpdate() {
            this.updateContentSize();
        };
        ScrollView.prototype.getVariants = function getVariants(props) {
            var variants = _Component.prototype.getVariants.call(this, props);
            variants = variants.concat(this.getDirections());
            return variants;
        };
        ScrollView.prototype.updateContentSize = function updateContentSize() {
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
        };
        ScrollView.prototype.onAction = function onAction(direction, e) {
            var action = e.action;
            var position = e.position;
            switch (action) {
            case 'change':
                var pos = {};
                pos[direction] = position;
                this.setScrollPercent(pos);
                break;
            }
        };
        ScrollView.prototype.onWheel = function onWheel(e) {
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
        };
        ScrollView.prototype.setScrollPercent = function setScrollPercent(percent) {
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
        };
        ScrollView.prototype.getDirections = function getDirections() {
            var direction = this.props.direction;
            return direction === 'both' ? Object.keys(DIRECTIONS) : [direction];
        };
        ScrollView.prototype.render = function render() {
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
        };
        ScrollView.prototype.renderScrollBar = function renderScrollBar() {
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
        };
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