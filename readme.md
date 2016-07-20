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

1. npm i melon --save
2. melon 中的样式使用的是 stylus，需要在 `webpack.config.js` 中配置`.styl`为后缀的 loader。

    ```javascript
    loaders: [{
        test: /\.styl$/,
        loader: 'style!css!stylus?paths=node_modules&resolve url'
    }]
    ```
    
    `paths=node_modules`指定 stylus 文件的寻找范围，`resolve url`用于将 melon 中相对路径资源转换为绝对路径资源。

3. 在 `webpack.config.js` 中增加字体文件的配置。

    ```javascript
    loaders: [{
        test: /\.(svg|eot|ttf|woff)(\?.*)?$/,
        loader: 'file'
    }]
    ```

4. melon 中使用到了 nib，所以还需要将 nib 添加到 stylus 的插件中。npm i nib --save-dev

    ```javascript
    stylus: {
        use: [require('nib')()]
    }
    ```

5. 安装对应的 loader 包，npm i stylus stylus-loader css-loader style-loader file-loader --save-dev

6. 在页面中引入需要的 melon 组件。

    ```javascript
    import Button from 'melon/Button';
    ```

7. 然后引入 melon 组件的样式文件。将 melon 组件的样式组织在一个入口样式文件中，如 `index.styl`。

    ```stylus
    @require 'melon/css/theme/default/index.styl';
    @require 'melon/css/Button.styl';
    ```

    ```javascript
    import './index.styl';
    ```

    其中主题样式文件是必选的，然后需要用到什么组件，就引入相应的组件样式。

    最后就可以查看效果了，[具体使用示例参考这里](https://github.com/Sheetaa/melon-webpack-demo)。
