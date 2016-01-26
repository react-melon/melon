/*! 2016 Baidu Inc. All Rights Reserved */
define('home/routes', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.__esModule = true;
    exports['default'] = [{
            path: '/',
            page: 'home/HomePage'
        }];
    module.exports = exports['default'];
});

define('home/HomeView', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'ei',
    'melon/Title',
    'melon/Button',
    'melon/Link',
    'melon/common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _ei = require('ei');
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonLink = require('melon/Link');
    var _melonLink2 = babelHelpers.interopRequireDefault(_melonLink);
    var cx = require('melon/common/util/cxBuilder').create('Homeview');
    var HomeView = function (_React$Component) {
        babelHelpers.inherits(HomeView, _React$Component);
        function HomeView() {
            babelHelpers.classCallCheck(this, HomeView);
            _React$Component.apply(this, arguments);
        }
        HomeView.prototype.render = function render() {
            return _react2['default'].createElement('div', { className: cx(this.props).build() }, _react2['default'].createElement('div', { className: cx().part('header').build() }, _react2['default'].createElement('div', { className: cx().part('header-logo').build() }), _react2['default'].createElement(_melonTitle2['default'], { level: 1 }, 'melon ui'), _react2['default'].createElement('p', null, 'A Set of React Components that Implement'), _react2['default'].createElement('p', null, 'Google\'s Material Design')), _react2['default'].createElement('div', { className: cx().part('info').build() }, _react2['default'].createElement('p', null, 'Melon\u662F\u4E00\u6B3E\u57FA\u4E8E', _react2['default'].createElement(_melonLink2['default'], {
                target: '_blank',
                href: 'http://facebook.github.io/react/'
            }, 'React'), '\uFF0C\u91C7\u7528', _react2['default'].createElement(_melonLink2['default'], {
                target: '_blank',
                href: 'https://www.google.com/design/spec/material-design/introduction.html'
            }, 'Google\'s Material Design'), '\u8BBE\u8BA1\u7684\u7EC4\u4EF6\u5E93\u3002')), _react2['default'].createElement('div', { className: cx().part('github').build() }, _react2['default'].createElement('p', null, '\u8BF7\u5728github\u4E0A\u5173\u6CE8\u6211\u4EEC\u7684\u9879\u76EE'), _react2['default'].createElement(_melonButton2['default'], {
                variants: [
                    'raised',
                    'primary'
                ],
                onClick: function () {
                    window.location = 'https://github.com/react-melon/melon/';
                }
            }, 'GITHUB')), _react2['default'].createElement('div', { className: cx().part('footer').build() }, _react2['default'].createElement('p', null, '\xA92015 Baidu')));
        };
        babelHelpers.createClass(HomeView, null, [{
                key: 'displayName',
                value: 'HomeView',
                enumerable: true
            }]);
        return HomeView;
    }(_react2['default'].Component);
    HomeView = _ei.connect(HomeView, true);
    exports['default'] = HomeView;
    module.exports = exports['default'];
});

define('home/HomePage', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'ei',
    '../common/middleware/pageDispatchEvent',
    '../common/middleware/asyncAction',
    '../common/middleware/logger',
    './HomeView'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _ei = require('ei');
    var _ei2 = babelHelpers.interopRequireDefault(_ei);
    var _commonMiddlewarePageDispatchEvent = require('../common/middleware/pageDispatchEvent');
    var _commonMiddlewarePageDispatchEvent2 = babelHelpers.interopRequireDefault(_commonMiddlewarePageDispatchEvent);
    var _commonMiddlewareAsyncAction = require('../common/middleware/asyncAction');
    var _commonMiddlewareAsyncAction2 = babelHelpers.interopRequireDefault(_commonMiddlewareAsyncAction);
    var _commonMiddlewareLogger = require('../common/middleware/logger');
    var _commonMiddlewareLogger2 = babelHelpers.interopRequireDefault(_commonMiddlewareLogger);
    var HomePage = _ei2['default'].Page.extend({
        middlewares: [
            _commonMiddlewareAsyncAction2['default'],
            _commonMiddlewarePageDispatchEvent2['default'],
            _commonMiddlewareLogger2['default']
        ],
        view: require('./HomeView'),
        reducer: {},
        getInitialState: function getInitialState(request) {
            return {};
        }
    });
    exports['default'] = HomePage;
    module.exports = exports['default'];
});

define('components/routes', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.__esModule = true;
    exports['default'] = [{
            path: '/components',
            page: 'components/ComponentsPage'
        }];
    module.exports = exports['default'];
});

define('components/code/TextBoxMultiline.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20placeholder%3D%27%u53D1%u4E2A%u5FAE%u535A...%27%20multiline%3D%7Btrue%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20floatingLabel%3D%27%u591A%u884C%u6587%u672C%u6D6E%u52A8%u63D0%u793A%27%20multiline%3D%7Btrue%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/TextBoxMultiline', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/TextBox',
    '../code/TextBoxMultiline.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    require('../code/TextBoxMultiline.txt');
    function View(props) {
        return _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTextBox2['default'], {
            placeholder: '\u53D1\u4E2A\u5FAE\u535A...',
            multiline: true
        })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTextBox2['default'], {
            floatingLabel: '\u591A\u884C\u6587\u672C\u6D6E\u52A8\u63D0\u793A',
            multiline: true
        })));
    }
    module.exports = View;
});

define('components/code/TextBoxFloatingLabel.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u6D6E%u52A8%u63D0%u793A%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20floatingLabel%3D%27%u59D3%u540D%27%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u6D6E%u52A8%u63D0%u793A%20-%20%u5E26%u6709%u9ED8%u8BA4%u503C%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20floatingLabel%3D%27%u7231%u597D%27%20defaultValue%3D%27melon%27%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/TextBoxFloatingLabel', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/TextBox',
    'melon/Title',
    '../code/TextBoxFloatingLabel.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/TextBoxFloatingLabel.txt');
    function View(props) {
        return _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTextBox2['default'], { floatingLabel: '\u59D3\u540D' })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTextBox2['default'], {
            floatingLabel: '\u7231\u597D',
            defaultValue: 'melon'
        }), _react2['default'].createElement('br', null), _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u5E26\u6709\u9ED8\u8BA4\u503C')));
    }
    module.exports = View;
});

define('components/code/TextBoxFix.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u524D%u7F00%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20floatingLabel%3D%22%u51FA%u4EF7%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22ui-text-box-suffix%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u4E07%u5143%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/span%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u540E%u7F00%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22ui-text-box-prefix%22%3E%7B%27http%3A//%27%7D%3C/span%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20floatingLabel%3D%22%u7F51%u5740%22%20prefix%3D%22http%3A//%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/TextBoxFix', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/TextBox',
    'melon/Title',
    '../code/TextBoxFix.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/TextBoxFix.txt');
    function View(props) {
        return _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u524D\u7F00'), _react2['default'].createElement(_melonTextBox2['default'], { floatingLabel: '\u51FA\u4EF7' }), _react2['default'].createElement('span', { className: 'ui-text-box-suffix' }, '\u4E07\u5143')), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u540E\u7F00'), _react2['default'].createElement('span', { className: 'ui-text-box-prefix' }, 'http://'), _react2['default'].createElement(_melonTextBox2['default'], {
            floatingLabel: '\u7F51\u5740',
            prefix: 'http://'
        })));
    }
    module.exports = View;
});

define('components/code/TextBoxControlled.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Aconst%20View%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20controlledValue%3A%20%27%27%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20userInputValue%3A%20%27%27%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onControlledTextBoxChange%28e%29%20%7B%0A%20%20%20%20%20%20%20%20this.setState%28%7BuserInputValue%3A%20e.value%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-12%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u88AB%u63A7%u5236%u7684%u8F93%u5165%u6846%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%3D%22controlled%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%7Bthis.state.controlledValue%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onControlledTextBoxChange%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7Bthis.state.userInputValue%20%3F%20%27%u7528%u6237%u8F93%u5165%u4E86%uFF1A%27%20+%20this.state.userInputValue%20%3A%20%27%27%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20View%3B%0A';
});

define('components/examples/TextBoxControlled', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/TextBox',
    'melon/Title',
    '../code/TextBoxControlled.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/TextBoxControlled.txt');
    var View = _react2['default'].createClass({
        displayName: 'View',
        getInitialState: function getInitialState() {
            return {
                controlledValue: '',
                userInputValue: ''
            };
        },
        onControlledTextBoxChange: function onControlledTextBoxChange(e) {
            this.setState({ userInputValue: e.value });
        },
        render: function render() {
            return _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-12' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u88AB\u63A7\u5236\u7684\u8F93\u5165\u6846'), _react2['default'].createElement(_melonTextBox2['default'], {
                name: 'controlled',
                value: this.state.controlledValue,
                onChange: this.onControlledTextBoxChange
            }), this.state.userInputValue ? '\u7528\u6237\u8F93\u5165\u4E86\uFF1A' + this.state.userInputValue : ''));
        }
    });
    exports['default'] = View;
    module.exports = exports['default'];
});

define('components/code/TextBox.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u666E%u901A%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20placeholder%3D%27%u8BF7%u8F93%u5165%27%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u9ED8%u8BA4%u503C%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20defaultValue%3D%22default%20value%22%20placeholder%3D%27%u8BF7%u8F93%u5165%27%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u53EA%u8BFB%u72B6%u6001%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20value%3D%27%u53EA%u8BFB%27%20readOnly%3D%7Btrue%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u7981%u7528%u72B6%u6001%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%20value%3D%27%u7981%u7528%27%20disabled%3D%7Btrue%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/TextBox', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/TextBox',
    'melon/Title',
    '../code/TextBox.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/TextBox.txt');
    function View(props) {
        return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u666E\u901A'), _react2['default'].createElement(_melonTextBox2['default'], { placeholder: '\u8BF7\u8F93\u5165' })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u9ED8\u8BA4\u503C'), _react2['default'].createElement(_melonTextBox2['default'], {
            defaultValue: 'default value',
            placeholder: '\u8BF7\u8F93\u5165'
        }))), _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u53EA\u8BFB\u72B6\u6001'), _react2['default'].createElement(_melonTextBox2['default'], {
            value: '\u53EA\u8BFB',
            readOnly: true
        })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u7981\u7528\u72B6\u6001'), _react2['default'].createElement(_melonTextBox2['default'], {
            value: '\u7981\u7528',
            disabled: true
        }))));
    }
    module.exports = View;
});

define('components/code/Tabs.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20Tabs%20from%20%27melon/Tabs%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Aconst%20TabsExample%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CTabs%20selectedIndex%3D%7B1%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTabs.Tab%20label%3D%22Tab%20A%22%20id%3D%22Tab1%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B1%7D%3ETab%20A%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EThis%20is%20Tab%20A%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/Tabs.Tab%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTabs.Tab%20label%3D%22Tab%20B%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B1%7D%3ETab%20B%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u767E%u5EA6%uFF08Nasdaq%uFF1ABIDU%uFF09%u662F%u5168%u7403%u6700%u5927%u7684%u4E2D%u6587%u641C%u7D22%u5F15%u64CE%u3001%u6700%u5927%u7684%u4E2D%u6587%u7F51%u7AD9%u3002%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202000%u5E741%u6708%u7531%u674E%u5F66%u5B8F%u521B%u7ACB%u4E8E%u5317%u4EAC%u4E2D%u5173%u6751%uFF0C%u81F4%u529B%u4E8E%u5411%u4EBA%u4EEC%u63D0%u4F9B%u201C%u7B80%u5355%uFF0C%u53EF%u4F9D%u8D56%u201D%u7684%u4FE1%u606F%u83B7%u53D6%u65B9%u5F0F%u3002%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u201C%u767E%u5EA6%u201D%u4E8C%u5B57%u6E90%u4E8E%u4E2D%u56FD%u5B8B%u671D%u8BCD%u4EBA%u8F9B%u5F03%u75BE%u7684%u300A%u9752%u7389%u6848%B7%u5143%u5915%u300B%u8BCD%u53E5%u201C%u4F17%u91CC%u5BFB%u4ED6%u5343%u767E%u5EA6%u201D%uFF0C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u8C61%u5F81%u7740%u767E%u5EA6%u5BF9%u4E2D%u6587%u4FE1%u606F%u68C0%u7D22%u6280%u672F%u7684%u6267%u8457%u8FFD%u6C42%u3002%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202015%u5E741%u670824%u65E5%uFF0C%u767E%u5EA6%u521B%u59CB%u4EBA%u3001%u8463%u4E8B%u957F%u517CCEO%u674E%u5F66%u5B8F%u5728%u767E%u5EA62014%u5E74%u4F1A%u66A8%u5341%u4E94%u5468%u5E74%u5E86%u5178%u4E0A%u53D1%u8868%u7684%u4E3B%u9898%u6F14%u8BB2%u4E2D%u8868%u793A%uFF0C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u5341%u4E94%u5E74%u6765%uFF0C%u767E%u5EA6%u575A%u6301%u76F8%u4FE1%u6280%u672F%u7684%u529B%u91CF%uFF0C%u59CB%u7EC8%u628A%u7B80%u5355%u53EF%u4F9D%u8D56%u7684%u6587%u5316%u548C%u4EBA%u624D%u6210%u957F%u673A%u5236%u5F53%u6210%u6700%u5B9D%u8D35%u7684%u8D22%u5BCC%uFF0C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u4ED6%u53F7%u53EC%u767E%u5EA6%u5168%u4F53%u5458%u5DE5%uFF0C%u5411%u8FDE%u63A5%u4EBA%u4E0E%u670D%u52A1%u7684%u6218%u7565%u76EE%u6807%u53D1%u8D77%u8FDB%u653B%u30022015%u5E7411%u670818%u65E5%uFF0C%u767E%u5EA6%u4E0E%u4E2D%u4FE1%u94F6%u884C%u53D1%u8D77%u8BBE%u7ACB%u767E%u4FE1%u94F6%u884C%u3002%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/Tabs.Tab%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTabs.Tab%20label%3D%22Tab%20C%22%3EThis%20is%20Tab%20C%3C/Tabs.Tab%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTabs.Tab%20label%3D%22%u88AB%u7981%u7528%u7684Tab%22%20disabled%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/Tabs%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20TabsExample%3B';
});

