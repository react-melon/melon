/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './tabs/Tab', './tabs/Panel', 'melon-core/classname/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./tabs/Tab'), require('./tabs/Panel'), require('melon-core/classname/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Tab, global.Panel, global.cxBuilder, global.babelHelpers);
        global.Tabs = mod.exports;
    }
})(this, function (exports, _react, _Tab, _Panel, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tab2 = babelHelpers.interopRequireDefault(_Tab);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    /**
     * @file melon/Tabs
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Tabs');

    var Tabs = function (_Component) {
        babelHelpers.inherits(Tabs, _Component);

        function Tabs(props) {
            babelHelpers.classCallCheck(this, Tabs);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            var selectedIndex = props.selectedIndex;


            _this.state = {
                selectedIndex: selectedIndex
            };

            return _this;
        }

        Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            if (nextProps.selectedIndex !== this.state.selectedIndex) {
                this.setState({
                    selectedIndex: nextProps.selectedIndex
                });
            }
        };

        Tabs.prototype.handleTabClick = function handleTabClick(index, e) {

            if (index === this.state.selectedIndex) {
                return;
            }

            var _props = this.props;
            var onBeforeChange = _props.onBeforeChange;
            var onChange = _props.onChange;


            e.selectedIndex = index;

            if (onBeforeChange) {

                onBeforeChange(e);

                if (e.isDefaultPrevented()) {
                    return;
                }
            }

            this.setState({ selectedIndex: index }, function () {
                onChange && onChange(e);
            });
        };

        Tabs.prototype.getTabCount = function getTabCount() {
            return _react.Children.count(this.props.children);
        };

        Tabs.prototype.getSelected = function getSelected(tab, index) {
            return this.state.selectedIndex === index;
        };

        Tabs.prototype.render = function render() {

            var props = this.props;
            var tabIndex = 0;
            var percent = 1 / this.getTabCount() * 100 + '%';
            var tabContents = [];
            var tabs = [];
            var children = _react.Children.toArray(props.children);

            for (var i = 0, len = children.length; i < len; ++i) {

                var tab = children[i];

                var selected = this.getSelected(tab, i);

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
                    tabIndex: i,
                    style: { width: percent },
                    onClick: tab.props.disabled ? null : this.handleTabClick.bind(this, i)
                }));
            }

            var InkBarStyles = {
                width: percent,
                left: 'calc(' + percent + '*' + tabIndex + ')'
            };

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, props, { className: cx(props).build() }),
                _react2['default'].createElement(
                    'ul',
                    null,
                    tabs,
                    _react2['default'].createElement('li', { className: cx().part('inkbar').build(), style: InkBarStyles })
                ),
                tabContents
            );
        };

        return Tabs;
    }(_react.Component);

    exports['default'] = Tabs;


    Tabs.propTypes = {
        selectedIndex: _react.PropTypes.number.isRequired,
        onChange: _react.PropTypes.func,
        onBeforeChange: _react.PropTypes.func
    };

    Tabs.defaultProps = {
        selectedIndex: 0
    };

    Tabs.Tab = _Tab2['default'];
});