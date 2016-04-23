/**
 * @file Reducer 构建小工具
 * @author leon(ludafa@outlook.com)
 */

class ReducerBuilder {

    constructor() {
        this.reducers = {};
    }

    add(type, reducer) {

        const types = [].concat(type);

        const {reducers} = this;

        types.reduce(
            (reducers, type) => {
                if (this.reducers[type]) {
                    throw new Error(`${type} has already been added to ReducerBuilder`);
                }

                this.reducers[type] = reducer;
            },
            reducers
        );

        return this;
    }

    remove(type) {

        const types = [].concat(type);
        const {reducers} = this;

        this.reducers = Object.keys(reducers).reduce(
            (fitleredReducers, type) => {
                if (types.indexOf(type) !== -1) {
                    fitleredReducers[type] = reducers[type];
                }
                return fitleredReducers;
            },
            {}
        );

        return this;
    }

    replace(type, reducer) {
        this.remove(type);
        this.add(type, reducer);
        return this;
    }

    clearAll() {
        this.reducers = {};
    }

    toReducer() {

        // 这里呢，做一次浅拷贝，让已生成的 reducer 不被后续的修改干扰
        const reducers = {
            ...this.reducers
        };

        return (state, action) => {

            const {type, payload} = action;
            const handler = reducers[type];

            if (handler == null) {
                return state;
            }

            return typeof handler === 'function'
                ? handler(state, payload, action)
                : handler;

        };

    }

}


export default ReducerBuilder;
