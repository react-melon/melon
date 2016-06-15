/**
 * @file properties Pager
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'Pager',
    props: [{
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: '是否可用'
    }, {
        name: 'page',
        type: 'number',
        description: '当前页，第一页从0开始',
        defaultValue: 0
    }, {
        name: 'first',
        type: 'number',
        defaultValue: 0,
        description: '起始页码'
    }, {
        name: 'onChange',
        type: 'function',
        description: '页码改变时的回调函数，带一个参数 {page: \'当前页\'}'
    }, {
        name: 'padding',
        type: 'number',
        defaultValue: 1,
        description: '首尾显示的页码个数'
    }, {
        name: 'showAlways',
        type: 'boolean',
        defaultValue: 'false',
        description: '是否一直显示分页控件'
    }, {
        name: 'total',
        type: 'number',
        defaultValue: 0,
        description: '总页数'
    }, {
        name: 'useLang',
        type: 'boolean',
        defaultValue: 'false',
        description: '是否使用文字作为翻页按钮'
    }, {
        name: 'lang',
        type: 'object',
        defaultValue: '',
        description: '显示的文字'
    }, {
        name: 'lang.prev',
        type: 'string',
        defaultValue: '上一页',
        description: '向前翻页的文字'
    }, {
        name: 'lang.next',
        type: 'string',
        defaultValue: '下一页',
        description: '向后翻页的文字'
    }, {
        name: 'lang.ellipsis',
        type: 'string',
        defaultValue: '...',
        description: '省略页'
    }]
}];
