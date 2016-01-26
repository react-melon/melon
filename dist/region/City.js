define('melon/region/City', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    './Selector'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('RegionCity');
    var Selector = require('./Selector');
    var PropTypes = React.PropTypes;
    var RegionCity = React.createClass({
        displayName: 'RegionCity',
        onSelectorChange: function (_ref) {
            var value = _ref.value;
            var datasource = this.props.datasource;
            var onChange = this.props.onChange;
            datasource.selected = value;
            onChange && onChange({ data: datasource });
        },
        render: function () {
            var datasource = this.props.datasource;
            return React.createElement('li', { className: cx(this.props).build() }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            }));
        }
    });
    RegionCity.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionCity;
});