define('components/examples/Tabs', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Tabs',
    'melon/Title',
    '../code/Tabs.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTabs = require('melon/Tabs');
    var _melonTabs2 = babelHelpers.interopRequireDefault(_melonTabs);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/Tabs.txt');
    var TabsExample = _react2['default'].createClass({
        displayName: 'TabsExample',
        render: function render() {
            return _react2['default'].createElement(_melonTabs2['default'], { selectedIndex: 1 }, _react2['default'].createElement(_melonTabs2['default'].Tab, {
                label: 'Tab A',
                id: 'Tab1'
            }, _react2['default'].createElement(_melonTitle2['default'], { level: 1 }, 'Tab A'), _react2['default'].createElement('p', null, 'This is Tab A')), _react2['default'].createElement(_melonTabs2['default'].Tab, { label: 'Tab B' }, _react2['default'].createElement(_melonTitle2['default'], { level: 1 }, 'Tab B'), _react2['default'].createElement('p', null, '\u767E\u5EA6\uFF08Nasdaq\uFF1ABIDU\uFF09\u662F\u5168\u7403\u6700\u5927\u7684\u4E2D\u6587\u641C\u7D22\u5F15\u64CE\u3001\u6700\u5927\u7684\u4E2D\u6587\u7F51\u7AD9\u3002 2000\u5E741\u6708\u7531\u674E\u5F66\u5B8F\u521B\u7ACB\u4E8E\u5317\u4EAC\u4E2D\u5173\u6751\uFF0C\u81F4\u529B\u4E8E\u5411\u4EBA\u4EEC\u63D0\u4F9B\u201C\u7B80\u5355\uFF0C\u53EF\u4F9D\u8D56\u201D\u7684\u4FE1\u606F\u83B7\u53D6\u65B9\u5F0F\u3002 \u201C\u767E\u5EA6\u201D\u4E8C\u5B57\u6E90\u4E8E\u4E2D\u56FD\u5B8B\u671D\u8BCD\u4EBA\u8F9B\u5F03\u75BE\u7684\u300A\u9752\u7389\u6848\xB7\u5143\u5915\u300B\u8BCD\u53E5\u201C\u4F17\u91CC\u5BFB\u4ED6\u5343\u767E\u5EA6\u201D\uFF0C \u8C61\u5F81\u7740\u767E\u5EA6\u5BF9\u4E2D\u6587\u4FE1\u606F\u68C0\u7D22\u6280\u672F\u7684\u6267\u8457\u8FFD\u6C42\u3002'), _react2['default'].createElement('p', null, '2015\u5E741\u670824\u65E5\uFF0C\u767E\u5EA6\u521B\u59CB\u4EBA\u3001\u8463\u4E8B\u957F\u517CCEO\u674E\u5F66\u5B8F\u5728\u767E\u5EA62014\u5E74\u4F1A\u66A8\u5341\u4E94\u5468\u5E74\u5E86\u5178\u4E0A\u53D1\u8868\u7684\u4E3B\u9898\u6F14\u8BB2\u4E2D\u8868\u793A\uFF0C \u5341\u4E94\u5E74\u6765\uFF0C\u767E\u5EA6\u575A\u6301\u76F8\u4FE1\u6280\u672F\u7684\u529B\u91CF\uFF0C\u59CB\u7EC8\u628A\u7B80\u5355\u53EF\u4F9D\u8D56\u7684\u6587\u5316\u548C\u4EBA\u624D\u6210\u957F\u673A\u5236\u5F53\u6210\u6700\u5B9D\u8D35\u7684\u8D22\u5BCC\uFF0C \u4ED6\u53F7\u53EC\u767E\u5EA6\u5168\u4F53\u5458\u5DE5\uFF0C\u5411\u8FDE\u63A5\u4EBA\u4E0E\u670D\u52A1\u7684\u6218\u7565\u76EE\u6807\u53D1\u8D77\u8FDB\u653B\u30022015\u5E7411\u670818\u65E5\uFF0C\u767E\u5EA6\u4E0E\u4E2D\u4FE1\u94F6\u884C\u53D1\u8D77\u8BBE\u7ACB\u767E\u4FE1\u94F6\u884C\u3002')), _react2['default'].createElement(_melonTabs2['default'].Tab, { label: 'Tab C' }, 'This is Tab C'), _react2['default'].createElement(_melonTabs2['default'].Tab, {
                label: '\u88AB\u7981\u7528\u7684Tab',
                disabled: true
            }));
        }
    });
    exports['default'] = TabsExample;
    module.exports = exports['default'];
});

define('components/code/SnackBarActive.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20SnackBar%20from%20%27melon/SnackBar%27%3B%0Aimport%20Button%20from%20%27melon/Button%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0A%0Aconst%20SnackBarExample%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20content%3A%20%27hello%20snack%20bar%27%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onBarClick%28%29%20%7B%0A%20%20%20%20%20%20%20%20const%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20content%0A%20%20%20%20%20%20%20%20%7D%20%3D%20this.state%3B%0A%0A%20%20%20%20%20%20%20%20SnackBar.show%28content%2C%202000%2C%20%27bc%27%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onContentChange%28%7Bvalue%7D%29%20%7B%0A%20%20%20%20%20%20%20%20this.setState%28%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20content%3A%20value%0A%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20floatingLabel%3D%22Content%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%22%u8FD9%u91CC%u8F93%u5165%u4E00%u4E9B%u5185%u5BB9%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onContentChange%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20multiline%3D%7Btrue%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%7Bthis.state.content%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CButton%20variants%3D%7B%5B%27raised%27%2C%20%27primary%27%5D%7D%20onClick%3D%7Bthis.onBarClick%7D%20label%3D%22%u52A8%u6001%u521B%u5EFA%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20SnackBarExample%3B%0A';
});

define('components/examples/SnackBarActive', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/SnackBar',
    'melon/Button',
    'melon/TextBox',
    '../code/SnackBarActive.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonSnackBar = require('melon/SnackBar');
    var _melonSnackBar2 = babelHelpers.interopRequireDefault(_melonSnackBar);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    require('../code/SnackBarActive.txt');
    var SnackBarExample = _react2['default'].createClass({
        displayName: 'SnackBarExample',
        getInitialState: function getInitialState() {
            return { content: 'hello snack bar' };
        },
        onBarClick: function onBarClick() {
            var content = this.state.content;
            _melonSnackBar2['default'].show(content, 2000, 'bc');
        },
        onContentChange: function onContentChange(_ref) {
            var value = _ref.value;
            this.setState({ content: value });
        },
        render: function render() {
            return _react2['default'].createElement('div', null, _react2['default'].createElement(_melonTextBox2['default'], {
                floatingLabel: 'Content',
                defaultValue: '\u8FD9\u91CC\u8F93\u5165\u4E00\u4E9B\u5185\u5BB9',
                onChange: this.onContentChange,
                multiline: true,
                value: this.state.content
            }), _react2['default'].createElement('br', null), _react2['default'].createElement('br', null), _react2['default'].createElement(_melonButton2['default'], {
                variants: [
                    'raised',
                    'primary'
                ],
                onClick: this.onBarClick,
                label: '\u52A8\u6001\u521B\u5EFA'
            }));
        }
    });
    exports['default'] = SnackBarExample;
    module.exports = exports['default'];
});

define('components/code/SnackBar.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20SnackBar%20from%20%27melon/SnackBar%27%3B%0Aimport%20Button%20from%20%27melon/Button%27%3B%0Aimport%20TextBox%20from%20%27melon/TextBox%27%3B%0A%0A%0Aconst%20SnackBarExample%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20open%3A%20false%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20duration%3A%200%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20direction%3A%20%27bl%27%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onHide%28e%29%20%7B%0A%20%20%20%20%20%20%20%20this.setState%28%7Bopen%3A%20false%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onClick%28e%29%20%7B%0A%20%20%20%20%20%20%20%20if%20%28this.state.open%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20this.setState%28%7Bopen%3A%20true%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onChange%28e%29%20%7B%0A%20%20%20%20%20%20%20%20const%20duration%20%3D%20e.value%20-%200%3B%0A%20%20%20%20%20%20%20%20this.setState%28%7Bduration%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onDirChange%28e%29%20%7B%0A%20%20%20%20%20%20%20%20const%20direction%20%3D%20e.value%3B%0A%20%20%20%20%20%20%20%20this.setState%28%7Bdirection%7D%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CButton%20variants%3D%7B%5B%27raised%27%2C%20%27primary%27%5D%7D%20onClick%3D%7Bthis.onClick%7D%20label%3D%22%u70B9%u6211%u6253%u5F00%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20floatingLabel%3D%27Auto%20Hide%20Duration%20in%20ms%27%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%270%27%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onChange%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%7Bthis.state.duration%20+%20%27%27%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTextBox%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20floatingLabel%3D%27Direction%27%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%27bl%27%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onDirChange%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%7Bthis.state.direction%20+%20%27%27%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSnackBar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20open%3D%7Bthis.state.open%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20autoHideDuration%3D%7Bthis.state.duration%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20message%3D%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7Bclear%3A%20%27both%27%7D%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ch1%3E%u4EE5%u4E0B%u7ED3%u70B9%u64CD%u4F5C%u5F02%u5E38%3C/h1%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cul%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%5B%27%u534E%u5317%27%2C%20%27%u534E%u5357%27%2C%20%27%u534E%u4E1C%27%2C%20%27%u65E5%u672C%27%2C%20%27%u53F0%u6E7E%27%2C%20%27%u7F8E%u56FD%27%5D.map%28number%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%20key%3D%7Bnumber%7D%3E%7Bnumber%7D%7Bnumber%7D%7Bnumber%7D%7Bnumber%7D%7Bnumber%7D%3C/li%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20direction%3D%7Bthis.state.direction%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20action%3D%27close%27%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onHide%3D%7Bthis.onHide%7D%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20SnackBarExample%3B%0A';
});

define('components/examples/SnackBar', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/SnackBar',
    'melon/Button',
    'melon/TextBox',
    '../code/SnackBar.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonSnackBar = require('melon/SnackBar');
    var _melonSnackBar2 = babelHelpers.interopRequireDefault(_melonSnackBar);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonTextBox = require('melon/TextBox');
    var _melonTextBox2 = babelHelpers.interopRequireDefault(_melonTextBox);
    require('../code/SnackBar.txt');
    var SnackBarExample = _react2['default'].createClass({
        displayName: 'SnackBarExample',
        getInitialState: function getInitialState() {
            return {
                open: false,
                duration: 0,
                direction: 'bl'
            };
        },
        onHide: function onHide(e) {
            this.setState({ open: false });
        },
        onClick: function onClick(e) {
            if (this.state.open) {
                return;
            }
            this.setState({ open: true });
        },
        onChange: function onChange(e) {
            var duration = e.value - 0;
            this.setState({ duration: duration });
        },
        onDirChange: function onDirChange(e) {
            var direction = e.value;
            this.setState({ direction: direction });
        },
        render: function render() {
            return _react2['default'].createElement('div', null, _react2['default'].createElement(_melonButton2['default'], {
                variants: [
                    'raised',
                    'primary'
                ],
                onClick: this.onClick,
                label: '\u70B9\u6211\u6253\u5F00'
            }), _react2['default'].createElement('br', null), _react2['default'].createElement('br', null), _react2['default'].createElement(_melonTextBox2['default'], {
                floatingLabel: 'Auto Hide Duration in ms',
                defaultValue: '0',
                onChange: this.onChange,
                value: this.state.duration + ''
            }), _react2['default'].createElement('br', null), _react2['default'].createElement('br', null), _react2['default'].createElement(_melonTextBox2['default'], {
                floatingLabel: 'Direction',
                defaultValue: 'bl',
                onChange: this.onDirChange,
                value: this.state.direction + ''
            }), _react2['default'].createElement(_melonSnackBar2['default'], {
                open: this.state.open,
                autoHideDuration: this.state.duration,
                message: _react2['default'].createElement('div', { style: { clear: 'both' } }, _react2['default'].createElement('h1', null, '\u4EE5\u4E0B\u7ED3\u70B9\u64CD\u4F5C\u5F02\u5E38'), _react2['default'].createElement('ul', null, [
                    '\u534E\u5317',
                    '\u534E\u5357',
                    '\u534E\u4E1C',
                    '\u65E5\u672C',
                    '\u53F0\u6E7E',
                    '\u7F8E\u56FD'
                ].map(function (number) {
                    return _react2['default'].createElement('li', { key: number }, number, number, number, number, number);
                }))),
                direction: this.state.direction,
                action: 'close',
                onHide: this.onHide
            }));
        }
    });
    exports['default'] = SnackBarExample;
    module.exports = exports['default'];
});

