/**
 * @file 使用 dll 来创建 inf 包的依赖
 * @author leon <lupengyu@baidu.com>
 */

const webpack = require('webpack');

module.exports = {

    entry: (function (pkg, mapper) {

        return {
            inf: Object
                .keys(pkg.dependencies)
                .reduce(
                    function (dependencies, name) {
                        return dependencies.concat(
                            mapper[name] ? mapper[name] : name
                        );
                    },
                    ['numen/HashLocator']
                )
        };

    })(require('../package.json'), require('./dll.json')),

    output: {
        filename: '[name].dll.js',
        path: 'asset',
        library: '[name]'
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: [
                'babel?presets[]=es2015,presets[]=react,presets[]=stage-1&cacheDirectory'
            ],
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url']
        }, {
            test: /\.(svg|eot|ttf|woff|jpg|png)(\?.*)?$/,
            loader: 'file?name=asset/[name].[ext]'
        }, {
            test: /\.json(\?.*)?$/,
            loader: 'json'
        }]
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: 'asset/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
        new webpack.IgnorePlugin(/locale/, /moment/)
    ]
};
