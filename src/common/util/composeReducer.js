/**
 * @file common/util/composeReducer
 * @author leon(ludafa@outlook.com)
 */

export default function (...reducers) {

    return function (state, action) {

        return reducers.reduce(
            (state, reducer) => {

                // 如果reducer不是一个函数
                // 那么应该是{ SOME_ACTION_NAME: function reducer() {}}的格式
                if (typeof reducer !== 'function') {

                    // 那么找一下相应的reducer
                    let {type} = action;

                    reducer = reducer[type];

                }

                // 如果reducer是一个函数，直接调用它
                // 找到就执行
                if (typeof reducer === 'function') {
                    return reducer(state, action.payload, action);
                }

                // 否则就拉倒
                return state;

            },
            state
        );

    };


}
