/**
 * @file properties TimePicker
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    TimePicker: [{
        title: 'TimePicker',
        props: [{
            name: 'value',
            type: 'string',
            description: '时间值'
        }, {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '\'\'',
            description: '默认的时间值'
        }, {
            name: 'placeholder',
            type: 'string',
            description: '同input的placeholder属性，当没有设置value或defaultValue时显示'
        }, {
            name: 'timeFormat',
            type: 'string',
            defaultValue: 'HH:mm:ss',
            description: '返回时间的格式，格式参考 http://momentjs.com/'
        }, {
            name: 'labelFormat',
            type: 'string',
            defaultValue: 'HH:mm',
            description: '显示时间的格式'
        }, {
            name: 'onChange',
            type: 'function',
            description: '数值改变时的事件'
        }]
    }]
};
