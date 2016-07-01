/**
 * @file melon/Pager
 * @author cxtom<cxtom2010@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import Icon from './Icon';
import {create} from 'melon-core/classname/cxBuilder';
import {range} from './common/util/array';

const cx = create('Pager');

export default class Pager extends Component {

    constructor(props) {

        super(props);

        const page = props.page;

        this.state = {page};

        this.onMainClick = this.onMainClick.bind(this);

    }

    componentWillReceiveProps({page, total}) {

        if (page < 0) {
            page = 0;
        }
        else if (page > total) {
            page = total - 1;
        }

        if (page !== this.state.page) {
            this.setState({page});
        }
    }

    onMainClick(e) {

        e.preventDefault();

        let {currentTarget, target} = e;

        let role = target.getAttribute('data-role');

        while (role !== 'pager-item' && target !== currentTarget) {
            target = target.parentNode;
            role = target.getAttribute('data-role');
        }

        if (target === currentTarget) {
            return;
        }

        const {first, onChange} = this.props;

        const page = +target.getAttribute('data-page') + first;

        target = null;

        if (this.state.page === page) {
            return;
        }

        // 被控制的
        if (onChange) {
            onChange({
                target: this,
                page: page
            });
            return;
        }

        this.setState({page});

    }

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
            ? [
                ...range(start, start + paddingLeft),
                -start - paddingLeft,
                ...range(stop - paddingRight, stop)
            ]
            : range(start, stop);
    }

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

        if (!useLang && part && part !== 'ellipsis') {
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
                {pageText}
            </li>
        );
    }

    render() {

        const {props, state} = this;

        let {
            total,
            first,
            padding,
            showCount,
            useLang,
            showAlways,
            ...others
        } = props;

        let page = state.page;

        showCount = showCount > total ? total : showCount;
        page = page - first;

        const className = cx(props).addVariants(useLang ? 'lang' : null).build();

        if (!showAlways && total <= 1) {
            return (
                <ul
                    {...others}
                    className={className}>
                </ul>
            );
        }

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
        .map(conf => {

            if (typeof conf === 'number') {
                const part = conf >= 0 ? '' : 'ellipsis';
                conf = {
                    page: Math.abs(conf),
                    states: {
                        ellipsis: !!part
                    },
                    part
                };
            }

            return this.renderItem(conf);

        });

        return (
            <ul
                {...others}
                className={className}
                onClick={this.onMainClick}>
                {result}
            </ul>
        );

    }

}

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
    disabled: PropTypes.bool,
    type: PropTypes.string,
    page: PropTypes.number,
    first: PropTypes.number,
    padding: PropTypes.number,
    showAlways: PropTypes.bool,
    showCount: PropTypes.number,
    total: PropTypes.number,
    useLang: PropTypes.bool,
    lang: PropTypes.shape({
        prev: PropTypes.string,
        ellipsis: PropTypes.string,
        next: PropTypes.string
    })
};

Pager.ICONS = {
    prev: 'navigate-before',
    next: 'navigate-next'
};
