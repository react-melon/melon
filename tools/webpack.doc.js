/**
 * @file webpack 开发配置
 * @author jinzhubaofu <ludafa@outlook.com>
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownItClass = require('./markdown-it-class');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
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
                                ],
                                [
                                    MarkdownItClass,
                                    'md'
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
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks(module) {
                let context = module.context;
                if (typeof context !== 'string') {
                    return false;
                }
                return /node_modules/.test(context);
            }
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

if (process.env.DEBUG) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
