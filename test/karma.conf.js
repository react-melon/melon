/**
 * @file karma test common config
 * @author ludafa <ludafa@outlook.com>
 */

const path = require('path');

module.exports = {

    basePath: path.join(__dirname, '../'),

    frameworks: [
        'jasmine',
        'jasmine-expect-jsx'
    ],

    files: [
        // 'test/components/Toggle.spec.js'
        'test/components/**/*.spec.js'
    ],

    browsers: [
        'Chrome',
        'Firefox'
    ],

    preprocessors: {
        'src/**/*.js': ['coverage', 'sourcemap'],
        'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loaders: ['json']
                }
            ]
        },
        devtool: 'inline-source-map',
        externals: {
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'react/addons': true
        }
    },

    webpackMiddleware: {
        stats: 'errors-only'
    },

    autoWatch: true,

    // logLevel: config.LOG_DEBUG,
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: path.join(__dirname, './coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcov', subdir: 'lcov'}
        ]
    }

};
