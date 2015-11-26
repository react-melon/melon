define('melon/Select', [
    'require',
    'exports',
    'module',
    'react',
    'react-dom',
    './common/util/cxBuilder',
    './Icon',
    './select/SeparatePopup',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('./common/util/cxBuilder').create('Select');
    var Icon = require('./Icon');
    var SeparatePopup = require('./select/SeparatePopup');
    var Validity = require('./Validity');
    var Select = React.createClass({
        displayName: 'Select',
        getInitialState: function () {
            return { open: this.props.open };
        },
        componentDidMount: function () {
            var container = this.container = document.createElement('div');
            container.className = cx().part('popup').build();
            document.body.appendChild(container);
            this.popup = ReactDOM.render(React.createElement(SeparatePopup, {
                target: ReactDOM.findDOMNode(this),
                open: false,
                onHide: this.onPopupHide
            }, React.Children.map(this.props.children, this.renderItem)), container);
        },
        componentWillUnmount: function () {
            var container = this.container;
            if (container) {
                ReactDOM.unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.container = container = null;
            }
        },
        showOptions: function () {
            var _this = this;
            this.setState({ open: true }, function () {
                ReactDOM.render(React.createElement(SeparatePopup, {
                    target: ReactDOM.findDOMNode(_this),
                    open: true,
                    onHide: _this.onPopupHide
                }, React.Children.map(_this.props.children, _this.renderItem, _this)), _this.container);
            });
        },
        hideOptions: function () {
            var _this2 = this;
            this.setState({ open: false }, function () {
                ReactDOM.render(React.createElement(SeparatePopup, {
                    target: ReactDOM.findDOMNode(_this2),
                    open: false,
                    onHide: _this2.onPopupHide
                }, React.Children.map(_this2.props.children, _this2.renderItem, _this2)), _this2.container);
            });
        },
        onClick: function () {
            if (this.isOpen()) {
                this.hideOptions();
            } else {
                this.showOptions();
            }
        },
        onClickOption: function (e) {
            var target = e.target;
            this.hideOptions();
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
        onPopupHide: function (e) {
            this.hideOptions();
        },
        renderItem: function (child) {
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
        renderOptGroup: function (group) {
            var _this3 = this;
            var _group$props = group.props;
            var disabled = _group$props.disabled;
            var children = _group$props.children;
            var label = _group$props.label;
            var className = cx().part('group').addStates({ disabled: disabled }).build();
            return React.createElement('div', { className: className }, React.createElement('h4', { className: cx().part('group-title').build() }, label), React.createElement('div', { className: cx().part('group-list').build() }, React.Children.map(children, function (child, index) {
                return _this3.renderOption(child, disabled);
            })));
        },
        renderOption: function (option, isGroupDisabled) {
            var _option$props = option.props;
            var children = _option$props.children;
            var label = _option$props.label;
            var disabled = _option$props.disabled;
            var value = _option$props.value;
            var optionDisabled = isGroupDisabled || disabled;
            var className = cx().part('option').addStates({
                selected: this.props.value === value,
                disabled: optionDisabled
            }).build();
            return React.createElement('div', {
                className: className,
                key: value,
                'data-value': value,
                'data-role': 'option',
                'data-disabled': optionDisabled,
                title: name,
                onClick: this.onClickOption
            }, label || children);
        },
        renderHiddenInput: function () {
            var _props = this.props;
            var name = _props.name;
            var value = _props.value;
            return name ? React.createElement('input', {
                name: name,
                type: 'hidden',
                value: value
            }) : null;
        },
        renderLabel: function () {
            var _props2 = this.props;
            var value = _props2.value;
            var children = _props2.children;
            var placeholder = _props2.placeholder;
            var option = this.findOption(value, children);
            var label = option ? option.props.label || option.props.children : React.createElement('span', { className: cx().part('label-placeholder').build() }, placeholder);
            return React.createElement('label', { className: cx().part('label').build() }, label);
        },
        findOption: function (value, children) {
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
        renderIcon: function () {
            return React.createElement(Icon, { icon: 'expand-more' });
        },
        isOpen: function () {
            return this.state.open;
        },
        render: function () {
            var validity = this.props.validity;
            return React.createElement('div', {
                onClick: this.onClick,
                className: cx(this.props).build()
            }, this.renderLabel(), this.renderHiddenInput(), this.renderIcon(), React.createElement(Validity, { validity: validity }));
        }
    });
    Select.defaultProps = {
        validateEvents: ['change'],
        placeholder: '\u8BF7\u9009\u62E9'
    };
    var PropTypes = React.PropTypes;
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
            return React.createElement('option', {
                key: index,
                disabled: option.disabled,
                value: option.value,
                label: option.name
            });
        });
    };
    module.exports = Select;
});