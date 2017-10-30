/**
 * @file 测试入口
 * @author leon <ludafa@outlook.com>
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter()
});

import './index.styl';

// const WHITE_LIST = [
//     // './Alert.spec',
//     // './BoxGroup.spec',
//     // './Breadcrumb.spec',
//     // './Button.spec',
//     // './Card.spec',
//     // './Chip.spec',
//     // './Confirm.spec',
//     './Dialog.spec',
//     // './Icon.spec',
//     // './Layer.spec',
//     // './Link.spec',
//     // './Pager.spec',
//     // './ScrollView.spec',
//     // './Select.spec',
//     // './SnackBar.spec',
//     // './Tabs.spec',
//     // './TextBox.spec',
//     // './Title.spec',
//     // './Toggle.spec',
//     // './ToolBar.spec',
//     // './Tooltip.spec',
//     // './Tree.spec',
//     // './Uploader.spec',
//     // './Zippy.spec',
// ];
const BLACK_LIST = [
    './Alert.spec',
    './Confirm.spec',
    './Dialog.spec',
    './Tooltip.spec',
    './SnackBar.spec',
    './Select.spec'
];
const specContext = require.context('./components', true)
const specs = specContext
    .keys()
    .filter(spec => !/\.js$/.test(spec))
    .filter(spec => BLACK_LIST.indexOf(spec) === -1)
    .forEach(specContext)
