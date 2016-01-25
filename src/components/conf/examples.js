/**
 * @file examples
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Drawer: [{
        title: '创建Drawer',
        brief: '可配置位置、大小',
        name: 'Drawer'
    }],
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
        brief: '进度条组件，默认是条形的，有两种模式 —— determinate 和 indeterminate，indeterminate 模式表示不间断的进度动画',
        name: 'ProgressLinear'
    }, {
        title: '圆形',
        brief: '圆形的进度条，也有 determinate 和 indeterminate 两种模式，可以通过 size 来设置显示大小',
        name: 'ProgressCircle'
    }],
    SnackBar: [{
        title: '提示框',
        brief: '提示框组件，可以设定显示的位置，可以设定显示以后自动消失',
        name: 'SnackBar'
    }, {
        title: '动态创建',
        brief: '可以通过 SnackBar.show 接口动态创建',
        name: 'SnackBarActive'
    }],
    Tabs: [{
        title: '普通的Tabs',
        brief: '这是一个Tab切换组件',
        name: 'Tabs'
    }]
};
