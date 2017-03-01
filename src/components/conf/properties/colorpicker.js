/**
 * @file properties ColorPicker
 * @author cxtom<cxtom2008@gmail.com>
 */

module.exports = [{
    title: 'ColorPicker',
    props: [{
        name: 'value',
        type: 'string',
        description: '颜色值，与 onChange 一起使用'
    }, {
        name: 'defaultValue',
        type: 'string',
        defaultValue: '#ffffff',
        description: '颜色值'
    }, {
        name: 'placeholder',
        type: 'object',
        description: '默认提示'
    }, {
        name: 'onChange',
        type: 'function',
        description: '值改变时的回调'
    }]
}];
