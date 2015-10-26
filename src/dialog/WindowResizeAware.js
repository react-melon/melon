/**
 * @file melon/dialog/WindowAware
 * @author leon(ludafa@outlook.com)
 */

var Component = require('../Component');
var dom = require('../common/util/dom');

class WindowResizeAware extends Component {

    static displayName = 'WindowResizeAware';

    constructor(props) {
        super(props);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        dom.on(window, 'resize', this.onWindowResize);
    }

    componentWillUnmount() {
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
