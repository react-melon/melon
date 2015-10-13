/**
 * @file melon/Toggle
 * @author cxtom<cxtom2010@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

var React = require('react');
var Icon  = require('./Icon');

var InputComponent = require('./InputComponent');

class Toggle extends InputComponent {

    constructor(props) {

        super(props);
        this.onChange = this.onChange.bind(this);

        if (!this.isControlled()) {
            this.state = {
                ...this.state,
                checked: props.checked
            };
        }

    }

    /**
     * 属性变化处理
     *
     * 这里重写的原因是 toggle 使用 checked 进行值标识，checked 的使用与 rawValue 是一致的。
     *
     * @param {Object} props 新属性
     * @override
     */
    componentWillReceiveProps(props) {

        var checked = props.checked;

        // 如果 checked 未发生变化，
        // 或者控制是非控制的，这种情况下控制自行控制 checked
        // 那么就再见了
        if (this.props.checked === checked || !this.isControlled()) {
            return;
        }

        var rawValue = checked ? props.value : '';
        var value = this.stringifyValue(rawValue);
        var validity = this.checkValidity(value);

        this.setState({checked});
        this.showValidity(validity);

    }

    render() {

        var props = this.props;
        var isChecked = this.isChecked();

        return (
            <label className={this.getClassName()}>
                <input
                    type="checkbox"
                    name={props.name}
                    value={props.value}
                    onChange={this.onChange}
                    checked={isChecked} />
                {this.renderBar()}
                {this.renderValidateMessage()}
            </label>
        );

    }

    getValue() {
        return this.isChecked() ? this.props.value || '' : this.state.value;
    }

    isChecked() {
        return this.isControlled() ? this.props.checked : this.state.checked;
    }

    isControlled() {
        var props = this.props;
        return props.disabled || props.readOnly || props.checked != null && props.onChange;
    }

    onChange(e) {

        var props = this.props;

        if (props.disabled || props.readOnly) {
            return;
        }

        var isChecked = e.target.checked;

        e = {
            type: 'change',
            target: this,
            value: isChecked ? this.props.value || 'on' : ''
        };

        super.onChange(e);

        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        this.setState({
            checked: isChecked
        }, function () {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        });

    }

    renderBar() {

        var checked = this.isChecked();

        var barStyle = checked
            ? {backgroundColor: 'rgba(0, 188, 212, 0.498039)'}
            : null;

        var circleStyle = checked
            ? {left: '45%', backgroundColor: 'rgb(0, 188, 212)'}
            : null;

        return (
            <div className={this.getPartClassName('bar-container')}>
                <div className={this.getPartClassName('bar')} style={barStyle} />
                <div className={this.getPartClassName('circle')} style={circleStyle} />
            </div>
        );

    }

}

Toggle.defaultProps = {
    ...InputComponent.defaultProps,
    value: 'on',
    checked: false,
    validateEvents: ['change']
};

var PropTypes = React.PropTypes;

Toggle.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool
};

module.exports = Toggle;
