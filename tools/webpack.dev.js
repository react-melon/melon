/**
 * @file webpack 开发配置
 * @author cxtom <chenxiao07@baidu.com>
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const css = new ExtractTextPlugin('[name].[contenthash:5].css');

const config = {
    entry: [
        './src/main.js'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            // 处理 stylus
            {
                test: /\.styl$/,
                loader: css.extract(['css', 'stylus?paths=node_modules&resolve url&include css'])
            },
            // 处理 iconfont
            {
                test: /\.(svg|png|eot|ttf|woff(2)?)($|\?)/,
                loader: 'file'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json'
            },
            {
                test: /\.txt$/,
                loader: 'raw'
            }
        ]
    },
    // stylus loader 中引入 nib 库支持
    stylus: {
        'use': [require('nib')()],
        'import': ['~nib/lib/nib/index.styl']
    },
    output: {
        path: path.join(__dirname, '../asset'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.styl'],
        alias: {
            hljs: path.join(__dirname, '../dep/highlight')
        }
    },
    devtool: 'source-map',
    plugins: [
        css,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            templateContent: (function () {
                return fs
                    .readFileSync(
                        path.join(__dirname, '../index.html'),
                        'utf8'
                    );
            })(),
            filename: path.resolve(__dirname, '../asset/index.html')
        }),
        new webpack.IgnorePlugin(/locale/, /moment/),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        })
    ]
};


module.exports = config;
