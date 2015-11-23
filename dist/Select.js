define('melon/Select', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './common/util/classname',
    './Icon',
    './select/SeparatePopup',
    './InputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('./common/util/classname');
    var Icon = require('./Icon');
    var SeparatePopup = require('./select/SeparatePopup');
    var InputComponent = require('./InputComponent');
    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);
        babelHelpers.createClass(Select, null, [{
                key: 'displayName',
                value: 'Select',
                enumerable: true
            }]);
        function Select(props) {
            babelHelpers.classCallCheck(this, Select);
            _InputComponent.call(this, props);
            this.state = babelHelpers._extends({}, this.state, { open: props.open });
            this.onClick = this.onClick.bind(this);
            this.onClickOption = this.onClickOption.bind(this);
            this.onPopupHide = this.onPopupHide.bind(this);
        }
        Select.prototype.componentDidMount = function componentDidMount() {
            _InputComponent.prototype.componentDidMount.call(this);
            var container = this.container = document.createElement('div');
            container.className = this.getPartClassName('popup');
            document.body.appendChild(container);
            this.popup = ReactDOM.render(React.createElement(SeparatePopup, {
                target: ReactDOM.findDOMNode(this),
                open: false,
                onHide: this.onPopupHide
            }, React.Children.map(this.props.children, this.renderItem, this)), container);
        };
        Select.prototype.componentWillUnmount = function componentWillUnmount() {
            _InputComponent.prototype.componentWillUnmount.call(this);
            var container = this.container;
            if (container) {
                ReactDOM.unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.container = container = null;
            }
        };
        Select.prototype.showOptions = function showOptions() {
            var _this = this;
            this.setState({ open: true }, function () {
                ReactDOM.render(React.createElement(SeparatePopup, {
                    target: ReactDOM.findDOMNode(_this),
                    open: true,
                    onHide: _this.onPopupHide
                }, React.Children.map(_this.props.children, _this.renderItem, _this)), _this.container);
            });
        };
        Select.prototype.hideOptions = function hideOptions() {
            var _this2 = this;
            this.setState({ open: false }, function () {
                ReactDOM.render(React.createElement(SeparatePopup, {
                    target: ReactDOM.findDOMNode(_this2),
                    open: false,
                    onHide: _this2.onPopupHide
                }, React.Children.map(_this2.props.children, _this2.renderItem, _this2)), _this2.container);
            });
            _InputComponent.prototype.onBlur.call(this, {
                type: 'blur',
                target: this
            });
        };
        Select.prototype.render = function render() {
            return React.createElement('div', {
                onClick: this.onClick,
                className: this.getClassName()
            }, this.renderLabel(), this.renderHiddenInput(), this.renderIcon(), this.renderValidateMessage());
        };
        Select.prototype.onClick = function onClick() {
            if (this.isOpen()) {
                this.hideOptions();
            } else {
                this.showOptions();
            }
        };
        Select.prototype.onClickOption = function onClickOption(e) {
            var _e = e;
            var target = _e.target;
            this.hideOptions();
            var disabled = target.getAttribute('data-disabled');
            if (disabled) {
                return;
            }
            var rawValue = target.getAttribute('data-value');
            if (rawValue === this.state.rawValue) {
                return;
            }
            e = {
                type: 'change',
                target: this,
                value: this.stringifyValue(rawValue),
                rawValue: rawValue
            };
            _InputComponent.prototype.onChange.call(this, e);
            if (this.isControlled()) {
                this.props.onChange(e);
                return;
            }
            this.setState({ rawValue: rawValue }, function () {
                var onChange = this.props.onChange;
                if (onChange) {
                    onChange(e);
                }
            });
        };
        Select.prototype.onPopupHide = function onPopupHide(e) {
            this.hideOptions();
        };
        Select.prototype.renderItem = function renderItem(child) {
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
        };
        Select.prototype.renderOptGroup = function renderOptGroup(group) {
            var props = group.props;
            var disabled = props.disabled;
            var className = cx.create(this.getPartClassName('group'), { disabled: disabled });
            return React.createElement('div', { className: className }, React.createElement('h4', { className: this.getPartClassName('group-title') }, props.label), React.createElement('div', { className: this.getPartClassName('group-list') }, React.Children.map(props.children, function (child, index) {
                return this.renderOption(child, disabled);
            }, this)));
        };
        Select.prototype.renderOption = function renderOption(option, isGroupDisabled) {
            var props = option.props;
            var value = props.value;
            var disabled = isGroupDisabled || props.disabled;
            var clazz = cx.create(this.getPartClassName('option'), this.getStateClasses({
                selected: this.state.rawValue === value,
                disabled: disabled
            }));
            return React.createElement('div', {
                className: clazz,
                key: value,
                'data-value': value,
                'data-role': 'option',
                'data-disabled': disabled,
                title: name,
                onClick: this.onClickOption
            }, props.label || props.children);
        };
        Select.prototype.renderHiddenInput = function renderHiddenInput() {
            var name = this.props.name;
            return name ? React.createElement('input', {
                name: name,
                type: 'hidden',
                value: this.state.rawValue
            }) : null;
        };
        Select.prototype.renderLabel = function renderLabel() {
            var props = this.props;
            var option = this.findOption(this.getRawValue(), props.children);
            var label = option ? option.props.label || option.props.children : React.createElement('span', { className: 'ui-select-label-placeholder' }, props.placeholder);
            return React.createElement('label', { className: 'ui-select-label' }, label);
        };
        Select.prototype.findOption = function findOption(value, children) {
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
        };
        Select.prototype.renderIcon = function renderIcon() {
            return React.createElement(Icon, { icon: 'expand-more' });
        };
        Select.prototype.isOpen = function isOpen() {
            return this.state.open;
        };
        return Select;
    }(InputComponent);
    Select.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        validateEvents: ['change'],
        placeholder: '\u8BF7\u9009\u62E9'
    });
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