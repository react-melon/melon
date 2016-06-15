/**
 * @file properties Dialog
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'Dialog',
    props: [{
        name: 'actions',
        type: 'node',
        description: '按钮，可以是一个数据'
    }, {
        name: 'maskClickClose',
        type: 'boolean',
        defaultValue: 'true',
        description: '点击mask就关闭'
    }, {
        name: 'open',
        type: 'boolean',
        defaultValue: 'false',
        description: '是否展现'
    }, {
        name: 'onShow',
        type: 'function',
        description: '显示的回调'
    }, {
        name: 'onHide',
        type: 'function',
        description: '隐藏的回调'
    }, {
        name: 'title',
        type: 'string / element',
        description: '标题'
    }]
}];
