/**
 * @file properties
 * @author cxtom<cxtom2010@gmail.com>
 */

import tabs from './properties/tabs';
import pager from './properties/pager';
import progress from './properties/progress';
import snackbar from './properties/snackbar';
import drawer from './properties/drawer';

module.exports = {
    ...tabs,
    ...progress,
    ...pager,
    ...snackbar,
    ...drawer
};
