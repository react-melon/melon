/**
 * @file melon/mainClickAware
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./Component.jsx');
var dom = require('./common/util/dom');

class MainClickAware extends Component {

    constructor(props) {
        super(props);
        this.onMainClick = this.onMainClick.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        var main = ReactDOM.findDOMNode(this);
        dom.on(main, 'click', this.onWindowResize);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        var main = ReactDOM.findDOMNode(this);
        dom.off(main, 'click', this.onWindowResize);
    }

    onMainClick(e) {
        throw new Error('MainClickAware onMainClick need implement');
    }

}

MainClickAware.defaultProps = {
    ...Component.defaultProps
};

module.exports = MainClickAware;
