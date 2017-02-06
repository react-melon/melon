/**
 * @file routes
 * @author leon<lupengyu@baidu.com>
 */

import home from './home/routes';
import components from './components/routes';
import style from './style/routes';

export default [
    ...home,
    ...components,
    ...style
];