define('components/code/ScrollView.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aconst%20React%20%3D%20require%28%27react%27%29%3B%0Aconst%20ScrollView%20%3D%20require%28%27melon/ScrollView%27%29%3B%0A%0Aconst%20View%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20render%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CScrollView%20height%3D%7B300%7D%20width%3D%7B500%7D%20direction%3D%22both%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7Bwidth%3A%20800%2C%20lineHeight%3A%20%2725px%27%7D%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5982%u4F55%u8BA9%u4F60%u9047%u89C1%u6211%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5728%u6211%u6700%u7F8E%u4E3D%u7684%u65F6%u523B%u4E3A%u8FD9%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u6211%u5DF2%u5728%u4F5B%u524D%u6C42%u4E86%u4E94%u767E%u5E74%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u6C42%u4ED6%u8BA9%u6211%u4EEC%u7ED3%u4E00%u6BB5%u5C18%u7F18%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u4F5B%u4E8E%u662F%u628A%u6211%u5316%u4F5C%u4E00%u68F5%u6811%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u957F%u5728%u4F60%u5FC5%u7ECF%u7684%u8DEF%u65C1%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u9633%u5149%u4E0B%u614E%u91CD%u5730%u5F00%u6EE1%u4E86%u82B1%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u6735%u6735%u90FD%u662F%u6211%u524D%u4E16%u7684%u76FC%u671B%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5F53%u4F60%u8D70%u8FD1%u8BF7%u4F60%u7EC6%u542C%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u90A3%u98A4%u6296%u7684%u53F6%u662F%u6211%u7B49%u5F85%u7684%u70ED%u60C5%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u800C%u5F53%u4F60%u7EC8%u4E8E%u65E0%u89C6%u5730%u8D70%u8FC7%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5728%u4F60%u8EAB%u540E%u843D%u4E86%u4E00%u5730%u7684%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u670B%u53CB%u554A%u90A3%u4E0D%u662F%u82B1%u74E3%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u662F%u6211%u51CB%u96F6%u7684%u5FC3%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u53EA%u7F18%u611F%u541B%u4E00%u56DE%u987E%uFF0C%u4F7F%u6211%u601D%u541B%u66AE%u4E0E%u671D%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u2014%u2014%u5E2D%u6155%u5BB9%u300A%u53E4%u4E50%u5E9C%u300B%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5782%u67F3%u91CC%uFF0C%u5170%u821F%u5F53%u65E5%u66FE%u7CFB%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5343%u5E06%u8FC7%u5C3D%uFF0C%u53EA%u4F0A%u4EBA%u4E0D%u968F%u4E66%u81F3%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u602A%u7BA1%u9053%u7740%u6211%u4FAC%u5FC3%uFF0C%u4E00%u822C%u601D%u5987%u6E38%u5B50%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u6628%u5BB5%u68A6%uFF0C%u5206%u660E%u8BB0%uFF1A%u51E0%u56DE%u98DE%u5EA6%u70DF%u6C34%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u897F%u98CE%u6C34%u65AD%u4F34%u706F%u82B1%uFF0C%u6447%u6447%u6B32%u5760%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5BB5%u6DF1%u5F85%u5230%u51E4%u51F0%u5C71%uFF0C%u58F0%u58F0%u557C%u9D02%u50AC%u8D77%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u9526%u4E66%u5B9B%u5728%u6000%u8896%u5E95%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u4EBA%u8FE2%u8FE2%u3001%u7D2B%u585E%u5343%u91CC%uFF0C%u7B97%u662F%u4E0D%u66FE%u76F8%u5FC6%u3002%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u5018%u6709%u60C5%u3001%u65E9%u5408%u5F52%u6765%uFF0C%u4F11%u5BC4%u4E00%u7EB8%u65E0%u804A%u76F8%u601D%u5B57%uFF01%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%u2014%u2014%u738B%u56FD%u7EF4%u300A%u897F%u6CB3%u300B%3C/p%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ScrollView%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%7D%29%3B%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/ScrollView', [
    'require',
    'exports',
    'module',
    'react',
    'melon/ScrollView',
    '../code/ScrollView.txt'
], function (require, exports, module) {
    var React = require('react');
    var ScrollView = require('melon/ScrollView');
    require('../code/ScrollView.txt');
    var View = React.createClass({
        displayName: 'View',
        render: function render() {
            return React.createElement('div', null, React.createElement(ScrollView, {
                height: 300,
                width: 500,
                direction: 'both'
            }, React.createElement('div', {
                style: {
                    width: 800,
                    lineHeight: '25px'
                }
            }, React.createElement('p', null, '\u5982\u4F55\u8BA9\u4F60\u9047\u89C1\u6211'), React.createElement('p', null, '\u5728\u6211\u6700\u7F8E\u4E3D\u7684\u65F6\u523B\u4E3A\u8FD9'), React.createElement('p', null, '\u6211\u5DF2\u5728\u4F5B\u524D\u6C42\u4E86\u4E94\u767E\u5E74'), React.createElement('p', null, '\u6C42\u4ED6\u8BA9\u6211\u4EEC\u7ED3\u4E00\u6BB5\u5C18\u7F18'), React.createElement('p', null, '\u4F5B\u4E8E\u662F\u628A\u6211\u5316\u4F5C\u4E00\u68F5\u6811'), React.createElement('p', null, '\u957F\u5728\u4F60\u5FC5\u7ECF\u7684\u8DEF\u65C1'), React.createElement('p', null, '\u9633\u5149\u4E0B\u614E\u91CD\u5730\u5F00\u6EE1\u4E86\u82B1'), React.createElement('p', null, '\u6735\u6735\u90FD\u662F\u6211\u524D\u4E16\u7684\u76FC\u671B'), React.createElement('p', null, '\u5F53\u4F60\u8D70\u8FD1\u8BF7\u4F60\u7EC6\u542C'), React.createElement('p', null, '\u90A3\u98A4\u6296\u7684\u53F6\u662F\u6211\u7B49\u5F85\u7684\u70ED\u60C5'), React.createElement('p', null, '\u800C\u5F53\u4F60\u7EC8\u4E8E\u65E0\u89C6\u5730\u8D70\u8FC7'), React.createElement('p', null, '\u5728\u4F60\u8EAB\u540E\u843D\u4E86\u4E00\u5730\u7684'), React.createElement('p', null, '\u670B\u53CB\u554A\u90A3\u4E0D\u662F\u82B1\u74E3'), React.createElement('p', null, '\u662F\u6211\u51CB\u96F6\u7684\u5FC3'), React.createElement('p', null, '\u53EA\u7F18\u611F\u541B\u4E00\u56DE\u987E\uFF0C\u4F7F\u6211\u601D\u541B\u66AE\u4E0E\u671D'), React.createElement('p', null, '\u2014\u2014\u5E2D\u6155\u5BB9\u300A\u53E4\u4E50\u5E9C\u300B'), React.createElement('br', null), React.createElement('br', null), React.createElement('p', null, '\u5782\u67F3\u91CC\uFF0C\u5170\u821F\u5F53\u65E5\u66FE\u7CFB\u3002'), React.createElement('p', null, '\u5343\u5E06\u8FC7\u5C3D\uFF0C\u53EA\u4F0A\u4EBA\u4E0D\u968F\u4E66\u81F3\u3002'), React.createElement('p', null, '\u602A\u7BA1\u9053\u7740\u6211\u4FAC\u5FC3\uFF0C\u4E00\u822C\u601D\u5987\u6E38\u5B50\u3002'), React.createElement('p', null, '\u6628\u5BB5\u68A6\uFF0C\u5206\u660E\u8BB0\uFF1A\u51E0\u56DE\u98DE\u5EA6\u70DF\u6C34\u3002'), React.createElement('p', null, '\u897F\u98CE\u6C34\u65AD\u4F34\u706F\u82B1\uFF0C\u6447\u6447\u6B32\u5760\u3002'), React.createElement('p', null, '\u5BB5\u6DF1\u5F85\u5230\u51E4\u51F0\u5C71\uFF0C\u58F0\u58F0\u557C\u9D02\u50AC\u8D77\u3002'), React.createElement('p', null, '\u9526\u4E66\u5B9B\u5728\u6000\u8896\u5E95\u3002'), React.createElement('p', null, '\u4EBA\u8FE2\u8FE2\u3001\u7D2B\u585E\u5343\u91CC\uFF0C\u7B97\u662F\u4E0D\u66FE\u76F8\u5FC6\u3002'), React.createElement('p', null, '\u5018\u6709\u60C5\u3001\u65E9\u5408\u5F52\u6765\uFF0C\u4F11\u5BC4\u4E00\u7EB8\u65E0\u804A\u76F8\u601D\u5B57\uFF01'), React.createElement('p', null, '\u2014\u2014\u738B\u56FD\u7EF4\u300A\u897F\u6CB3\u300B'))));
        }
    });
    module.exports = View;
});

define('components/code/RangeCalendar.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20RangeCalendar%20from%20%27melon/RangeCalendar%27%3B%0Aimport%20UnitCalendar%20from%20%27melon/UnitCalendar%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-8%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u65E5%u671F%u533A%u95F4%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CRangeCalendar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%7B%5B%272014-10-20%27%2C%20%272015-10-20%27%5D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%222014-10-21%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%222016-10-19%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20size%3D%22xxs%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u5468%u533A%u95F4%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CUnitCalendar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20size%3D%22xxs%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%7B%5B%5D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%7Bnew%20Date%282015%2C%2010%2C%202%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%7Bnew%20Date%282016%2C%200%2C%2031%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20unit%3D%22week%22/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u6708%u533A%u95F4%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CUnitCalendar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20size%3D%22xxs%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%7B%5B%5D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%7Bnew%20Date%282014%2C%2010%2C%201%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%7Bnew%20Date%282015%2C%2011%2C%201%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20unit%3D%22month%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-6%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u5E74%u533A%u95F4%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CUnitCalendar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20size%3D%22xxs%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20defaultValue%3D%7B%5B%5D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%7Bnew%20Date%282012%2C%200%2C%201%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%7Bnew%20Date%282020%2C%204%2C%201%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20unit%3D%22year%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/RangeCalendar', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/RangeCalendar',
    'melon/UnitCalendar',
    'melon/Title',
    '../code/RangeCalendar.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonRangeCalendar = require('melon/RangeCalendar');
    var _melonRangeCalendar2 = babelHelpers.interopRequireDefault(_melonRangeCalendar);
    var _melonUnitCalendar = require('melon/UnitCalendar');
    var _melonUnitCalendar2 = babelHelpers.interopRequireDefault(_melonUnitCalendar);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/RangeCalendar.txt');
    function View(props) {
        return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-8' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u65E5\u671F\u533A\u95F4'), _react2['default'].createElement(_melonRangeCalendar2['default'], {
            defaultValue: [
                '2014-10-20',
                '2015-10-20'
            ],
            begin: '2014-10-21',
            end: '2016-10-19',
            size: 'xxs'
        }))), _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u5468\u533A\u95F4'), _react2['default'].createElement(_melonUnitCalendar2['default'], {
            size: 'xxs',
            defaultValue: [],
            begin: new Date(2015, 10, 2),
            end: new Date(2016, 0, 31),
            unit: 'week'
        })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u6708\u533A\u95F4'), _react2['default'].createElement(_melonUnitCalendar2['default'], {
            size: 'xxs',
            defaultValue: [],
            begin: new Date(2014, 10, 1),
            end: new Date(2015, 11, 1),
            unit: 'month'
        })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u5E74\u533A\u95F4'), _react2['default'].createElement(_melonUnitCalendar2['default'], {
            size: 'xxs',
            defaultValue: [],
            begin: new Date(2012, 0, 1),
            end: new Date(2020, 4, 1),
            unit: 'year'
        }))));
    }
    module.exports = View;
});

define('components/code/ProgressLinear.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aconst%20React%20%3D%20require%28%27react%27%29%3B%0A%0Aconst%20Title%20%3D%20require%28%27melon/Title%27%29%3B%0Aconst%20Progress%20%3D%20require%28%27melon/Progress%27%29%3B%0A%0Aconst%20View%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%3A%2020%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20componentDidMount%28%29%20%7B%0A%20%20%20%20%20%20%20%20var%20me%20%3D%20this%3B%0A%20%20%20%20%20%20%20%20var%20value%20%3D%20me.state.value%3B%0A%20%20%20%20%20%20%20%20me.timer%20%3D%20setTimeout%28function%20tick%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%20+%3D%2010%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20me.setState%28%7Bvalue%3A%20value%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28value%20%3C%20100%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20me.timer%20%3D%20setTimeout%28tick%2C%20800%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%20800%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20componentWillUnmount%28%29%20%7B%0A%20%20%20%20%20%20%20%20clearTimeout%28this.timer%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3Edeterminate%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3Eindeterminate%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20mode%3D%22indeterminate%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/ProgressLinear', [
    'require',
    'exports',
    'module',
    'react',
    'melon/Title',
    'melon/Progress',
    '../code/ProgressLinear.txt'
], function (require, exports, module) {
    var React = require('react');
    var Title = require('melon/Title');
    var Progress = require('melon/Progress');
    require('../code/ProgressLinear.txt');
    var View = React.createClass({
        displayName: 'View',
        getInitialState: function getInitialState() {
            return { value: 20 };
        },
        componentDidMount: function componentDidMount() {
            var me = this;
            var value = me.state.value;
            me.timer = setTimeout(function tick() {
                value += 10;
                me.setState({ value: value });
                if (value < 100) {
                    me.timer = setTimeout(tick, 800);
                }
            }, 800);
        },
        componentWillUnmount: function componentWillUnmount() {
            clearTimeout(this.timer);
        },
        render: function render() {
            return React.createElement('div', null, React.createElement(Title, { level: 4 }, 'determinate'), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate'
            }), React.createElement('br', null), React.createElement(Title, { level: 4 }, 'indeterminate'), React.createElement(Progress, { mode: 'indeterminate' }));
        }
    });
    module.exports = View;
});

