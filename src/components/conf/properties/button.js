/**
 * @file properties Button
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'Button',
    props: [{
        name: 'hasRipple',
        type: 'boolean',
        defaultValue: 'true',
        description: '是否有 waves 动画'
    }, {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: '禁用'
    }, {
        name: 'variants',
        type: 'array',
        description: '不同的按钮样式'
    }]
}];
