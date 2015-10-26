define('melon/region/Province', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    './Selector',
    './helper'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Selector = require('./Selector');
    var helper = require('./helper');
    var PropTypes = React.PropTypes;
    var RegionProvince = function (_Component) {
        babelHelpers.inherits(RegionProvince, _Component);
        babelHelpers.createClass(RegionProvince, null, [{
                key: 'displayName',
                value: 'RegionProvince',
                enumerable: true
            }]);
        function RegionProvince(props) {
            babelHelpers.classCallCheck(this, RegionProvince);
            babelHelpers.get(Object.getPrototypeOf(RegionProvince.prototype), 'constructor', this).call(this, props);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
            this.state = { expand: false };
            this.type = 'region-province';
        }
        babelHelpers.createClass(RegionProvince, [
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(RegionProvince.prototype), 'getStates', this).call(this, props);
                    states.expand = this.state.expand;
                    return states;
                }
            },
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(e) {
                    var value = e.value;
                    var datasource = this.props.datasource;
                    helper[value ? 'selectAll' : 'cancelAll'](datasource);
                    var onChange = this.props.onChange;
                    onChange && onChange({ data: datasource });
                }
            },
            {
                key: 'onMouseEnter',
                value: function onMouseEnter(e) {
                    this.setState({ expand: true });
                }
            },
            {
                key: 'onMouseLeave',
                value: function onMouseLeave(e) {
                    this.setState({ expand: false });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var datasource = _props.datasource;
                    var children = _props.children;
                    return React.createElement('div', {
                        className: this.getClassName(),
                        onMouseEnter: children ? this.onMouseEnter : null,
                        onMouseLeave: children ? this.onMouseLeave : null
                    }, React.createElement(Selector, {
                        label: datasource.text,
                        id: datasource.id,
                        checked: datasource.selected,
                        onChange: this.onSelectorChange
                    }), this.renderSelectedInfo(), children ? React.createElement('div', { className: this.getPartClassName('popup') }, React.createElement('ul', null, children)) : null);
                }
            },
            {
                key: 'renderSelectedInfo',
                value: function renderSelectedInfo() {
                    var datasource = this.props.datasource;
                    var total = datasource.children && datasource.children.length;
                    if (!total) {
                        return;
                    }
                    var num = datasource.children.reduce(function (result, child, index) {
                        if (child.selected) {
                            result++;
                        }
                        return result;
                    }, 0);
                    return num === total || num === 0 ? null : React.createElement('span', { className: this.getPartClassName('info') }, '(' + num + '/' + total + ')');
                }
            }
        ]);
        return RegionProvince;
    }(Component);
    RegionProvince.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionProvince;
});