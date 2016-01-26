/**
 * @file melon/Region
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const cx = require('./common/util/cxBuilder').create('Region');
const Selector = require('./region/Selector');
const Area = require('./region/Area');

const helper = require('./region/helper');
const _ = require('underscore');

const Region = React.createClass({

    displayName: 'Region',

    getInitialState() {

        return {
            datasource: this.props.datasource
        };
    },

    onChange(rawValue) {

        let onChange = this.props.onChange;

        onChange({
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue)
        });
    },

    onAreaChange(index, cIndex, e) {
        let data = e.data;
        let datasource = this.state.datasource;

        helper.isAllSelected(data);
        datasource[cIndex].children[index] = data;
        helper.isAllSelected(datasource[cIndex]);

        this.setState({datasource}, function () {
            this.onChange(datasource);
        });
    },

    onSelectorChange(index, e) {
        let {
            value
        } = e;

        let datasource = this.state.datasource;

        helper[value ? 'selectAll' : 'cancelAll'](datasource[index]);

        this.setState({datasource}, function () {
            this.onChange(datasource);
        });
    },

    parseValue(value) {
        value = value.split(',');
        return _.map(this.props.datasource, helper.parse.bind(this, value));
    },

    stringifyValue(datasource) {
        return datasource ? _.reduce(datasource, this.format, [], this).join(',') : '';
    },

    format(result, child, index) {
        if (child.selected) {
            result.push(child.id);
        }
        return _.reduce(child.children, this.format, result, this);
    },

    renderCountry(country, index) {
        return (
            <div className={cx().part('country').build()} key={index}>
                <h1>
                    <Selector
                        label={country.text}
                        id={country.id}
                        index={index}
                        checked={country.selected}
                        onChange={this.onSelectorChange.bind(this, index)} />
                </h1>
                {this.renderArea(country.children, index)}
            </div>
        );
    },

    renderArea(area, cIndex) {
        return _.isArray(area) && area.length > 0
            ? (
                <ul>
                    {area.map(function (a, index) {
                        return (
                            <Area
                                key={index}
                                letiants={index % 2 ? ['even'] : []}
                                datasource={a}
                                onChange={this.onAreaChange.bind(this, index, cIndex)} />
                        );
                    }, this)}
                </ul>
            ) : null;
    },

    render() {

        let datasource = this.state.datasource;

        return (
            <div className={cx(this.props).build()}>
                {datasource.map(this.renderCountry, this)}
            </div>
        );
    }

});

Region.defaultProps = {
    defaultValue: '',
    datasource: [],
    validateEvents: ['change']
};

const PropTypes = React.PropTypes;

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
