/**
 * @file esui-react/Pager
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var cx    = require('./common/util/classname');
var Icon  = require('./Icon.jsx');
var Waves = require('./common/util/waves');
var ReactDOM = require('react-dom');

var ICONS = {
    prev: 'navigate-before',
    next: 'navigate-next',
    ellipsis: 'keyboard-control'
};

var Pager = React.createClass({

    statics: {
        type: 'Pager'
    },

    propTypes: {
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
    },


    getDefaultProps: function () {

        return {
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
                ellipsis: '..'
            }
        };
    },


    getInitialState: function (){

        var initialPage = this.props.page || 0;

        return {
            page: initialPage
        };
    },

    componentDidMount: function () {
        var main = ReactDOM.findDOMNode(this);

        Waves.attach(main.querySelectorAll('.ui-pager-item'), ['waves-circle', 'waves-light']);
        Waves.init();
    },

    render: function() {

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
        });

        result = result.map(function (conf) {
            if (_.isNumber(conf)) {
                var part = conf >= 0 ? '' : 'ellipsis';
                conf = {
                    page: Math.abs(conf) + first,
                    states: {
                        ellipsis: !!part
                    },
                    part: part
                }
            }
            else {
                conf.page += first;
            }
            return this.renderItem(conf);

        }, this);

        var propTemp = _.clone(props);

        delete propTemp.lang;

        return (
            <ul {...propTemp}>
                {result}
            </ul>
        );

    },

    handleOnClick: function (item, e) {
        e.preventDefault();

        var page = item.props.pageIndex;

        if (this.state.page === page) {
            return;
        }

        this.setState({page: page}, function () {
            var onChange = this.props.onChange;

            _.isFunction(onChange) && onChange({
                target: this,
                page: page
            });
        });

    },

    renderItem: function (conf) {
        var page = conf.page;
        var part = conf.part;

        var props = this.props;

        var anchor = props.anchor;
        var useLang = props.useLang;

        var classNames = cx.createComponentClass(
            'pager-item',
            [],
            conf.states
        );
        classNames += ' waves-effect waves-circle waves-light'
        var pageText;

        if (!useLang && part) {
            pageText = (<Icon icon={ICONS[part]} />);
        }
        else {
            var lang = props.lang;
            pageText = lang[part] || page + 1;
        }

        var children = (
            <a href="!#">
                {pageText}
            </a>
        );

        var item = React.createElement(
            'li',
            {
                className: classNames,
                key: part + page,
                pageIndex: page
            },
            children
        );
        item = React.cloneElement(item, {
                onClick: this.handleOnClick.bind(this, item)
            }
        );

        return item;
    },

    /**
     * 生成一个页码数组, 如果需要ellipsis, 那么ellpsis用负数表示它;
     * 即ellipsis在5号位置, 那么他就是-5
     * 输入: start 0, stop 10, paddingLeft 3 paddingRight 3
     * 输出: 0, 1, 2, -3, 8, 9, 10
     * @param  {number} start        起始页码
     * @param  {number} stop         结束页面(不包含)
     * @param  {number} paddingLeft  起始页码之后, 应展开的页码个数
     * @param  {number} paddingRight 结束页面之前, 应展开的页码个数
     * @return {Array.number}        [start, paddingLeft, .., paddingRight, stop]
     */
    range: function (start, stop, paddingLeft, paddingRight) {
        var first = this.props.first;

        return start + paddingLeft < stop - paddingRight
            ? _
                .range(start, start + paddingLeft)
                .concat(-start - paddingLeft)
                .concat(_.range(stop - paddingRight, stop))
            : _.range(start, stop);
    }

});

module.exports = require('./common/util/createControl')(Pager);
