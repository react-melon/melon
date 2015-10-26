define('melon/region/Area', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    './Selector',
    './Province',
    './City',
    './helper',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Selector = require('./Selector');
    var Province = require('./Province');
    var City = require('./City');
    var helper = require('./helper');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var RegionArea = function (_Component) {
        babelHelpers.inherits(RegionArea, _Component);
        babelHelpers.createClass(RegionArea, null, [{
                key: 'displayName',
                value: 'RegionArea',
                enumerable: true
            }]);
        function RegionArea(props) {
            babelHelpers.classCallCheck(this, RegionArea);
            babelHelpers.get(Object.getPrototypeOf(RegionArea.prototype), 'constructor', this).call(this, props);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.type = 'region-area';
        }
        babelHelpers.createClass(RegionArea, [
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(e) {
                    var value = e.value;
                    var data = this.props.datasource;
                    helper[value ? 'selectAll' : 'cancelAll'](data);
                    var onChange = this.props.onChange;
                    onChange && onChange({ data: data });
                }
            },
            {
                key: 'onProvinceChange',
                value: function onProvinceChange(index, e) {
                    var data = e.data;
                    var datasource = this.props.datasource;
                    datasource.children[index] = data;
                    helper.isAllSelected(datasource);
                    var onChange = this.props.onChange;
                    onChange && onChange({ data: datasource });
                }
            },
            {
                key: 'onCityChange',
                value: function onCityChange(pIndex, cIndex, e) {
                    var data = e.data;
                    var datasource = this.props.datasource;
                    var p = datasource.children[pIndex];
                    p.children[cIndex] = data;
                    helper.isAllSelected(p);
                    var onChange = this.props.onChange;
                    onChange && onChange({ data: datasource });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var datasource = props.datasource;
                    return React.createElement('li', { className: this.getClassName() }, React.createElement('div', { className: this.getPartClassName('selector') }, React.createElement(Selector, {
                        label: datasource.text,
                        id: datasource.id,
                        checked: datasource.selected,
                        onChange: this.onSelectorChange
                    })), React.createElement('div', { className: this.getPartClassName('content') }, _.map(datasource.children, this.renderProvince, this)));
                }
            },
            {
                key: 'renderProvince',
                value: function renderProvince(child, index) {
                    return React.createElement(Province, {
                        key: index,
                        datasource: child,
                        onChange: this.onProvinceChange.bind(this, index)
                    }, _.isArray(child.children) && child.children.length > 0 ? _.map(child.children, this.renderCity.bind(this, index)) : null);
                }
            },
            {
                key: 'renderCity',
                value: function renderCity(pIndex, child, index) {
                    return React.createElement(City, {
                        key: index,
                        datasource: child,
                        onChange: this.onCityChange.bind(this, pIndex, index)
                    });
                }
            }
        ]);
        return RegionArea;
    }(Component);
    RegionArea.propTypes = {
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        datasource: PropTypes.object
    };
    module.exports = RegionArea;
});