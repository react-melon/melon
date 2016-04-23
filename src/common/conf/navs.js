/**
 * @file navs
 * @author cxtom<cxtom2010@gmail.com>
 */

export default [{
    text: 'Melon',
    children: [{
        text: 'Introduction',
        pathname: '/',
        title: ''
    }]
}, {
    text: 'Components',
    children: [{
        text: 'Button',
        pathname: '/components',
        query: {
            name: 'Button'
        }
    }, {
        text: 'Calendar',
        pathname: '/components',
        query: {
            name: 'Calendar'
        }
    }, {
        text: 'Drawer',
        pathname: '/components',
        query: {
            name: 'Drawer'
        }
    }, {
        text: 'Dialog',
        pathname: '/components',
        query: {
            name: 'Dialog'
        }
    }, {
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
        text: 'ScrollView',
        pathname: '/components',
        query: {
            name: 'ScrollView'
        }
    }, {
        text: 'SnackBar',
        pathname: '/components',
        query: {
            name: 'SnackBar'
        }
    }, {
        text: 'Tabs',
        pathname: '/components',
        query: {
            name: 'Tabs'
        }
    }, {
        text: 'TextBox',
        pathname: '/components',
        query: {
            name: 'TextBox'
        }
    }]
}, {
    text: 'Style',
    children: [{
        text: 'Icon',
        pathname: '/icon'
    }]
}];

