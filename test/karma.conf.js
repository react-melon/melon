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
        'test/components/**/*.spec.js'
    ],

    browsers: [
        // 'Firefox',
        'Chrome'
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
                },
                {
                    test: /\.styl$/,
                    loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url']
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2|jpg|png)(\?.*)?$/,
                    loader: 'file?name=asset/[name].[ext]'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css'
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
    reporters: ['coverage', 'spec'],

    // plugins: [
    //     'karma-jasmine',
    //     'karma-jasmine-expect-jsx',
    //     'karam-webpack',
    //     'karam-coverage',
    //     'karam-soucemap',
    //     'karma-spec-reporter'
    // ],
    //
    specReporter: {
        maxLogLines: 5,             // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        suppressFailed: true,      // do not print information about failed tests
        suppressPassed: true,      // do not print information about passed tests
        suppressSkipped: true,      // do not print information about skipped tests
        showSpecTiming: true,      // print the time elapsed for each spec
        failFast: true              // test would finish with error when a first fail occurs.
    },

    coverageReporter: {
        dir: path.join(__dirname, './coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcov', subdir: 'lcov'}
        ]
    }

};
