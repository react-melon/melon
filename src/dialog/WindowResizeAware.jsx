/**
 * @file melon/dialog/WindowAware
 * @author leon(ludafa@outlook.com)
 */

var React = require('react');
var Component = require('../Component.jsx');
var dom = require('../common/util/dom');

class WindowResizeAware extends Component {

    constructor(props) {
        super(props);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        dom.on(window, 'resize', this.onWindowResize);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        dom.off(window, 'resize', this.onWindowResize);
    }

    onWindowResize(e) {
        throw new Error('WindowResizeAware onWindowResize need implement');
    }

}

WindowResizeAware.defaultProps = {
    ...Component.defaultProps
};

module.exports = WindowResizeAware;
