define('melon/region/Province', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    './Selector',
    './helper'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('RegionProvince');
    var Selector = require('./Selector');
    var helper = require('./helper');
    var PropTypes = React.PropTypes;
    var RegionProvince = React.createClass({
        displayName: 'RegionProvince',
        getInitialState: function () {
            return { expand: false };
        },
        onSelectorChange: function (_ref) {
            var value = _ref.value;
            var _props = this.props;
            var datasource = _props.datasource;
            var onChange = _props.onChange;
            helper[value ? 'selectAll' : 'cancelAll'](datasource);
            onChange && onChange({ data: datasource });
        },
        onMouseEnter: function (e) {
            this.setState({ expand: true });
        },
        onMouseLeave: function (e) {
            this.setState({ expand: false });
        },
        renderSelectedInfo: function () {
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
            return num === total || num === 0 ? null : React.createElement('span', { className: cx().part('info').build() }, '(' + num + '/' + total + ')');
        },
        render: function () {
            var _props2 = this.props;
            var datasource = _props2.datasource;
            var children = _props2.children;
            return React.createElement('div', {
                className: cx(this.props).addStates({ expand: this.state.expand }).build(),
                onMouseEnter: children ? this.onMouseEnter : null,
                onMouseLeave: children ? this.onMouseLeave : null
            }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            }), this.renderSelectedInfo(), children ? React.createElement('div', { className: cx().part('popup').build() }, React.createElement('ul', null, children)) : null);
        }
    });
    RegionProvince.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionProvince;
});