/**
 * @file properties Calendar
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Calendar: [{
        title: 'Calendar',
        props: [{
            name: 'autoConfirm',
            type: 'boolean',
            description: '点击日期以后自动确认，不需要再点确认按钮'
        }, {
            name: 'dateFormat',
            type: '日期的格式',
            defaultValue: 'yyyy-MM-dd',
            description: 'determinate: 可以设置vlaue；indeterminate不间断的动画'
        }, {
            name: 'value',
            type: 'string',
            description: '日期的值（被控制的）'
        }, {
            name: 'end',
            type: 'Date | string',
            description: '日期选择的最大值'
        }, {
            name: 'begin',
            type: 'Date | string',
            description: '日期选择的最小值'
        }, {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '(系统日期值)',
            description: '日期的值（未被控制的）'
        }, {
            name: 'lang',
            type: 'object',
            description: '语言'
        }, {
            name: 'lang.week',
            type: 'string',
            defaultValue: '周',
            description: '星期的前缀'
        }, {
            name: 'lang.days',
            type: 'string',
            defaultValue: '日,一,二,三,四,五,六',
            description: '星期的文字'
        }, {
            name: 'onChange',
            type: 'function',
            description: '值改变时的回调'
        }]
    }, {
        title: 'RangeCalendar',
        props: [{
            name: 'dateFormat',
            type: '日期的格式',
            defaultValue: 'yyyy-MM-dd',
            description: 'determinate: 可以设置vlaue；indeterminate不间断的动画'
        }, {
            name: 'value',
            type: 'array',
            description: '日期区间的值（被控制的）'
        }, {
            name: 'end',
            type: 'Date | string',
            description: '日期选择的最大值'
        }, {
            name: 'begin',
            type: 'Date | string',
            description: '日期选择的最小值'
        }, {
            name: 'defaultValue',
            type: 'array',
            defaultValue: '([系统日期值, 系统日期值的一月后])',
            description: '日期的值（未被控制的）'
        }, {
            name: 'lang',
            type: 'object',
            description: '语言'
        }, {
            name: 'lang.week',
            type: 'string',
            defaultValue: '周',
            description: '星期的前缀'
        }, {
            name: 'lang.days',
            type: 'string',
            defaultValue: '日,一,二,三,四,五,六',
            description: '星期的文字'
        }, {
            name: 'onChange',
            type: 'function',
            description: '值改变时的回调'
        }]
    }, {
        title: 'UnitCalendar',
        props: [{
            name: 'value',
            type: 'array',
            description: '日期区间的值（被控制的）'
        }, {
            name: 'end',
            type: 'Date | string',
            description: '日期选择的最大值'
        }, {
            name: 'begin',
            type: 'Date | string',
            description: '日期选择的最小值'
        }, {
            name: 'defaultValue',
            type: 'array',
            defaultValue: '[]',
            description: '日期的值（未被控制的）'
        }, {
            name: 'continuous',
            type: 'boolean',
            defaultValue: 'true',
            description: '是否连续'
        }, {
            name: 'onChange',
            type: 'function',
            description: '值改变时的回调'
        }]
    }]
};
