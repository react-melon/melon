/**
 * @file esui-react/Dialog/DialogWindow
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const {PropTypes} = React;
const cx = require('../common/util/cxBuilder').create('DialogWindow');

const DialogWindow = React.createClass({

    propTypes: {
        top: PropTypes.number,
        footer: PropTypes.element,
        title: PropTypes.element
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
