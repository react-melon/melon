define('ei/Router', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function Router(routes) {
        this.routes = routes || [];
    }
    Router.prototype.route = function (request) {
        for (var i = this.routes.length - 1; i >= 0; i--) {
            var route = this.routes[i];
            if (route.path === request.pathname) {
                return route;
            }
        }
    };
    Router.prototype.addRoute = function (config) {
        this.routes.push(config);
        return this;
    };
    module.exports = Router;
});