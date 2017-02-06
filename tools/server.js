/**
 * @file webpack dev server
 * @author leon <ludafa@outlook.com>
 */

// const path = require('path');

const webpack = require('webpack');
const config = require('./webpack.dev.js');

config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server'
);

const compiler = webpack(config);

const WebpackDevServer = require('webpack-dev-server');
const server = new WebpackDevServer(compiler, {
    // contentBase: path.join(__dirname, '../example'),
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    onInfo: true,
    stats: {
        colors: true
    }
});

server.listen(8080);
