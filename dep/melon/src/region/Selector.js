/**
 * @file melon/region/Selector
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const Icon = require('../Icon');
const cx = require('../common/util/cxBuilder').create('RegionSelector');

const RegionSelector = React.createClass({

    displayName: 'RegionSelector',

    onClick(e) {
        let {
            onChange,
            checked
        } = this.props;

        onChange && onChange({
            value: !checked,
            target: this
        });
    },

    getIcon(isChecked) {
        let icons = RegionSelector.Icons;
        return icons[isChecked ? 'checked' : 'unchecked'];
    },

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

});

RegionSelector.defaultProps = {
    hasInput: false
};

const PropTypes = React.PropTypes;

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

module.exports = RegionSelector;
