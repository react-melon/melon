/**
 * @file properties ScrollView
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'ScrollView',
    props: [{
        name: 'direction',
        type: 'string',
        defaultValue: 'vertical',
        description: '\'vertical\', \'horizontal\', \'both\''
    }, {
        name: 'wheelSpeed',
        type: 'number',
        defaultValue: '0.005',
        description: '滚动速率'
    }, {
        name: 'onScroll',
        type: 'func',
        description: '滚动时的回调函数'
    }, {
        name: 'height',
        type: 'number',
        description: '长度'
    }, {
        name: 'width',
        type: 'number',
        description: '宽度'
    }]
}];
