/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

const karmaConfig = require('./karma.conf.js');

module.exports = function (config) {

    config.set(
        Object.assign(
            {},
            karmaConfig,
            {

                browserStack: {
                    username: 'leonlu2',
                    accessKey: 'ps6dvCJdxhJGWWSTrWM4'
                },

                /* eslint-disable fecs-camelcase */
                // define browsers
                customLaunchers: {
                    bs_chrome_mac: {
                        base: 'BrowserStack',
                        browser: 'chrome',
                        browser_version: '54.0',
                        os: 'OS X',
                        os_version: 'El Capitan'
                    }
                },
                /* eslint-enable fecs-camelcase */

                browsers: [
                    'bs_chrome_mac'
                ],

                // if true, Karma captures browsers, runs the tests and exits
                singleRun: true
            }
        )
    );

};
