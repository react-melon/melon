(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './tabs/Tab', './tabs/Panel', 'melon-core/classname/cxBuilder', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./tabs/Tab'), require('./tabs/Panel'), require('melon-core/classname/cxBuilder'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Tab, global.Panel, global.cxBuilder, global.omit, global.babelHelpers);
        global.Tabs = mod.exports;
    }
})(this, function (exports, _react, _Tab, _Panel, _cxBuilder, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.TabPanel = exports.Tab = exports.default = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tab2 = babelHelpers.interopRequireDefault(_Tab);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/Tabs
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Tabs');

    /**
     * melon/Tabs
     *
     * @extends {React.Component}
     * @class
     */

    var Tabs = function (_Component) {
        babelHelpers.inherits(Tabs, _Component);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param {*} props 属性
         */
        function Tabs(props) {
            babelHelpers.classCallCheck(this, Tabs);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            var selectedIndex = props.selectedIndex;

            /**
             * 状态
             *
             * @private
             * @type {Object}
             */
            _this.state = {
                selectedIndex: selectedIndex
            };

            _this.onTabClick = _this.onTabClick.bind(_this);

            return _this;
        }

        /**
         * 接受新属性时的处理
         *
         * @public
         * @override
         */


        Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
            var selectedIndex = _ref.selectedIndex;


            if (selectedIndex !== this.state.selectedIndex) {
                this.setState({
                    selectedIndex: selectedIndex
                });
            }
        };

        Tabs.prototype.onTabClick = function onTabClick(index) {
            var _this2 = this;

            if (index === this.state.selectedIndex) {
                return;
            }

            var onChange = this.props.onChange;

            this.setState({ selectedIndex: index }, function () {
                onChange && onChange({
                    type: 'change',
                    selectedIndex: index,
                    target: _this2
                });
            });
        };

        Tabs.prototype.getTabCount = function getTabCount() {
            return _react.Children.count(this.props.children);
        };

        Tabs.prototype.isTabSelected = function isTabSelected(index) {
            return this.state.selectedIndex === index;
        };

        Tabs.prototype.render = function render() {

            var props = this.props;
            var tabIndex = 0;
            var percent = 1 / this.getTabCount() * 100 + '%';
            var tabContents = [];
            var tabs = [];

            var variants = props.variants,
                states = props.states,
                children = props.children,
                rest = babelHelpers.objectWithoutProperties(props, ['variants', 'states', 'children']);


            children = _react.Children.toArray(props.children);

            var selectedIndex = this.state.selectedIndex;

            for (var i = 0, len = children.length; i < len; ++i) {

                var tab = children[i];

                var selected = selectedIndex === i;

                if (selected) {
                    tabIndex = i;
                }

                if (children) {
                    tabContents.push(_react2['default'].createElement(
                        _Panel2['default'],
                        { key: i, active: selected },
                        tab.props.children
                    ));
                }

                tabs.push((0, _react.cloneElement)(tab, {
                    key: i,
                    selected: selected,
                    index: i,
                    style: { width: percent },
                    onClick: this.onTabClick
                }));
            }

            var InkBarStyles = {
                width: percent,
                left: 'calc(' + percent + '*' + tabIndex + ')'
            };

            var className = cx().addVariants(variants).addStates(states).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, (0, _omit2['default'])(rest, ['selectedIndex']), {
                    className: className }),
                _react2['default'].createElement(
                    'ul',
                    null,
                    tabs,
                    _react2['default'].createElement('li', {
                        className: cx.getPartClassName('inkbar'),
                        style: InkBarStyles })
                ),
                tabContents
            );
        };

        return Tabs;
    }(_react.Component);

    /**
     * propTypes
     *
     * @property {number}   selectedIndex  选中标签的序号
     * @property {Function} onChange       选中标签发生变化后处理函数
     * @property {Function} onBeforeChange 选中标签发生变化前处理函数
     */
    Tabs.propTypes = {
        selectedIndex: _react.PropTypes.number.isRequired,
        onChange: _react.PropTypes.func
    };

    Tabs.defaultProps = {
        selectedIndex: 0
    };

    Tabs.Tab = _Tab2['default'];
    Tabs.TabPanel = _Panel2['default'];

    exports.default = Tabs;
    exports.Tab = _Tab2['default'];
    exports.TabPanel = _Panel2['default'];
});
//# sourceMappingURL=Tabs.js.map
