define('melon/boxgroup/Option', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/classname',
    '../Icon',
    '../Component',
    '../ripples/CenterRipple'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/classname');
    var Icon = require('../Icon');
    var Component = require('../Component');
    var CenterRipple = require('../ripples/CenterRipple');
    var BoxGroupOption = function (_Component) {
        babelHelpers.inherits(BoxGroupOption, _Component);
        function BoxGroupOption(props) {
            babelHelpers.classCallCheck(this, BoxGroupOption);
            babelHelpers.get(Object.getPrototypeOf(BoxGroupOption.prototype), 'constructor', this).call(this, props);
            this.onClick = this.onClick.bind(this);
        }
        babelHelpers.createClass(BoxGroupOption, [
            {
                key: 'onClick',
                value: function onClick() {
                    this.refs.ripple && this.refs.ripple.animate();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var boxModel = props.boxModel;
                    var isChecked = props.checked;
                    var disabled = props.disabled;
                    var className = cx.create(this.getClassName(), { 'state-checked': isChecked });
                    return React.createElement('label', {
                        className: className,
                        onClick: this.onClick
                    }, React.createElement('input', {
                        disabled: disabled,
                        checked: isChecked,
                        type: props.boxModel,
                        value: props.value,
                        name: props.name,
                        onChange: props.onChange
                    }), React.createElement(Icon, { icon: this.getIcon(boxModel, isChecked) }), props.label, disabled ? null : React.createElement(CenterRipple, { ref: 'ripple' }));
                }
            },
            {
                key: 'getIcon',
                value: function getIcon(boxModel, isChecked) {
                    var icons = BoxGroupOption.Icons[boxModel];
                    return icons[isChecked ? 'checked' : 'unchecked'];
                }
            }
        ]);
        return BoxGroupOption;
    }(Component);
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