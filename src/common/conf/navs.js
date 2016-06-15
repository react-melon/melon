/**
 * @file navs
 * @author cxtom<cxtom2010@gmail.com>
 */

import components from './components';

export default [{
    text: 'Melon',
    children: [{
        text: 'Introduction',
        pathname: '/',
        title: ''
    }]
}, {
    text: 'Components',
    children: components.map(name => {
        return {
            text: name,
            pathname: '/components',
            query: {
                name
            }
        };
    })
}, {
    text: 'Style',
    children: [{
        text: 'Icon',
        pathname: '/icon'
    }]
}];

