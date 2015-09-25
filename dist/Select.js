define('melon/Select', [
    'exports',
    './babelHelpers',
    'react',
    './common/util/classname',
    './common/util/dom',
    './Icon',
    './InputComponent'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/classname');
    var dom = require('./common/util/dom');
    var Icon = require('./Icon');
    var InputComponent = require('./InputComponent');
    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);
        function Select(props) {
            babelHelpers.classCallCheck(this, Select);
            babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, props);
            this.state = babelHelpers._extends({}, this.state, { isOpen: props.isOpen });
            this.onClick = this.onClick.bind(this);
        }
        babelHelpers.createClass(Select, [
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', {
                        ref: 'main',
                        className: this.getClassName()
                    }, this.renderLabel(), this.renderHiddenInput(), this.renderIcon(), this.renderPopup(), this.renderValidateMessage());
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'componentDidMount', this).call(this);
                    dom.on(document.body, 'click', this.onClick);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'componentWillUnmount', this).call(this);
                    dom.off(document.body, 'click', this.onClick);
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    var main = this.refs.main;
                    if (main !== target && !dom.contains(main, target)) {
                        if (this.state.isOpen) {
                            this.hideOptions();
                        }
                        return;
                    }
                    if (!this.isOpen()) {
                        this.showOptions();
                        return;
                    }
                    var role = target.getAttribute('data-role');
                    while (target !== main && role !== 'option') {
                        target = target.parentElement;
                        role = target.getAttribute('data-role');
                    }
                    if (!role) {
                        this.hideOptions();
                        return;
                    }
                    var disabled = target.getAttribute('data-disabled');
                    if (disabled) {
                        this.hideOptions();
                        return;
                    }
                    var rawValue = target.getAttribute('data-value');
                    if (rawValue === this.state.rawValue) {
                        this.hideOptions();
                        return;
                    }
                    var e = {
                        type: 'change',
                        target: this,
                        value: this.stringifyValue(rawValue),
                        rawValue: rawValue
                    };
                    babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'onChange', this).call(this, e);
                    if (this.isControlled()) {
                        this.props.onChange(e);
                        this.hideOptions();
                        return;
                    }
                    this.setState({ rawValue: rawValue }, function () {
                        var onChange = this.props.onChange;
                        if (onChange) {
                            onChange(e);
                        }
                    });
                    this.hideOptions();
                }
            },
            {
                key: 'renderPopup',
                value: function renderPopup() {
                    var isOpen = this.isOpen();
                    var style = isOpen ? {
                        height: 'auto',
                        opacity: 1,
                        overflow: 'auto'
                    } : {
                        height: 0,
                        opacity: 0,
                        padding: 0,
                        overflow: 'hidden'
                    };
                    return React.createElement('div', {
                        className: 'ui-select-popup',
                        style: style
                    }, React.Children.map(this.props.children, this.renderItem, this));
                }
            },
            {
                key: 'renderItem',
                value: function renderItem(child) {
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
                }
            },
            {
                key: 'renderOptGroup',
                value: function renderOptGroup(group) {
                    var props = group.props;
                    var disabled = props.disabled;
                    var className = cx.create(this.getPartClassName('group'), { disabled: disabled });
                    return React.createElement('div', { className: className }, React.createElement('h4', { className: this.getPartClassName('group-title') }, props.label), React.createElement('div', { className: this.getPartClassName('group-list') }, React.Children.map(props.children, function (child, index) {
                        return this.renderOption(child, disabled);
                    }, this)));
                }
            },
            {
                key: 'renderOption',
                value: function renderOption(option, isGroupDisabled) {
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
                        title: name
                    }, props.label || props.children);
                }
            },
            {
                key: 'renderHiddenInput',
                value: function renderHiddenInput() {
                    var name = this.props.name;
                    return name ? React.createElement('input', {
                        name: name,
                        type: 'hidden',
                        value: this.state.rawValue
                    }) : null;
                }
            },
            {
                key: 'renderLabel',
                value: function renderLabel() {
                    var props = this.props;
                    var option = this.findOption(this.getRawValue(), props.children);
                    var label = option ? option.props.label || option.props.children : React.createElement('span', { className: 'ui-select-label-placeholder' }, props.placeholder);
                    return React.createElement('label', { className: 'ui-select-label' }, label);
                }
            },
            {
                key: 'findOption',
                value: function findOption(value, children) {
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
                }
            },
            {
                key: 'renderIcon',
                value: function renderIcon() {
                    return React.createElement(Icon, { icon: 'expand-more' });
                }
            },
            {
                key: 'isOpen',
                value: function isOpen() {
                    return this.state.isOpen;
                }
            },
            {
                key: 'showOptions',
                value: function showOptions() {
                    this.setState({ isOpen: true });
                }
            },
            {
                key: 'hideOptions',
                value: function hideOptions() {
                    this.setState({ isOpen: false });
                    babelHelpers.get(Object.getPrototypeOf(Select.prototype), 'onBlur', this).call(this, {
                        type: 'blur',
                        target: this
                    });
                }
            }
        ]);
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