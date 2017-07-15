/**
 * @file melon/Region
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

import Selector from './region/Selector';
import Area from './region/Area';
import * as helper from './region/helper';
import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Region');

export default class Region extends InputComponent {

    constructor(props, context) {

        super(props, context);

        this.state = {
            ...this.state,
            datasource: this.props.datasource
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectorChange = this.onSelectorChange.bind(this);

    }

    onChange(rawValue) {

        super.onChange({
            type: 'change',
            target: this,
            value: this.stringifyValue(rawValue)
        });

    }

    onAreaChange(index, cIndex, e) {

        const data = e.data;
        const datasource = this.state.datasource;

        helper.isAllSelected(data);
        datasource[cIndex].children[index] = data;
        helper.isAllSelected(datasource[cIndex]);

        this.setState({datasource}, function () {
            this.onChange(datasource);
        });

    }

    onSelectorChange(index, {value}) {

        const datasource = this.state.datasource;

        helper[value ? 'selectAll' : 'cancelAll'](datasource[index]);

        this.setState({datasource}, function () {
            this.onChange(datasource);
        });

    }

    parseValue(value) {
        value = value.split(',');
        return this.props.datasource.map(helper.parse.bind(this, value));
    }

    stringifyValue(datasource) {
        return datasource
            ? datasource.reduce(
                (...args) => this.format(...args),
                []
            ).join(',')
            : '';
    }

    format(result, child, index) {

        if (child.selected) {
            result.push(child.id);
        }

        return child.children
            ? child.children.reduce(
                (...args) => this.format(...args),
                result
            )
            : result;



    }

    renderCountry(country, index) {
        return (
            <div className={cx().part('country').build()} key={index}>
                <h1>
                    <Selector
                        label={country.text}
                        id={country.id}
                        index={index}
                        checked={country.selected}
                        onChange={e => {
                            this.onSelectorChange(index, e);
                        }} />
                </h1>
                {this.renderArea(country.children, index)}
            </div>
        );
    }

    renderArea(area, cIndex) {
        return Array.isArray(area) && area.length > 0
            ? (
                <ul>
                    {area.map((a, index) =>
                        <Area
                            key={index}
                            variants={index % 2 ? ['even'] : []}
                            datasource={a}
                            onChange={e => {
                                this.onAreaChange(index, cIndex, e);
                            }} />
                    )}
                </ul>
            ) : null;
    }

    render() {

        const datasource = this.state.datasource;

        return (
            <div className={cx(this.props).build()}>
                {datasource.map((...args) => this.renderCountry(...args))}
            </div>
        );

    }


}


Region.defaultProps = {
    ...InputComponent.defaultProps,
    datasource: []
};

Region.propTypes = {
    ...InputComponent.propTypes,
    selected: PropTypes.bool,
    datasource: PropTypes.arrayOf(PropTypes.object)
};

Region.childContextTypes = InputComponent.childContextTypes;
Region.contextTypes = InputComponent.contextTypes;