define('components/code/ProgressCircle.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aconst%20React%20%3D%20require%28%27react%27%29%3B%0A%0Aconst%20Title%20%3D%20require%28%27melon/Title%27%29%3B%0Aconst%20Progress%20%3D%20require%28%27melon/Progress%27%29%3B%0A%0Aconst%20View%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%3A%2020%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20componentDidMount%28%29%20%7B%0A%20%20%20%20%20%20%20%20var%20me%20%3D%20this%3B%0A%20%20%20%20%20%20%20%20var%20value%20%3D%20me.state.value%3B%0A%20%20%20%20%20%20%20%20me.timer%20%3D%20setTimeout%28function%20tick%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20value%20+%3D%2010%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20me.setState%28%7Bvalue%3A%20value%7D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28value%20%3C%20100%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20me.timer%20%3D%20setTimeout%28tick%2C%20800%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%20800%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20componentWillUnmount%28%29%20%7B%0A%20%20%20%20%20%20%20%20clearTimeout%28this.timer%29%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B4%7D%3Edeterminate%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20shape%3D%22circle%22%20size%3D%22xxs%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20shape%3D%22circle%22%20size%3D%22xs%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20shape%3D%22circle%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20shape%3D%22circle%22%20size%3D%22l%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20value%3D%7Bthis.state.value%7D%20mode%3D%22determinate%22%20shape%3D%22circle%22%20size%3D%22xl%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B4%7D%3Eindeterminate%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20mode%3D%22indeterminate%22%20shape%3D%22circle%22%20size%3D%22xxl%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20mode%3D%22indeterminate%22%20shape%3D%22circle%22%20size%3D%22xxxl%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CProgress%20mode%3D%22indeterminate%22%20shape%3D%22circle%22%20size%3D%22s%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/ProgressCircle', [
    'require',
    'exports',
    'module',
    'react',
    'melon/Title',
    'melon/Progress',
    '../code/ProgressCircle.txt'
], function (require, exports, module) {
    var React = require('react');
    var Title = require('melon/Title');
    var Progress = require('melon/Progress');
    require('../code/ProgressCircle.txt');
    var View = React.createClass({
        displayName: 'View',
        getInitialState: function getInitialState() {
            return { value: 20 };
        },
        componentDidMount: function componentDidMount() {
            var me = this;
            var value = me.state.value;
            me.timer = setTimeout(function tick() {
                value += 10;
                me.setState({ value: value });
                if (value < 100) {
                    me.timer = setTimeout(tick, 800);
                }
            }, 800);
        },
        componentWillUnmount: function componentWillUnmount() {
            clearTimeout(this.timer);
        },
        render: function render() {
            return React.createElement('div', null, React.createElement(Title, { level: 4 }, 'determinate'), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate',
                shape: 'circle',
                size: 'xxs'
            }), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate',
                shape: 'circle',
                size: 'xs'
            }), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate',
                shape: 'circle'
            }), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate',
                shape: 'circle',
                size: 'l'
            }), React.createElement(Progress, {
                value: this.state.value,
                mode: 'determinate',
                shape: 'circle',
                size: 'xl'
            }), React.createElement('br', null), React.createElement(Title, { level: 4 }, 'indeterminate'), React.createElement(Progress, {
                mode: 'indeterminate',
                shape: 'circle',
                size: 'xxl'
            }), React.createElement(Progress, {
                mode: 'indeterminate',
                shape: 'circle',
                size: 'xxxl'
            }), React.createElement(Progress, {
                mode: 'indeterminate',
                shape: 'circle',
                size: 's'
            }));
        }
    });
    module.exports = View;
});

define('components/code/Pager2.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20Pager%20from%20%27melon/Pager%27%3B%0A%0Aconst%20PagerExample2%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20page%3A%201%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onChange%28e%29%20%7B%0A%0A%20%20%20%20%20%20%20%20const%20%7Bpage%7D%20%3D%20e%3B%0A%0A%20%20%20%20%20%20%20%20this.setState%28%7Bpage%7D%29%3B%0A%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CPager%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20total%3D%7B10%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20page%3D%7Bthis.state.page%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20first%3D%7B1%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20useLang%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onChange%7D%20/%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u5F53%u524D%u9875%u7801%u4E3A%7Bthis.state.page%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20PagerExample2%3B%0A';
});

define('components/examples/Pager2', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Pager',
    '../code/Pager2.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonPager = require('melon/Pager');
    var _melonPager2 = babelHelpers.interopRequireDefault(_melonPager);
    require('../code/Pager2.txt');
    var PagerExample2 = _react2['default'].createClass({
        displayName: 'PagerExample2',
        getInitialState: function getInitialState() {
            return { page: 1 };
        },
        onChange: function onChange(e) {
            var page = e.page;
            this.setState({ page: page });
        },
        render: function render() {
            return _react2['default'].createElement('div', null, _react2['default'].createElement(_melonPager2['default'], {
                total: 10,
                page: this.state.page,
                first: 1,
                useLang: true,
                onChange: this.onChange
            }), _react2['default'].createElement('p', null, '\u5F53\u524D\u9875\u7801\u4E3A', this.state.page));
        }
    });
    exports['default'] = PagerExample2;
    module.exports = exports['default'];
});

define('components/code/Pager1.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20Pager%20from%20%27melon/Pager%27%3B%0A%0Aconst%20PagerExample1%20%3D%20React.createClass%28%7B%0A%0A%20%20%20%20getInitialState%28%29%20%7B%0A%20%20%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20page%3A%203%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onChange%28e%29%20%7B%0A%0A%20%20%20%20%20%20%20%20const%20%7Bpage%7D%20%3D%20e%3B%0A%0A%20%20%20%20%20%20%20%20this.setState%28%7Bpage%7D%29%3B%0A%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20render%28%29%20%7B%0A%0A%20%20%20%20%20%20%20%20return%20%28%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CPager%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20total%3D%7B15%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20page%3D%7Bthis.state.page%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20onChange%3D%7Bthis.onChange%7D%20/%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%u5F53%u524D%u9875%u7801%u4E3A%7Bthis.state.page%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%0A%20%20%20%20%20%20%20%20%29%3B%0A%20%20%20%20%7D%0A%0A%7D%29%3B%0A%0Aexport%20default%20PagerExample1%3B';
});

define('components/examples/Pager1', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Pager',
    '../code/Pager1.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonPager = require('melon/Pager');
    var _melonPager2 = babelHelpers.interopRequireDefault(_melonPager);
    require('../code/Pager1.txt');
    var PagerExample1 = _react2['default'].createClass({
        displayName: 'PagerExample1',
        getInitialState: function getInitialState() {
            return { page: 3 };
        },
        onChange: function onChange(e) {
            var page = e.page;
            this.setState({ page: page });
        },
        render: function render() {
            return _react2['default'].createElement('div', null, _react2['default'].createElement(_melonPager2['default'], {
                total: 15,
                page: this.state.page,
                onChange: this.onChange
            }), _react2['default'].createElement('p', null, '\u5F53\u524D\u9875\u7801\u4E3A', this.state.page));
        }
    });
    exports['default'] = PagerExample1;
    module.exports = exports['default'];
});

define('components/examples/Drawer', [
    'require',
    'exports',
    'module',
    'react',
    'melon/Button',
    'melon/Drawer',
    'melon/Select'
], function (require, exports, module) {
    var React = require('react');
    var Button = require('melon/Button');
    var Drawer = require('melon/Drawer');
    var Select = require('melon/Select');
    var View = React.createClass({
        displayName: 'View',
        getInitialState: function getInitialState() {
            return {
                open: false,
                position: 'left',
                size: '300'
            };
        },
        render: function render() {
            var _this = this;
            var _state = this.state;
            var open = _state.open;
            var position = _state.position;
            var size = _state.size;
            return React.createElement('div', null, React.createElement(Button, {
                variants: [
                    'raised',
                    'primary'
                ],
                onClick: function () {
                    _this.setState({ open: true });
                },
                label: '\u70B9\u6211\u6253\u5F00'
            }), React.createElement(Drawer, {
                open: open,
                position: position,
                size: +size,
                onHide: function () {
                    _this.setState({ open: !_this.state.open });
                }
            }, React.createElement('div', { style: { padding: 20 } }, React.createElement(Select, {
                variants: ['fluid'],
                value: this.state.position,
                onChange: function (_ref) {
                    var value = _ref.value;
                    _this.setState({ position: value });
                }
            }, React.createElement('option', { value: 'left' }, 'left'), React.createElement('option', { value: 'right' }, 'right'), React.createElement('option', { value: 'top' }, 'top'), React.createElement('option', { value: 'bottom' }, 'bottom'))), React.createElement('div', { style: { padding: 20 } }, React.createElement(Select, {
                variants: ['fluid'],
                value: this.state.size,
                onChange: function (_ref2) {
                    var value = _ref2.value;
                    _this.setState({ size: value });
                }
            }, React.createElement('option', { value: '300' }, '300'), React.createElement('option', { value: '500' }, '500'), React.createElement('option', { value: '-300' }, '-300'), React.createElement('option', { value: '-500' }, '-500')))));
        }
    });
    module.exports = View;
});

define('components/code/Calendar.txt', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = '%0Aimport%20React%20from%20%27react%27%3B%0Aimport%20Calendar%20from%20%27melon/Calendar%27%3B%0Aimport%20Title%20from%20%27melon/Title%27%3B%0A%0Afunction%20View%28props%29%20%7B%0A%0A%20%20%20%20return%20%28%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u666E%u901A%u65E5%u5386%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CCalendar%3E%3C/Calendar%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u9650%u5B9A%u533A%u95F4%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CCalendar%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%222015-09-01%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20begin%3D%7Bnew%20Date%282015%2C%207%2C%2010%29%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20end%3D%7Bnew%20Date%282015%2C%209%2C%2028%29%7D%3E%3C/Calendar%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%202015-7-10%20to%202015-9-28%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-row%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u7981%u7528%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CCalendar%20disabled%3E%3C/Calendar%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22melon-column%20melon-column-4%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CTitle%20level%3D%7B5%7D%3E%u53EA%u8BFB%3C/Title%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CCalendar%20begin%3D%7Bnew%20Date%282014%2C%209%2C%2010%29%7D%20end%3D%7Bnew%20Date%282015%2C%209%2C%2010%29%7D%20readOnly%3E%3C/Calendar%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%20%20%20%20%3C/div%3E%0A%20%20%20%20%29%3B%0A%7D%0A%0Amodule.exports%20%3D%20View%3B%0A';
});

define('components/examples/Calendar', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Calendar',
    'melon/Title',
    '../code/Calendar.txt'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonCalendar = require('melon/Calendar');
    var _melonCalendar2 = babelHelpers.interopRequireDefault(_melonCalendar);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    require('../code/Calendar.txt');
    function View(props) {
        return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u666E\u901A\u65E5\u5386'), _react2['default'].createElement(_melonCalendar2['default'], null)), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u9650\u5B9A\u533A\u95F4'), _react2['default'].createElement(_melonCalendar2['default'], {
            value: '2015-09-01',
            begin: new Date(2015, 7, 10),
            end: new Date(2015, 9, 28)
        }), '2015-7-10 to 2015-9-28')), _react2['default'].createElement('div', { className: 'melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u7981\u7528'), _react2['default'].createElement(_melonCalendar2['default'], { disabled: true })), _react2['default'].createElement('div', { className: 'melon-column melon-column-6' }, _react2['default'].createElement(_melonTitle2['default'], { level: 5 }, '\u53EA\u8BFB'), _react2['default'].createElement(_melonCalendar2['default'], {
            begin: new Date(2014, 9, 10),
            end: new Date(2015, 9, 10),
            readOnly: true
        }))));
    }
    module.exports = View;
});

define('components/conf/properties', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    './properties/tabs',
    './properties/pager',
    './properties/progress',
    './properties/snackbar',
    './properties/drawer',
    './properties/scrollview',
    './properties/textbox',
    './properties/calendar'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var _propertiesTabs = require('./properties/tabs');
    var _propertiesTabs2 = babelHelpers.interopRequireDefault(_propertiesTabs);
    var _propertiesPager = require('./properties/pager');
    var _propertiesPager2 = babelHelpers.interopRequireDefault(_propertiesPager);
    var _propertiesProgress = require('./properties/progress');
    var _propertiesProgress2 = babelHelpers.interopRequireDefault(_propertiesProgress);
    var _propertiesSnackbar = require('./properties/snackbar');
    var _propertiesSnackbar2 = babelHelpers.interopRequireDefault(_propertiesSnackbar);
    var _propertiesDrawer = require('./properties/drawer');
    var _propertiesDrawer2 = babelHelpers.interopRequireDefault(_propertiesDrawer);
    var _propertiesScrollview = require('./properties/scrollview');
    var _propertiesScrollview2 = babelHelpers.interopRequireDefault(_propertiesScrollview);
    var _propertiesTextbox = require('./properties/textbox');
    var _propertiesTextbox2 = babelHelpers.interopRequireDefault(_propertiesTextbox);
    module.exports = babelHelpers._extends({}, _propertiesTabs2['default'], _propertiesProgress2['default'], _propertiesPager2['default'], _propertiesSnackbar2['default'], _propertiesDrawer2['default'], _propertiesScrollview2['default'], _propertiesTextbox2['default'], require('./properties/calendar'));
});

