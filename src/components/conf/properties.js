/**
 * @file properties
 * @author cxtom<cxtom2010@gmail.com>
 */

import tabs from './properties/tabs';
import pager from './properties/pager';
import progress from './properties/progress';
import snackbar from './properties/snackbar';
import drawer from './properties/drawer';
import scrollview from './properties/scrollview';
import textbox from './properties/textbox';

module.exports = {
    ...tabs,
    ...progress,
    ...pager,
    ...snackbar,
    ...drawer,
    ...scrollview,
    ...textbox
};
