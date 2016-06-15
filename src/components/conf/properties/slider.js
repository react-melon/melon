/**
 * @file properties Slider
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Slider: [{
        title: 'Slider',
        props: [{
            name: 'value',
            type: 'number',
            description: '时间值'
        }, {
            name: 'defaultValue',
            type: 'number',
            defaultValue: 0,
            description: '默认的时间值'
        }, {
            name: 'maximum',
            type: 'number',
            defaultValue: 100,
            description: '范围的最大值'
        }, {
            name: 'minimum',
            type: 'number',
            defaultValue: 0,
            description: '范围的最小值'
        }, {
            name: 'step',
            type: 'number',
            defaultValue: 1,
            description: '间隔'
        }, {
            name: 'onChange',
            type: 'function',
            description: '数值改变时的事件'
        }]
    }]
};
