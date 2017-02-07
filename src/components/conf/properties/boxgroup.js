/**
 * @file properties BoxGroup
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'BoxGroup',
    props: [{
        name: 'boxModel',
        type: 'enum',
        defaultValue: 'checkbox',
        description: 'checkbox: 复选框; radio: 单选框'
    }, {
        name: 'defaultValue',
        type: 'array',
        defaultValue: '[]',
        description: 'uncontrolled 时设置的默认值'
    }, {
        name: 'value',
        type: 'array',
        description: 'controlled 时组件的值，必须与 onChange 同时存在'
    }, {
        name: 'onChange',
        type: 'function',
        description: '值改变时的回调'
    }, {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: '禁用'
    }]
}];
