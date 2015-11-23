define('melon/region/City', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    './Selector'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Selector = require('./Selector');
    var PropTypes = React.PropTypes;
    var RegionCity = function (_Component) {
        babelHelpers.inherits(RegionCity, _Component);
        babelHelpers.createClass(RegionCity, null, [{
                key: 'displayName',
                value: 'RegionCity',
                enumerable: true
            }]);
        function RegionCity(props) {
            babelHelpers.classCallCheck(this, RegionCity);
            _Component.call(this, props);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.type = 'region-city';
        }
        RegionCity.prototype.onSelectorChange = function onSelectorChange(e) {
            var value = e.value;
            var datasource = this.props.datasource;
            var onChange = this.props.onChange;
            datasource.selected = value;
            onChange && onChange({ data: datasource });
        };
        RegionCity.prototype.render = function render() {
            var datasource = this.props.datasource;
            return React.createElement('li', { className: this.getClassName() }, React.createElement(Selector, {
                label: datasource.text,
                id: datasource.id,
                checked: datasource.selected,
                onChange: this.onSelectorChange
            }));
        };
        return RegionCity;
    }(Component);
    RegionCity.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionCity;
});