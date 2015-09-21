/**
 * @file melon/Toggle
 * @author cxtom<cxtom2008@gmail.com>
 * @author leon<ludafa@outlook.com>
 */

var React = require('react');
var Icon  = require('./Icon.jsx');

var Component = require('./Component.jsx');

class Toggle extends Component {

    constructor(props) {

        super(props);

        this.state = this.isControlled()
            ? {}
            : {checked: this.props.defaultChecked};

    }

    componentDidMount() {
        var form = this.context.form;
        if (form) {
            form.attach(this);
        }
    }

    componentWillUnmount() {
        var form = this.context.form;
        if (form) {
            form.detach(this);
        }
    }

    contextTypes: {
        form: PropTypes.object
    }

    isControlled() {
        var props = this.props;
        return props.disabled || props.readOnly || props.checked != null && !!props.onChange;
    }

    getValue() {
        return this.isChecked() ? this.props.value || 'on' : '';
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
                    onChange={this.onChange.bind(this)}
                    checked={isChecked} />
                {this.renderBar()}
            </label>
        );

    }

    isChecked() {
        return this.isControlled() ? this.props.checked : this.state.checked;
    }

    onChange(e) {

        var props = this.props;

        if (props.disabled || props.readOnly) {
            return;
        }

        var isChecked = e.target.checked;

        e = {type: 'change', target: this, value: isChecked ? this.props.value || 'on' : ''};

        var form = this.context.form;

        if (form) {
            form.onFinishEdit(e);
        }

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

var PropTypes = React.PropTypes;

Toggle.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool
};

module.exports = Toggle;
