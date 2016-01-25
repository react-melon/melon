/**
 * @file Components - ComponentsPage
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ei from 'ei';
import {Promise} from 'es6-promise';

import pageDispatchEvent from '../common/middleware/pageDispatchEvent';
import asyncAction from '../common/middleware/asyncAction';
import logger from '../common/middleware/logger';

import ReducerBuilder from '../common/util/ReducerBuilder';

import examples from './conf/examples';
import _ from 'underscore';

const ComponentsPage = ei.Page.extend({

    middlewares: [asyncAction, pageDispatchEvent, logger],

    view: require('./ComponentView'),

    reducer: {
        datasource: new ReducerBuilder()
            .add('INIT', (state, payload) => payload.datasource)
            .toReducer(),
        name: new ReducerBuilder()
            .add('INIT', (state, payload) => payload.name)
            .toReducer()
    },

    getInitialState(request) {

        const {query} = request;
        const {name} = query;

        return new Promise((resolve, reject) => {

            let requireList = _.map(examples[name], function (item) {
                return 'components/examples/' + item.name;
            });

            require(requireList, function () {
                let Components = _.toArray(arguments);
                resolve(
                    _.map(Components, (Component, index) => {

                        return {
                            ...examples[name][index],
                            ... {
                                exampleComponent: React.createElement(Component)
                            }
                        };
                    })
                );
            });

        })
        .then(function (list) {

            return new Promise((resolve, reject) => {

                const requireList = _.map(examples[name], function (item) {
                    return 'components/code/' + item.name + '.txt';
                });

                require(requireList, function () {

                    let codes = _.toArray(arguments);

                    resolve(
                        _.map(codes, (code, index) => {

                            return {
                                ...list[index],
                                ... {
                                    code: unescape(code)
                                }
                            };
                        })
                    );
                });

            });

        })
        .then(function (list) {

            return {
                datasource: list,
                name
            };
        });
    }

});

export default ComponentsPage;
