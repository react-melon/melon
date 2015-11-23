/**
 * @file melon Base Component
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');

const {
    COMPONENT_CLASS_PREFIX,
    COMPONENT_SIZES,
    COMPONENT_VARIANT_PREFIX,
    COMPONENT_STATE_PREFIX
} = require('./config');

const cx = require('./common/util/classname');
const hyphenate = require('./common/util/hyphenate');
const pascalize = require('./common/util/pascalize');

/**
 * 给一个变种名添加变种类名前缀
 *
 * @param {string} variant 变种名
 * @return {string}
 */
function addVariantClassNamePrefix(variant) {
    return `${COMPONENT_VARIANT_PREFIX}-${variant}`;
}

/**
 * 解析变种配置
 *
 * 这里我们会从属性中提取内置的变种：size="xs" / size="xxxl"
 *
 * @param {Object} props 控件属性
 * @return {Array.string}
 */
function getVariants(props) {

    let {variants = [], size} = props;

    return COMPONENT_SIZES.indexOf(size) > -1
        ? variants.concat(`size-${size}`)
        : variants;

}

/**
 * 生成变种样式类名数组
 *
 * @param {Object} props 控件属性
 * @return {Array.string}
 */
function getVariantClasses(props) {
    return getVariants(props).map(addVariantClassNamePrefix);
}

/**
 * 获取变种类名
 *
 * 这里我们是不会去管内置的变种类名的
 *
 * @param {...*} variant 变种配置
 * @return {string}
 */
function getVariantClassName() {
    return cx
        .createClasses.apply(null, arguments)
        .map(addVariantClassNamePrefix)
        .join(' ');
}

/**
 * 给状态样式类加前缀
 *
 * @param {string} state 状态
 * @return {string}
 */
function addStateClassNamePrefix(state) {
    return `${COMPONENT_STATE_PREFIX}-${state}`;
}

/**
 * 从控件属性上解析预置的状态样式配置
 *
 * @param {Object} props 控件属性
 * @return {Object}
 */
function getStates(props) {
    const {states, hidden, disabled} = props;
    return {
        ...states,
        hidden,
        disabled
    };
}

/**
 * 获取状态样式类数组
 *
 * @param {Object} props 控件属性
 * @return {Array.string}
 */
function getStateClasses(props) {
    return cx
        .createClasses(getStates(props))
        .map(addStateClassNamePrefix);
}

/**
 * 生成状态类名
 *
 * @example
 *
 * getStateClassName({
 *   disabled: true,
 *   hidden: false
 * }, 'hover', ['active', 'some-poor-state'])
 *
 * =>
 *
 * 'stata-disabled state-hover state-some-poor-state'
 *
 * @param {...Object} states 状态配置们
 * @return {string}
 */
function getStateClassName() {
    return cx
        .createClasses.apply(null, arguments)
        .map(addStateClassNamePrefix)
        .join(' ');
}

const PropTypes = React.PropTypes;

const COMPONENT_PROP_TYPES = {
    variants: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.object,
    size: PropTypes.oneOf(require('./config').COMPONENT_SIZES),
    disabled: PropTypes.bool,
    hidden: PropTypes.bool
};

module.exports = (type, OriginalComponent) => {

    const displayName = pascalize(type);
    const hyphenatedClassName = hyphenate(displayName);

    /**
     * 生成部件类名
     *
     * @param {string?} part 部件名
     * @return {string}
     */
    function getPartClassName(part) {
        const prefix = `${COMPONENT_CLASS_PREFIX}-${hyphenatedClassName}`;
        return part ? `${prefix}-${part}` : prefix;
    }

    function getClassName(props) {

        const {className} = props;

        return cx.createClassName(
            className,
            getPartClassName(),
            getVariantClasses(props),
            getStateClasses(props)
        );

    }

    function render(props) {

        let {
            variants,
            states,
            ...rest
        } = props;

        variants = getVariants(props);
        states = getStates(props);

        return (
            <OriginalComponent
                {...rest}
                variants={variants}
                states={states}
                className={getClassName(props)}
                getStates={getStates}
                getVariants={getVariants}
                getPartClassName={getPartClassName}
                getVariantClassName={getVariantClassName}
                getStateClassName={getStateClassName} />
        );

    }

    // 如果源组件的 prototype 上有 render 方法
    // 我们可以推测出这个组件不是一个 stateless function，那么我们得给它做一个 ReactClass
    // 否则这个亲的 ref 就没了。。。
    let Component = 'render' in OriginalComponent.prototype
        ? React.createClass({
            render() {
                return render(this.props);
            }
        })
        : render;

    Component.OriginalComponent = OriginalComponent;

    Component.displayName = `${displayName}ComponentWrapper`;

    Component.propTypes = COMPONENT_PROP_TYPES;

    return Component;

};
