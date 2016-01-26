define('melon/Region', [
    'require',
    'exports',
    'module',
    'react',
    './common/util/cxBuilder',
    './region/Selector',
    './region/Area',
    './region/helper',
    'underscore',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Region');
    var Selector = require('./region/Selector');
    var Area = require('./region/Area');
    var helper = require('./region/helper');
    var _ = require('underscore');
    var Region = React.createClass({
        displayName: 'Region',
        getInitialState: function () {
            return { datasource: this.props.datasource };
        },
        onChange: function (rawValue) {
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(rawValue)
            });
        },
        onAreaChange: function (index, cIndex, e) {
            var data = e.data;
            var datasource = this.state.datasource;
            helper.isAllSelected(data);
            datasource[cIndex].children[index] = data;
            helper.isAllSelected(datasource[cIndex]);
            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        },
        onSelectorChange: function (index, e) {
            var value = e.value;
            var datasource = this.state.datasource;
            helper[value ? 'selectAll' : 'cancelAll'](datasource[index]);
            this.setState({ datasource: datasource }, function () {
                this.onChange(datasource);
            });
        },
        parseValue: function (value) {
            value = value.split(',');
            return _.map(this.props.datasource, helper.parse.bind(this, value));
        },
        stringifyValue: function (datasource) {
            return datasource ? _.reduce(datasource, this.format, [], this).join(',') : '';
        },
        format: function (result, child, index) {
            if (child.selected) {
                result.push(child.id);
            }
            return _.reduce(child.children, this.format, result, this);
        },
        renderCountry: function (country, index) {
            return React.createElement('div', {
                className: cx().part('country').build(),
                key: index
            }, React.createElement('h1', null, React.createElement(Selector, {
                label: country.text,
                id: country.id,
                index: index,
                checked: country.selected,
                onChange: this.onSelectorChange.bind(this, index)
            })), this.renderArea(country.children, index));
        },
        renderArea: function (area, cIndex) {
            return _.isArray(area) && area.length > 0 ? React.createElement('ul', null, area.map(function (a, index) {
                return React.createElement(Area, {
                    key: index,
                    letiants: index % 2 ? ['even'] : [],
                    datasource: a,
                    onChange: this.onAreaChange.bind(this, index, cIndex)
                });
            }, this)) : null;
        },
        render: function () {
            var datasource = this.state.datasource;
            return React.createElement('div', { className: cx(this.props).build() }, datasource.map(this.renderCountry, this));
        }
    });
    Region.defaultProps = {
        defaultValue: '',
        datasource: [],
        validateEvents: ['change']
    };
    var PropTypes = React.PropTypes;
    Region.propTypes = {
        onChange: PropTypes.func,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        datasource: PropTypes.arrayOf(PropTypes.object)
    };
    module.exports = require('./createInputComponent').create(Region);
});