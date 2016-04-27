/**
 * @file 小工具 - 用于做 InputComponent 的 props -> state 的同步
 * @author leon <lupengyu@baidu.com>
 */

/**
 * 获取需要同步到 state 中的 value
 *
 * @param  {ReactComponent} component 组件
 * @param  {Object}         nextProps 新属性
 * @return {*}
 */
export function getNextValue(component, nextProps) {
    const {value, defaultValue} = nextProps;
    return value === void 0 ? defaultValue : value;
}

/**
 * 获取需要同步到 state 中的 validity
 *
 * @param {ReactComponent} component 组件
 * @param {Object} nextProps 新属性
 * @return {module:Validity}
 */
export function getNextValidity(component, {value, disabled, customValidity}) {

    // 如果被禁用了，禁用状态是不进行校验的。那么直接返回 null；
    if (disabled) {
        return null;
    }

    // 如果值没有发生变化，那么不需要校验，只在值改变时做校验
    if (value === component.state.value) {
        return component.state.validity;
    }

    // 最后，如果有自定义的出错提示，那么直接用它，不再用校验器做校验。
    return customValidity
        ? component.validator.createCustomValidity(customValidity)
        : component.checkValidity(value);

}

/**
 * 获取需要同步到 state 中的新属性们
 *
 * @param  {ReactComponent} component 组件
 * @param  {Object}         nextProps 新属性
 * @return {Object}
 */
export default function getSyncUpdates(component, nextProps) {

    const value = getNextValue(component, nextProps);
    const {disabled, customValidity} = nextProps;
    const validity = getNextValidity(component, {
        value, customValidity, disabled
    });

    return {value, validity};

}
