/**
 * @file karma test config
 * @author cxtom <cxtom2008@gmail.com>
 */

var NODE_MODULES_FILES = '**/node_modules/**';


var babelOpts = {
    presets: ['es2015', 'react', 'stage-1'],
    plugins: [
        'transform-es3-property-literals',
        'transform-es3-member-expression-literals'
    ],
    ignore: [NODE_MODULES_FILES]
};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha'],
        files: [
            './test/components/*.spec.js',
            './test/components/**/*.spec.js'
        ],
        browsers: process.env.NODE_ENV === 'test' ? ['PhantomJS'] : ['Chrome', 'Firefox'],
        preprocessors: {
            './test/components/*.spec.js': ['browserify'],
            './test/components/**/*.spec.js': ['browserify'],
            './src/*.js': ['browserify', 'coverage']
        },

        browserify: {
            debug: true,
            paths: ['./src/*.js', './test/components/**.spec.js'],

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
        reporters: ['progress', 'coverage', 'mocha'],
        coverageReporter: {
            dir: './coverage',
            reporters: [
                // reporters not supporting the `file` property
                {type: 'html'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    });
};
