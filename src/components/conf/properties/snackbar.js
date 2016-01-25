/**
 * @file properties SnackBar
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    SnackBar: [{
        title: 'SnackBar',
        props: [{
            name: 'action',
            type: 'string',
            defaultValue: '关闭',
            description: '关闭按钮显示的文字'
        }, {
            name: 'direction',
            type: 'string',
            defaultValue: 'bl',
            description: '显示的位置，\'tr\', \'rt\', \'rb\','
                       + ' \'br\', \'bl\', \'lb\', \'lt\', \'tl\', \'tc\', \'rc\', \'bc\', \'lc\''
        }, {
            name: 'autoHideDuration',
            type: 'number',
            defaultValue: '0',
            description: '自动关闭的延迟，若为0，则不会自动关闭'
        }, {
            name: 'message',
            type: 'node',
            description: '显示的信息，可以是字符串也可以是 react dom'
        }, {
            name: 'openOnMount',
            type: 'boolean',
            description: '是否在 componentDidMount 的时候就显示出来'
        }, {
            name: 'onHide',
            type: 'function',
            description: '隐藏时的回调'
        }, {
            name: 'onShow',
            type: 'function',
            description: '显示时的回调'
        }]
    }]
};
