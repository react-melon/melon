/**
 * @file melon/boxgroup/Option
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('BoxGroupOption');
const Icon = require('../Icon');
const CenterRipple = require('../ripples/CenterRipple');

const BoxGroupOption = React.createClass({

    displayName: 'BoxGroupOption',

    onClick() {
        this.refs.ripple && this.refs.ripple.animate();
    },

    getIcon(boxModel, isChecked) {
        var icons = BoxGroupOption.Icons[boxModel];
        return icons[isChecked ? 'checked' : 'unchecked'];
    },

    render() {

        const props = this.props;

        const {
            boxModel,
            checked,
            disabled
        } = props;


        const className = cx(props).addStates({checked}).build();

        return (
            <label className={className} onClick={disabled ? null : this.onClick}>
                <input
                    disabled={disabled}
                    checked={checked}
                    type={props.boxModel}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange} />
                <Icon icon={this.getIcon(boxModel, checked)} />
                {props.label}
                {disabled ? null : <CenterRipple ref="ripple" />}
            </label>
        );

    }

});

const {PropTypes} = React;

BoxGroupOption.propTypes = {
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

BoxGroupOption.Icons = {
    radio: {
        checked: 'radio-button-checked',
        unchecked: 'radio-button-unchecked'
    },
    checkbox: {
        checked: 'check-box',
        unchecked: 'check-box-outline-blank'
    }
};

module.exports = BoxGroupOption;
