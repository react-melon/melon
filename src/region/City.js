/**
 * @file Region/RegionCity
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {create} from 'melon-core/classname/cxBuilder';
import Selector from './Selector';

const cx = create('RegionCity');

export default class RegionCity extends Component {

    constructor(props) {

        super(props);

        this.onSelectorChange = this.onSelectorChange.bind(this);

    }

    onSelectorChange(e) {

        const value = e.value;

        const {datasource, onChange} = this.props;

        datasource.selected = value;

        onChange && onChange({
            data: datasource
        });

    }

    render() {

        const datasource = this.props.datasource;

        return (
            <li className={cx(this.props).build()}>
                <Selector
                    label={datasource.text}
                    id={datasource.id}
                    checked={datasource.selected}
                    onChange={this.onSelectorChange} />
            </li>
        );

    }

}

RegionCity.displayName = 'RegionCity';

RegionCity.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    datasource: PropTypes.object
};
