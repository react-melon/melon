/**
 * @file esui-react/Dialog/DialogWindow
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const {PropTypes} = React;
const cx = require('../common/util/cxBuilder').create('DialogWindow');

const DialogWindow = React.createClass({

    propTypes: {
        top: PropTypes.number.isRequired,
        footer: PropTypes.element,
        title: PropTypes.element
    },

    shouldComponentUpdate(nextProps) {
        return nextProps.top !== this.props.top
            || nextProps.footer !== this.props.footer
            || nextProps.title !== this.props.title;
    },

    render() {

        const {
            children,
            top,
            title,
            footer,
            ...others
        } = this.props;

        return (
            <div
                {...others}
                style={{
                    transform: 'translate(0, ' + top + 'px)',
                    WebkitTransform: 'translate(0, ' + top + 'px)',
                    msTransform: 'translate(0, ' + top + 'px)',
                    MozTransform: 'translate(0, ' + top + 'px)'
                }}
                className={cx(this.props).build()}>
                {title}
                {children}
                {footer}
            </div>
        );
    }

});

module.exports = DialogWindow;
