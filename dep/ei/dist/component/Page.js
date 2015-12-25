define('ei/component/Page', [
    'require',
    'exports',
    'module',
    'react',
    '../events'
], function (require, exports, module) {
    var React = require('react');
    var events = require('../events');
    var Page = React.createClass({
        displayName: 'Page',
        getInitialState: function getInitialState() {
            return {
                pendding: false,
                ready: false,
                error: null
            };
        },
        componentDidMount: function componentDidMount() {
            var _props = this.props;
            var initialState = _props.initialState;
            var request = _props.request;
            var app = this.context.app;
            this.renderPage(app, request, initialState);
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var request = this.props.request;
            var nextRequest = nextProps.request;
            if (request.pathname !== nextRequest.pathname || request.search !== nextRequest.search) {
                this.renderPage(this.context.app, nextRequest, null);
            }
        },
        componentWillUnmount: function componentWillUnmount() {
            var page = this.state.page;
            if (page) {
                page.dispose();
            }
        },
        renderErrorMessage: function renderErrorMessage(error) {
            var status = error.status;
            var statusInfo = error.statusInfo;
            return React.createElement('div', { className: this.getPartClassName('error-message') }, React.createElement('h3', null, status), React.createElement('p', null, statusInfo));
        },
        renderLoading: function renderLoading() {
            return React.createElement('div', { className: this.getPartClassName('loading') }, React.createElement('span', null, 'loading...'));
        },
        renderPage: function renderPage(app, request, initialState) {
            var me = this;
            var currentPage = me.state.page;
            me.setState({
                pendding: true,
                error: null
            });
            var route = app.route(request);
            if (!route) {
                me.setState({
                    ready: false,
                    error: {
                        status: 404,
                        statusInfo: '\u554A\u54E6\uFF0C\u8FD9\u4E2A\u9875\u9762\u8FF7\u5931\u5728\u4E86\u832B\u832B\u5B87\u5B99\u4E2D\u3002\u3002\u3002'
                    },
                    pendding: false,
                    page: null
                });
                return;
            }
            app.loadPage(route.page).then(function (Page) {
                var page = undefined;
                if (currentPage && currentPage instanceof Page) {
                    page = currentPage;
                } else {
                    page = new Page();
                    page.on('*', function () {
                        var eventName = page.getCurrentEvent().split(/[\-_]/).map(function (term) {
                            return term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
                        }).join('');
                        var handlerName = 'on' + eventName;
                        var handler = me.props[handlerName];
                        if (typeof handler === 'function') {
                            handler.apply(null, arguments);
                        }
                    });
                }
                page.route = route;
                return page;
            }).then(function (page) {
                if (initialState) {
                    page.setState(initialState);
                    return page;
                }
                return Promise.resolve(page.getInitialState(request)).then(function (state) {
                    events.emit('page-initial-state-loaded', { state: state });
                    page.init(state);
                    return page;
                });
            }).then(function (page) {
                if (currentPage && currentPage !== page) {
                    currentPage.dispose();
                    events.emit('page-disposed', { page: currentPage });
                }
                me.setState({
                    page: page,
                    ready: true,
                    pendding: false,
                    error: null
                }, function () {
                    events.emit('page-render-succeed', {
                        page: page,
                        isChild: !me.props.main
                    });
                });
            })['catch'](function (error) {
                me.setState({
                    error: error,
                    ready: false,
                    pendding: false,
                    page: null
                });
            });
        },
        render: function render() {
            var _state = this.state;
            var ready = _state.ready;
            var page = _state.page;
            var error = _state.error;
            var content = '';
            if (error) {
                content = this.renderErrorMessage(error);
            } else if (ready) {
                try {
                    content = page.createElement();
                } catch (e) {
                    content = this.renderErrorMessage('\u554A\u54E6\uFF0C\u51FA\u73B0\u4E86\u4E00\u4E9B\u95EE\u9898\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5');
                }
            } else {
                content = this.renderLoading();
            }
            return React.createElement('div', { className: 'ui-page' }, content);
        }
    });
    var PropTypes = React.PropTypes;
    Page.contextTypes = { app: PropTypes.object.isRequired };
    Page.propTypes = {
        request: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            query: PropTypes.object,
            search: PropTypes.string
        }).isRequired,
        initialState: PropTypes.any
    };
    module.exports = Page;
});