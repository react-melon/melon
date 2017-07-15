/**
 * @file React Story Book Webpack Conf
 * @author leon <ludafa@outlook.com>
 */


module.exports = function (storybookBaseConfig, configType) {

    storybookBaseConfig.module.loaders.push(
        {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus?paths=node_modules&resolve url&include css']
        },
        {
            test: /\.(svg|eot|ttf|woff|woff2|jpg|png)(\?.*)?$/,
            loader: 'file?name=asset/[name].[ext]'
        },
        {
            test: /\.json(\?.*)?$/,
            loader: 'json'
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        }
    );

    storybookBaseConfig.stylus = {
        'use': [require('nib')()],
        'import': ['~nib/lib/nib/index.styl']
    };

    storybookBaseConfig.devtool = 'eval-source-map';

    // Return the altered config
    return storybookBaseConfig;

};
