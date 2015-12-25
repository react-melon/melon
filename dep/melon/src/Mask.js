/**
 * @file esui-react/Mask
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./common/util/cxBuilder').create('Mask');
const PropTypes = React.PropTypes;

const Mask = React.createClass({

    getInitialState() {
        this.originalBodyOverflow = '';
        return {};
    },

    propTypes: {
        autoLockScrolling: PropTypes.bool,
        show: PropTypes.bool
    },

    getDefaultProps() {
        return {
            autoLockScrolling: true
        };
    },

    componentDidMount() {
        this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    },

    componentDidUpdate() {

        const {autoLockScrolling, show} = this.props;

        if (!autoLockScrolling) {
            return;
        }

        show ? this.preventScrolling() : this.allowScrolling();

    },

    componentWillUnmount() {
        this.allowScrolling();
    },

    preventScrolling() {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    },

    allowScrolling() {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = this.originalBodyOverflow || '';
    },

    render() {

        const {props} = this;
        const {show} = props;

        return (
            <div {...props} className={cx(props).addStates({show}).build()} />
        );

    }

});

module.exports = Mask;
