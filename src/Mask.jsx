/**
 * @file esui-react/Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

var React = require('react');
var Component = require('./Component.jsx');

class Mask extends Component {

    constructor(props) {
        super(props);
        this.originalBodyOverflow = '';
    }

    componentDidMount() {
        this.originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    }

    componentDidUpdate() {

        if (!this.props.autoLockScrolling) {
            return;
        }

        this.props.show
            ? this.preventScrolling()
            : this.allowScrolling();

    }

    componentWillUnmount() {
        this.allowScrolling();
    }

    preventScrolling() {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
    }

    allowScrolling() {
        var body = document.getElementsByTagName('body')[0];
        body.style.overflow = this.originalBodyOverflow || '';
    }

    getStates(props) {
        var states = super.getStates(props);
        states.show = !!props.show;
        return states;
    }

    render() {

        return (
            <div {...this.props} className={this.getClassName()} />
        );

    }

}

var PropTypes = React.PropTypes;

Mask.propTypes = {
    autoLockScrolling: PropTypes.bool,
    show: PropTypes.bool
};

Mask.defaultProps = {
    ...Component.defaultProps,
    autoLockScrolling: true
};

module.exports = Mask;
