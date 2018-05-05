/**
 *@Description 开发环境Webpack配置项
 */
const conf = require('./webpack.conf');
const path = require('path');
const htmlPages = conf.htmlPages;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlAfterWebapckPlugin = require('./htmlafterwebpackplugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const jquery = require("jquery");
const htmlPlugins = htmlPages.map(htmlPage=>{
    let dirHtml = `${htmlPage.dir}.html`;
    return new HtmlWebpackPlugin({
        template: path.join(conf.rootPath, './web/views/', dirHtml),
        inject: false,
        chunks: htmlPage.chunks,
        filename: `./views/${dirHtml}`,
    });
});

const options = {
    output: {
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {}
        }),
        // new webpack.ProvidePlugin({
        //     jQuery: "jquery",
        // }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/log4js.json'),
            filename: './log4js.json',
            inject: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/scripts/[name].bundle.js'
        }),
        ...htmlPlugins,
        new HtmlAfterWebapckPlugin(),
        new CopyWebpackPlugin([{
            context: path.join(conf.rootPath, './web/book'),
            from: '**/*',
            to: 'book'
        }]),
        new CopyWebpackPlugin([{
            context: path.join(conf.rootPath),
            from: './package.json',
            to: './'
        }]),
         new CopyWebpackPlugin([{
            context: path.join(conf.rootPath),
            from: './pm2.json',
            to: './'
        }]),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ExtractTextPlugin("assets/styles/[name].css"),
        new StyleLintPlugin({
            files: '**/*.css',
            quiet: true,
            cache: true,
            fix:true
        }),
        // new webpack.LoaderOptionsPlugin({ //压缩css部分
        //     minimize: true
        // }),
    ]
};
const _options = Object.assign(options, conf.dev);
for (let i in conf.TemplatePage) {
    _options.plugins.push(
        new HtmlWebpackPlugin({
            template: conf.TemplatePage[i],
            filename: './widget/' + i + '/' + i + '.html',
            inject: false
        })
    )
};
module.exports = _options;