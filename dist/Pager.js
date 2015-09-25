define('melon/Pager', [
    'exports',
    './babelHelpers',
    'react',
    'underscore',
    './Icon',
    './common/util/classname',
    'react-dom',
    './MainClickAware'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var _ = require('underscore');
    var Icon = require('./Icon');
    var cx = require('./common/util/classname');
    var ReactDOM = require('react-dom');
    var MainClickAware = require('./MainClickAware');
    var Pager = function (_MainClickAware) {
        babelHelpers.inherits(Pager, _MainClickAware);
        function Pager(props) {
            babelHelpers.classCallCheck(this, Pager);
            babelHelpers.get(Object.getPrototypeOf(Pager.prototype), 'constructor', this).call(this, props);
            this.state = { page: this.props.page || 0 };
        }
        babelHelpers.createClass(Pager, [
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(Pager.prototype), 'getVariants', this).call(this, props) || [];
                    if (props.useLang) {
                        variants.push('lang');
                    }
                    return variants;
                }
            },
            {
                key: 'onMainClick',
                value: function onMainClick(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        e.cancelBubble = true;
                    }
                    var main = ReactDOM.findDOMNode(this);
                    var role = target.getAttribute('data-role');
                    while (role !== 'pager-item' && target !== main) {
                        target = target.parentNode;
                        role = target.getAttribute('data-role');
                    }
                    if (target === main) {
                        return;
                    }
                    var page = target.getAttribute('data-page') - 0;
                    target = null;
                    if (this.state.page === page) {
                        return;
                    }
                    this.setState({ page: page }, function () {
                        var onChange = this.props.onChange;
                        _.isFunction(onChange) && onChange({
                            target: this,
                            page: page
                        });
                    });
                }
            },
            {
                key: 'range',
                value: function range(start, stop, paddingLeft, paddingRight) {
                    return start + paddingLeft < stop - paddingRight ? _.range(start, start + paddingLeft).concat(-start - paddingLeft).concat(_.range(stop - paddingRight, stop)) : _.range(start, stop);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var total = props.total;
                    var first = props.first;
                    var padding = props.padding;
                    var showCount = props.showCount;
                    var lang = props.lang;
                    var page = this.state.page;
                    showCount = showCount > total ? total : showCount;
                    page = page - first;
                    var wing = Math.floor(showCount / 2);
                    var paddingLeft = padding;
                    var wingLeft = wing;
                    var paddingRight = padding;
                    var wingRight = wing;
                    var reduceLeftToRight = page - wing;
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
                    });
                    result = result.map(function (conf) {
                        if (_.isNumber(conf)) {
                            var part = conf >= 0 ? '' : 'ellipsis';
                            conf = {
                                page: Math.abs(conf) + first,
                                states: { ellipsis: !!part },
                                part: part
                            };
                        } else {
                            conf.page += first;
                        }
                        return this.renderItem(conf);
                    }, this);
                    var propTemp = _.clone(props);
                    delete propTemp.lang;
                    return React.createElement('ul', babelHelpers._extends({}, propTemp, { className: this.getClassName() }), result);
                }
            },
            {
                key: 'renderItem',
                value: function renderItem(conf) {
                    var page = conf.page;
                    var part = conf.part;
                    var props = this.props;
                    var anchor = props.anchor;
                    var useLang = props.useLang;
                    var classNames = cx.create(cx.createPrimaryClass('pager-item'), cx.createStateClass(conf.states));
                    var pageText;
                    if (!useLang && part) {
                        pageText = React.createElement(Icon, { icon: Pager.ICONS[part] });
                    } else {
                        var lang = props.lang;
                        pageText = lang[part] || page + 1;
                    }
                    return React.createElement('li', {
                        className: classNames,
                        key: part + page,
                        'data-role': 'pager-item',
                        'data-page': page
                    }, React.createElement('a', { href: '#' }, pageText));
                }
            }
        ]);
        return Pager;
    }(MainClickAware);
    Pager.defaultProps = babelHelpers._extends({}, MainClickAware.defaultProps, {
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
    });
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