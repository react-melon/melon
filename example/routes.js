/**
 * @file example routes
 * @author leon <ludafa@outlook.com>
 */

import Home from './Home';
import Button from './components/Button.md';

export default [
    {
        pathname: '/',
        name: '首页',
        component: Home
    },
    {
        name: '组件',
        pathname: '/components',
        components: [
            {
                name: 'Button',
                pathname: '/Button',
                component: Button
            },
            {
                name: 'Button1',
                pathname: '/Button1',
                component: Button
            }
        ]
    }
];
