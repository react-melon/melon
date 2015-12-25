/**
 * @file app
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import ei from 'ei';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.app = new ei.App({
            routes: this.props.routes
        });
    }

    getChildContext() {
        return {
            app: this.app
        };
    }

    render() {
        return (
            <div className="ui-app">{this.props.children}</div>
        );
    }

}

let {PropTypes} = React;

App.propTypes = {
    routes: PropTypes.array.isRequired
};

App.childContextTypes = {
    app: PropTypes.object.isRequired
};

export default App;
