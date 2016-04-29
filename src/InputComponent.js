/**
* Copyright 2016 Baidu Inc. All rights reserved.
*
* @file InputComponent
* @author leon <ludafa@outlook.com>
*/

import {Component, PropTypes} from 'react';
import defaultValidator from './Validator';
import getUpdates from './common/util/syncPropsToState';

export default class InputComponent extends Component {

    constructor(props, context = {}) {

        super(props);

        const {name, value, defaultValue} = props;

        // 这里 validator 有两种来源 #=-= 略多，提供了丰富的可能性，比如一个表单里混合使用两种校验规则
        // 1. 来自 props 这种最高优先，因为是手动指定的
        // 2. 来自 contenxt 这种是继承自 form 提供的 validator
        // 3. 最后，这一种情况是一个孤立 input component 在自己战斗，使用默认的 LiteValidator
        this.validator = props.validator || context.validator || defaultValidator;

        const {pointer} = context;

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
        this.pointer = name != null && pointer ? `${pointer}${name}` : null;

        this.state = {value: value != null ? value : defaultValue};

    }

    getChildContext() {

        const {pointer} = this;

        return {
            pointer: pointer ? `${pointer}/` : null
        };

    }

    /**
     * 这里主要做一件事，就是注册到 form 上，让 form 在 getData() / validate() 时避免递归遍历
     */
    componentDidMount() {

        const {attachForm} = this.context;

        if (attachForm) {
            attachForm(this);
        }

    }

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

        const updates = this.getSyncUpdates(nextProps);

        if (updates) {
            this.setState(updates);
        }

    }

    getSyncUpdates(nextProps) {
        return getUpdates(this, nextProps);
    }

    componentWillUnmount() {

        const {detachForm} = this.context;

        if (detachForm) {
            detachForm(this);
        }

    }

    /**
     * 校验并显示校验信息
     *
     * @param {*} value 值
     * @return {module:Validity}
     */
    validate(value) {

        const validity = this.checkValidity(value);

        this.setState({validity});

        return validity;

    }

    /**
     * 静默校验
     *
     * @param  {*} value 值
     * @return {module:Validity}
     */
    checkValidity(value) {
        return this.validator.validate(value, this);
    }

    /**
     * 值变化处理函数
     *
     * @param  {Object} e 值变化事件
     */
    onChange(e) {

        const {
            onChange,
            customValidity
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

        const validity = customValidity
            ? this.validator.createCustomValidity(customValidity)
            : this.checkValidity(value);

        // 这种对应非控制逻辑
        this.setState({value, validity});

    }

    isDisabled() {
        return this.props.disabled;
    }

    isReadOnly() {
        return this.props.readOnly;
    }

    getValue() {
        return this.state.value;
    }

    getStyleStates() {

        const states = {
            'read-only': this.isReadOnly()
        };

        const {validity} = this.state;

        if (validity) {
            const valid = validity.isValid();
            states.valid = valid;
            states.invalid = !valid;
        }

        return states;

    }


}

InputComponent.displayName = 'InputComponent';

InputComponent.propTypes = {

    name: PropTypes.string,
    readOnly: PropTypes.bool,
    pointer: PropTypes.string,

    custormValidity: PropTypes.string,
    onChange: PropTypes.func,

    validate: PropTypes.func,
    renderErrorMessage: PropTypes.func,
    validator: PropTypes.shape({
        validate: PropTypes.func.isRequired
    })

};

InputComponent.defaultProps = {
    defaultValue: '',
    readOnly: false,
    validateEvents: ['change']
};

InputComponent.contextTypes = {
    pointer: PropTypes.string,
    validator: PropTypes.shape({
        validate: PropTypes.func.isRequired
    }),
    attachForm: PropTypes.func,
    detachForm: PropTypes.func
};

InputComponent.childContextTypes = {
    pointer: PropTypes.string
};
