/**
 * @file examples
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Pager: [{
        title: '普通的Pager',
        brief: '分页组件，默认为图标的翻页样式',
        name: 'Pager1'
    }, {
        title: '带文字的Pager',
        brief: '用文字作为翻页按钮，文字内容可以配置',
        name: 'Pager2'
    }],
    Progress: [{
        title: '默认形状',
        brief: '进度条组件，默认是条形的，有两种模式 —— determinate 和 indeterminate，indeterminate模式表示不间断的进度动画',
        name: 'ProgressLinear'
    }, {
        title: '圆形',
        brief: '圆形的进度条，也有 determinate 和 indeterminate 两种模式，可以通过size来设置显示大小',
        name: 'ProgressCircle'
    }],
    Tabs: [{
        title: '普通的Tabs',
        brief: '这是一个Tab切换组件',
        name: 'Tabs'
    }]
};
