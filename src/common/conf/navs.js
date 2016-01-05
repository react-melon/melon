/**
 * @file navs
 * @author leon<lupengyu@baidu.com>
 */

module.exports = [{
    text: 'Melon',
    children: [{
        text: 'Introduction',
        pathname: '/',
        title: ''
    }]
}, {
    text: 'Components',
    children: [{
        text: 'Tabs',
        pathname: '/components',
        query: {
            name: 'Tabs'
        }
    }]
}];

