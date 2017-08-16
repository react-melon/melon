/**
 * @file webpack 开发配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = process.env.PORT || 9000;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MarkdownItAnchor = require('markdown-it-anchor');

module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${port}`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../example/index.js')
        ]
    },
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            melon: path.join(__dirname, '../src')
        }
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
                            },
                            use: [
                                [
                                    MarkdownItAnchor,
                                    {
                                        level: 1,
                                        permalink: true,
                                        permalinkBefore: true,
                                        slugify(title) {
                                            return title.replace(/ /g, '_');
                                        }
                                    }
                                ]
                            ]
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            ignoreOrder: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'melon',
            template: path.join(__dirname, '../example/index.html')
        })
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        compress: true,
        historyApiFallback: true,
        port,
        hot: true,
        inline: true
    }
};