define('components/conf/properties/textbox', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        TextBox: [{
                title: 'TextBox',
                props: [
                    {
                        name: 'type',
                        type: 'string',
                        defaultValue: 'text',
                        description: '\u8F93\u5165\u6846\u7684\u7C7B\u578B\uFF0C\u5305\u542B text password \u4E24\u79CD'
                    },
                    {
                        name: 'value',
                        type: 'string',
                        description: '\u8F93\u5165\u503C\uFF08\u88AB\u63A7\u5236\u7684\uFF0C\u4E0EonChange\u540C\u65F6\u4F7F\u7528\uFF09'
                    },
                    {
                        name: 'defaultValue',
                        type: 'string',
                        defaultValue: '\'\'',
                        description: '\u8F93\u5165\u6846\u7684\u503C\uFF08\u672A\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'placeholder',
                        type: 'string',
                        description: '\u540Cinput\u7684placeholder\u5C5E\u6027'
                    },
                    {
                        name: 'floatingLabel',
                        type: 'string',
                        description: '\u6D6E\u52A8\u63D0\u793A'
                    },
                    {
                        name: 'multiline',
                        type: 'boolean',
                        description: '\u652F\u6301\u591A\u884C\u8F93\u5165'
                    },
                    {
                        name: 'validateEvents',
                        type: 'array',
                        defaultValue: '[\'change\', \'blur\']',
                        description: '\u6821\u9A8C\u7684\u4E8B\u4EF6\uFF0C\u652F\u6301 change blur focus'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u503C\u6539\u53D8\u65F6\u7684\u56DE\u8C03'
                    },
                    {
                        name: 'onFocus',
                        type: 'function',
                        description: '\u83B7\u5F97\u7126\u70B9\u65F6\u7684\u56DE\u8C03'
                    },
                    {
                        name: 'onBlur',
                        type: 'function',
                        description: '\u5931\u53BB\u7126\u70B9\u65F6\u7684\u56DE\u8C03'
                    }
                ]
            }]
    };
});

define('components/conf/properties/tabs', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Tabs: [
            {
                title: 'Tabs',
                props: [
                    {
                        name: 'selectedIndex',
                        type: 'number',
                        defaultValue: '0',
                        description: '\u9009\u4E2D\u9879\u7D22\u5F15'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u5207\u6362\u4E4B\u540E\u8C03\u7528'
                    },
                    {
                        name: 'onBeforeChange',
                        type: 'function',
                        description: '\u5207\u6362\u4E4B\u524D\u8C03\u7528\uFF0C\u53EF\u963B\u6B62\u9ED8\u8BA4\u4E8B\u4EF6'
                    }
                ]
            },
            {
                title: 'Tab',
                props: [
                    {
                        name: 'selected',
                        type: 'boolean',
                        description: '\u662F\u5426\u88AB\u9009\u4E2D'
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        defaultValue: 'false'
                    }
                ]
            },
            {
                title: 'Panel',
                props: [{
                        name: 'active',
                        type: 'boolean',
                        description: '\u662F\u5426\u663E\u793A'
                    }]
            }
        ]
    };
});

define('components/conf/properties/snackbar', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        SnackBar: [{
                title: 'SnackBar',
                props: [
                    {
                        name: 'action',
                        type: 'string',
                        defaultValue: '\u5173\u95ED',
                        description: '\u5173\u95ED\u6309\u94AE\u663E\u793A\u7684\u6587\u5B57'
                    },
                    {
                        name: 'direction',
                        type: 'string',
                        defaultValue: 'bl',
                        description: '\u663E\u793A\u7684\u4F4D\u7F6E\uFF0C\'tr\', \'rt\', \'rb\',' + ' \'br\', \'bl\', \'lb\', \'lt\', \'tl\', \'tc\', \'rc\', \'bc\', \'lc\''
                    },
                    {
                        name: 'autoHideDuration',
                        type: 'number',
                        defaultValue: '0',
                        description: '\u81EA\u52A8\u5173\u95ED\u7684\u5EF6\u8FDF\uFF0C\u82E5\u4E3A0\uFF0C\u5219\u4E0D\u4F1A\u81EA\u52A8\u5173\u95ED'
                    },
                    {
                        name: 'message',
                        type: 'node',
                        description: '\u663E\u793A\u7684\u4FE1\u606F\uFF0C\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32\u4E5F\u53EF\u4EE5\u662F react dom'
                    },
                    {
                        name: 'openOnMount',
                        type: 'boolean',
                        description: '\u662F\u5426\u5728 componentDidMount \u7684\u65F6\u5019\u5C31\u663E\u793A\u51FA\u6765'
                    },
                    {
                        name: 'onHide',
                        type: 'function',
                        description: '\u9690\u85CF\u65F6\u7684\u56DE\u8C03'
                    },
                    {
                        name: 'onShow',
                        type: 'function',
                        description: '\u663E\u793A\u65F6\u7684\u56DE\u8C03'
                    }
                ]
            }]
    };
});

define('components/conf/properties/scrollview', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        ScrollView: [{
                title: 'ScrollView',
                props: [
                    {
                        name: 'direction',
                        type: 'string',
                        defaultValue: 'vertical',
                        description: '\'vertical\', \'horizontal\', \'both\''
                    },
                    {
                        name: 'wheelSpeed',
                        type: 'number',
                        defaultValue: '0.005',
                        description: '\u6EDA\u52A8\u901F\u7387'
                    },
                    {
                        name: 'onScroll',
                        type: 'func',
                        description: '\u6EDA\u52A8\u65F6\u7684\u56DE\u8C03\u51FD\u6570'
                    },
                    {
                        name: 'height',
                        type: 'number',
                        description: '\u957F\u5EA6'
                    },
                    {
                        name: 'width',
                        type: 'number',
                        description: '\u5BBD\u5EA6'
                    }
                ]
            }]
    };
});

define('components/conf/properties/progress', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Progress: [{
                title: 'Progress',
                props: [
                    {
                        name: 'shape',
                        type: '[\'circle\', \'linear\']',
                        defaultValue: 'linear',
                        description: '\u5F62\u72B6\uFF0C\u5206\u6761\u5F62\u548C\u5706\u5F62'
                    },
                    {
                        name: 'mode',
                        type: '[\'determinate\', \'indeterminate\']',
                        defaultValue: 'determinate',
                        description: 'determinate: \u53EF\u4EE5\u8BBE\u7F6Evlaue\uFF1Bindeterminate\u4E0D\u95F4\u65AD\u7684\u52A8\u753B'
                    },
                    {
                        name: 'value',
                        type: 'number',
                        defaultValue: 0,
                        description: '\u8FDB\u5EA6\u5F53\u524D\u503C\uFF0Cdeterminate\u65F6\u6709\u6548'
                    },
                    {
                        name: 'min',
                        type: 'number',
                        defaultValue: 0,
                        description: '\u8FDB\u5EA6\u6700\u5C0F\u503C\uFF0Cdeterminate\u65F6\u6709\u6548'
                    },
                    {
                        name: 'max',
                        type: 'number',
                        defaultValue: 100,
                        description: '\u8FDB\u5EA6\u6700\u5927\u503C\uFF0Cdeterminate\u65F6\u6709\u6548'
                    },
                    {
                        name: 'size',
                        type: '[\'xxs\', \'xs\', \'s\', \'l\', \'xl\', \'xxl\', \'xxxl\', undefined]',
                        defaultValue: 'undefined',
                        description: '\u663E\u793A\u5927\u5C0F'
                    }
                ]
            }]
    };
});

define('components/conf/properties/pager', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Pager: [{
                title: 'Pager',
                props: [
                    {
                        name: 'disabled',
                        type: 'boolean',
                        defaultValue: 'false',
                        description: '\u662F\u5426\u53EF\u7528'
                    },
                    {
                        name: 'page',
                        type: 'number',
                        description: '\u5F53\u524D\u9875\uFF0C\u7B2C\u4E00\u9875\u4ECE0\u5F00\u59CB',
                        defaultValue: 0
                    },
                    {
                        name: 'first',
                        type: 'number',
                        defaultValue: 0,
                        description: '\u8D77\u59CB\u9875\u7801'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u9875\u7801\u6539\u53D8\u65F6\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u5E26\u4E00\u4E2A\u53C2\u6570 {page: \'\u5F53\u524D\u9875\'}'
                    },
                    {
                        name: 'padding',
                        type: 'number',
                        defaultValue: 1,
                        description: '\u9996\u5C3E\u663E\u793A\u7684\u9875\u7801\u4E2A\u6570'
                    },
                    {
                        name: 'showAlways',
                        type: 'boolean',
                        defaultValue: 'false',
                        description: '\u662F\u5426\u4E00\u76F4\u663E\u793A\u5206\u9875\u63A7\u4EF6'
                    },
                    {
                        name: 'total',
                        type: 'number',
                        defaultValue: 0,
                        description: '\u603B\u9875\u6570'
                    },
                    {
                        name: 'useLang',
                        type: 'boolean',
                        defaultValue: 'false',
                        description: '\u662F\u5426\u4F7F\u7528\u6587\u5B57\u4F5C\u4E3A\u7FFB\u9875\u6309\u94AE'
                    },
                    {
                        name: 'lang',
                        type: 'object',
                        defaultValue: '',
                        description: '\u663E\u793A\u7684\u6587\u5B57'
                    },
                    {
                        name: 'lang.prev',
                        type: 'string',
                        defaultValue: '\u4E0A\u4E00\u9875',
                        description: '\u5411\u524D\u7FFB\u9875\u7684\u6587\u5B57'
                    },
                    {
                        name: 'lang.next',
                        type: 'string',
                        defaultValue: '\u4E0B\u4E00\u9875',
                        description: '\u5411\u540E\u7FFB\u9875\u7684\u6587\u5B57'
                    },
                    {
                        name: 'lang.ellipsis',
                        type: 'string',
                        defaultValue: '...',
                        description: '\u7701\u7565\u9875'
                    }
                ]
            }]
    };
});

define('components/conf/properties/drawer', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Drawer: [{
                title: 'Drawer',
                props: [
                    {
                        name: 'position',
                        type: 'string',
                        defaultValue: 'left',
                        description: '\'top\', \'right\', \'bottom\', \'left\''
                    },
                    {
                        name: 'open',
                        type: 'boolean',
                        defaultValue: 'false',
                        description: '\u662F\u5426\u663E\u793A'
                    },
                    {
                        name: 'size',
                        type: 'number',
                        defaultValue: 300,
                        description: '\u5F39\u51FA\u6846\u7684\u5BBD\u5EA6\uFF08\u9AD8\u5EA6\uFF09'
                    },
                    {
                        name: 'mask',
                        type: 'boolean',
                        defaultValue: 'true',
                        description: '\u662F\u5426\u6709\u906E\u7F69'
                    },
                    {
                        name: 'maskClickClose',
                        type: 'boolean',
                        defaultValue: 'true',
                        description: '\u662F\u5426\u70B9\u51FB\u906E\u7F69\u4EE5\u540E\u5173\u95ED'
                    }
                ]
            }]
    };
});

define('components/conf/properties/calendar', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Calendar: [
            {
                title: 'Calendar',
                props: [
                    {
                        name: 'autoConfirm',
                        type: 'boolean',
                        description: '\u70B9\u51FB\u65E5\u671F\u4EE5\u540E\u81EA\u52A8\u786E\u8BA4\uFF0C\u4E0D\u9700\u8981\u518D\u70B9\u786E\u8BA4\u6309\u94AE'
                    },
                    {
                        name: 'dateFormat',
                        type: '\u65E5\u671F\u7684\u683C\u5F0F',
                        defaultValue: 'yyyy-MM-dd',
                        description: 'determinate: \u53EF\u4EE5\u8BBE\u7F6Evlaue\uFF1Bindeterminate\u4E0D\u95F4\u65AD\u7684\u52A8\u753B'
                    },
                    {
                        name: 'value',
                        type: 'string',
                        description: '\u65E5\u671F\u7684\u503C\uFF08\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'end',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5927\u503C'
                    },
                    {
                        name: 'begin',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5C0F\u503C'
                    },
                    {
                        name: 'defaultValue',
                        type: 'string',
                        defaultValue: '(\u7CFB\u7EDF\u65E5\u671F\u503C)',
                        description: '\u65E5\u671F\u7684\u503C\uFF08\u672A\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'lang',
                        type: 'object',
                        description: '\u8BED\u8A00'
                    },
                    {
                        name: 'lang.week',
                        type: 'string',
                        defaultValue: '\u5468',
                        description: '\u661F\u671F\u7684\u524D\u7F00'
                    },
                    {
                        name: 'lang.days',
                        type: 'string',
                        defaultValue: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D',
                        description: '\u661F\u671F\u7684\u6587\u5B57'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u503C\u6539\u53D8\u65F6\u7684\u56DE\u8C03'
                    }
                ]
            },
            {
                title: 'RangeCalendar',
                props: [
                    {
                        name: 'dateFormat',
                        type: '\u65E5\u671F\u7684\u683C\u5F0F',
                        defaultValue: 'yyyy-MM-dd',
                        description: 'determinate: \u53EF\u4EE5\u8BBE\u7F6Evlaue\uFF1Bindeterminate\u4E0D\u95F4\u65AD\u7684\u52A8\u753B'
                    },
                    {
                        name: 'value',
                        type: 'array',
                        description: '\u65E5\u671F\u533A\u95F4\u7684\u503C\uFF08\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'end',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5927\u503C'
                    },
                    {
                        name: 'begin',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5C0F\u503C'
                    },
                    {
                        name: 'defaultValue',
                        type: 'array',
                        defaultValue: '([\u7CFB\u7EDF\u65E5\u671F\u503C, \u7CFB\u7EDF\u65E5\u671F\u503C\u7684\u4E00\u6708\u540E])',
                        description: '\u65E5\u671F\u7684\u503C\uFF08\u672A\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'lang',
                        type: 'object',
                        description: '\u8BED\u8A00'
                    },
                    {
                        name: 'lang.week',
                        type: 'string',
                        defaultValue: '\u5468',
                        description: '\u661F\u671F\u7684\u524D\u7F00'
                    },
                    {
                        name: 'lang.days',
                        type: 'string',
                        defaultValue: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D',
                        description: '\u661F\u671F\u7684\u6587\u5B57'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u503C\u6539\u53D8\u65F6\u7684\u56DE\u8C03'
                    }
                ]
            },
            {
                title: 'UnitCalendar',
                props: [
                    {
                        name: 'value',
                        type: 'array',
                        description: '\u65E5\u671F\u533A\u95F4\u7684\u503C\uFF08\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'end',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5927\u503C'
                    },
                    {
                        name: 'begin',
                        type: 'Date | string',
                        description: '\u65E5\u671F\u9009\u62E9\u7684\u6700\u5C0F\u503C'
                    },
                    {
                        name: 'defaultValue',
                        type: 'array',
                        defaultValue: '[]',
                        description: '\u65E5\u671F\u7684\u503C\uFF08\u672A\u88AB\u63A7\u5236\u7684\uFF09'
                    },
                    {
                        name: 'continuous',
                        type: 'boolean',
                        defaultValue: 'true',
                        description: '\u662F\u5426\u8FDE\u7EED'
                    },
                    {
                        name: 'onChange',
                        type: 'function',
                        description: '\u503C\u6539\u53D8\u65F6\u7684\u56DE\u8C03'
                    }
                ]
            }
        ]
    };
});

