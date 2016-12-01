/**
 * @file dev server
 * @author leon <lupengyu@baidu.com>
 */

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.dev.js');

const compiler = webpack(config);

const app = express();

const middleware = webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    publicPath: '/',
    path: path.join(__dirname, '../asset'),
    historyApiFallback: true,
    stats: {
        colors: true
    }
});

app.use(middleware);

const fs = middleware.fileSystem;

app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.join(__dirname, '../asset', filename));
});

app.get('/', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, req.path), (err, file) => {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.send(file.toString());
        }
    });
});

// proxy config: not used yet
// const url = require('url');
// const proxy = require('express-http-proxy');
//
// [
//     '/activity',
//     '/page',
//     '/goods',
//     '/image',
//     '/account',
//     '/token',
//     '/template'
// ].reduce(function (app, name) {
//     return app.use(name, proxy('http://localhost:8088', {
//         forwardPath(req, res) {
//             return `${name}${url.parse(req.url).path}`;
//         }
//     }));
// }, app);

const port = 8080;

app.listen(port, function () {
    console.log(`dev server start: http://localhost:${port}`);
});
