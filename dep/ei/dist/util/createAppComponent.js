define('ei/util/createAppComponent', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    var React = require('react');
    var PropTypes = React.PropTypes;
    function createAppComponent(App) {
        var AppComponent = React.createClass({
            displayName: 'AppComponent',
            getInitialState: function getInitialState() {
                var routes = this.props.routes;
                this.app = new App({ routes: routes });
                return {};
            },
            getChildContext: function getChildContext() {
                return {
                    route: function route(request) {
                        return this.app.route(request);
                    }
                };
            },
            componentDidMount: function componentDidMount() {
                var jobRunner = this.jobRunner;
                var jobQueue = this.jobQueue;
                jobRunner.run(jobQueue);
            },
            render: function render() {
                return this.props.children;
            }
        });
        AppComponent.propTypes = {
            routes: PropTypes.arrayOf(PropTypes.shape({
                path: PropTypes.string.isRequired,
                page: PropTypes.string.isRequired
            })).isRequired
        };
        AppComponent.childContextTypes = {
            addJob: PropTypes.func,
            getParentJob: PropTypes.func
        };
        return AppComponent;
    }
    module.exports = createAppComponent;
});