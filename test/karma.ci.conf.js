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
                        browser_version: '55.0',
                        os: 'OS X',
                        os_version: 'Sierra'
                    },
                    bs_firefix_mac: {
                        base: 'BrowserStack',
                        os: 'OS X',
                        os_version: 'Sierra',
                        browser: 'firefox',
                        browser_version: '50.0'
                    },
                    bs_ie9_windows: {
                        base: 'BrowserStack',
                        browser: 'ie',
                        browser_version: '9.0',
                        os: 'Windows',
                        os_version: '7'
                    }
                },
                /* eslint-enable fecs-camelcase */

                browsers: [
                    'bs_chrome_mac',
                    'bs_firefix_mac'
                ],

                // if true, Karma captures browsers, runs the tests and exits
                singleRun: true
            }
        )
    );

};
