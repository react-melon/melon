/**
 * @file properties
 * @author cxtom<cxtom2010@gmail.com>
 */

import components from '../../common/conf/components';

import './properties/button';
import './properties/calendar';
import './properties/dialog';
import './properties/drawer';
import './properties/pager';
import './properties/progress';
import './properties/scrollview';
import './properties/select';
import './properties/slider';
import './properties/snackbar';
import './properties/tabs';
import './properties/textbox';
import './properties/timepicker';
import './properties/colorpicker';
import './properties/floatingactionbutton';

module.exports = components.reduce((result, name) => {

    result[name] = require('./properties/' + name.toLowerCase());

    return result;

}, {});
