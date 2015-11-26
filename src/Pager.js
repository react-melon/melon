/**
 * @file esui-react/Pager
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const _ = require('underscore');
const Icon = require('./Icon');
const cx = require('./common/util/cxBuilder').create('Pager');


const Pager = React.createClass({

    displayName: 'Pager',

    getInitialState() {
        return {
            page: this.props.page || 0
        };
    },

    onMainClick(e) {

        const {currentTarget} = e;
        let {target} = e;

        e.preventDefault();

        // 不加这个React会报错 ISSUE#4865
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
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

        this.setState({page: page}, () => {
            let onChange = this.props.onChange;

            _.isFunction(onChange) && onChange({
                target: this,
                page: page
            });
        });

    },

    /**
     * 生成一个页码数组, 如果需要ellipsis, 那么ellpsis用负数表示它;
     * 即ellipsis在5号位置, 那么他就是-5
     * 输入: start 0, stop 10, paddingLeft 3 paddingRight 3
     * 输出: 0, 1, 2, -3, 8, 9, 10
     *
     * @param  {number} start        起始页码
     * @param  {number} stop         结束页面(不包含)
     * @param  {number} paddingLeft  起始页码之后, 应展开的页码个数
     * @param  {number} paddingRight 结束页面之前, 应展开的页码个数
     * @return {Array.number}        [start, paddingLeft, .., paddingRight, stop]
     */
    range(start, stop, paddingLeft, paddingRight) {
        return start + paddingLeft < stop - paddingRight
            ? _
                .range(start, start + paddingLeft)
                .concat(-start - paddingLeft)
                .concat(_.range(stop - paddingRight, stop))
            : _.range(start, stop);
    },

    renderItem(conf) {

        const {
            page,
            part,
            states
        } = conf;

        const {
            lang,
            useLang
        } = this.props;

        const classNames = cx()
            .part('item')
            .addStates(states)
            .build();

        let pageText;

        if (!useLang && part) {
            pageText = (<Icon icon={Pager.ICONS[part]} />);
        }
        else {
            pageText = lang[part] || page + 1;
        }

        return (
            <li
                className={classNames}
                key={part + page}
                data-role="pager-item"
                data-page={page}>
                <a href="#">
                    {pageText}
                </a>
            </li>
        );
    },

    render() {

        const {props, state} = this;

        let {
            total,
            first,
            padding,
            showCount,
            useLang,
            lang,
            ...others
        } = props;

        let {page} = state;

        showCount = showCount > total ? total : showCount;
        page = page - first;

        const wing = Math.floor(showCount / 2);

        const paddingLeft = padding;
        const paddingRight = padding;
        const reduceLeftToRight = page - wing;

        let wingLeft = wing;
        let wingRight = wing;

        // 如果wingLeft小于0, 那么把小于0的部分移动到wingRight
        if (reduceLeftToRight < 0) {
            wingLeft += reduceLeftToRight;
            wingRight -= reduceLeftToRight;
        }

        const reduceRightToLeft = page + wing + 1 - total;

        // 如果wingRight大于total, 那么把超长的部分移动到wingLeft
        if (reduceRightToLeft > 0) {
            wingLeft += reduceRightToLeft;
            wingRight -= reduceRightToLeft;
        }

        // 生成左半端页码
        const left = this.range(0, page, paddingLeft, wingLeft);
        // 生成右半端页码
        const right = this.range(page + 1, total, wingRight, paddingRight);

        const result = [{
            page: Math.max(page - 1, 0),
            states: {
                prev: true,
                disabled: page === 0
            },
            part: 'prev'
        }]
        .concat(left)
        .concat({
            page: page,
            states: {
                current: true
            },
            part: ''
        })
        .concat(right)
        .concat({
            page: Math.min(page + 1, total - 1),
            states: {
                next: true,
                disabled: page >= total - 1
            },
            part: 'next'
        })
        .map((conf) => {

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

            return this.renderItem(conf);

        });

        return (
            <ul
                {...others}
                className={cx(props).addVariants(useLang ? 'lang' : null).build()}
                onClick={this.onMainClick}>
                {result}
            </ul>
        );

    }

});

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
