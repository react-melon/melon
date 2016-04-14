/**
 * @file melon/region/mixin
 * @author cxtom(cxtom2010@gmail.com)
 */

export function selectAll(child) {

    child.selected = true;

    if (Array.isArray(child.children)) {
        child.children.forEach(selectAll);
    }

}

export function cancelAll(child) {

    child.selected = false;

    if (Array.isArray(child.children)) {
        child.children.forEach(cancelAll);
    }

}

export function parse(value, child, index) {

    if (value.indexOf(child.id) > -1) {
        child.selected = true;
    }

    if (Array.isArray(child.children)) {
        child.children = child.children.map(function (c, i) {
            return parse(value, c, i);
        });
    }

    return child;
}
export function isAllSelected(data) {

    if (!Array.isArray(data.children) || !(data.children.length > 0)) {
        return;
    }

    data.selected = data.children.reduce(
        function (result, child, index) {
            return result && child.selected;
        },
        true
    );

}
