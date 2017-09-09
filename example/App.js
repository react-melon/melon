/**
 * @file Exampe App
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-min-vars-per-destructure */

import bind from 'lodash-decorators/bind';
import React, {PureComponent, cloneElement} from 'react';
import './index.styl';
import routes from './routes';
import {createProvider} from './util/locator';
import Navigation, {NavigationItem} from 'melon/Navigation';
import Drawer from 'melon/Drawer';
import Icon from 'melon/Icon';
import Button from 'melon/Button';
import Link from 'melon/Link';
import ReactDemoCodeBlock from './common/component/ReactDemoCodeBlock';

class App extends PureComponent {

    state = {
        navOpen: false
    };

    @bind()
    renderNavItem({name, component, components, pathname}, currentRoute) {

        if (components) {
            return (
                <Navigation
                    key={pathname}
                    label={name}>
                    {components.map(child => this.renderNavItem(
                        {
                            ...child,
                            pathname: `${pathname}${child.pathname}`
                        },
                        currentRoute
                    ))}
                </Navigation>
            );
        }

        return (
            <NavigationItem
                key={pathname}
                label={name}
                active={currentRoute.pathname === pathname}
                onClick={() => {
                    this.props.locator.redirect(pathname);
                    this.setState({navOpen: false});
                    window.scrollTo(0, 0);
                }}
            />
        );


    }

    renderNav(routes, currentRoute) {
        return (
            <Drawer
                open={this.state.navOpen}
                onHide={() => this.setState({navOpen: false})}>
                <Navigation>
                    {routes.map(route => this.renderNavItem(route, currentRoute))}
                </Navigation>
            </Drawer>
        );
    }

    renderAppBar() {

        let {route} = this.props;
        /* eslint-disable max-len */
        return (
            <div className="app-bar">
                <Button
                    size="xxxl"
                    style={{color: '#fff'}}
                    onClick={() => this.setState({navOpen: !this.state.navOpen})}>
                    <Icon icon="menu" />
                </Button>
                <label>{route && route.name || '404'}</label>
                <Link href="https://github.com/react-melon/melon">
                    <svg
                        style={{fill: '#fff'}}
                        width="24" height="24" version="1.1" viewBox="0 0 16 16">
                        <path
                            fillRule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                </Link>
            </div>
        );
        /* eslint-enable max-len */
    }

    render() {

        let {location, route, children, routes, locator} = this.props;

        if (location.pathname === '/') {
            return cloneElement(children, {locator});
        }

        return (
            <div className="app">
                <nav className="nav">
                    {this.renderNav(routes, route)}
                </nav>
                {this.renderAppBar()}
                <section className="content">
                    {children}
                </section>
            </div>
        );
    }
}

export default createProvider({
    routes,
    components: {
        ReactCodeBlock: ReactDemoCodeBlock
    }
})(App);
