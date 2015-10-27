/**
 * @file esui-react/Dialog/DialogWindow
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('../Component');

var _ = require('underscore');

class DialogWindow extends Component {

    static displayName = 'DialogWindow';

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }

    render() {

        var {
            children,
            top,
            title,
            footer,
            ...others
        } = this.props;

        return (
            <div {...others} style={{marginTop: top}}>
                {title}
                {children}
                {footer}
            </div>
        );

    }

}

DialogWindow.propTypes = {
    top: React.PropTypes.number,
    footer: React.PropTypes.element,
    title: React.PropTypes.element
};

module.exports = DialogWindow;
