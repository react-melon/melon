/**
 * @file examples
 * @author cxtom<cxtom2010@gmail.com>
 */

/* eslint-disable max-len */

module.exports = {

    BoxGroup: [{
        title: 'Uncontrolled',
        brief: '支持复选框和单选框两种形态，组件默认是 Uncontrolled 模式',
        name: 'BoxGroup1'
    }, {
        title: 'Controlled',
        brief: 'value 和 onChange 属性同时存在时，组件是 Controlled 模式，值由 store 管理',
        name: 'BoxGroup2'
    }, {
        title: '禁用',
        brief: '可以通过设置 disabled 属性禁用组件',
        name: 'BoxGroup3'
    }],

    Button: [{
        title: '按钮',
        brief: 'material风格的按钮，带有 waves 动画，有 Flat、Raised、Floating 三种样式，有 default、primary、secondery、success、info、warning、danger 七种状态，支持图标按钮',
        name: 'Button'
    }, {
        title: '按钮组',
        brief: '支持类 ui-buttongroup，将多个 button 组织起来',
        name: 'ButtonGroup'
    }, {
        title: '按钮大小',
        brief: '支持设定按钮的大小，支持默认, xxs, xs, s, m, l, xl, xxl, xxxl，支持禁用的样式',
        name: 'ButtonSize'
    }],

    Calendar: [{
        title: '日历',
        brief: 'material风格的日历组件。支持设定日期选择区间，支持只读和禁用。',
        name: 'Calendar'
    }, {
        title: '日期期间选择',
        brief: '支持日期区间的选择，包括日区间、周区间、月区间、年区间',
        name: 'RangeCalendar'
    }],

    Dialog: [{
        title: '弹窗',
        brief: '弹出的对话框，可以支持标题和按钮',
        name: 'DialogCommon'
    }],

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

    ScrollView: [{
        title: '普通',
        brief: '可以同时支持两个方向的滚动',
        name: 'ScrollView'
    }],

    Select: [{
        title: 'UnControlled Select',
        brief: '支持 option 和 optgroup',
        name: 'SelectUnControlled'
    }, {
        title: 'Controlled Select',
        brief: '支持 option 和 optgroup',
        name: 'SelectControlled'
    }],

    Slider: [{
        title: '普通',
        brief: '滑动选择数值',
        name: 'Slider'
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
    }],

    TextBox: [{
        title: '普通的输入框',
        brief: '文本输入框组件，支持只读和禁用状态',
        name: 'TextBox'
    }, {
        title: '浮动提示',
        brief: '带有浮动提示功能',
        name: 'TextBoxFloatingLabel'
    }, {
        title: '多行输入',
        brief: '支持多行输入',
        name: 'TextBoxMultiline'
    }, {
        title: '前缀和后缀',
        brief: '带有前缀和后缀的样式',
        name: 'TextBoxFix'
    }, {
        title: '被控制的输入框',
        brief: '被控制的输入框的值不会随着用户输入而变化。它只会响应value值的变化。当value和onChange同时被设定时，TextBox就会进入被控制的状态。即value不是undefined或null，onChange是一个函数',
        name: 'TextBoxControlled'
    }],

    TimePicker: [{
        title: '普通的TimePicker',
        brief: '这是一个时间选择器',
        name: 'TimePicker1'
    }]
};
