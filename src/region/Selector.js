/**
 * @file melon/region/Selector
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('RegionSelector');

export default class RegionSelector extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

    }


    onClick(e) {
        let {
            onChange,
            checked
        } = this.props;

        onChange && onChange({
            value: !checked,
            target: this
        });
    }

    getIcon(isChecked) {
        let icons = RegionSelector.Icons;
        return icons[isChecked ? 'checked' : 'unchecked'];
    }

    render() {

        let {
            checked,
            disabled,
            hasInput,
            value,
            name,
            label,
            id
        } = this.props;

        let className = cx(this.props).addStates({checked}).build();

        return (
            <label className={className} data-region-id={id} onClick={this.onClick}>
                {hasInput ? <input
                    disabled={disabled}
                    checked={checked}
                    type="checkbox"
                    value={value}
                    name={name} /> : null}
                <Icon icon={this.getIcon(checked)} />
                {label}
            </label>
        );

    }

}

RegionSelector.displayName = 'RegionSelector';

RegionSelector.defaultProps = {
    hasInput: false
};

RegionSelector.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    hasInput: PropTypes.bool,
    onChange: PropTypes.func
};

RegionSelector.Icons = {
    checked: 'check-box',
    unchecked: 'check-box-outline-blank'
};
