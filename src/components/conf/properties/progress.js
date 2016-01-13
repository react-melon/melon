/**
 * @file properties Progress
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Progress: [{
        title: 'Progress',
        props: [{
            name: 'shape',
            type: '[\'circle\', \'linear\']',
            defaultValue: 'linear',
            description: '形状，分条形和圆形'
        }, {
            name: 'mode',
            type: '[\'determinate\', \'indeterminate\']',
            defaultValue: 'determinate',
            description: 'determinate: 可以设置vlaue；indeterminate不间断的动画'
        }, {
            name: 'value',
            type: 'number',
            defaultValue: 0,
            description: '进度当前值，determinate时有效'
        }, {
            name: 'min',
            type: 'number',
            defaultValue: 0,
            description: '进度最小值，determinate时有效'
        }, {
            name: 'max',
            type: 'number',
            defaultValue: 100,
            description: '进度最大值，determinate时有效'
        }, {
            name: 'size',
            type: '[\'xxs\', \'xs\', \'s\', \'l\', \'xl\', \'xxl\', \'xxxl\', undefined]',
            defaultValue: 'undefined',
            description: '显示大小'
        }]
    }]
};
