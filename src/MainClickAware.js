/**
 * @file melon/mainClickAware
 * @author cxtom(cxtom2010@gmail.com)
 */

var ReactDOM = require('react-dom');
var Component = require('./Component');
var dom = require('./common/util/dom');

class MainClickAware extends Component {

    static displayName = 'MainClickAware';

    constructor(props) {
        super(props);
        this.onMainClick = this.onMainClick.bind(this);
    }

    componentDidMount() {
        var main = ReactDOM.findDOMNode(this);
        dom.on(main, 'click', this.onMainClick);
    }

    componentWillUnmount() {
        var main = ReactDOM.findDOMNode(this);
        dom.off(main, 'click', this.onMainClick);
    }

    onMainClick(e) {
        throw new Error('MainClickAware onMainClick need implement');
    }

}

MainClickAware.defaultProps = {
    ...Component.defaultProps
};

module.exports = MainClickAware;
