/**
 * @file example routes
 * @author leon <ludafa@outlook.com>
 */

import Home from './Home';
import Button from './components/Button.md';
import Installation from './guides/installation.md';
import Usage from './guides/usage.md';

export default [
    {
        pathname: '/',
        name: '首页',
        component: Home
    },
    {
        pathname: '/guide',
        name: '指南',
        components: [
            {
                name: '安装',
                pathname: '/installation',
                component: Installation
            },
            {
                name: '使用',
                pathname: '/usage',
                component: Usage
            }
        ]
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
