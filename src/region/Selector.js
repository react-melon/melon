/**
 * @file melon/region/Selector
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var cx = require('../common/util/classname');
var Icon = require('../Icon');
var Component = require('../Component');

class RegionSelector extends Component {

    static displayName = 'RegionSelector';

    constructor(props) {

        super(props);

        this.type = 'region-selector';

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

        var className = cx.create(
            this.getClassName(),
            {
                'state-checked': checked
            }
        );

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

    getIcon(isChecked) {
        var icons = RegionSelector.Icons;
        return icons[isChecked ? 'checked' : 'unchecked'];
    }

}

RegionSelector.defaultProps = {
    hasInput: false
};

var PropTypes = React.PropTypes;

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
