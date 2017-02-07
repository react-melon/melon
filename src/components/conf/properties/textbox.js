/**
 * @file properties TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'TextBox',
    props: [{
        name: 'type',
        type: 'string',
        defaultValue: 'text',
        description: '输入框的类型，包含 text password 两种'
    }, {
        name: 'value',
        type: 'string',
        description: '输入值（被控制的，与onChange同时使用）'
    }, {
        name: 'defaultValue',
        type: 'string',
        defaultValue: '\'\'',
        description: '输入框的值（未被控制的）'
    }, {
        name: 'placeholder',
        type: 'string',
        description: '同input的placeholder属性'
    }, {
        name: 'floatingLabel',
        type: 'string',
        description: '浮动提示'
    }, {
        name: 'multiline',
        type: 'boolean',
        description: '支持多行输入'
    }, {
        name: 'validateEvents',
        type: 'array',
        defaultValue: '[\'change\', \'blur\']',
        description: '校验的事件，支持 change blur focus'
    }, {
        name: 'onChange',
        type: 'function',
        description: '值改变时的回调'
    }, {
        name: 'onFocus',
        type: 'function',
        description: '获得焦点时的回调'
    }, {
        name: 'onBlur',
        type: 'function',
        description: '失去焦点时的回调'
    }, {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: '禁用'
    }]
}];
