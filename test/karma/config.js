/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

var path = require('path');

var NODE_MODULES_FILES = '**/node_modules/**';


var babelOpts = {
    presets: [
        ['es2015', {loose: true}],
        'react',
        'stage-2'
    ],
    plugins: [
        'transform-es3-property-literals',
        'transform-es3-member-expression-literals'
    ],
    ignore: [NODE_MODULES_FILES]
};


module.exports = {

    basePath: path.join(__dirname, '../../'),

    frameworks: ['browserify', 'jasmine'],

    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js'
    ],

    browsers: ['Chrome'],

    preprocessors: {
        './test/**/*.spec.js': ['browserify'],
        './test/*.js': ['browserify'],
        './src/*.js': ['browserify', 'coverage']
    },

    browserify: {
        debug: true,
        paths: ['./src/*.js', './test/**/**.spec.js'],

        transform: [

            ['babelify', babelOpts],

            ['browserify-istanbul', {
                instrumenter: require('babel-istanbul'),
                instrumenterConfig: {
                    babel: babelOpts
                },
                ignore: [
                    NODE_MODULES_FILES
                ]
            }]
        ],
        extensions: ['.js']
    },
    // logLevel: config.LOG_DEBUG,
    reporters: ['progress', 'coverage', 'dots'],
    coverageReporter: {
        dir: path.join(__dirname, '../../coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcovonly', subdir: 'lcov'}
        ]
    },
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

};
