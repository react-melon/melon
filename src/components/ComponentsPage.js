/**
 * @file Components - ComponentsPage
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ei from 'ei';
// import {Promise} from 'es6-promise';

import ReducerBuilder from '../common/util/ReducerBuilder';

import examples from './conf/examples';

const componentReq = require.context('babel!./examples', true, /^\.\/.*\.jsx$/);
const codeReq = require.context('raw!./examples', true, /^\.\/.*\.jsx$/);

const ComponentsPage = ei.Page.extend({

    middlewares: [
        require('../common/middleware/asyncAction'),
        require('../common/middleware/logger')
    ],

    view: require('./ComponentView'),

    reducer: {
        datasource: new ReducerBuilder()
            .add('INIT', (state, payload) => payload.datasource)
            .toReducer(),
        name: new ReducerBuilder()
            .add('INIT', (state, payload) => payload.name)
            .toReducer()
    },

    getInitialState({query}) {

        const name = query.name;

        const datasource = examples[name].map(item => {
            const Component = componentReq(`./${item.name}.jsx`);
            const code = codeReq(`./${item.name}.jsx`);

            return {
                ...item,
                ... {
                    exampleComponent: <Component />,
                    code
                }
            };
        });

        return {
            datasource,
            name
        };
    }

});

module.exports = ComponentsPage;
