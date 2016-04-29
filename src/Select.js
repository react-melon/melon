/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Children} from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';
import SeparatePopup from './select/SeparatePopup';
import Validity from './Validity';
import InputComponent from './InputComponent';
import Group from './select/OptionGroup';
import Option from './select/Option';
import {create} from './common/util/cxBuilder';

const cx = create('Select');

export default class Select extends InputComponent {

    constructor(props, context) {

        super(props, context);

        this.state = {
            ...this.state,
            open: false
        };

        this.onClick = this.onClick.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.onPopupHide = this.onPopupHide.bind(this);

    }

    componentDidMount() {

        super.componentDidMount();

        let container = this.container = document.createElement('div');

        container.className = cx().part('popup').build();

        document.body.appendChild(container);

        this.popup = ReactDOM.render(
            <SeparatePopup
                target={ReactDOM.findDOMNode(this)}
                open={false}
                onHide={this.onPopupHide}>
                {Children.map(
                    this.props.children,
                    this.renderItem,
                    this
                )}
            </SeparatePopup>,
            container
        );

    }

    componentWillReceiveProps(nextProps) {

        const {children} = nextProps;

        if (children !== this.props.children) {
            this.popup = ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={this.state.open}
                    onHide={this.onPopupHide}>
                    {Children.map(
                        children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        }

        super.componentWillReceiveProps(nextProps);

    }

    componentWillUnmount() {

        let {container} = this;

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            this.container = container = null;
        }

    }

    showOptions() {

        this.setState({
            open: true
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={true}
                    onHide={this.onPopupHide}>
                    {Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

    }

    hideOptions() {

        this.setState({
            open: false
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={false}
                    onHide={this.onPopupHide}>
                    {Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

    }

    onClick() {

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

        if (this.isOpen()) {
            this.hideOptions();
        }
        else {
            this.showOptions();
        }

    }

    onClickOption({value}) {

        this.hideOptions();

        super.onChange({
            type: 'change',
            target: this,
            value
        });

    }

    onPopupHide(e) {
        this.hideOptions();
    }

    renderItem(child, index) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return (
                <Option
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        if (child.type === 'optgroup') {
            return (
                <Group
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        return null;

    }

    renderHiddenInput() {

        const {name, value} = this.props;

        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={value} />
            )
            : null;

    }

    /**
     * 渲染label部件
     *
     * @param {string|ReactElement} label label部件内容
     * @return {ReactElement}
     */
    renderLabel() {

        const {value} = this.state;
        const {children, placeholder} = this.props;

        const option = this.findOption(value, children);

        const label = option
            ? (option.props.label || option.props.children)
            : (
                <span className={cx().part('label-placeholder').build()}>
                    {placeholder}
                </span>
            );

        return (
            <label className={cx().part('label').build()}>
                {label}
            </label>
        );

    }

    findOption(value, children) {

        children = Children.toArray(children);

        if (!children) {
            return null;
        }

        for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if (child.type === 'optgroup') {
                const option = this.findOption(value, child.props.children);
                if (option) {
                    return option;
                }
                continue;
            }
            if (child.props.value === value) {
                return child;
            }
        }

        return null;
    }

    renderIcon() {
        return <Icon icon='expand-more' />;
    }

    isOpen() {
        return this.state.open;
    }

    render() {

        return (
            <div
                onClick={this.onClick}
                className={cx(this.props).addStates(this.getStyleStates()).build()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                <Validity validity={this.state.validity} />
            </div>
        );

    }

}

Select.displayName = 'Select';

Select.defaultProps = {
    ...InputComponent.defaultProps,
    validateEvents: ['change'],
    placeholder: '请选择',
    open: false,
    defaultValue: ''
};

Select.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired
};

export function createOptions(dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

}

Select.createOptions = createOptions;
