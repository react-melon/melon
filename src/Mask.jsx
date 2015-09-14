/**
 * @file esui-react/Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var createControl = require('./common/util/createControl');
var cx = require('./common/util/classname');

var Mask = React.createClass({

    originalBodyOverflow: '',

    statics: {
        type: 'Mask'
    },

    propTypes: {
        autoLockScrolling: React.PropTypes.bool,
        show: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            autoLockScrolling: true
        };
    },

    componentDidMount: function () {
        this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    },

    componentDidUpdate: function () {
        if (this.props.autoLockScrolling) {
            if (this.props.show) {
                this.preventScrolling();
            }
            else {
                this.allowScrolling();
            }
        }
    },

    componentWillUnmount: function () {
        this.allowScrolling();
    },

    preventScrolling: function () {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    },

    allowScrolling: function () {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = this._originalBodyOverflow || '';
    },

    render: function() {

        var props = this.props;

        var states = {
            show: props.show || false
        };

        return (
            <div {...props} className={cx.createComponentClass('mask', [], states)} />
        );

    }

});

module.exports = createControl(Mask);
