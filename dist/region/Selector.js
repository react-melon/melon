define('melon/region/Selector', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/classname',
    '../Icon',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/classname');
    var Icon = require('../Icon');
    var Component = require('../Component');
    var RegionSelector = function (_Component) {
        babelHelpers.inherits(RegionSelector, _Component);
        function RegionSelector(props) {
            babelHelpers.classCallCheck(this, RegionSelector);
            babelHelpers.get(Object.getPrototypeOf(RegionSelector.prototype), 'constructor', this).call(this, props);
            this.type = 'region-selector';
            this.onClick = this.onClick.bind(this);
        }
        babelHelpers.createClass(RegionSelector, [
            {
                key: 'onClick',
                value: function onClick(e) {
                    var _props = this.props;
                    var onChange = _props.onChange;
                    var checked = _props.checked;
                    onChange && onChange({
                        value: !checked,
                        target: this
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props2 = this.props;
                    var checked = _props2.checked;
                    var disabled = _props2.disabled;
                    var hasInput = _props2.hasInput;
                    var value = _props2.value;
                    var name = _props2.name;
                    var label = _props2.label;
                    var id = _props2.id;
                    var className = cx.create(this.getClassName(), { 'state-checked': checked });
                    return React.createElement('label', {
                        className: className,
                        'data-region-id': id,
                        onClick: this.onClick
                    }, hasInput ? React.createElement('input', {
                        disabled: disabled,
                        checked: checked,
                        type: 'checkbox',
                        value: value,
                        name: name
                    }) : null, React.createElement(Icon, { icon: this.getIcon(checked) }), label);
                }
            },
            {
                key: 'getIcon',
                value: function getIcon(isChecked) {
                    var icons = RegionSelector.Icons;
                    return icons[isChecked ? 'checked' : 'unchecked'];
                }
            }
        ]);
        return RegionSelector;
    }(Component);
    RegionSelector.defaultProps = { hasInput: false };
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
});