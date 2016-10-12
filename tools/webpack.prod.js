/**
 * @file webpack 构建配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const config = Object.assign({}, require('./tool/webpack.common'), {

    entry: {
        main: ['./src/main.js'],

        // 基础库
        inf: [
            'react',
            'react-dom',
            'react-motion',
            'ei',
            'melon-calendar',
            'ajv',
            'melon-colorpicker',
            'melon-json-schema-form',
            'melon-json-schema-validator',
            'melon-split-pane',
            'melon-timepicker',
            'moment',
            'qrcode.react',
            'react-addons-update',
            'react-dnd',
            'react-dnd-html5-backend',
            'lodash'
        ]
    },

    output: {
        path: 'output',
        filename: 'asset/[name].[chunkhash:8].js'
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            include: /src|dep\/melon.*?/,
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'es2015-loose', 'react', 'stage-1'],
                plugins: [
                    ['transform-runtime', {
                        polyfill: false,
                        regenerator: false
                    }]
                ]
            }
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract(
                'style-loader',
                ['css-loader', 'stylus-loader?paths=node_modules&resolve url']
            )
        }, {
            test: /\.(svg|eot|ttf|woff|jpg|png)(\?.*)?$/,
            loader: 'file?name=asset/[name].[hash:5].[ext]'
        }, {
            test: /\.json(\?.*)?$/,
            loader: 'json'
        }]
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].[contenthash:5].css'),
        new HtmlWebpackPlugin({
            inject: true,
            templateContent: (function () {

                return fs
                    .readFileSync(
                        path.join(__dirname, '../index.html'),
                        'utf8'
                    )
                    .replace(/<!--@inject=([\w._-]+)-->/ig, function ($0, $1) {
                        return `<script src="${$1}"></script>`;
                    });

            })()
        }),
        new webpack.optimize.CommonsChunkPlugin('inf', 'asset/inf.[chunkhash:8].js'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin('2016 Baidu Inc. All Rights Reserved'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
        new webpack.IgnorePlugin(/locale/, /moment/)
    ]
});


module.exports = config;
