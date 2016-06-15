/**
 * @file properties Tabs
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'Tabs',
    props: [{
        name: 'selectedIndex',
        type: 'number',
        defaultValue: '0',
        description: '选中项索引'
    }, {
        name: 'onChange',
        type: 'function',
        description: '切换之后调用'
    }, {
        name: 'onBeforeChange',
        type: 'function',
        description: '切换之前调用，可阻止默认事件'
    }]
}, {
    title: 'Tab',
    props: [{
        name: 'selected',
        type: 'boolean',
        description: '是否被选中'
    }, {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false'
    }]
}, {
    title: 'Panel',
    props: [{
        name: 'active',
        type: 'boolean',
        description: '是否显示'
    }]
}];
