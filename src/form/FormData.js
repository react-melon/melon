/**
 * @file FormData
 * @author leon(ludafa@outlook.com)
 */

function FormData(form) {

    if (form) {
        return construct(form.getElements());
    }

    /**
     * 条目们
     *
     * @type {Array}
     */
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

        // TODO: add Image Button support

        if (tagName === 'INPUT' && type === 'image' || !name || !value) {
            continue;
        }

        // TODO: add file input support

        if (tagName === 'INPUT' && isBoxGroup) {
            value = value || 'on';
        }

        fd.append(name, value);

    }

    return fd;

}

/**
 * 添加字段
 *
 * @param {string} name 字段名
 * @param {string} value 字段值
 * @return {module:FormData}
 */
FormData.prototype.append = function (name, value) {
    this.entries.push({name: name, value: value});
    return this;
};

/**
 * 移除字段
 *
 * @param {string} name 字段名
 * @return {module:FormData}
 */
FormData.prototype.delete = function (name) {
    this.entries = this.entries.reduce(
        function (result, entry) {
            if (entry.name !== name) {
                result.push(entry);
            }
            return result;
        },
        []
    );
    return this;
};

/**
 * 获取首个字段值
 *
 * return the value of the first entry whose name is name, and null otherwise.
 *
 * @param {string} name 字段名
 * @return {string}
 */
FormData.prototype.get = function (name) {
    var entries = this.entries;
    for (var i = 0, len = entries.length; i < len; ++i) {
        if (name === entries[i].name) {
            return entries[i].value;
        }
    }
    return null;
};

/**
 * return the values of all entries whose name is name,
 * in list order, and the empty sequence otherwise.
 *
 * @param {string} name 字段名
 * @return {Array.string}
 */
FormData.prototype.getAll = function (name) {

    return this.entries.reduce(
        function (result, entry) {
            if (entry.name === name) {
                result.push(entry.value);
            }
            return result;
        },
        []
    );

};

/**
 * return true if there is an entry whose name is name, and false otherwise.
 *
 * @param {string} name 字段名
 * @return {boolean}
 */
FormData.prototype.has = function (name) {
    var entries = this.entries;
    for (var i = 0, len = entries.length; i < len; ++i) {
        if (name === entries[i].name) {
            return true;
        }
    }
    return false;
};

/**
 * 更新一个字段
 *
 * run these steps:
 * 1. Let entry be a new entry whose name is name, and value is value.
 * 2. If there are any entries in context object's list of entries whose name is name,
 *    replace the first such entry with entry and remove the others.
 * 3. Otherwise, append entry to context object's list of entries.
 *
 * @param {string} name 字段名
 * @param {string} value 字段值
 * @return {module:FormData}
 */
FormData.prototype.set = function (name, value) {
    return this.delete(name).append(name, value);
};

module.exports = FormData;
