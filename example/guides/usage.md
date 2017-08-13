## 使用

### 一次性加载全部 san-mui 组件

```js
// 引入全部组件，从中选取需要的组件
import {Button, DatePicker, Uploader} from 'melon';

// 引入全部样式
import 'melon/index.css';
```

### 只引入部分的组件

```js
// 只引入 Button 和它需要的样式文件
import Button from 'melon/Button';
// 引入对应的 stylus 样式
import 'melon/css/Button.styl';
// 或者引入对应的 css 样式
import 'san-mui/lib/Button.css';
```

> 为了保证单独的 css 的完整性，我们每个 css 都包含了它的依赖样式。
>
> 所以，如果你使用了多个 melon 组件并且单独引入它们对应的 css 可能会有重复的 css。我们不建议直接使用 .css 文件，建议使用 stylus 文件。

## 在 webpack 中使用 melon

在目前流行的构建工具 webpack 可以很容易地使用 melon。

由于 san-mui 内置了 material-design 的字体，除了必要的 js / css loader 之外，还需要一个 `file-loader` 来支持。

如果你使用 `stylus` 样式，那么还需要添加 `stylus-loader` 和 `nib`;

```sh
npm install --save-dev stylus-loader nib
```

Webpack2 配置文件示例：

```js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../example/index.js')
        ]
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../public'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'stylus-loader',
                                options: {
                                    'paths': 'node_modules',
                                    'resolve url': true,
                                    'include css': true
                                }
                            }
                        ]
                    })
                )
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'rct-md-loader',
                        options: {
                            codeBlock: {
                                loader: 'babel-loader',
                                props: {
                                    className: 'markdown-body'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg|png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '200.html',
            title: 'melon',
            template: path.join(__dirname, '../example/index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'index',
            template: path.join(__dirname, '../example/index.html')
        })
    ]
};
```

## 更多示例

我们提供了一个简易的 demo 供大家参考：[demo repo](https://github.com/Sheetaa/melon-webpack-demo)

关于更多组件的使用请参考[组件](/components/Button)
