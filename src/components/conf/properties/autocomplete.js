/**
 * @file properties TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'AutoComplete',
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
    }, {
        name: 'dataSource',
        type: 'array|func',
        defaultValue: '[]',
        description: '列表数据源，如果是一个函数，表示是动态的'
    }, {
        name: 'renderRow',
        type: 'func',
        defaultValue: '(rowData, index, total) => rowData',
        description: '单条列表结果的渲染函数'
    }, {
        name: 'getRowData',
        type: 'func',
        defaultValue: '(dataSource, index) => dataSource[index]',
        description: '获取每行数据的函数'
    }, {
        name: 'rowHasChanged',
        type: 'func',
        defaultValue: '(a, b) => a !== b',
        description: '获取每行数据是否有更新，用来性能优化'
    }, {
        name: 'getRowKey',
        type: 'func',
        defaultValue: '(rowData, index, total) => index',
        description: '获取每行的 react-key'
    }, {
        name: 'getRowValue',
        type: 'func',
        defaultValue: '(rowData, index, total) => rowData',
        description: '获取每行用来填充 textbox 的值'
    }]
}];
