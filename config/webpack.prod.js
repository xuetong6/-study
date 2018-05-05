/**
 *@Description 生产环境Webpack配置项
 */
const conf = require('./webpack.conf');
const htmlPages = conf.htmlPages;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlAfterWebapckPlugin = require('./htmlafterwebpackplugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlPlugins = htmlPages.map(htmlPage=>{
    let dirHtml = `${htmlPage.dir}.html`;
    return new HtmlWebpackPlugin({
        template: path.join(conf.rootPath, './web/views/', dirHtml),
        inject: false,
        chunks: htmlPage.chunks,
        filename: `./views/${dirHtml}`,
        minify: {
            removeCommets: true,
            collapseWhitespace: true,
        },
    });
});

const options = {
    output: {
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minify: {
                collapseWhitespace: true
            },
            filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
        }),
        new ImageminPlugin({ 
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9,
            },
        }),
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
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/log4js.json'),
            filename: './log4js.json',
            inject: false
        }),
        ...htmlPlugins,
        new HtmlAfterWebapckPlugin(),
        new webpack.LoaderOptionsPlugin({ //压缩css部分
            minimize: true
        }),
        new ExtractTextPlugin("assets/styles/[name].[chunkhash:5].css"),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
    ]
}
let _options = Object.assign(options, conf.prod);
for (let i in conf.TemplatePage) {
    _options.plugins.push(
        new HtmlWebpackPlugin({
            template: conf.TemplatePage[i],
            filename: './widget/' + i + '/' + i + '.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false
        })
    )
};
module.exports = _options;