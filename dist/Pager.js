/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Icon', './common/util/cxBuilder', './common/util/array', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Icon'), require('./common/util/cxBuilder'), require('./common/util/array'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Icon, global.cxBuilder, global.array, global.babelHelpers);
        global.Pager = mod.exports;
    }
})(this, function (exports, _react, _Icon, _cxBuilder, _array, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    /**
     * @file melon/Pager
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Pager');

    var Pager = function (_Component) {
        babelHelpers.inherits(Pager, _Component);

        function Pager(props) {
            babelHelpers.classCallCheck(this, Pager);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            var _props$page = props.page;
            var page = _props$page === undefined ? 0 : _props$page;


            _this.state = { page: page };

            _this.onMainClick = _this.onMainClick.bind(_this);

            return _this;
        }

        Pager.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var page = nextProps.page;
            var total = nextProps.total;

            if (page < 0) {
                page = 0;
            } else if (page > total) {
                page = total - 1;
            }

            if (page !== this.state.page) {
                this.setState({ page: page });
            }
        };

        Pager.prototype.onMainClick = function onMainClick(e) {
            var _this2 = this;

            var currentTarget = e.currentTarget;
            var target = e.target;


            e.preventDefault();

            // 不加这个React会报错 ISSUE#4865
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

            var _props = this.props;
            var first = _props.first;
            var onChange = _props.onChange;


            var page = +target.getAttribute('data-page') + first;

            target = null;

            if (this.state.page === page) {
                return;
            }

            this.setState({ page: page }, onChange ? function () {
                return onChange({ target: _this2, page: page });
            } : null);
        };

        Pager.prototype.range = function range(start, stop, paddingLeft, paddingRight) {
            return start + paddingLeft < stop - paddingRight ? [].concat((0, _array.range)(start, start + paddingLeft), [-start - paddingLeft], (0, _array.range)(stop - paddingRight, stop)) : (0, _array.range)(start, stop);
        };

        Pager.prototype.renderItem = function renderItem(conf) {
            var page = conf.page;
            var part = conf.part;
            var states = conf.states;
            var _props2 = this.props;
            var lang = _props2.lang;
            var useLang = _props2.useLang;


            var classNames = cx().part('item').addStates(states).build();

            var pageText = void 0;

            if (!useLang && part) {
                pageText = _react2['default'].createElement(_Icon2['default'], { icon: Pager.ICONS[part] });
            } else {
                pageText = lang[part] || page + 1;
            }

            return _react2['default'].createElement(
                'li',
                {
                    className: classNames,
                    key: part + page,
                    'data-role': 'pager-item',
                    'data-page': page },
                _react2['default'].createElement(
                    'a',
                    { href: '#' },
                    pageText
                )
            );
        };

        Pager.prototype.render = function render() {
            var _this3 = this;

            var props = this.props;
            var state = this.state;
            var total = props.total;
            var first = props.first;
            var padding = props.padding;
            var showCount = props.showCount;
            var useLang = props.useLang;
            var lang = props.lang;
            var showAlways = props.showAlways;
            var others = babelHelpers.objectWithoutProperties(props, ['total', 'first', 'padding', 'showCount', 'useLang', 'lang', 'showAlways']);
            var page = state.page;


            showCount = showCount > total ? total : showCount;
            page = page - first;

            var wing = Math.floor(showCount / 2);

            var paddingLeft = padding;
            var paddingRight = padding;
            var reduceLeftToRight = page - wing;

            var wingLeft = wing;
            var wingRight = wing;

            // 如果wingLeft小于0, 那么把小于0的部分移动到wingRight
            if (reduceLeftToRight < 0) {
                wingLeft += reduceLeftToRight;
                wingRight -= reduceLeftToRight;
            }

            var reduceRightToLeft = page + wing + 1 - total;

            // 如果wingRight大于total, 那么把超长的部分移动到wingLeft
            if (reduceRightToLeft > 0) {
                wingLeft += reduceRightToLeft;
                wingRight -= reduceRightToLeft;
            }

            // 生成左半端页码
            var left = this.range(0, page, paddingLeft, wingLeft);
            // 生成右半端页码
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
                states: {
                    current: true
                },
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
                        states: {
                            ellipsis: !!part
                        },
                        part: part
                    };
                }

                return _this3.renderItem(conf);
            });

            return _react2['default'].createElement(
                'ul',
                babelHelpers['extends']({}, others, {
                    className: cx(props).addVariants(useLang ? 'lang' : null).build(),
                    onClick: this.onMainClick }),
                result
            );
        };

        return Pager;
    }(_react.Component);

    exports['default'] = Pager;


    Pager.displayName = 'Pager';

    Pager.defaultProps = {

        // 当前页，第一页从0开始
        page: 0,

        // 起始页码
        first: 0,

        // 首尾显示的页码个数
        padding: 1,

        // 是否一直显示分页控件
        showAlways: false,

        // 当页数较多时，中间显示页码的个数
        showCount: 5,

        // 总页数
        total: 0,

        // 是否可用
        disabled: false,

        useLang: false,

        // 上下页显示文字
        lang: {

            // 上一页显示文字
            prev: '上一页',

            // 下一页显示文字
            next: '下一页',

            // 省略号
            ellipsis: '...'
        }
    };

    Pager.propTypes = {
        disabled: _react.PropTypes.bool,
        type: _react.PropTypes.string,
        page: _react.PropTypes.number,
        first: _react.PropTypes.number,
        padding: _react.PropTypes.number,
        showAlways: _react.PropTypes.bool,
        showCount: _react.PropTypes.number,
        total: _react.PropTypes.number,
        useLang: _react.PropTypes.bool,
        lang: _react.PropTypes.shape({
            prev: _react.PropTypes.string,
            ellipsis: _react.PropTypes.string,
            next: _react.PropTypes.string
        })
    };

    Pager.ICONS = {
        prev: 'navigate-before',
        next: 'navigate-next',
        ellipsis: 'keyboard-control'
    };
});