/**
 * @file properties Select
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = [{
    title: 'Select',
    props: [{
        name: 'value',
        type: 'string',
        description: '选择项的 value'
    }, {
        name: 'defaultValue',
        type: 'string',
        defaultValue: '\'\'',
        description: '默认的值'
    }, {
        name: 'placeholder',
        type: 'string',
        defaultValue: '请选择',
        description: '同 input 的 placeholder 属性，当没有设置 value 或 defaultValue 时显示'
    }, {
        name: 'chilren',
        type: 'node',
        description: '支持 option optgroup；可以用 Select.createOptions(dataSource) 生成'
    }, {
        name: 'disabled',
        type: 'bool',
        description: '是否禁用'
    }, {
        name: 'readOnly',
        type: 'bool',
        description: '是否只读'
    }, {
        name: 'onChange',
        type: 'function',
        description: '数值改变时的事件'
    }]
}];
