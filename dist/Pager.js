define('melon/Pager', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'underscore',
    './Icon',
    './common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _ = require('underscore');
    var Icon = require('./Icon');
    var cx = require('./common/util/cxBuilder').create('Pager');
    var Pager = React.createClass({
        displayName: 'Pager',
        getInitialState: function () {
            return { page: this.props.page || 0 };
        },
        onMainClick: function (e) {
            var _this = this;
            var currentTarget = e.currentTarget;
            var target = e.target;
            e.preventDefault();
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            var role = target.getAttribute('data-role');
            while (role !== 'pager-item' && target !== currentTarget) {
                target = target.parentNode;
                role = target.getAttribute('data-role');
            }
            if (target === currentTarget) {
                return;
            }
            var page = +target.getAttribute('data-page') + this.props.first;
            target = null;
            if (this.state.page === page) {
                return;
            }
            this.setState({ page: page }, function () {
                var onChange = _this.props.onChange;
                _.isFunction(onChange) && onChange({
                    target: _this,
                    page: page
                });
            });
        },
        range: function (start, stop, paddingLeft, paddingRight) {
            return start + paddingLeft < stop - paddingRight ? _.range(start, start + paddingLeft).concat(-start - paddingLeft).concat(_.range(stop - paddingRight, stop)) : _.range(start, stop);
        },
        renderItem: function (conf) {
            var page = conf.page;
            var part = conf.part;
            var states = conf.states;
            var _props = this.props;
            var lang = _props.lang;
            var useLang = _props.useLang;
            var classNames = cx().part('item').addStates(states).build();
            var pageText = undefined;
            if (!useLang && part) {
                pageText = React.createElement(Icon, { icon: Pager.ICONS[part] });
            } else {
                pageText = lang[part] || page + 1;
            }
            return React.createElement('li', {
                className: classNames,
                key: part + page,
                'data-role': 'pager-item',
                'data-page': page
            }, React.createElement('a', { href: '#' }, pageText));
        },
        render: function () {
            var _this2 = this;
            var props = this.props;
            var state = this.state;
            var total = props.total;
            var first = props.first;
            var padding = props.padding;
            var showCount = props.showCount;
            var useLang = props.useLang;
            var lang = props.lang;
            var showAlways = props.showAlways;
            var others = babelHelpers.objectWithoutProperties(props, [
                'total',
                'first',
                'padding',
                'showCount',
                'useLang',
                'lang',
                'showAlways'
            ]);
            var page = state.page;
            showCount = showCount > total ? total : showCount;
            page = page - first;
            var wing = Math.floor(showCount / 2);
            var paddingLeft = padding;
            var paddingRight = padding;
            var reduceLeftToRight = page - wing;
            var wingLeft = wing;
            var wingRight = wing;
            if (reduceLeftToRight < 0) {
                wingLeft += reduceLeftToRight;
                wingRight -= reduceLeftToRight;
            }
            var reduceRightToLeft = page + wing + 1 - total;
            if (reduceRightToLeft > 0) {
                wingLeft += reduceRightToLeft;
                wingRight -= reduceRightToLeft;
            }
            var left = this.range(0, page, paddingLeft, wingLeft);
            var right = this.range(page + 1, total, wingRight, paddingRight);
            var result = [{
                    page: Math.max(page - 1, 0),
                    states: {
                        prev: true,
                        disabled: page === 0
                    },
                    part: 'prev'
                }].concat(left).concat({
                page: page,
                states: { current: true },
                part: ''
            }).concat(right).concat({
                page: Math.min(page + 1, total - 1),
                states: {
                    next: true,
                    disabled: page >= total - 1
                },
                part: 'next'
            }).map(function (conf) {
                if (typeof conf === 'number') {
                    var part = conf >= 0 ? '' : 'ellipsis';
                    conf = {
                        page: Math.abs(conf),
                        states: { ellipsis: !!part },
                        part: part
                    };
                }
                return _this2.renderItem(conf);
            });
            return React.createElement('ul', babelHelpers._extends({}, others, {
                className: cx(props).addVariants(useLang ? 'lang' : null).build(),
                onClick: this.onMainClick
            }), result);
        }
    });
    Pager.defaultProps = {
        page: 0,
        first: 0,
        padding: 1,
        showAlways: false,
        showCount: 5,
        total: 0,
        disabled: false,
        useLang: false,
        lang: {
            prev: '\u4E0A\u4E00\u9875',
            next: '\u4E0B\u4E00\u9875',
            ellipsis: '...'
        }
    };
    Pager.propTypes = {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        page: React.PropTypes.number,
        first: React.PropTypes.number,
        padding: React.PropTypes.number,
        showAlways: React.PropTypes.bool,
        showCount: React.PropTypes.number,
        total: React.PropTypes.number,
        useLang: React.PropTypes.bool,
        lang: React.PropTypes.shape({
            prev: React.PropTypes.string,
            ellipsis: React.PropTypes.string,
            next: React.PropTypes.string
        })
    };
    Pager.ICONS = {
        prev: 'navigate-before',
        next: 'navigate-next',
        ellipsis: 'keyboard-control'
    };
    module.exports = Pager;
});