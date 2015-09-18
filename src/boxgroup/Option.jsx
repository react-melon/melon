/**
 * @file melon/boxgroup/Option
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var PropTypes = React.PropTypes;
var cx = require('../common/util/classname');
var Icon = require('../Icon.jsx');

var Option = React.createClass({

    render() {

        var props = this.props;
        var boxModel = props.boxModel;

        var isChecked = props.checked;
        var disabled = props.disabled;

        var className = cx.create({
            'ui-boxgroup-option': true,
            'state-checked': isChecked,
            'state-disabled': disabled
        });

        return (
            <label className={className}>
                <input
                    disabled={disabled}
                    checked={isChecked}
                    type={props.boxModel}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange} />
                <Icon icon={this.getIcon(boxModel, isChecked)} />
                {props.label}
            </label>
        );

    },

    getIcon(boxModel, isChecked) {
        var icons = Option.Icons[boxModel];
        return icons[isChecked ? 'checked' : 'unchecked'];
    }

});

Option.propTypes = {
    boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

Option.Icons = {
    radio: {
        checked: 'radio-button-checked',
        unchecked: 'radio-button-unchecked'
    },
    checkbox: {
        checked: 'check-box',
        unchecked: 'check-box-outline-blank'
    }
};

module.exports = Option;
