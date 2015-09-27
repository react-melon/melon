/**
 * @file Form
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');

var Component = require('./Component');

var FormData = require('./form/FormData');
var Validator = require('./Validator');
var ValidityState = require('./validator/ValidityState');

class Form extends Component {

    constructor(props) {
        super(props);
        this.fields = [];
        this.onSubmit = this.onSubmit.bind(this);
        this.attachField = this.attachField.bind(this);
        this.detachField = this.detachField.bind(this);
    }

    getChildContext() {

        var context = {};

        // 如果不想使用校验功能，那么可以这么干
        if (!this.props.novalidate) {
            context.form = {
                // 这两个是给提交获取数据用的
                // 每个字段都通过这两个方法注册自己的存在
                attach: this.attachField,
                detach: this.detachField
            };
        }

        return context;
    }

    /**
     * 绑定字段
     *
     * @param {module:Component} component 字段
     * @return {module:Form}
     */
    attachField(component) {
        this.fields = this.fields.concat(component);
        return this;
    }

    /**
     * 解除字段
     *
     * @param {module:InputComponent} component 字段
     * @return {module:Form}
     */
    detachField(component) {

        var fields = this.fields;

        // 这里先检测 fields 是否存在是因为在 `unmount` 的过程中，form 会先被 `unmount`
        // 然后才是其中的子组件，这时 form 对子组件的引用已经被解除了，直接返回即可
        if (fields) {

            var index = fields.indexOf(component);

            if (index !== -1) {
                this.fields = fields.slice(0, index).concat(fields.slice(index + 1));
            }

        }

        return this;

    }

    render() {

        var {children, ...props} = this.props;

        return (
            <form
                {...props}
                className={this.getClassName()}
                onSubmit={this.onSubmit}>
                {this.props.children}
            </form>
        );

    }

    getData() {
        return this.fields.reduce(
            function (data, field) {
                var name = field.props.name;
                if (name) {
                    data[name] = field.getValue();
                }
                return data;
            },
            {}
        );
    }

    onSubmit(e) {

        if (!this.validate()) {
            e.preventDefault();
            return;
        }

        if (!this.props.onSubmit) {
            return;
        }

        e.target = this;
        this.props.onSubmit(e);

    }

    validate() {

        var isValid = true;

        for (var fields = this.fields, i = fields.length - 1; i >= 0; --i) {
            var field = fields[i];
            var value = field.getValue();
            if (!field.validate(value).isValid()) {
                isValid = false;
            }
        }

        return isValid;

    }

    componentWillUnmount() {
        this.fields.length = 0;
        this.fields = null;
    }

}

Form.childContextTypes = {
    form: React.PropTypes.object
};

var PropTypes = React.PropTypes;

Form.propTypes = {
    novalidate: PropTypes.bool,
    validate: PropTypes.func,
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
    onSumbit: PropTypes.func
};

module.exports = Form;
