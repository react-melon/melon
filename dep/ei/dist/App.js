define('ei/App', [
    'require',
    'exports',
    'module',
    './util/invariant',
    './events',
    './Router',
    './env',
    './util/assign',
    './util/createAppComponent'
], function (require, exports, module) {
    var invariant = require('./util/invariant');
    var events = require('./events');
    var Router = require('./Router');
    var env = require('./env');
    var assign = require('./util/assign');
    function App() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        invariant(options, 'App need options');
        invariant(options.routes, 'App need routes');
        assign(this, options);
        this.router = new Router(this.routes);
    }
    App.prototype.execute = function (request, initialState, needRawState) {
        invariant(env.isServer, 'App.execute() must run on server');
        events.emit('app-request');
        var me = this;
        var route = me.route(request);
        if (!route) {
            return Promise.reject({ status: 404 });
        }
        return me.loadPage(route.page).then(function (Page) {
            var page = new Page(initialState);
            return Promise.resolve(initialState == null ? page.getInitialState(request) : initialState).then(function (state) {
                if (needRawState) {
                    events.emit('app-response-in-json');
                    return {
                        state: state,
                        route: route
                    };
                }
                events.emit('app-response-in-html');
                if (initialState == null) {
                    page.init(state);
                    events.emit('app-page-bootstrap');
                }
                events.emit('app-page-entered');
                return {
                    page: page,
                    route: route
                };
            });
        })['catch'](function (error) {
            events.emit('app-execute-error', error);
            throw error;
        });
    };
    App.prototype.setBasePath = function (basePath) {
        this.basePath = basePath;
        return this;
    };
    App.prototype.loadPage = function (page) {
        var pool = this.pool;
        if (pool && pool[page]) {
            events.emit('app-page-loaded');
            return Promise.resolve(pool[page]);
        }
        return env.isServer ? this.resolveServerModule(page) : this.resolveClientModule(page);
    };
    App.prototype.resolveServerModule = function (moduleId) {
        events.emit('app-load-page-on-server', moduleId);
        var basePath = this.basePath;
        invariant(basePath, 'ei need a basePath to resolve your page');
        var path = basePath + '/' + moduleId;
        var Page = require(path);
        var pool = this.pool;
        if (!pool) {
            pool = this.pool = {};
        }
        pool[moduleId] = Page;
        return Promise.resolve(Page);
    };
    App.prototype.resolveClientModule = function (moduleId) {
        events.emit('app-load-page-on-client');
        if (!moduleId) {
            return Promise.reject(new Error('need page module id'));
        }
        return new Promise(function (resolve, reject) {
            window.require([moduleId], function (Page) {
                resolve(Page);
            });
        });
    };
    App.prototype.route = function (request) {
        events.emit('app-route');
        var config = this.router.route(request);
        if (config) {
            events.emit('app-route-succeed');
        } else {
            events.emit('app-route-failed', request);
        }
        return config;
    };
    App.Component = require('./util/createAppComponent')(App);
    module.exports = App;
});