define('components/component/PropsTable', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Table',
    'melon/Title',
    'melon/common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTable = require('melon/Table');
    var _melonTable2 = babelHelpers.interopRequireDefault(_melonTable);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var cx = require('melon/common/util/cxBuilder').create('PropsTable');
    var PropsTable = _react2['default'].createClass({
        displayName: 'PropsTable',
        propTypes: {
            title: _react.PropTypes.string.isRequired,
            dataSource: _react.PropTypes.arrayOf(_react.PropTypes.shape({
                name: _react.PropTypes.string,
                type: _react.PropTypes.string,
                defaultValue: _react.PropTypes.oneOfType([
                    _react.PropTypes.string,
                    _react.PropTypes.number
                ]),
                description: _react.PropTypes.string
            })).isRequired
        },
        getInitialState: function getInitialState() {
            return { expand: false };
        },
        onClick: function onClick() {
            this.setState(function (_ref) {
                var expand = _ref.expand;
                return { expand: !expand };
            });
        },
        render: function render() {
            var _props = this.props;
            var title = _props.title;
            var dataSource = _props.dataSource;
            return _react2['default'].createElement('div', { className: cx(this.props).build() }, _react2['default'].createElement(_melonTitle2['default'], { level: 2 }, title + ' Properties'), _react2['default'].createElement(_melonTable2['default'], { dataSource: dataSource }, _react2['default'].createElement(_melonTable2['default'].Column, {
                dataKey: 'name',
                header: 'Name',
                footer: 'Name',
                width: 200
            }), _react2['default'].createElement(_melonTable2['default'].Column, {
                dataKey: 'type',
                header: 'Type',
                footer: 'Type',
                width: 200
            }), _react2['default'].createElement(_melonTable2['default'].Column, {
                dataKey: 'defaultValue',
                header: 'Default',
                footer: 'Default',
                width: 100
            }), _react2['default'].createElement(_melonTable2['default'].Column, {
                dataKey: 'description',
                header: 'Description',
                footer: 'Description',
                width: 500
            })));
        }
    });
    exports['default'] = PropsTable;
    module.exports = exports['default'];
});

define('components/component/ExampleCard', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Card',
    'melon/ToolBar',
    'melon/Zippy',
    'melon/Title',
    'melon/Button',
    'melon/Icon',
    '../../common/component/Code',
    'melon/common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonCard = require('melon/Card');
    var _melonCard2 = babelHelpers.interopRequireDefault(_melonCard);
    var _melonToolBar = require('melon/ToolBar');
    var _melonToolBar2 = babelHelpers.interopRequireDefault(_melonToolBar);
    var _melonZippy = require('melon/Zippy');
    var _melonZippy2 = babelHelpers.interopRequireDefault(_melonZippy);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonIcon = require('melon/Icon');
    var _melonIcon2 = babelHelpers.interopRequireDefault(_melonIcon);
    var _commonComponentCode = require('../../common/component/Code');
    var _commonComponentCode2 = babelHelpers.interopRequireDefault(_commonComponentCode);
    var cx = require('melon/common/util/cxBuilder').create('ExampleCard');
    var ExampleCard = _react2['default'].createClass({
        displayName: 'ExampleCard',
        propTypes: {
            title: _react.PropTypes.string.isRequired,
            code: _react.PropTypes.string.isRequired,
            exampleComponent: _react.PropTypes.element
        },
        getInitialState: function getInitialState() {
            return { expand: false };
        },
        onClick: function onClick() {
            this.setState(function (_ref) {
                var expand = _ref.expand;
                return { expand: !expand };
            });
        },
        render: function render() {
            var _props = this.props;
            var title = _props.title;
            var code = _props.code;
            var name = _props.name;
            var exampleComponent = _props.exampleComponent;
            return _react2['default'].createElement(_melonCard2['default'], { className: cx(this.props).build() }, _react2['default'].createElement(_melonToolBar2['default'], null, _react2['default'].createElement(_melonTitle2['default'], { level: 2 }, title), _react2['default'].createElement(_melonButton2['default'], {
                size: 'xxxl',
                onClick: this.onClick
            }, _react2['default'].createElement(_melonIcon2['default'], { icon: 'unfold-more' }))), _react2['default'].createElement(_melonZippy2['default'], {
                size: 300,
                expand: this.state.expand
            }, _react2['default'].createElement(_commonComponentCode2['default'], null, code)), _react2['default'].createElement('div', { className: cx().part('main').addVariants(name.toLowerCase()).build() }, exampleComponent));
        }
    });
    exports['default'] = ExampleCard;
    module.exports = exports['default'];
});

define('components/component/Example', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    './ExampleCard'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _ExampleCard = require('./ExampleCard');
    var _ExampleCard2 = babelHelpers.interopRequireDefault(_ExampleCard);
    var Example = _react2['default'].createClass({
        displayName: 'Example',
        propTypes: babelHelpers._extends({}, _ExampleCard2['default'].propTypes, { brief: _react.PropTypes.string }),
        render: function render() {
            var _props = this.props;
            var brief = _props.brief;
            var rest = babelHelpers.objectWithoutProperties(_props, ['brief']);
            return _react2['default'].createElement('div', { className: 'ui-example melon-row' }, _react2['default'].createElement('div', { className: 'melon-column melon-column-3 ui-example-brief' }, brief), _react2['default'].createElement('div', { className: 'melon-column melon-column-9' }, _react2['default'].createElement(_ExampleCard2['default'], rest)));
        }
    });
    exports['default'] = Example;
    module.exports = exports['default'];
});

define('components/conf/examples', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        Calendar: [
            {
                title: '\u65E5\u5386',
                brief: 'material\u98CE\u683C\u7684\u65E5\u5386\u7EC4\u4EF6\u3002\u652F\u6301\u8BBE\u5B9A\u65E5\u671F\u9009\u62E9\u533A\u95F4\uFF0C\u652F\u6301\u53EA\u8BFB\u548C\u7981\u7528\u3002',
                name: 'Calendar'
            },
            {
                title: '\u65E5\u671F\u671F\u95F4\u9009\u62E9',
                brief: '\u652F\u6301\u65E5\u671F\u533A\u95F4\u7684\u9009\u62E9\uFF0C\u5305\u62EC\u65E5\u533A\u95F4\u3001\u5468\u533A\u95F4\u3001\u6708\u533A\u95F4\u3001\u5E74\u533A\u95F4',
                name: 'RangeCalendar'
            }
        ],
        Drawer: [{
                title: '\u521B\u5EFADrawer',
                brief: '\u53EF\u914D\u7F6E\u4F4D\u7F6E\u3001\u5927\u5C0F',
                name: 'Drawer'
            }],
        Pager: [
            {
                title: '\u666E\u901A\u7684Pager',
                brief: '\u5206\u9875\u7EC4\u4EF6\uFF0C\u9ED8\u8BA4\u4E3A\u56FE\u6807\u7684\u7FFB\u9875\u6837\u5F0F',
                name: 'Pager1'
            },
            {
                title: '\u5E26\u6587\u5B57\u7684Pager',
                brief: '\u7528\u6587\u5B57\u4F5C\u4E3A\u7FFB\u9875\u6309\u94AE\uFF0C\u6587\u5B57\u5185\u5BB9\u53EF\u4EE5\u914D\u7F6E',
                name: 'Pager2'
            }
        ],
        Progress: [
            {
                title: '\u9ED8\u8BA4\u5F62\u72B6',
                brief: '\u8FDB\u5EA6\u6761\u7EC4\u4EF6\uFF0C\u9ED8\u8BA4\u662F\u6761\u5F62\u7684\uFF0C\u6709\u4E24\u79CD\u6A21\u5F0F \u2014\u2014 determinate \u548C indeterminate\uFF0Cindeterminate \u6A21\u5F0F\u8868\u793A\u4E0D\u95F4\u65AD\u7684\u8FDB\u5EA6\u52A8\u753B',
                name: 'ProgressLinear'
            },
            {
                title: '\u5706\u5F62',
                brief: '\u5706\u5F62\u7684\u8FDB\u5EA6\u6761\uFF0C\u4E5F\u6709 determinate \u548C indeterminate \u4E24\u79CD\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u901A\u8FC7 size \u6765\u8BBE\u7F6E\u663E\u793A\u5927\u5C0F',
                name: 'ProgressCircle'
            }
        ],
        ScrollView: [{
                title: '\u666E\u901A',
                brief: '\u53EF\u4EE5\u540C\u65F6\u652F\u6301\u4E24\u4E2A\u65B9\u5411\u7684\u6EDA\u52A8',
                name: 'ScrollView'
            }],
        SnackBar: [
            {
                title: '\u63D0\u793A\u6846',
                brief: '\u63D0\u793A\u6846\u7EC4\u4EF6\uFF0C\u53EF\u4EE5\u8BBE\u5B9A\u663E\u793A\u7684\u4F4D\u7F6E\uFF0C\u53EF\u4EE5\u8BBE\u5B9A\u663E\u793A\u4EE5\u540E\u81EA\u52A8\u6D88\u5931',
                name: 'SnackBar'
            },
            {
                title: '\u52A8\u6001\u521B\u5EFA',
                brief: '\u53EF\u4EE5\u901A\u8FC7 SnackBar.show \u63A5\u53E3\u52A8\u6001\u521B\u5EFA',
                name: 'SnackBarActive'
            }
        ],
        Tabs: [{
                title: '\u666E\u901A\u7684Tabs',
                brief: '\u8FD9\u662F\u4E00\u4E2ATab\u5207\u6362\u7EC4\u4EF6',
                name: 'Tabs'
            }],
        TextBox: [
            {
                title: '\u666E\u901A\u7684\u8F93\u5165\u6846',
                brief: '\u6587\u672C\u8F93\u5165\u6846\u7EC4\u4EF6\uFF0C\u652F\u6301\u53EA\u8BFB\u548C\u7981\u7528\u72B6\u6001',
                name: 'TextBox'
            },
            {
                title: '\u6D6E\u52A8\u63D0\u793A',
                brief: '\u5E26\u6709\u6D6E\u52A8\u63D0\u793A\u529F\u80FD',
                name: 'TextBoxFloatingLabel'
            },
            {
                title: '\u591A\u884C\u8F93\u5165',
                brief: '\u652F\u6301\u591A\u884C\u8F93\u5165',
                name: 'TextBoxMultiline'
            },
            {
                title: '\u524D\u7F00\u548C\u540E\u7F00',
                brief: '\u5E26\u6709\u524D\u7F00\u548C\u540E\u7F00\u7684\u6837\u5F0F',
                name: 'TextBoxFix'
            },
            {
                title: '\u88AB\u63A7\u5236\u7684\u8F93\u5165\u6846',
                brief: '\u88AB\u63A7\u5236\u7684\u8F93\u5165\u6846\u7684\u503C\u4E0D\u4F1A\u968F\u7740\u7528\u6237\u8F93\u5165\u800C\u53D8\u5316\u3002\u5B83\u53EA\u4F1A\u54CD\u5E94value\u503C\u7684\u53D8\u5316\u3002\u5F53value\u548ConChange\u540C\u65F6\u88AB\u8BBE\u5B9A\u65F6\uFF0CTextBox\u5C31\u4F1A\u8FDB\u5165\u88AB\u63A7\u5236\u7684\u72B6\u6001\u3002\u5373value\u4E0D\u662Fundefined\u6216null\uFF0ConChange\u662F\u4E00\u4E2A\u51FD\u6570',
                name: 'TextBoxControlled'
            }
        ]
    };
});

