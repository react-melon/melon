define('melon/region/helper', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var _ = require('underscore');
    var helper = {
        selectAll: function (child) {
            child.selected = true;
            _.isArray(child.children) && _.each(child.children, helper.selectAll);
        },
        cancelAll: function (child) {
            child.selected = false;
            _.isArray(child.children) && _.each(child.children, helper.cancelAll);
        },
        parse: function (value, child, index) {
            if (_.contains(value, child.id)) {
                child.selected;
            }
            child.selected = _.contains(value, child.id);
            if (_.isArray(child.children)) {
                child.children = _.map(child.children, helper.parse.bind(this, value));
            }
            return child;
        },
        isAllSelected: function (data) {
            if (!_.isArray(data.children) || !(data.children.length > 0)) {
                return;
            }
            data.selected = _.reduce(data.children, function (result, child, index) {
                return result && child.selected;
            }, true);
        }
    };
    module.exports = helper;
});