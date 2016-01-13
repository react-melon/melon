/**
 * @file navs
 * @author cxtom<cxtom2010@gmail.com>
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
        text: 'Pager',
        pathname: '/components',
        query: {
            name: 'Pager'
        }
    }, {
        text: 'Progress',
        pathname: '/components',
        query: {
            name: 'Progress'
        }
    }, {
        text: 'Tabs',
        pathname: '/components',
        query: {
            name: 'Tabs'
        }
    }]
}];

