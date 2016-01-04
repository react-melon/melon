define('melon/Toggle', [
    'require',
    'exports',
    'module',
    'react',
    './common/util/cxBuilder',
    './ripples/CenterRipple',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Toggle');
    var CenterRipple = require('./ripples/CenterRipple');
    var Validity = require('./Validity');
    var Toggle = React.createClass({
        displayName: 'Toggle',
        onChange: function (e) {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;
            var onChange = _props.onChange;
            var trueValue = _props.trueValue;
            var falseValue = _props.falseValue;
            if (disabled || readOnly) {
                return;
            }
            onChange({
                type: 'change',
                target: this,
                value: e.target.checked ? trueValue : falseValue
            });
        },
        renderBar: function () {
            var _props2 = this.props;
            var checked = _props2.checked;
            var disabled = _props2.disabled;
            return React.createElement('div', { className: cx().part('bar-container').build() }, React.createElement('div', { className: cx().part('bar').build() }), React.createElement('div', { className: cx().part('circle').build() }, disabled ? null : React.createElement(CenterRipple, {
                flag: checked,
                scale: 2.5,
                opacity: 0.3
            })));
        },
        render: function () {
            var props = this.props;
            var onChange = this.onChange;
            var name = props.name;
            var value = props.value;
            var trueValue = props.trueValue;
            var validity = props.validity;
            var checked = value === trueValue;
            return React.createElement('label', { className: cx(props).addStates({ checked: checked }).build() }, React.createElement('input', {
                type: 'checkbox',
                name: name,
                value: value,
                onChange: onChange,
                checked: checked
            }), this.renderBar(), React.createElement(Validity, { validity: validity }));
        }
    });
    Toggle.defaultProps = {
        trueValue: 'on',
        falseValue: '',
        defaultValue: ''
    };
    var PropTypes = React.PropTypes;
    Toggle.propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        trueValue: PropTypes.string.isRequired,
        falseValue: PropTypes.string,
        onChange: PropTypes.func
    };
    module.exports = require('./createInputComponent').create(Toggle);
});