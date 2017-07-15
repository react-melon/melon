/**
 * @file Region/RegionArea
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Selector from './Selector';
import Province from './Province';
import City from './City';
import * as helper from './helper';

const cx = create('RegionArea');

export default class RegionArea extends Component {

    constructor(props) {

        super(props);

        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onProvinceChange = this.onProvinceChange.bind(this);

    }

    onSelectorChange(e) {

        const value = e.value;
        const {datasource, onChange} = this.props;

        helper[value ? 'selectAll' : 'cancelAll'](datasource);

        onChange && onChange({
            data: datasource
        });

    }

    onProvinceChange(index, e) {

        const data = e.data;
        const {datasource, onChange} = this.props;

        datasource.children[index] = data;

        helper.isAllSelected(datasource);

        onChange && onChange({
            data: datasource
        });

    }

    onCityChange(pIndex, cIndex, e) {

        const data = e.data;

        const {datasource, onChange} = this.props;

        const p = datasource.children[pIndex];

        p.children[cIndex] = data;

        helper.isAllSelected(p);

        onChange && onChange({
            data: datasource
        });

    }

    renderProvince(child, index) {
        return (
            <Province
                key={index}
                datasource={child}
                onChange={this.onProvinceChange.bind(this, index)}>
                {
                    Array.isArray(child.children) && child.children.length > 0
                    ? child.children.map((child, i) => (
                        this.renderCity(index, child, i)
                    ))
                    : null
                }
            </Province>
        );
    }

    renderCity(pIndex, child, index) {
        return (
            <City
                key={index}
                datasource={child}
                onChange={e => this.onCityChange(pIndex, index, e)} />
        );
    }

    render() {

        const datasource = this.props.datasource;

        return (
            <li className={cx(this.props).build()}>
                <div className={cx().part('selector').build()}>
                    <Selector
                        label={datasource.text}
                        id={datasource.id}
                        checked={datasource.selected}
                        onChange={this.onSelectorChange} />
                </div>
                <div className={cx().part('content').build()}>
                    {datasource
                        .children
                        .map((...args) => this.renderProvince(...args))
                    }
                </div>
            </li>
        );
    }

}

RegionArea.displayName = 'RegionArea';


RegionArea.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};