define('components/ComponentsPage', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'ei',
    'es6-promise',
    '../common/middleware/pageDispatchEvent',
    '../common/middleware/asyncAction',
    '../common/middleware/logger',
    '../common/util/ReducerBuilder',
    './conf/examples',
    'underscore',
    './ComponentView'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _ei = require('ei');
    var _ei2 = babelHelpers.interopRequireDefault(_ei);
    var _es6Promise = require('es6-promise');
    var _commonMiddlewarePageDispatchEvent = require('../common/middleware/pageDispatchEvent');
    var _commonMiddlewarePageDispatchEvent2 = babelHelpers.interopRequireDefault(_commonMiddlewarePageDispatchEvent);
    var _commonMiddlewareAsyncAction = require('../common/middleware/asyncAction');
    var _commonMiddlewareAsyncAction2 = babelHelpers.interopRequireDefault(_commonMiddlewareAsyncAction);
    var _commonMiddlewareLogger = require('../common/middleware/logger');
    var _commonMiddlewareLogger2 = babelHelpers.interopRequireDefault(_commonMiddlewareLogger);
    var _commonUtilReducerBuilder = require('../common/util/ReducerBuilder');
    var _commonUtilReducerBuilder2 = babelHelpers.interopRequireDefault(_commonUtilReducerBuilder);
    var _confExamples = require('./conf/examples');
    var _confExamples2 = babelHelpers.interopRequireDefault(_confExamples);
    var _underscore = require('underscore');
    var _underscore2 = babelHelpers.interopRequireDefault(_underscore);
    var ComponentsPage = _ei2['default'].Page.extend({
        middlewares: [
            _commonMiddlewareAsyncAction2['default'],
            _commonMiddlewarePageDispatchEvent2['default'],
            _commonMiddlewareLogger2['default']
        ],
        view: require('./ComponentView'),
        reducer: {
            datasource: new _commonUtilReducerBuilder2['default']().add('INIT', function (state, payload) {
                return payload.datasource;
            }).toReducer(),
            name: new _commonUtilReducerBuilder2['default']().add('INIT', function (state, payload) {
                return payload.name;
            }).toReducer()
        },
        getInitialState: function getInitialState(request) {
            var query = request.query;
            var name = query.name;
            return new _es6Promise.Promise(function (resolve, reject) {
                var requireList = _underscore2['default'].map(_confExamples2['default'][name], function (item) {
                    return 'components/examples/' + item.name;
                });
                require(requireList, function () {
                    var Components = _underscore2['default'].toArray(arguments);
                    resolve(_underscore2['default'].map(Components, function (Component, index) {
                        return babelHelpers._extends({}, _confExamples2['default'][name][index], { exampleComponent: _react2['default'].createElement(Component) });
                    }));
                });
            }).then(function (list) {
                return new _es6Promise.Promise(function (resolve, reject) {
                    var requireList = _underscore2['default'].map(_confExamples2['default'][name], function (item) {
                        return 'components/code/' + item.name + '.txt';
                    });
                    require(requireList, function () {
                        var codes = _underscore2['default'].toArray(arguments);
                        resolve(_underscore2['default'].map(codes, function (code, index) {
                            return babelHelpers._extends({}, list[index], { code: unescape(code) });
                        }));
                    });
                });
            }).then(function (list) {
                return {
                    datasource: list,
                    name: name
                };
            });
        }
    });
    exports['default'] = ComponentsPage;
    module.exports = exports['default'];
});

define('ei/main', [
    'require',
    'exports',
    'module',
    './App',
    './Page',
    './Container',
    './events',
    './resource',
    './util/composeReducer',
    './util/connect',
    './actionCreator/page'
], function (require, exports, module) {
    exports.App = require('./App');
    exports.Page = require('./Page');
    exports.Container = require('./Container');
    exports.events = require('./events');
    exports.resource = require('./resource');
    exports.composeReducer = require('./util/composeReducer');
    exports.connect = require('./util/connect');
    exports.actions = { INIT: require('./actionCreator/page').INIT };
});

define('components/ComponentView', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'ei',
    'melon/Title',
    './component/Example',
    './component/PropsTable',
    'underscore',
    './conf/properties',
    'melon/common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _ei = require('ei');
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var _componentExample = require('./component/Example');
    var _componentExample2 = babelHelpers.interopRequireDefault(_componentExample);
    var _componentPropsTable = require('./component/PropsTable');
    var _componentPropsTable2 = babelHelpers.interopRequireDefault(_componentPropsTable);
    var _underscore = require('underscore');
    var _underscore2 = babelHelpers.interopRequireDefault(_underscore);
    var _confProperties = require('./conf/properties');
    var _confProperties2 = babelHelpers.interopRequireDefault(_confProperties);
    var cx = require('melon/common/util/cxBuilder').create('ComponentView');
    var ComponentView = _react2['default'].createClass({
        displayName: 'ComponentView',
        renderExample: function renderExample(conf, index) {
            return _react2['default'].createElement(_componentExample2['default'], babelHelpers._extends({}, conf, { key: index }));
        },
        renderTable: function renderTable(data, index) {
            return _react2['default'].createElement(_componentPropsTable2['default'], {
                key: index,
                title: data.title,
                dataSource: data.props
            });
        },
        render: function render() {
            var _props = this.props;
            var name = _props.name;
            var datasource = _props.datasource;
            var className = cx(this.props).addVariants([name]).build();
            var propsData = _confProperties2['default'][name];
            return _react2['default'].createElement('div', { className: className }, _react2['default'].createElement(_melonTitle2['default'], { level: 1 }, name), _underscore2['default'].map(datasource, this.renderExample, this), _underscore2['default'].map(propsData, this.renderTable, this));
        }
    });
    exports['default'] = _ei.connect(ComponentView, true);
    module.exports = exports['default'];
});

define('common/util/toQueryString', [
    'require',
    'exports',
    'module',
    'numen/util'
], function (require, exports, module) {
    var util = require('numen/util');
    module.exports = util.toQueryString;
});

define('common/util/random', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.__esModule = true;
    exports['default'] = function () {
        return Math.random().toString(36).substr(2, 8);
    };
    module.exports = exports['default'];
});

define('common/util/composeReducer', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.__esModule = true;
    exports['default'] = function () {
        for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
            reducers[_key] = arguments[_key];
        }
        return function (state, action) {
            return reducers.reduce(function (state, reducer) {
                if (typeof reducer !== 'function') {
                    var type = action.type;
                    reducer = reducer[type];
                }
                if (typeof reducer === 'function') {
                    return reducer(state, action.payload, action);
                }
                return state;
            }, state);
        };
    };
    module.exports = exports['default'];
});

define('common/util/ReducerBuilder', [
    'require',
    'exports',
    'module',
    '../../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    var ReducerBuilder = function () {
        function ReducerBuilder() {
            babelHelpers.classCallCheck(this, ReducerBuilder);
            this.reducers = {};
        }
        ReducerBuilder.prototype.add = function add(type, reducer) {
            var _this = this;
            var types = [].concat(type);
            var reducers = this.reducers;
            types.reduce(function (reducers, type) {
                if (_this.reducers[type]) {
                    throw new Error(type + ' has already been added to ReducerBuilder');
                }
                _this.reducers[type] = reducer;
            }, reducers);
            return this;
        };
        ReducerBuilder.prototype.remove = function remove(type) {
            var types = [].concat(type);
            var reducers = this.reducers;
            this.reducers = Object.keys(reducers).reduce(function (fitleredReducers, type) {
                if (types.indexOf(type) !== -1) {
                    fitleredReducers[type] = reducers[type];
                }
                return fitleredReducers;
            }, {});
            return this;
        };
        ReducerBuilder.prototype.replace = function replace(type, reducer) {
            this.remove(type);
            this.add(type, reducer);
            return this;
        };
        ReducerBuilder.prototype.clearAll = function clearAll() {
            this.reducers = {};
        };
        ReducerBuilder.prototype.toReducer = function toReducer() {
            var reducers = babelHelpers._extends({}, this.reducers);
            return function (state, action) {
                var type = action.type;
                var payload = action.payload;
                var handler = reducers[type];
                if (handler == null) {
                    return state;
                }
                return typeof handler === 'function' ? handler(state, payload, action) : handler;
            };
        };
        return ReducerBuilder;
    }();
    module.exports = ReducerBuilder;
});

define('common/util/Enum', [
    'require',
    'exports',
    'module',
    '../../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var EnumSymbol = function () {
        function EnumSymbol(name, _ref) {
            var value = _ref.value;
            var description = _ref.description;
            babelHelpers.classCallCheck(this, EnumSymbol);
            this.name = name;
            if (value != null) {
                this.value = value;
            }
            if (description) {
                this.description = description;
            }
            Object.freeze(this);
        }
        EnumSymbol.prototype.toString = function toString() {
            return this.description || this.name;
        };
        EnumSymbol.prototype.valueOf = function valueOf() {
            return this.value;
        };
        return EnumSymbol;
    }();
    exports.EnumSymbol = EnumSymbol;
    var Enum = function () {
        function Enum(enumLiterals) {
            babelHelpers.classCallCheck(this, Enum);
            for (var key in enumLiterals) {
                if (!enumLiterals[key]) {
                    throw new TypeError('each enum should have been initialized with atleast empty {} value');
                }
                this[key] = new EnumSymbol(key, enumLiterals[key]);
            }
            Object.freeze(this);
        }
        Enum.prototype.keys = function keys() {
            return Object.keys(this);
        };
        Enum.prototype.contains = function contains(key) {
            return !!this[key];
        };
        return Enum;
    }();
    exports.Enum = Enum;
    exports['default'] = Enum;
});

define('common/middleware/pageDispatchEvent', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function pageDispatchEvent(page, state, action, next) {
        if (typeof action !== 'function') {
            var _event = action.event;
            var type = action.type;
            page.emit(_event || type, action);
        }
        next(action);
    }
    module.exports = function (page) {
        return pageDispatchEvent.bind(null, page);
    };
});

define('common/middleware/pageAction', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function pageAction(page, state, action, next) {
        var type = action.type;
        if (typeof action !== 'function' && action.type.indexOf('@') === 0) {
            var method = page[type.slice(1)];
            if (!method) {
                throw new Error('\u554A\uFF0Cview\u53D1\u6765\u7684\u5FEB\u9012page\u6CA1\u6709\u65B9\u5F0F\u6536\u554A\u3002\u3002\u3002');
            }
            method.call(page, action.payload, state);
            return;
        }
        next(action);
    }
    module.exports = function (page) {
        return pageAction.bind(null, page);
    };
});

define('common/middleware/logger', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var pageUidIndex = 0;
    function logger(pageId, state, action, next) {
        if (typeof action !== 'function') {
            console.log(pageId, action);
        }
        next(action);
    }
    module.exports = function (page) {
        return logger.bind(null, pageUidIndex++);
    };
});

define('common/middleware/asyncAction', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function asyncActionMiddleware(state, action, next) {
        var type = action.type;
        var payload = action.payload;
        if (!payload || typeof payload.then !== 'function') {
            next(action);
            return;
        }
        var events = action.events || {};
        next({
            type: type + '_START',
            event: events.start || type + '_START'
        });
        payload.then(function (data) {
            next({
                type: type + '_SUCCEED',
                payload: data,
                event: events.succeed || type + '_SUCCEED'
            });
        }, function (error) {
            next({
                type: type + '_FAILED',
                payload: error,
                error: true,
                event: events.failed || type + '_FAILED'
            });
        });
    }
    module.exports = function (page) {
        return asyncActionMiddleware;
    };
});

define('common/conf/navs', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = [
        {
            text: 'Melon',
            children: [{
                    text: 'Introduction',
                    pathname: '/',
                    title: ''
                }]
        },
        {
            text: 'Components',
            children: [
                {
                    text: 'Calendar',
                    pathname: '/components',
                    query: { name: 'Calendar' }
                },
                {
                    text: 'Drawer',
                    pathname: '/components',
                    query: { name: 'Drawer' }
                },
                {
                    text: 'Pager',
                    pathname: '/components',
                    query: { name: 'Pager' }
                },
                {
                    text: 'Progress',
                    pathname: '/components',
                    query: { name: 'Progress' }
                },
                {
                    text: 'ScrollView',
                    pathname: '/components',
                    query: { name: 'ScrollView' }
                },
                {
                    text: 'SnackBar',
                    pathname: '/components',
                    query: { name: 'SnackBar' }
                },
                {
                    text: 'Tabs',
                    pathname: '/components',
                    query: { name: 'Tabs' }
                },
                {
                    text: 'TextBox',
                    pathname: '/components',
                    query: { name: 'TextBox' }
                }
            ]
        }
    ];
});

