# melon [![Coverage Status](https://coveralls.io/repos/github/react-melon/melon/badge.svg?branch=)](https://coveralls.io/github/react-melon/melon?branch=) [![Version](https://img.shields.io/npm/v/melon.svg)](https://www.npmjs.com/package/melon)

A Set of React Components that Implement Google's Material Design

## Install

```
bower install melon
```

## Melon Family

![image](http://boscdn.bpc.baidu.com/mms-res/react-melon/melon/melonFamily.png "melon-family")

### Components

* **melon**
    * BoxGroup
    * Breadcrumb
    * Button
    * Dialog
    * Drawer
    * Grid
    * Icon
    * Pager
    * Progress
    * Region
    * ScrollView
    * Select
    * Slider
    * SnackBar
    * Table
    * Tabs
    * TextBox
    * Tree
    * Tooltip
    * Uploader
    * Zippy

* **melon-calendar**
    * Calenadr
    * RangeCalendar
    * UnitCalendar

* **melon-wise**
    * MonthPicker
    * EnhancedSelect
    * ListView
    * Popup
    * CSSTransitionGroup

## Demos

[http://react-melon.github.io/melon](http://react-melon.github.io/melon)

## Compatible for ie8

You need use `es5-shim` 和 `es5-sham` on `ie8`

see `es5-shim` `es5-sham` [es5-shim](https://github.com/es-shims/es5-shim)

## 如何在 webpack 中使用 melon

1. 安装依赖

    ```sh
    
    # melon
    npm i melon --save
    
    # 编译 melon 样式的依赖
    npm i stylus-loader file-loader stylus nib css-loader style-loader --save-dev
    
    ```
    
2. 配置 `webpack`:

    在 `webpack` 中添加以下配置

    ```javascript
    
    const nib = require('nib');
    
    module.exports = {
        loaders: [
            // 处理 stylus
            {
                test: /\.styl$/,
                loader: 'style!css!stylus?paths=node_modules&resolve url'
            }, 
            // 处理 iconfont
            {
                test: /\.(svg|eot|ttf|woff)(\?.*)?$/,
                loader: 'file'
            }
        ],
        // stylus loader 中引入 nib 库支持
        stylus: {
            use: [require('nib')()]
        }
    };
    
    ```
    
    其中，`stylus` 的参数中的 `paths=node_modules`指定 stylus 文件的寻找范围，`resolve url`用于将 melon 中相对路径资源转换为绝对路径资源。


3. 使用一个 `stylus` 文件来引入业务所需要的 melon 样式文件。

    将 melon 组件的样式组织在一个入口样式文件中，比如 `${YOUR_PROJECT}/src/melon.styl`。

    ```stylus
    
    // 主题必须引入
    @require 'melon/css/theme/default/index.styl';
    
    // 其他组件按需引入
    @require 'melon/css/Button.styl';
    
    ```
    其中主题样式文件是必选的，然后需要用到什么组件，就引入相应的组件样式。

4. 在合适的 js 中引入需要的 melon 组件：

    ```js
    
    // 加载样式
    import './melon.styl';
    
    // 加载组件
    import Button from 'melon/Button';
    
    export default function App(props) {
        
        return (
            <Button>melon button</Button>
        );
    
    }
    
    ```
    
经过以上步骤就完成了 melon 的引入了。另外，还可以参考这个 [demo repo](https://github.com/Sheetaa/melon-webpack-demo)。
