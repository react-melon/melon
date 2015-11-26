define('melon/boxgroup/Option', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    '../Icon',
    '../ripples/CenterRipple'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('BoxGroupOption');
    var Icon = require('../Icon');
    var CenterRipple = require('../ripples/CenterRipple');
    var BoxGroupOption = React.createClass({
        displayName: 'BoxGroupOption',
        onClick: function () {
            this.refs.ripple && this.refs.ripple.animate();
        },
        getIcon: function (boxModel, isChecked) {
            var icons = BoxGroupOption.Icons[boxModel];
            return icons[isChecked ? 'checked' : 'unchecked'];
        },
        render: function () {
            var props = this.props;
            var boxModel = props.boxModel;
            var checked = props.checked;
            var disabled = props.disabled;
            var className = cx(props).addStates({ checked: checked }).build();
            return React.createElement('label', {
                className: className,
                onClick: disabled ? null : this.onClick
            }, React.createElement('input', {
                disabled: disabled,
                checked: checked,
                type: props.boxModel,
                value: props.value,
                name: props.name,
                onChange: props.onChange
            }), React.createElement(Icon, { icon: this.getIcon(boxModel, checked) }), props.label, disabled ? null : React.createElement(CenterRipple, { ref: 'ripple' }));
        }
    });
    var PropTypes = React.PropTypes;
    BoxGroupOption.propTypes = {
        boxModel: PropTypes.oneOf([
            'radio',
            'checkbox'
        ]).isRequired,
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
});