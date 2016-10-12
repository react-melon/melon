/**
 * @file karma test config
 * @author cxtom <cxtom2008@gmail.com>
 */

var karmaConfig = require('./karma/config');

module.exports = function (config) {
    config.set(karmaConfig);
};
