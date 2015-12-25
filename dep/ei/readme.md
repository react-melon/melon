# efe isomorphic framework

[![Build Status](https://travis-ci.org/jinzhubaofu/ei.svg?branch=master)](https://travis-ci.org/jinzhubaofu/ei)
[![Coverage Status](https://coveralls.io/repos/jinzhubaofu/ei/badge.svg?branch=master&service=github)](https://coveralls.io/github/jinzhubaofu/ei?branch=master)

简洁的flux同构框架

## 特点

+ 同构，同时支持node/browser，one world one code
+ 支持多页面网站应用化 / 单页面网站服务器预渲染
+ 简单易懂的函数式编程思维管理你的store
+ 提供更好的领域划分，避免flux模式中不良编码模式

## 术语

### Store

在`ei`中，`store`是一个页面中全部的数据。

### State

在`ei`中，`state`是指`store`在某一时刻的状态。所以，`state`也就是页面中所有的数据。一般来讲是一个`Object`或者是一个`key-value`的集合。但理论上来说，它可以是你想要任何一种数据类型。

我们会将`state`传递给`react`，作为`react`组件的数据来使用；通过`react`组件的翻译，数据将被转化为DOM，最终成为可见、可交互的页面。

### Action

`Action`是一个数据包裹，用来描述系统内一个事件。比如，用户点击一个添加按钮，可以通过下面这个`action`来描述：

```js

{
    type: 'ADD'
}

```

完成了一个ajax请求，可以被描述为：

```js

{
    type: 'AJAX_SUCCEED',
    data: {
        // all the data from the datasource
    }
}

```

基于这样的约定，我们可以把页面理解成一个持续产生`action`的事件流系统。每个行为都会对我们页面中当前的`state`造成一定影响，使其发生变化。因此，我们每个时刻的`state`都可以理解为之前所有的`action`的积累。

### reducer

基于前边两个概念我们可以知道，版本1`state`在一个`action`的作用下会转变成版本2`state`，这个过程我们称之为`reduce`（归并）。我们当然希望`reduce`的过程由我们自己来掌握，在`ei`中抽象为`reducer`。

我们可给出一个非常简洁的函数原型来描述这个过程：

```js

var state2 = reducer(state1, action);

```


> 我们非常希望可以通过 `state1` === `state2` 这种简单的方法来判断数据是否发生了变化，只要（只有）数据发生变化，我们才会通知`view`(react)来完成视图上的更新。

> 因此，这里非常适合使用`Immutable`数据结构来管理`state`。

> 这种行为在`ei`中是默认行为，`ei`会自动`state1` === `state2`的方式来检测`state`的变化，并将变化即时地通知给`react`。

> 如果你的视图不更新了，那么请检查`reduce`返回的结果是不是同一个对象。请确保当数据需要发生变化时 `state1` !== `state2`。

由于，`ei`中所有的数据都存放在`state`中，因此我们只需要一个顶级的`reducer`就作为入口即可。

我们设计的`reducer`是一个纯函数，我们可以非常容易地进行组合完成复杂的业务逻辑，比如这样：

```js

var add = function (state, action) {

    return state + 1;

};

var minus = function (state, action) {

    return state - 1;

};

var reducer = function (state, action) {

    switch (action.type) {

        case 'ADD':

            return add(state, action);

        case 'MINUS':

            return minus(state, action);


    }

};

```

因此，我们不再需要`flux`中`store`在`register`回调中使用`dispatcher.waitFor`方法来完成依赖，我们只需要按逻辑执行不同的子`reducer`即可。举个例子：

```js

var a = function (state, action) {
    // some operation on state according to action;
    return state;
};

var needWaitForA = function (state, action) {
    // some operation on state according to action;
    return state;
};

var reducer = function (state, action) {

    state = a(state, action);

    state = needWaitForA(state, action);

    return state;

};

```


> 实际上，我们还可以把这样的系统理解为一个`有限状态自动机`，每一个`action`可以理解为一个输入，而`reducer`则是状态转移函数。

### dispatch

为了使 `state` / `action` / `reducer`可以结合在一起正常工作，我们引入了`dispatch`。 `dispatch`用来连接 `state` / `action`/ `reducer`。

当系统接收到一个`action`时，我们找到`store`，取得它的当前`state`，再将`state`和`action`传入`reducer`。最后，将`reducer`的返回结果写回到`store`中。

`dispatch`可以接收两种数据结构。第一种是传入一个`action`，这非常容易理解，正是我们想要的。另一种情况是传入一个函数，这是为了支持异步操作。

当传入`dispatch`的是一个函数中，这个函数会得到两个参数，分别是`dispatch`和`state`。也就是说在这个函数中，既可以得到所有的数据，也可以多次`dispatch`动作。

举个例子，

```js

dispatch(function (dispatch, state) {

    dispatch({
        type: 'AJAX_START'
    });

    http
        .get(
            '/some/data/from/any/datasource',
            {
                query: state.someData
            }
        )
        .then(
            function (data) {
                dispatch({
                    type: 'AJAX_SUCCEED',
                    data: data
                });
            },
            function (error) {
                dispatch({
                    type: 'AJAX_FAILED',
                    error: error
                });
            }
        );

});

```

可以看到，在这一次`dispatch`过程中，实际上派发了多个`action`。因此，我们可以通过`reducer`来调整`state`，从而在视图上给用户良好的反馈。

### ActionCreator

出于重复利用`action`的目的，我们提出`ActionCreator`的概念。每个`ActionCreator`是一种`action`的工厂(action factory)。

这它是一个函数，接收的参数格式不限，但返回值必须是一个`action`或者是一个`function`。

举个例子

```js

function syncAddActionCreator(count) {

    return {
        type: 'SYNC_ADD',
        data: count
    };

}

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        dispatch({
            type: 'AJAX_START'
        });

        http
            .get(
                '/some/data/from/any/datasource',
                {
                    query: state.someData
                }
            )
            .then(
                function (data) {
                    dispatch({
                        type: 'AJAX_SUCCEED',
                        data: data
                    });
                },
                function (error) {
                    dispatch({
                        type: 'AJAX_FAILED',
                        error: error
                    });
                }
            );

    };

}

var syncAddAction = syncAddActionCreator(count);
var asyncAddAction = asyncAddActionCreator(count);

```

同样，`ActionCreator`是一个函数，它也很容易进行封装或者组合，比如：

```js

function doA(count) {

    return {
        type: 'DO_A',
        data: count
    };

}

function doB(count) {

    return function (dispatch, state) {

        dispatch({
            type: 'DO_B'
        });

        dispatch(doA(count));

    };

}

```


### Context

把上边所有的`dispatch` / `reducer` / `store`(`state`) 概念结合在一起，就是`Context`。`Context`的实例数据结构包括了以下内容：

```js

// Context instance
{

    // 归并(状态转移)函数
    reducer: function () {

    },

    // 实际上store可以是任何类似的值
    store: {

    },

    // 派发函数
    dispatch: function () {

    }

}

```

`Context`实例不是单例的，每个页面中应当包含有一个。 这样的设计是为了支持在服务器端使用`ei`。我们知道在服务器端，可以同时处理多个http请求。那么一定需要同时存在多个`Context`的实例，并且彼此相互隔离。

### Page

这是`ei`对页面的抽象。实际上，`Page`是Web网站最基本的概念。每次用户发起一个浏览页面的http请求，我们都应当为他响应一个页面。

即使是在spa(single page application，单页面应用)中，其为用户提供的基本感知还是一个基于多个页面的程序，只不过这些页面是虚拟的。

`ei`所提供的`Page`是同构的，它既可以在服务器端渲染成了一段html，也可以成为在spa应用中的一个虚拟页面。

`ei`也提供了基础的spa支持。详见[App](#App)

实际上，在`ei`中`Page`和`Context`一对一的关系，既一个`Page`实例持有一个`Context`实例。

### App

在`ei`中，`App`是一个应用的概念。`ei`的`App`是同构的，在服务器端可以以html格式输出多个页面，也可以在浏览器端内实现spa。

我们可以这样得到一个`App`实例：

```js

var ei = require('ei');

var app = ei({

    routes: [{
        path: '/a',
        page: 'iso/IndexPage'
    }]

});

```

可以在服务器端绑定到一个`express`应用上，例如：

```js

var express = require('express');
var ei = require('ei');

var app = express();

var eiApp = ei({

    // 路由配置
    // 在调用eiApp.execute(request)对请求进行处理时，
    // 首先会使用此处设定的path进行路由匹配，找到相应的Page来进行下一步的处理
    // 如果路由配置不存在，则Promise会进入reject状态
    routes: [{
        path: '/a',
        page: 'iso/IndexPage',
        template: 'some/template'
    }]

});

app.use(function (req, res, next) {

    eiApp
        .execute(req)
        .then(function (result) {

            // result的结构是这样的
            {
                // 路由配置
                route: route,

                // 当前的页面
                page: page

            }

            // 可以从page中取出所有的数据
            var state = page.getState();

            // 还可以把page渲染成html
            var html = page.renderToString();


            // 如果请求是ajax，那么可以直接以state作为响应
            if (req.xhr) {
                res.status(200).send(state);
                return
            }

            // 如果不是ajax，那可以输出为一段html
            // 这样可以灵活地将page的内容输出到指定的位置
            // 还可以灵活地输出同步数据, 比如这样
            // <script>window.data = {%data|json%}</script>
            res.render(route.template, {

                html: html,

                data: data

            });

        }, function (error) {

            // 在整个处理过程中，发生任何错误都会在此处回调，以供处理

        });

});

```

或者在浏览器端使用，例如：

```js

var ei = require('ei');

var app = ei({

    // 在浏览器端需要指定一个main元素，作为react渲染的根结点
    main: document.getElementById('app'),

    // 与服器端同一样的路由配置
    routes: [{
        path: '/a',
        page: 'iso/IndexPage',
        template: 'some/template'
    }]

});


var data = window.data;

// 直接使用同步数据进行初始化
// 此时，app会接管window.onpopstate事件，
// 浏览器在前进/后退时会把当前的url转化为一个`request`对象
// 与服务器端相同，使用app.execute(request)对其进行处理
// 此时一个多页面网站就成功地转化成了一个spa网站
app.bootstrap(data);

window.data = null;

```

### Resource

`Resource`是对系统外部资源的一种描述。通常我们会在`ActionCreator`中使用它，例如：


```js

var countResource = require('resource/count');

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        countResource
            .add(count)
            .then(function () {

                dispatch({
                    type: 'ADD_SUCCEED'
                });

            }, function () {

                dispatch({
                    type: 'ADD_FAILED'
                });

            });

    };

}

```

除了通过这种抽象，我们可以重复利用这些资源之外，更重要的是我们需要通过`Resource`的概念来解除服务器端与浏览器端对资源需求的差异。

我们都知道在浏览器上我们可以使用的资源是有限制的，一般是通过`http` / `socket`两种方式。而在服务器端，可使用的资源，比如 `redis` / `mongodb` / `mysql` / `file system` 以及各种各样的基于 http / tcp 的数据服务器。这是一个基本的事实是浏览器端与服务器端无法抹平的差异。但是我们的业务代码需要同时运行在浏览器端与服务器端，那么我们必须解决这个问题。

这里我们通过`Resource`的**依赖注入、控制反转**来解决这个问题，将对模块的依赖，转化为对一个资源标识符的依赖。举个例子：

```js

// 同构的 CountActionCreator

var Resource = require('ei').Resource;

function asyncAddActionCreator(count) {

    return function (dispatch, state) {

        Resource.get('count')
            .add(count)
            .then(function () {

                dispatch({
                    type: 'ADD_SUCCEED'
                });

            }, function () {

                dispatch({
                    type: 'ADD_FAILED'
                });

            });

    };

}

// CountResource on client

var Resource = require('ei').Resource;

Resource.register('count', {

    add: function (count) {

        return ajax(count);

    }

});

// CountResource on server

Resource.register('count', {

    add: function (count) {

        return mysql.query('DO WHATEVER YOU NEED');

    }

});

```


## 与React相关

### child context 机制

这是`React`的一个隐藏功能，官网上并没有它的明确文档。原因是目前的实现机制并不理想，不久的将来将会被替换成另一个机制。

这里提到的两种机制是：

1. 基于`owner`的context机制
2. 基于`parent`的context机制

目前的实现机制是第1种，将会被替换成第2种。`React`在开发模式中会对这两种模式进行检查，一个组件的`owner`和`parent`不一致，并且使用了`context`，那么你会得到一条警告。也就是说，目前我们可以做到的最好情况就是使ReactElement的`owner`与`parent`保持一致。

> owner 是创建这个ReactElement的ReactElement

> parent 是指在DOM层级上的parentNode

> 更多的资料可以[看这里](https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html)

如果没有context，那我们会遇到一个非常麻烦的问题：组件的数据，必须在父级组件通过`props`来传递。这样就导致父级组件需要知道所有的数据，并且一层一层地传递下去。

通过context机制，我们可以非常容易地取到最顶层组件的数据，中间的任意多层组件都不需要关心数据是如何传递了。`ei`中就是通过context机制来解决数据逐层传递的问题的。

但是`React`对context的使用提出了要求，第一点：

必须明确地声明一个可以提供context的组件，并且要求它必须描述它能提供的context类型，同时实现获取context的函数，即：

```js

var ContextProvider = React.createClass({

    // 必须有
    childContextTypes: {
        context: React.propTypes.object.isRequired
    },

    // 必须有
    getChildContext: function () {
        return {
            context: {}
        };
    },

    render: function () {}

});


```


第二点：使用context的组件也必须明确地描述contextTypes，即：

```js

var ContextUser = React.createClass({

    contextTypes: {
        context: React.propTypes.object.isRequired
    },

    render: function () {}

});

```

对，就是这样的喵。

这个我们可以通过两个`mixin`来解决，比如contextProviderMixin和contextUserMixin，但是`ei`使用的是[higher order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)的方法。`ei`提供了两个组件，`ContextProvider`和`ContextConnector`分别替代`contextProviderMixin`和`contextUserMixin`。 下边我们分别描述一下：

### `ContextProvider`

`ContextProvider`是由`ei`提供的上下文提供包装组件，大概的原理是这样的：

```js


// 假设这个是你的顶层组件
var YourTopLevelComponent = React.createClass({

    render: function () {}

});

// `ei`的`ContextProvider`简化版本
var ContextProvider = React.createClass({

    // 必须有
    childContextTypes: {
        context: React.propTypes.object.isRequired
    },

    // 必须有
    getChildContext: function () {
        return {
            // 这个是你想要共享的context，它来自输入参数
            context: this.props.context
        };
    },

    render: function () {
        // 这里这么做是为了避免我们前边刚刚讲到的`owner`与`parent`不一致的问题
        return this.props.children();
    }

});

// 在生成ReactElement时，是这样的

var element = React.createElement(

    ContextProvider,
    {
        // 这个会被作为context提供给子组件使用
        context: {}
    },
    // 这里这么做的原因是为了避免我们前边刚刚讲到的`owner`与`parent`不一致的问题
    function () {
        return React.createElement(YourTopLevelComponent);
    }
);

```

当然，在`ei`中，我们不需要大家来写这些代码，只需要这样做就可以了：

```js

var ei = require('ei');

var IndexPage = ei.Page.extend({

    // `ei`会自动对`view`进行`ContextProvider`包装，提供完整的`ei`上下文
    // 通过`ei`的上下文，可以完成从`store`取数据和`dispatch`动作
    view: React.createClass({

        render: function () {}

    }),

    // 你的reducer在这里
    reducer: function () {}

    // 你只需要关注上边这两个属性

});

```

### `ContextConnector`

前边我们讲了如何提供上下文，接下来我们讲一下如何访问上下文

其实原理是类似的，也是通过封装组件的方式完成的。

在`ei`中可以很方便地将一个野生组件转化为可以使用上下文的组件：

```js

var ei = require('ei');

var Hello = React.createClass({

    render: function () {

        return (

            // 我们绑定的`ActionCreator`
            // 点击时我们就可以派发动作了
            <div onClick={this.props.add}>

                // 我们选取的数据
                {this.props.name}

            </div>

        );

    }

});

var selector = {

    // 选取`store`中的属性`name`，注入到Hello的props中
    name: function (store) {
        return store.name;
    }

};

var actions = {

    // 这是一个`ActionCreator`
    // 在Hello被实例化为，这个`ActionCreator`将成为`Hello`的`props.add`
    // 执行这个方法，将会将返回的动作派发给`reducer`
    add: function () {

        return {
            type: 'ADD'
        };

    }

};

// 只需要在这里使用`ei`提供的`connect`方法即可
Hello = ei.connect(
    Hello,
    selectors,
    actions
);

module.exports = Hello;

```


## 编码建议

### 目录安排

我们建议在src目录下使用这样的一个目录安排：

```

- dep          // 存放client端依赖包
- node_modules // 存放server端依赖包
- src
    - client   // 此目录下存放浏览器代码，Client Resource / 启动脚本等
    - server   // 此目录下存放服务器代码，Server Resource / server(express) / server模板 / server配置
    - iso      // 此目录下存放同构代码，Page / Component / Reducer

```

## 注意事项

`ei` 需要以下 shim 支持

1. es5
2. promise

### cjs or amd?

由于`nodejs`和浏览器上对于脚本资源获取方式上存在巨大不同，所以我们习惯上是在`nodejs`使用cjs格式的模块，而在浏览器端我们习惯使用amd格式的模块。

我们建议全部使用cjs的格式编写源码，通过构建工具将client和iso目录下所有的源码从cjs包装成amd格式（这个非常简单，因为amd规范中强调了需要支持cjs格式，所以常见的amd加载器[requirejs](http://requirejs.org/)和[esl](https://github.com/ecomfe/esl)都只需要将cjs代码包装一下define函数，就可以完美使用了）

### 依赖包的选取

建议直接选取可以同时运行在client/server端的依赖包，例如

1. http请求：axios / superagent
2. promise：es6-promise
3. 日志: ei-logger


### 相关链接

[api文档](http://jinzhubaofu.github.io/ei/api)

[测试覆盖率](http://jinzhubaofu.github.io/ei/coverage/lcov-report/index.html)

### thanks & Inspired

[react](https://github.com/facebook/react)
[flux](https://github.com/facebook/flux)
[redux](https://github.com/gaearon/redux)
[ReactiveX](http://reactivex.io/)
