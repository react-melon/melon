/**
 * @file Menu
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu/MenuItem';
import Divider from './Divider';
import {create} from 'melon-core/classname/cxBuilder';
import Icon from './Icon';
import {Motion, spring} from 'react-motion';
import align from 'dom-align';

const cx = create('Menu');

function getChildMenuKey(index) {
    return `child-menu-${index}`;
}

export default class Menu extends Component {

    constructor(...args) {
        super(...args);
        this.onMainMenuItemClick = this.onMainMenuItemClick.bind(this);
        this.onChildMenuItemClick = this.onChildMenuItemClick.bind(this);
        this.onChildMenuOpen = this.onChildMenuOpen.bind(this);
        this.onChildMenuClose = this.onChildMenuClose.bind(this);
        this.onMotionEnd = this.onMotionEnd.bind(this);
        this.setMainRef = this.setRef.bind(this, 'main');
        this.setLayerRef = this.setRef.bind(this, 'layer');
        this.state = {
            closing: false
        };
    }

    componentWillMount() {
        this.setState(
            this.getChildState(this.props)
        );
    }

    componentWillReceiveProps(nextProps) {

        let {children, open} = this.props;

        // 如果属性 children 发生变化，那么更新子结点相关的状态
        if (nextProps.children !== children) {
            this.setState(this.getChildState(nextProps));
        }

        if (nextProps.open !== open) {

            // 激活关闭动画
            this.setState({
                closing: !nextProps.open
            });

            // 关闭所有的子菜单
            this.openChildMenu(null);

        }

    }

    componentDidUpdate() {

        let {main, layer} = this;

        if (main && layer) {

            let {anchorAlignment, layerAlignment} = this.props;

            align(
                layer,
                main,
                {
                    points: [layerAlignment, anchorAlignment],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                }
            );

        }

    }

    onMainMenuItemClick(e) {
        let {onOpen, onClose, open, index} = this.props;
        let handler = open ? onClose : onOpen;
        handler && handler(index);
    }

    onChildMenuItemClick() {
        let {onClose, index} = this.props;
        onClose && onClose(index, true);
    }

    onChildMenuOpen(childIndex) {
        this.openChildMenu(childIndex);
    }

    onChildMenuClose(childIndex, closeAncestors = false) {

        this.openChildMenu(null);

        if (closeAncestors) {
            let {onClose, index} = this.props;
            onClose && onClose(index, closeAncestors);
        }

    }

    onMotionEnd() {
        this.setState({closing: false});
    }

    setRef(name, ref) {
        this[name] = ref;
    }

    getChildState({children, cascading}) {

        children = Children.toArray(children) || [];

        // 过滤掉没用的子结点
        children = children.filter(child => (
            child.type === Menu
            || child.type === MenuItem
            || child.type === Divider
        ));

        // 如果有任意一个子组件有 icon，那么所有的子组件都是 indent 的
        let indent = children.some(child => (
            child.type === MenuItem && !!child.props.icon
        ));

        // 如果有任意一个子组件是 menu，那么此 menu 是级联 menu
        if (!cascading) {
            cascading = children.some(child => (child.type === Menu));
        }

        // 生成子结点的索引
        let childMenuIndex = children
            .filter(child => child.type === Menu)
            .reduce(
                (menuState, child, index) => {
                    menuState[getChildMenuKey(index)] = false;
                    return menuState;
                },
                {}
            );

        return {
            indent,
            cascading,
            children,
            childMenuIndex
        };

    }

    /**
     * 打开指定的子 menu
     *
     * 如果不指定 childIndex，那会把所有的子菜单都关上
     *
     * @param  {number?} childIndex 子菜单序号
     */
    openChildMenu(childIndex) {

        let childMenuIndex = Object
            .keys(this.state.childMenuIndex)
            .reduce(
                (nextChildMenuIndex, childKey) => {
                    nextChildMenuIndex[childKey] = childIndex != null
                        && getChildMenuKey(childIndex) === childKey;
                    return nextChildMenuIndex;
                },
                {}
            );

        this.setState({
            childMenuIndex
        });

    }

    renderChildren() {

        let {indent, cascading, children, childMenuIndex} = this.state;

        let menuIndex = 0;

        // 给子组件附加属性
        return children.map((child, index) => {

            let extraProps = {
                level: this.props.level + (child.type === Menu ? 1 : 0),
                indent,
                cascading
            };

            if (child.type === MenuItem) {
                extraProps.onClose = this.onChildMenuItemClick;
            }
            else if (child.type === Menu) {
                extraProps.onOpen = this.onChildMenuOpen;
                extraProps.onClose = this.onChildMenuClose;
                extraProps.open = childMenuIndex[getChildMenuKey(menuIndex)];
                extraProps.index = menuIndex++;
            }

            return cloneElement(child, extraProps);

        });

    }

    renderLayer() {

        let open = this.props.open;
        let closing = this.state.closing;

        let begin = open && !closing ? 0 : 1;
        let end = open && !closing ? 1 : 0;

        let content = this.renderChildren();

        return (
            <Motion
                defaultStyle={{
                    opacity: begin,
                    scale: begin
                }}
                style={{
                    opacity: spring(end),
                    scale: spring(end, {stiffness: 260, damping: 20})
                }}
                onRest={this.onMotionEnd}>
                {({scale, opacity}) => (
                    <div
                        ref={this.setLayerRef}
                        className={cx.getPartClassName('children-popover')}
                        style={{
                            opacity: opacity,
                            transform: `scale(${scale}, ${scale})`
                        }}>
                        {content}
                    </div>
                )}
            </Motion>
        );

    }

    render() {

        let {
            level,
            label,
            style,
            icon,
            open
        } = this.props;

        let closing = this.state.closing;

        let className = cx(this.props)
            .addVariants(`level-${level}`);

        if (level === 0) {
            return (
                <div
                    className={className.build()}
                    style={style}>
                    {this.renderChildren()}
                </div>
            );
        }

        // 如果 level 不是 0 级，那么把这货做成一个 MenuItem + Popover 的形式
        return (
            <div
                className={className.addVariants('item').build()}
                ref={this.setMainRef}>
                <MenuItem
                    type="command"
                    icon={icon}
                    label={label}
                    indent={this.props.indent}
                    cascading={true}
                    onClick={this.onMainMenuItemClick}>
                </MenuItem>
                <Icon
                    icon="arrow-drop-down"
                    className={cx.getPartClassName('cascading-icon')} />
                {open || closing ? this.renderLayer() : null}
            </div>
        );


    }

}

const ARCHOR_DIRECTIONS = [
    'tl', 'tc', 'tr',
    'cl', 'cc', 'cr',
    'bl', 'bc', 'br'
];

Menu.propTypes = {
    width: PropTypes.number,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    level: PropTypes.number,
    layerAlignment: PropTypes.oneOf(ARCHOR_DIRECTIONS),
    anchorAlignment: PropTypes.oneOf(ARCHOR_DIRECTIONS)
};

Menu.defaultProps = {
    level: 0,
    width: 300,
    open: false,
    layerAlignment: 'tl',
    anchorAlignment: 'tr'
};

export {
    MenuItem
};
