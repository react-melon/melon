define('ei/util/createPageComponent', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var PropTypes = React.PropTypes;
    function createPageComponent(Page) {
        var PageComponent = React.createClass({
            displayName: 'PageComponent',
            getInitialState: function getInitialState() {
                var props = this.props;
                var context = this.context;
                var initialState = props.initialState;
                var addJob = context.addJob;
                var getParentJob = context.getParentJob;
                var page = this.page = new Page(initialState);
                var job = addJob(page, getParentJob());
                return {
                    ready: false,
                    job: job
                };
            },
            getChildContext: function getChildContext() {
                var _this = this;
                return {
                    getParentJob: function getParentJob() {
                        return _this.page;
                    }
                };
            },
            render: function render() {
                return React.createElement('noscript', null);
            }
        });
        PageComponent.contextTypes = {
            addJob: PropTypes.func,
            getParentJob: PropTypes.func
        };
        PageComponent.childContextTypes = { getParentJob: PropTypes.func };
        PageComponent.propTypes = { initialState: PropTypes.object };
        PageComponent.defaultProps = { initialState: null };
        return PageComponent;
    }
    module.exports = createPageComponent;
});