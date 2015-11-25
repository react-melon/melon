/**
 * @file melon/mainClickAware
 * @author cxtom(cxtom2010@gmail.com)
 */

const ReactDOM = require('react-dom');
const dom = require('./common/util/dom');

const mainClickAwareMixin = {

    componentDidMount() {
        var main = ReactDOM.findDOMNode(this);
        dom.on(main, 'click', this.onMainClick);
    },

    componentWillUnmount() {
        var main = ReactDOM.findDOMNode(this);
        dom.off(main, 'click', this.onMainClick);
    },

    onMainClick(e) {
        throw new Error('MainClickAware onMainClick need implement');
    }

};

module.exports = mainClickAwareMixin;
