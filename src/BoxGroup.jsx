/**
 * @file esui-react/BoxGroup
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var PropTypes = React.PropTypes;
var cx = require('./common/util/classname');
var Icon = require('./Icon.jsx');

var BoxGroup = React.createClass({

    propTypes: {
        disabled: PropTypes.bool,
        boxModel: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
        onChange: PropTypes.func,
        value: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        children: PropTypes.node.isRequired
    },

    getInitialState: function () {
        return {
            value: this.props.value
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.value
        });
    },

    render() {

        var props = this.props;

        return (
            <div className={props.className}>
                {React.Children.map(props.children, this.renderOption)}
            </div>
        );

    },

    renderOption: function (option) {

        var boxModel = this.props.boxModel;
        var props = option.props;

        if (option.type !== 'option') {
            return null;
        }
        var value = props.value;
        var isChecked = this.isItemChecked(value);
        var disabled = this.props.disabled || props.disabled;

        var className = cx.create({
            'ui-boxgroup-option': true,
            'state-checked': isChecked,
            'state-disabled': disabled
        });

        return (
            <label className={className}>
                <input
                    disabled={disabled}
                    checked={isChecked}
                    type={this.props.boxModel}
                    value={value}
                    name={this.props.name}
                    onChange={this.onChange} />
                {this.renderIcon(isChecked)}
                {props.label || props.children}
            </label>
        );

    },

    renderIcon(isChecked) {
        var icons = BoxGroup.Icons[this.props.boxModel];
        return <Icon icon={isChecked ? icons.checked : icons.unchecked} />;
    },

    isItemChecked(value) {
        return this.state.value.indexOf(value) !== -1;
    },

    onChange: function (e) {
        var optionValue = e.target.value;
        var value = this.state.value;

        if (this.props.boxModel === 'radio') {
            value = [optionValue];
        }
        else {

            var index = value.indexOf(optionValue);

            if (index === -1) {
                value = value.concat(optionValue);
            }
            else {
                value = value.slice(0, index).concat(value.slice(index + 1));
            }

        }

        this.setState({
            value: value
        });

    }

});

BoxGroup = require('./common/util/createControl')(BoxGroup);

BoxGroup.defaultProps = {
    disabled: false,
    value: []
};

BoxGroup.Icons = {
    radio: {
        checked: 'radio-button-checked',
        unchecked: 'radio-button-unchecked'
    },
    checkbox: {
        checked: 'check-box',
        unchecked: 'check-box-outline-blank'
    }
};


BoxGroup.createOptions = function (datasource) {

    return datasource.map(function (option, index) {
        return (
            <option
                key={index}
                disabled={option.disabled}
                label={option.name}
                value={option.value} />
        );
    });

};

module.exports = BoxGroup;