define('common/component/Nav', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Title',
    'melon/Button',
    'melon/Icon',
    './DrawerNav',
    'melon/common/util/cxBuilder',
    '../conf/navs',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonIcon = require('melon/Icon');
    var _melonIcon2 = babelHelpers.interopRequireDefault(_melonIcon);
    var _DrawerNav = require('./DrawerNav');
    var _DrawerNav2 = babelHelpers.interopRequireDefault(_DrawerNav);
    var cx = require('melon/common/util/cxBuilder').create('Nav');
    var navs = require('../conf/navs');
    var _ = require('underscore');
    var Nav = function (_React$Component) {
        babelHelpers.inherits(Nav, _React$Component);
        babelHelpers.createClass(Nav, null, [{
                key: 'displayName',
                value: 'Nav',
                enumerable: true
            }]);
        function Nav(props) {
            babelHelpers.classCallCheck(this, Nav);
            _React$Component.call(this, props);
            this.state = { open: false };
            this.onClick = this.onClick.bind(this);
        }
        Nav.prototype.onClick = function onClick() {
            this.setState({ open: true });
        };
        Nav.prototype.getCurrentPathConf = function getCurrentPathConf() {
            var _props$location = this.props.location;
            var query = _props$location.query;
            var pathname = _props$location.pathname;
            var activeItem = undefined;
            var getItem = function getItem(i, result, item) {
                if (!query && pathname === item.pathname || query && query.name === item.text) {
                    item.title = item.title == null ? navs[i].text + ' - ' + item.text : item.title;
                    return item;
                }
                return result;
            };
            for (var i = navs.length - 1; i >= 0; i--) {
                var items = navs[i].children;
                activeItem = _.reduce(items, getItem.bind(this, i), false);
                if (activeItem) {
                    return activeItem;
                }
            }
        };
        Nav.prototype.render = function render() {
            var conf = this.getCurrentPathConf();
            var pathname = this.props.location.pathname;
            var variant = pathname.split('/')[1];
            return _react2['default'].createElement('aside', { className: cx(this.props).addVariants(variant).build() }, this.renderButton(), this.renderTitle(conf), this.renderMenu(conf));
        };
        Nav.prototype.renderButton = function renderButton() {
            return _react2['default'].createElement(_melonButton2['default'], {
                size: 'xxl',
                onClick: this.onClick
            }, _react2['default'].createElement(_melonIcon2['default'], { icon: 'dehaze' }));
        };
        Nav.prototype.renderTitle = function renderTitle(conf) {
            if (!conf.title) {
                return null;
            }
            return _react2['default'].createElement(_melonTitle2['default'], { level: 2 }, 'Melon - ', conf.title);
        };
        Nav.prototype.renderMenu = function renderMenu(conf) {
            var _this = this;
            return _react2['default'].createElement(_DrawerNav2['default'], {
                open: this.state.open,
                current: conf,
                onHide: function () {
                    _this.setState({ open: false });
                }
            });
        };
        return Nav;
    }(_react2['default'].Component);
    exports['default'] = Nav;
    module.exports = exports['default'];
});

define('common/component/ErrorMessage', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Icon',
    'melon/common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonIcon = require('melon/Icon');
    var _melonIcon2 = babelHelpers.interopRequireDefault(_melonIcon);
    var cx = require('melon/common/util/cxBuilder').create('ErrorMessage');
    var ErrorMessage = function (_React$Component) {
        babelHelpers.inherits(ErrorMessage, _React$Component);
        function ErrorMessage() {
            babelHelpers.classCallCheck(this, ErrorMessage);
            _React$Component.apply(this, arguments);
        }
        ErrorMessage.prototype.render = function render() {
            var _props$error = this.props.error;
            var statusInfo = _props$error.statusInfo;
            var message = _props$error.message;
            var stack = _props$error.stack;
            var debug = _props$error.debug;
            return _react2['default'].createElement('div', { className: cx(this.props).build() }, _react2['default'].createElement(_melonIcon2['default'], { icon: 'error' }), statusInfo || message || '\u554A\u54E6\uFF0C\u53D1\u751F\u4E86\u4E00\u4E9B\u5947\u602A\u7684\u4E8B\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5', debug ? _react2['default'].createElement('p', null, stack) : null);
        };
        babelHelpers.createClass(ErrorMessage, null, [{
                key: 'displayName',
                value: 'ErrorMessage',
                enumerable: true
            }]);
        return ErrorMessage;
    }(_react2['default'].Component);
    var PropTypes = _react2['default'].PropTypes;
    ErrorMessage.propTypes = {
        error: PropTypes.instanceOf(Error).isRequired,
        debug: PropTypes.bool
    };
    exports['default'] = ErrorMessage;
    module.exports = exports['default'];
});

define('locator', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'numen/HashLocator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _numenHashLocator = require('numen/HashLocator');
    var _numenHashLocator2 = babelHelpers.interopRequireDefault(_numenHashLocator);
    exports['default'] = new _numenHashLocator2['default']();
    module.exports = exports['default'];
});

define('common/component/ZippyNav', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Button',
    'melon/Link',
    'melon/common/util/cxBuilder',
    '../../locator',
    'underscore',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonButton = require('melon/Button');
    var _melonButton2 = babelHelpers.interopRequireDefault(_melonButton);
    var _melonLink = require('melon/Link');
    var _melonLink2 = babelHelpers.interopRequireDefault(_melonLink);
    var cx = require('melon/common/util/cxBuilder').create('ZippyNav');
    var locator = require('../../locator');
    var _ = require('underscore');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
    var ZippyNav = function (_React$Component) {
        babelHelpers.inherits(ZippyNav, _React$Component);
        babelHelpers.createClass(ZippyNav, null, [{
                key: 'displayName',
                value: 'ZippyNav',
                enumerable: true
            }]);
        function ZippyNav(props) {
            babelHelpers.classCallCheck(this, ZippyNav);
            _React$Component.call(this, props);
            this.state = { expand: props.expand || true };
        }
        ZippyNav.prototype.render = function render() {
            var _this = this;
            var props = this.props;
            var state = this.state;
            var current = props.current;
            var nav = props.nav;
            var onActive = props.onActive;
            var others = babelHelpers.objectWithoutProperties(props, [
                'current',
                'nav',
                'onActive'
            ]);
            var expand = state.expand;
            var listHeight = nav.children.length * 32;
            return _react2['default'].createElement('div', babelHelpers._extends({}, others, { className: cx(props).build() }), _react2['default'].createElement('dt', null, _react2['default'].createElement(_melonButton2['default'], {
                size: 'xs',
                onClick: function () {
                    _this.setState({ expand: !expand });
                }
            }, nav.text)), _react2['default'].createElement(Motion, { style: { top: spring(expand ? 0 : -listHeight) } }, function (_ref) {
                var top = _ref.top;
                return _react2['default'].createElement('div', {
                    style: {
                        overflow: 'hidden',
                        display: !expand && top === 0 ? 'none' : null
                    }
                }, _react2['default'].createElement('dd', { style: { marginTop: Math.round(top) } }, _.map(nav.children, function (item, index) {
                    return _react2['default'].createElement(_melonLink2['default'], {
                        size: 'xs',
                        states: { active: current.text === item.text },
                        key: index,
                        onClick: function () {
                            return onActive();
                        },
                        href: locator.createHref(item.pathname, item.query)
                    }, item.text);
                })));
            }));
        };
        return ZippyNav;
    }(_react2['default'].Component);
    exports['default'] = ZippyNav;
    module.exports = exports['default'];
});

define('common/component/DrawerNav', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'melon/Drawer',
    'melon/Title',
    './ZippyNav',
    'melon/common/util/cxBuilder',
    'underscore',
    '../conf/navs'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _melonDrawer = require('melon/Drawer');
    var _melonDrawer2 = babelHelpers.interopRequireDefault(_melonDrawer);
    var _melonTitle = require('melon/Title');
    var _melonTitle2 = babelHelpers.interopRequireDefault(_melonTitle);
    var _ZippyNav = require('./ZippyNav');
    var _ZippyNav2 = babelHelpers.interopRequireDefault(_ZippyNav);
    var cx = require('melon/common/util/cxBuilder').create('DrawerNav');
    var _ = require('underscore');
    var navs = require('../conf/navs');
    var DrawerNav = function (_React$Component) {
        babelHelpers.inherits(DrawerNav, _React$Component);
        function DrawerNav() {
            babelHelpers.classCallCheck(this, DrawerNav);
            _React$Component.apply(this, arguments);
        }
        DrawerNav.prototype.renderNavs = function renderNavs() {
            var _this = this;
            var current = this.props.current;
            return _.map(navs, function (nav, index) {
                return _react2['default'].createElement(_ZippyNav2['default'], {
                    current: current,
                    key: index,
                    nav: nav,
                    onActive: function () {
                        _this.props.onHide();
                    }
                });
            }, this);
        };
        DrawerNav.prototype.render = function render() {
            var props = this.props;
            return _react2['default'].createElement(_melonDrawer2['default'], babelHelpers._extends({}, props, { className: cx(props).build() }), _react2['default'].createElement(_melonTitle2['default'], { level: 2 }, 'Melon'), this.renderNavs());
        };
        babelHelpers.createClass(DrawerNav, null, [{
                key: 'displayName',
                value: 'DrawerNav',
                enumerable: true
            }]);
        return DrawerNav;
    }(_react2['default'].Component);
    exports['default'] = DrawerNav;
    module.exports = exports['default'];
});

define('common/component/Confirm', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'es6-promise',
    'melon/dialog/Confirm',
    'react',
    'react-dom'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    exports.confirm = confirm;
    var _es6Promise = require('es6-promise');
    var _melonDialogConfirm = require('melon/dialog/Confirm');
    var _melonDialogConfirm2 = babelHelpers.interopRequireDefault(_melonDialogConfirm);
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom = require('react-dom');
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var guid = 0;
    function createDialogWrap() {
        var container = document.createElement('div');
        container.id = ++guid;
        container.className = 'ui-confirm-wrap';
        document.body.appendChild(container);
        return container;
    }
    function removeDialogWrap(container) {
        _reactDom2['default'].unmountComponentAtNode(container);
        document.body.removeChild(container);
    }
    function confirm(message) {
        return new _es6Promise.Promise(function (resolve, reject) {
            var container = createDialogWrap();
            _reactDom2['default'].render(_react2['default'].createElement(_melonDialogConfirm2['default'], {
                open: true,
                onConfirm: function (_ref) {
                    var value = _ref.value;
                    removeDialogWrap(container);
                    container = null;
                    value ? resolve() : reject();
                }
            }, message), container);
        });
    }
    exports['default'] = { confirm: confirm };
});

define('common/component/Code', [
    'require',
    'exports',
    'module',
    '../../babelHelpers',
    'react',
    'hljs'
], function (require, exports, module) {
    var babelHelpers = require('../../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _hljs = require('hljs');
    var _hljs2 = babelHelpers.interopRequireDefault(_hljs);
    var Code = _react2['default'].createClass({
        displayName: 'Code',
        componentDidMount: function componentDidMount() {
            _hljs2['default'].highlightBlock(this.refs.code);
        },
        render: function render() {
            var _props = this.props;
            var children = _props.children;
            var style = _props.style;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'children',
                'style'
            ]);
            return _react2['default'].createElement('pre', babelHelpers._extends({}, rest, {
                style: babelHelpers._extends({}, style, {
                    overflowY: 'auto',
                    height: '100%'
                })
            }), _react2['default'].createElement('code', {
                ref: 'code',
                className: 'javascript'
            }, children));
        }
    });
    exports['default'] = Code;
    module.exports = exports['default'];
});

define('babelHelpers', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var babelHelpers = {};
    babelHelpers.inherits = function (subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };
    babelHelpers.createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    babelHelpers.objectWithoutProperties = function (obj, keys) {
        var target = {};
        for (var i in obj) {
            if (keys.indexOf(i) >= 0)
                continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i))
                continue;
            target[i] = obj[i];
        }
        return target;
    };
    babelHelpers.interopRequireDefault = function (obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    };
    babelHelpers._extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    babelHelpers.classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    };
    module.exports = babelHelpers;
});

define('routes', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    './home/routes',
    './components/routes'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _homeRoutes = require('./home/routes');
    var _homeRoutes2 = babelHelpers.interopRequireDefault(_homeRoutes);
    var _componentsRoutes = require('./components/routes');
    var _componentsRoutes2 = babelHelpers.interopRequireDefault(_componentsRoutes);
    exports['default'] = [].concat(_homeRoutes2['default'], _componentsRoutes2['default']);
    module.exports = exports['default'];
});

define('main', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'ei',
    'react',
    'react-dom',
    './locator',
    './routes',
    'ei/util/createAppComponent',
    'ei/component/Page',
    './common/component/Nav',
    'es6-promise'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _ei = require('ei');
    var _ei2 = babelHelpers.interopRequireDefault(_ei);
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom = require('react-dom');
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var _locator = require('./locator');
    var _locator2 = babelHelpers.interopRequireDefault(_locator);
    var _routes = require('./routes');
    var _routes2 = babelHelpers.interopRequireDefault(_routes);
    var _eiUtilCreateAppComponent = require('ei/util/createAppComponent');
    var _eiUtilCreateAppComponent2 = babelHelpers.interopRequireDefault(_eiUtilCreateAppComponent);
    var _eiComponentPage = require('ei/component/Page');
    var _eiComponentPage2 = babelHelpers.interopRequireDefault(_eiComponentPage);
    var _commonComponentNav = require('./common/component/Nav');
    var _commonComponentNav2 = babelHelpers.interopRequireDefault(_commonComponentNav);
    var _es6Promise = require('es6-promise');
    var _es6Promise2 = babelHelpers.interopRequireDefault(_es6Promise);
    var AppComponent = _eiUtilCreateAppComponent2['default'](_ei2['default'].App);
    function init() {
        _es6Promise2['default'].polyfill();
        var main = document.getElementById('main');
        _locator2['default'].on(function (location) {
            _reactDom2['default'].render(_react2['default'].createElement(AppComponent, { routes: _routes2['default'] }, _react2['default'].createElement('div', { className: 'ui-app' }, _react2['default'].createElement(_commonComponentNav2['default'], { location: location }), _react2['default'].createElement(_eiComponentPage2['default'], {
                request: location,
                renderErrorMessage: function (error) {
                    var status = error.status;
                    var statusInfo = error.statusInfo;
                    return _react2['default'].createElement('div', { className: 'ui-page-error-message' }, _react2['default'].createElement('h3', null, status), _react2['default'].createElement('p', null, statusInfo));
                },
                renderLoadingMessage: function () {
                    return _react2['default'].createElement('div', { className: 'ui-loading' }, _react2['default'].createElement('h1', null, 'Your page is loading.'), _react2['default'].createElement('div', { className: 'ball ball-anim' }));
                }
            }))), main);
        }).start();
    }
    exports['default'] = { init: init };
    module.exports = exports['default'];
});