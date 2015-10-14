define('melon/Region', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './region/Selector',
    './region/Area',
    './region/helper',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var Selector = require('./region/Selector');
    var Area = require('./region/Area');
    var helper = require('./region/helper');
    var _ = require('underscore');
    var Region = function (_InputComponent) {
        babelHelpers.inherits(Region, _InputComponent);
        function Region(props) {
            babelHelpers.classCallCheck(this, Region);
            babelHelpers.get(Object.getPrototypeOf(Region.prototype), 'constructor', this).call(this, props);
            this.state = babelHelpers._extends({}, this.state);
            this.onSelectorChange = this.onSelectorChange.bind(this);
        }
        babelHelpers.createClass(Region, [
            {
                key: 'onChange',
                value: function onChange(rawValue) {
                    var e = {
                        type: 'change',
                        target: this,
                        value: this.stringifyValue(rawValue),
                        rawValue: rawValue
                    };
                    babelHelpers.get(Object.getPrototypeOf(Region.prototype), 'onChange', this).call(this, e);
                    var onChange = this.props.onChange;
                    if (_.isFunction(onChange)) {
                        onChange(e);
                    }
                }
            },
            {
                key: 'onAreaChange',
                value: function onAreaChange(index, cIndex, e) {
                    var data = e.data;
                    var rawValue = this.state.rawValue;
                    helper.isAllSelected(data);
                    rawValue[cIndex].children[index] = data;
                    helper.isAllSelected(rawValue[cIndex]);
                    this.setState({ rawValue: rawValue }, function () {
                        this.onChange(rawValue);
                    });
                }
            },
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(index, e) {
                    var value = e.value;
                    var rawValue = this.state.rawValue;
                    helper[value ? 'selectAll' : 'cancelAll'](rawValue[index]);
                    this.setState({ rawValue: rawValue }, function () {
                        this.onChange(rawValue);
                    });
                }
            },
            {
                key: 'parseValue',
                value: function parseValue(value) {
                    var value = value.split(',');
                    return _.map(this.props.datasource, helper.parse.bind(this, value));
                }
            },
            {
                key: 'stringifyValue',
                value: function stringifyValue(rawValue) {
                    return rawValue ? _.reduce(rawValue, this.format, [], this).join(',') : '';
                }
            },
            {
                key: 'format',
                value: function format(result, child, index) {
                    if (child.selected) {
                        result.push(child.id);
                    }
                    return _.reduce(child.children, this.format, result, this);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var datasource = this.state.rawValue;
                    return React.createElement('div', { className: this.getClassName() }, datasource.map(this.renderCountry, this));
                }
            },
            {
                key: 'renderCountry',
                value: function renderCountry(country, index) {
                    return React.createElement('div', {
                        className: this.getPartClassName('country'),
                        key: index
                    }, React.createElement('h1', null, React.createElement(Selector, {
                        label: country.text,
                        id: country.id,
                        index: index,
                        checked: country.selected,
                        onChange: this.onSelectorChange.bind(this, index)
                    })), this.renderArea(country.children, index));
                }
            },
            {
                key: 'renderArea',
                value: function renderArea(area, cIndex) {
                    return _.isArray(area) && area.length > 0 ? React.createElement('ul', null, area.map(function (a, index) {
                        return React.createElement(Area, {
                            key: index,
                            variants: index % 2 ? ['even'] : [],
                            datasource: a,
                            onChange: this.onAreaChange.bind(this, index, cIndex)
                        });
                    }, this)) : null;
                }
            }
        ]);
        return Region;
    }(InputComponent);
    Region.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        defaultValue: '',
        datasource: [],
        validateEvents: ['change']
    });
    var PropTypes = React.PropTypes;
    Region.propTypes = {
        onChange: PropTypes.func,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        name: PropTypes.string,
        rawValue: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        datasource: PropTypes.arrayOf(PropTypes.object)
    };
    module.exports = Region;
});