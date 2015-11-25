/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('./common/util/cxBuilder').create('Select');
var Icon = require('./Icon');
var SeparatePopup = require('./select/SeparatePopup');

let Select = React.createClass({

    displayName: 'Select',

    getInitialState() {

        return {
            open: this.props.open
        };

    },

    componentDidMount() {

        let container = this.container = document.createElement('div');

        container.className = cx().part('popup').build();

        document.body.appendChild(container);

        this.popup = ReactDOM.render(
            <SeparatePopup
                target={ReactDOM.findDOMNode(this)}
                open={false}
                onHide={this.onPopupHide}>
                {React.Children.map(
                    this.props.children,
                    this.renderItem
                )}
            </SeparatePopup>,
            container
        );

    },

    componentWillUnmount() {

        let {container} = this;

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            this.container = container = null;
        }

    },

    showOptions() {

        this.setState({
            open: true
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={true}
                    onHide={this.onPopupHide}>
                    {React.Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

    },

    hideOptions() {

        this.setState({
            open: false
        }, () => {
            ReactDOM.render(
                <SeparatePopup
                    target={ReactDOM.findDOMNode(this)}
                    open={false}
                    onHide={this.onPopupHide}>
                    {React.Children.map(
                        this.props.children,
                        this.renderItem,
                        this
                    )}
                </SeparatePopup>,
                this.container
            );
        });

    },

    onClick() {

        if (this.isOpen()) {
            this.hideOptions();
        }
        else {
            this.showOptions();
        }

    },

    onClickOption(e) {

        let {target} = e;

        this.hideOptions();

        // 如果选项是禁用状态的，收起
        var disabled = target.getAttribute('data-disabled');

        if (disabled) {
            return;
        }

        this.props.onChange({
            type: 'change',
            target: this,
            value: target.getAttribute('data-value')
        });

    },

    onPopupHide(e) {
        this.hideOptions();
    },

    renderItem(child) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return this.renderOption(child, false);
        }

        if (child.type === 'optgroup') {
            return this.renderOptGroup(child);
        }

        return null;

    },

    renderOptGroup(group) {

        const {
            disabled,
            children,
            label
        } = group.props;

        var className = cx().part('group').addStates({disabled}).build();

        return (
            <div className={className}>
                <h4 className={cx().part('group-title').build()}>{label}</h4>
                <div className={cx().part('group-list').build()}>
                    {React.Children.map(
                        children,
                        (child, index) => {
                            return this.renderOption(child, disabled);
                        }
                    )}
                </div>
            </div>
        );

    },

    renderOption(option, isGroupDisabled) {

        const {
            children,
            label,
            disabled,
            value
        } = option.props;

        const optionDisabled = isGroupDisabled || disabled;

        const className = cx()
            .part('option')
            .addStates({
                selected: this.props.value === value,
                disabled: optionDisabled
            })
            .build();

        return (
            <div className={className}
                key={value}
                data-value={value}
                data-role="option"
                data-disabled={optionDisabled}
                title={name}
                onClick={this.onClickOption}>
                {label || children}
            </div>
        );

    },

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
    },

    /**
     * 渲染label部件
     *
     * @param {string|ReactElement} label label部件内容
     * @return {ReactElement}
     */
    renderLabel() {

        const {value, children, placeholder} = this.props;

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

    },

    findOption(value, children) {

        children = React.Children.toArray(children);

        if (!children) {
            return null;
        }

        for (var i = 0, len = children.length; i < len; ++i) {
            var child = children[i];
            if (child.type === 'optgroup') {
                var option = this.findOption(value, child.props.children);
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
    },

    renderIcon() {
        return <Icon icon='expand-more' />;
    },

    isOpen() {
        return this.state.open;
    },

    render() {
        return (
            <div
                onClick={this.onClick}
                className={cx(this.props).build()}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
            </div>
        );
    }

});

Select.defaultProps = {
    validateEvents: ['change'],
    placeholder: '请选择'
};

const {PropTypes} = React;

Select.propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    rawValue: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired
};

Select = require('./createInputComponent').create(Select);

Select.createOptions = function (dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

};

module.exports = Select;
