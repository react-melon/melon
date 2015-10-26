define('melon/form/FormData', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function FormData(form) {
        if (form) {
            return construct(form.getElements());
        }
        this.entries = [];
    }
    function construct(elements) {
        var fd = new FormData();
        for (var i = 0, len = elements.length; i < len; ++i) {
            var element = elements[i];
            var tagName = element.tagName;
            var type = element.type;
            var name = element.name;
            var value = element.value;
            var isBoxGroup = type === 'radio' || type === 'checkbox';
            if (element.disabled || tagName === 'BUTTON' && type !== 'submit') {
                continue;
            }
            if (tagName === 'INPUT' && isBoxGroup && !element.checked) {
                continue;
            }
            if (tagName === 'INPUT' && type === 'image' || !name || !value) {
                continue;
            }
            if (tagName === 'INPUT' && isBoxGroup) {
                value = value || 'on';
            }
            fd.append(name, value);
        }
        return fd;
    }
    FormData.prototype.append = function (name, value) {
        this.entries.push({
            name: name,
            value: value
        });
        return this;
    };
    FormData.prototype.delete = function (name) {
        this.entries = this.entries.reduce(function (result, entry) {
            if (entry.name !== name) {
                result.push(entry);
            }
            return result;
        }, []);
        return this;
    };
    FormData.prototype.get = function (name) {
        var entries = this.entries;
        for (var i = 0, len = entries.length; i < len; ++i) {
            if (name === entries[i].name) {
                return entries[i].value;
            }
        }
        return null;
    };
    FormData.prototype.getAll = function (name) {
        return this.entries.reduce(function (result, entry) {
            if (entry.name === name) {
                result.push(entry.value);
            }
            return result;
        }, []);
    };
    FormData.prototype.has = function (name) {
        var entries = this.entries;
        for (var i = 0, len = entries.length; i < len; ++i) {
            if (name === entries[i].name) {
                return true;
            }
        }
        return false;
    };
    FormData.prototype.set = function (name, value) {
        return this.delete(name).append(name, value);
    };
    module.exports = FormData;
});