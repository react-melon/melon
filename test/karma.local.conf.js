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
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: false
            }
        )
    );
};
