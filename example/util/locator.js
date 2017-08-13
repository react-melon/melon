/**
 * @file locater
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Locator from 'numen/HistoryLocator';
import {Bind} from 'lodash-decorators';

export function createProvider({routes, components}) {

    let routeMap = (function () {

        let map = {};

        let stack = routes.slice();

        while (stack.length) {
            let route = stack.pop();
            if (route.components) {
                stack.push(
                    ...route.components.map(
                        childRoute => ({
                            ...childRoute,
                            pathname: `${route.pathname}${childRoute.pathname}`
                        })
                    )
                );
            }
            else {
                map[route.pathname] = route;
            }
        }

        return map;

    })();

    console.log(routeMap);

    return Component => class LocatorContextProvider extends PureComponent {

        state = {
            location: null,
            route: null
        };

        static childContextTypes = {
            locator: PropTypes.object
        };

        getChildContext() {
            return {
                locator: this.locator
            };
        }

        componentWillMount() {
            let locator = this.locator = new Locator();
            locator.on(this.route);
            locator.start();
        }

        componentWillUnmount() {
            this.locator.stop();
        }

        @Bind()
        route(location) {

            console.log(location);

            let pathname = location.pathname;

            if (pathname !== '/' && pathname.endsWith('/')) {
                pathname = pathname.slice(0, -1);
            }

            let route = routeMap[pathname];

            this.setState({
                route,
                location
            });

        }

        renderContent() {

            let {location, route} = this.state;

            if (!route) {
                return (
                    <div className="empty">
                        404
                    </div>
                );
            }

            return React.createElement(
                route.component,
                {
                    location,
                    route,
                    ...components
                }
            );

        }

        render() {
            let {location, route} = this.state;
            return (
                <Component
                    location={location}
                    route={route}
                    routes={routes}
                    locator={this.locator}>
                    {this.renderContent()}
                </Component>
            );
        }

    };


}
