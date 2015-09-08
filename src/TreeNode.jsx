/**
 * @file esui-react/Tree
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var _     = require('underscore');
var cx    = require('./common/util/classname');
var Icon  = require('./Icon.jsx');

var DEFAULT_ICON = [
    'chevron-right',
    'expand-more'
];

var TreeNode = React.createClass({

    statics: {
        type: 'TreeNode'
    },

    propTypes: {
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        isOpen: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        level: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            label: '',
            isOpen: false,
            selected: false
        };
    },

    getInitialState: function (){

        return {
            isOpen: this.props.isOpen
        };
    },

    handleOnClick: function (e) {
        var state = this.state;

        var isOpen = state.isOpen;

        this.setState({isOpen: !isOpen});
    },

    render: function() {

        var props = this.props;
        var isOpen = this.state.isOpen;

        var icon = isOpen ?
            (props.openIcon || DEFAULT_ICON[1]) :
            (props.unopenIcon || DEFAULT_ICON[0]);

        var children = props.children;

        var iconStyle;
        var labelStyle;

        if (props.level) {
            var level = props.level - 0;
            labelStyle = {
                paddingLeft: level * 1.2 + 0.4 + 'em'
            };
            iconStyle = {
                left: (0.25 + (level - 1) * 1.2) + 'em'
            }
        }

        if (React.Children.count(children) > 0) {
            children = [
                <Icon key="icon" icon={icon} onClick={this.handleOnClick} style={iconStyle} />,
                <span
                    onClick={this.handleOnClick}
                    key="label"
                    data-role="tree-node-label"
                    style={labelStyle}
                    className={cx.createComponentClass('treenode-label', ['parent'], {open: isOpen})}>
                    {props.label}
                </span>,
                <ul className={cx.createComponentClass('treenode-root', [], {open: isOpen})} key="root" ref="list">
                    {children}
                </ul>
            ];
        }
        else {
            children = <span
                            onClick={this.handleOnClick}
                            key="label"
                            data-role="tree-node-label"
                            style={labelStyle}
                            className={cx.createComponentClass('treenode-label')}>
                            {props.label}
                      </span>;
        }

        return <li {...props}>{children}</li>;

    }

});

module.exports = require('./common/util/createControl')(TreeNode);
