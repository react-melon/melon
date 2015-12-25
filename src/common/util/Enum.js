/**
 * @file 枚举类
 * @author leon(ludafa@outlook.com)
 */

export class EnumSymbol {

    constructor(name, {value, description}) {

        this.name = name;

        if (value != null) {
            this.value = value;
        }

        if (description) {
            this.description = description;
        }

        Object.freeze(this);

    }

    toString() {
        return this.description || this.name;
    }

    valueOf() {
        return this.value;
    }

}

export class Enum {

    constructor(enumLiterals) {

        for (let key in enumLiterals) {

            if (!enumLiterals[key]) {
                throw new TypeError('each enum should have been initialized with atleast empty {} value');
            }

            this[key] =  new EnumSymbol(key, enumLiterals[key]);

        }

        Object.freeze(this);
    }

    keys() {
        return Object.keys(this);
    }

    contains(key) {
        return !!this[key];
    }

}

export default Enum;
