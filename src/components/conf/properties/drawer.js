/**
 * @file properties Drawer
 * @author cxtom<cxtom2010@gmail.com>
 */

module.exports = {
    Drawer: [{
        title: 'Drawer',
        props: [{
            name: 'position',
            type: 'string',
            defaultValue: 'left',
            description: '\'top\', \'right\', \'bottom\', \'left\''
        }, {
            name: 'open',
            type: 'boolean',
            defaultValue: 'false',
            description: '是否显示'
        }, {
            name: 'size',
            type: 'number',
            defaultValue: 300,
            description: '弹出框的宽度（高度）'
        }, {
            name: 'mask',
            type: 'boolean',
            defaultValue: 'true',
            description: '是否有遮罩'
        }, {
            name: 'maskClickClose',
            type: 'boolean',
            defaultValue: 'true',
            description: '是否点击遮罩以后关闭'
        }]
    }]
};
