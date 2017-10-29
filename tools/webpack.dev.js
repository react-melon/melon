/**
 * @file webpack 开发配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = Object.assign({}, require('./webpack.common'), {

    entry: {
        index: path.join(__dirname, '../example/index.js')
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: [
                'babel'
            ],
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url&include css']
        }, {
            test: /\.(svg|eot|ttf|woff|woff2|jpg|png)(\?.*)?$/,
            loader: 'file?name=asset/[name].[ext]'
        }, {
            test: /\.json(\?.*)?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },

    output: {
        path: path.resolve(__dirname, '../asset'),
        publicPath: '/',
        filename: '[name].js'
    },

    cache: true,

    debug: true,

    devtool: 'eval-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../asset/inf-manifest.json')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            templateContent: (function () {
                return fs
                    .readFileSync(
                        path.join(__dirname, '../example/index.html'),
                        'utf8'
                    )
                    .replace(/<!--@inject=([\w._-]+)-->/ig, function ($0, $1) {
                        return `<script src="/asset/${$1}"></script>`;
                    });
            })()
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
        new webpack.IgnorePlugin(/locale/, /moment/)
    ],
    devServer: {
        host: 'localhost',
        port: 8080
    }

});


module.exports = config;
