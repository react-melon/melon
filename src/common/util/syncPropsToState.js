/**
 * @file 小工具 - 用于做 InputComponent 的 props -> state 的同步
 * @author leon <lupengyu@baidu.com>
 */

export function getNextValue(component, nextProps) {
    const {value, defaultValue} = nextProps;
    return value === void 0 ? defaultValue : value;
}

export function getNextValidity(component, {value, disabled, customValidity}) {

    if (disabled) {
        return null;
    }

    if (customValidity === component.props.customValidity) {
        return component.state.validity;
    }

    // 否则计算一下 validity，如果发生了变化就更新一下
    return component.checkValidity(value);

}

export default function getSyncUpdates(component, nextProps) {

    const value = getNextValue(component, nextProps);
    const {disabled, customValidity} = nextProps;
    const validity = getNextValidity(component, {
        value, customValidity, disabled
    });

    return {value, validity};

}
