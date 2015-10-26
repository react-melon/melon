/**
 * @file melon/Region
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var InputComponent = require('./InputComponent');
// var Province = require('./region/Province');
var Selector = require('./region/Selector');
var Area = require('./region/Area');

var helper = require('./region/helper');
var _ = require('underscore');

class Region extends InputComponent {

    static displayName = 'Region';

    constructor(props) {

        super(props);

        this.state = {
            ...this.state
        };

        this.onSelectorChange = this.onSelectorChange.bind(this);

    }

    onChange(rawValue) {
        // 生成事件
        let e = {
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue),
            rawValue: rawValue
        };

        super.onChange(e);

        let onChange = this.props.onChange;

        if (_.isFunction(onChange)) {
            onChange(e);
        }
    }

    onAreaChange(index, cIndex, e) {
        var data = e.data;
        var rawValue = this.state.rawValue;

        helper.isAllSelected(data);
        rawValue[cIndex].children[index] = data;
        helper.isAllSelected(rawValue[cIndex]);

        this.setState({rawValue}, function () {
            this.onChange(rawValue);
        });
    }

    onSelectorChange(index, e) {
        var {
            value
        } = e;

        var rawValue = this.state.rawValue;

        helper[value ? 'selectAll' : 'cancelAll'](rawValue[index]);

        this.setState({rawValue}, function () {
            this.onChange(rawValue);
        });
    }

    parseValue(value) {
        value = value.split(',');
        return _.map(this.props.datasource, helper.parse.bind(this, value));
    }

    stringifyValue(rawValue) {
        return rawValue ? _.reduce(rawValue, this.format, [], this).join(',') : '';
    }

    format(result, child, index) {
        if (child.selected) {
            result.push(child.id);
        }
        return _.reduce(child.children, this.format, result, this);
    }

    render() {

        var datasource = this.state.rawValue;

        return (
            <div className={this.getClassName()}>
                {datasource.map(this.renderCountry, this)}
            </div>
        );
    }

    renderCountry(country, index) {
        return (
            <div className={this.getPartClassName('country')} key={index}>
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
    }

    renderArea(area, cIndex) {
        return _.isArray(area) && area.length > 0
            ? (
                <ul>
                    {area.map(function (a, index) {
                        return (
                            <Area
                                key={index}
                                variants={index % 2 ? ['even'] : []}
                                datasource={a}
                                onChange={this.onAreaChange.bind(this, index, cIndex)} />
                        );
                    }, this)}
                </ul>
            ) : null;
    }

}

Region.defaultProps = {
    ...InputComponent.defaultProps,
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
    rawValue: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    datasource: PropTypes.arrayOf(PropTypes.object)
};

module.exports = Region;
