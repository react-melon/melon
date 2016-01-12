/**
 * @file createInputComponent
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const defaultValidator = require('./Validator');
const {PropTypes} = React;

const InputComponent = React.createClass({

    displayName: 'InputComponent',

    propTypes: {
        name: PropTypes.string,
        pointer: PropTypes.string,
        validate: PropTypes.func,
        renderErrorMessage: PropTypes.func,
        onChange: PropTypes.func,
        validator: PropTypes.shape({
            validate: PropTypes.func.isRequired
        })
    },

    getDefaultProps() {
        return {
            defaultValue: ''
        };
    },

    getInitialState() {

        const {
            name
        } = this.props;

        // 这里 validator 有两种来源 #=-= 略多，提供了丰富的可能性，比如一个表单里混合使用两种校验规则
        // 1. 来自 props 这种最高优先，因为是手动指定的
        // 2. 来自 contenxt 这种是继承自 form 提供的 validator
        // 3. 最后，这一种情况是一个孤立 input component 在自己战斗，使用默认的 LiteValidator
        this.validator = this.props.validator
            || this.context.validator
            || defaultValidator;

        const {pointer} = this.context;

        /**
         * @property {string} pointer 输入控件在表单中的位置
         *
         * ### 格式
         *
         * 举例：/aaa/bbb/0/ddd
         * [json pointer](https://tools.ietf.org/html/rfc6901)
         * 这货是个规范啊，不要小看人家，类似 XPath 在 XML 中的定位
         *
         * ### 使用规则
         *
         * 1. 只通过 contenxt 传递
         * 2. 只在当组件有 name 属性时有效
         * 3. 如果这货的父级 input component 没有 pointer，那么它也没有 pointer
         *
         * 其实就是说，这个 /aaa/bbb/0/ddd 的字符串中，不能出现 undefined / null
         * 只要有任意一级断开了，其所有子级都是无效的
         */
        this.pointer = name != null && pointer
            ? `${this.context.pointer}${name}`
            : null;

        const {value, defaultValue} = this.props;

        return {
            value: value != null ? value : defaultValue
        };

    },

    contextTypes: {
        pointer: PropTypes.string,
        validator: PropTypes.shape({
            validate: PropTypes.func.isRequired
        }),
        attachForm: PropTypes.func,
        detachForm: PropTypes.func
    },

    childContextTypes: {
        pointer: PropTypes.string
    },

    getChildContext() {

        const {pointer} = this;

        return {
            pointer: pointer ? `${pointer}/` : null
        };

    },

    /**
     * 这里主要做一件事，就是注册到 form 上，让 form 在 getData() / validate() 时避免递归遍历
     */
    componentDidMount() {

        const {attachForm} = this.context;

        if (attachForm) {
            attachForm(this);
        }

    },

    componentWillUnmount() {

        const {detachForm} = this.context;

        if (detachForm) {
            detachForm(this);
        }

    },

    /**
     * 接收属性处理
     *
     * 我们在这里主要是做 value 更新和校验计算
     *
     * ### 值更新
     *
     * 这个事情把实体控件的的 controlled / uncontrolled 处理解放了
     * 实体控件只需要做 render 和 事件处理就好了
     *
     * ### 校验计算
     *
     * 由于 input component 接管了 controlled 状态处理
     * 因此，接收属性也会有 value-change
     *
     * 校验分为两种情况
     *
     * 1. value-change 在这种情况下，调用 validator 做校验
     * 2. 设置 custom validity 在这种情况下，直接生成一个『出错了』的 validity
     *
     * @param {Object} nextProps 新属性
     */
    componentWillReceiveProps(nextProps) {

        const {customValidity, defaultValue} = nextProps;
        const {value = defaultValue} = nextProps;

        if (
            value !== this.getValue()
            || customValidity !== this.props.customValidity
        ) {
            this.setState({
                value: value,
                validity: customValidity
                    ? this.validator.createCustomValidity(customValidity)
                    : this.checkValidity(value)
            });
        }

    },

    /**
     * 校验并显示校验信息
     *
     * @param {*} value 值
     * @return {module:Validity}
     */
    validate(value) {

        const validity = this.checkValidity(value);

        this.setState({
            validity
        });

        return validity;

    },

    checkValidity(value) {
        return this.validator.validate(value, this);
    },

    onChange(e) {

        const {
            onChange
        } = this.props;


        // 这种对应着 controlled 组件逻辑
        if (onChange) {
            onChange(e);
            return;
        }

        const {value} = e;

        if (value === this.state.value) {
            return;
        }

        const {customValidity} = this.props;

        // 这种对应非控制逻辑
        this.setState({
            value: value,
            validity: customValidity
                    ? this.validator.createCustomValidity(customValidity)
                    : this.checkValidity(value)
        });

    },

    getValue() {

        const {child} = this;

        if (child) {

            // 第一，如果子控件提供了 getValue 方法，那这个是最高优先级的
            if (typeof child.getValue === 'function') {
                return child.getValue();
            }

            // 否则，从子组件上取值，因为这里的可能是子组件的 defaultProps || this.state.value
            if (child.props.value) {
                return child.props.value;
            }

        }

        // 如果 child 还没有被装载，那么返回这个
        // 这种情况应该比较少
        return this.state.value;

    },

    render() {

        const {
            props,
            onChange,
            pointer
        } = this;

        // 这里 children 是我们实际上输出的东西
        // 在输出它之前，要给它糊上各种附加的东西
        // value, validity 等等
        // 但是 children 不能重复糊了
        // 所以，我们把 children 单独拎出来，其他属性糊上
        const {
            children,
            validate = this.validate,
            ...restProps
        } = props;

        const {
            value,
            validity
        } = this.state;

        const input = React.cloneElement(
            React.Children.only(children),
            {
                ...restProps,
                pointer,
                validity,
                validate,
                value,
                onChange,
                ref: (child) => {
                    if (child) {
                        this.child = child;
                    }
                }
            }
        );

        return input;

    }

});

exports.isValidInputElement = (element) => {
    return React.isValidElement(element) && element.props.type === InputComponent;
};

exports.InputComponent = InputComponent;

exports.create = function (Component) {

    const InputComponentWrapper = React.createClass({

        displayName: `${Component.displayName}InputWrapper`,

        render() {

            const {props} = this;
            const {children, ...rest} = props;

            return (
                <InputComponent {...rest}>
                    <Component {...rest}>{children}</Component>
                </InputComponent>
            );

        }

    });

    InputComponentWrapper.defaultProps = Component.defaultProps;
    InputComponentWrapper.propTypes = Component.propTypes;

    return InputComponentWrapper;

};
