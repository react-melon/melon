define('ei/events', [
    'require',
    'exports',
    'module',
    './Emitter'
], function (require, exports, module) {
    var Emitter = require('./Emitter');
    var events = {};
    module.exports = Emitter.enable(events);
});