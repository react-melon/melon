/**
 * @file melon/boxgroup/Option
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('../common/util/classname');
var Icon = require('../Icon.jsx');
var Component = require('../Component.jsx');

class BoxGroupOption extends Component {

    render() {

        var props = this.props;
        var boxModel = props.boxModel;

        var isChecked = props.checked;
        var disabled = props.disabled;

        var className = cx.create(
            this.getClassName(),
            {
                'state-checked': isChecked
            }
        );

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

    }

    getIcon(boxModel, isChecked) {
        var icons = BoxGroupOption.Icons[boxModel];
        return icons[isChecked ? 'checked' : 'unchecked'];
    }

}

var PropTypes = React.PropTypes;

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
