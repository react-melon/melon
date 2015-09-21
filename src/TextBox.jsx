/**
 * @file TextBox
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var cx = require('./common/util/classname');

var Component = require('./Component.jsx');
var FloatingLabel = require('./textbox/FloatLabel.jsx');

class TextBox extends Component {

    contextTypes: {
        form: React.PropTypes.object
    }

    constructor(props) {

        super(props);

        var value = this.isControlled() ? null : this.props.defaultValue;

        this.state = {
            value: value,
            isFloating: !!value
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    isControlled() {
        var props = this.props;
        return props.readOnly || props.disabled || props.value != null && !!props.onChange;
    }

    render() {

        var props = this.props;

        var className = cx.create(
            this.getClassName(),
            this.getStateClassName(null, {
                focus: this.state.isFocus
            })
        );

        return (
            <div className={className}>
                {this.renderFloatingLabel(this.props.floatingLabel)}
                {this.renderInput()}
            </div>
        );

    }

    renderInput() {

        var props = this.props;
        var tag = 'input';

        if (props.multiline) {
            tag = 'textarea';
            props = {
                ...props,
                ref: 'input',
                rows: 1
            };
        }

        props = {
            ...props,
            className: this.getPartClassName('input'),
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange,
            value: this.getValue()
        };

        return React.createElement(tag, props);

    }

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    renderFloatingLabel(floatingLabel) {

        var state = this.state;

        return floatingLabel
            ? <FloatingLabel
                states={{floating: state.isFloating, focus: state.isFocus}}
                label={floatingLabel} />
            : null;

    }

    onFocus(e) {

        e = {type: 'focus', target: this};

        var onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus(e);
        }

        var form = this.context.form;

        if (form) {
            form.onStartEdit(e);
        }

        this.setState({
            isFocus: true,
            isFloating: true
        });

    }

    onBlur(e) {

        e = {type: 'blur', target: this};

        var onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur(e);
        }

        var form = this.context.form;

        if (form) {
            form.onFinishEdit(e);
        }

        this.setState({
            isFloating: !!this.getValue(),
            isFocus: false
        });

    }

    onChange(e) {

        var value = e.target.value;

        e = {type: 'change', target: this, value};

        var form = this.context.form;

        if (form) {
            form.onEdit(e);
        }

        // 如果被控制了，那么就交给控制者管理
        if (this.isControlled()) {
            this.props.onChange(e);
            return;
        }

        // 如果没有被控制，那么数据自行使用状态管理
        // 这时多行文本框需要自行更新高度
        this.setState({value});

        if (this.props.multiline) {
            this.syncTextareaHeight();
        }

    }

    componentWillReceiveProps(nextProps) {

        // 多行文本框应该可以自动更新高度
        if (nextProps.multiline
            && this.isControlled()
            && this.props.value !== nextProps.value
        ) {
            syncTextareaHeight();
        }

    }

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    }

    syncTextareaHeight() {
        var dom = this.refs.input;
        dom.style.height = 'auto';
        dom.style.height = dom.scrollHeight + 'px';
    }


}

var PropTypes = React.PropTypes;

TextBox.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    floatingLabel: PropTypes.string
};

module.exports = TextBox;
