/**
 * @file properties ColorPicker
 * @author cxtom<cxtom2008@gmail.com>
 */

module.exports = [{
    title: 'FloatingActionButton',
    props: [{
        name: 'position',
        type: 'string',
        defaultValue: 'br',
        description: '按钮出现的位置，tl - 左上 tr - 右上 bl - 左下 br - 右下'
    }, {
        name: 'offset',
        type: 'object',
        defaultValue: '{x: \'2rem\', y: \'2rem\'}',
        description: '颜色值'
    }]
}];
