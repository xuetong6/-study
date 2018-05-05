/*
 *@Description webpack module、plugins等核心配置文件
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entryPath = path.join(__dirname, '../web/views'); //非监听自动更新模式下
const widgetPath = path.join(__dirname, '../web/widget'); //
const rootPath = path.join(__dirname, '..');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

//生产环境&开发环境基础配置项
//js入口文件 entris
const jsEntris = fs.readdirSync(entryPath).reduce(function(o, filename) {
    if (!/\./.test(filename)) {
        var _fd = entryPath + '/' + filename;
        fs.readdirSync(_fd).map(function(ifilename) {
            (/.entry.(es|js)$/.test(ifilename)) && (o[ifilename.replace(/.entry.(es|js)/, '')] = path.join(entryPath, filename, ifilename));
        });
    }
    return o;
}, {});
//自动遍历全部Widget
const widgetPage = fs.readdirSync(widgetPath).reduce(function(o, filename) {
    if (!/\./.test(filename)) {
        const _fd = widgetPath + '/' + filename;
        fs.readdirSync(_fd).map(function(ifilename) {
            (/.html$/.test(ifilename)) && (o[ifilename.replace('.html', '')] = path.join(widgetPath, filename, ifilename));
        });
    }
    return o;
}, {});

// 自动编译views中的模板文件
const htmlChunks = {
    'book-book': ['vendor', 'common', 'book-index'],
    'bookcommontemp-layout': [],
    'bookdesktemp-bookDesk': ['vendor', 'common', 'bookDesk-index'],
    'common-layout': [],
    'error-404': [],
    'error-500': [],
    'index-index': ['vendor', 'common', 'index-index'],
    'student-student': ['vendor', 'common', 'student-index'],
    'studentsresumetemp-layout': [],
    'taskmoretemp-taskMore': ['vendor', 'common', 'taskMore'],
    'video-video': ['vendor', 'common', 'video-index'],
};
const htmlPages = [];
fs.readdirSync(entryPath).map((filename)=>{
    let firstDir = path.join(entryPath, filename);
    if (fs.statSync(firstDir).isDirectory()) {
        let pageDir = path.join(firstDir, './pages');
        fs.readdirSync(pageDir).map(htmlFile=>{
            let matchName = htmlFile.match(/^(\w+)\.html$/);
            if (matchName) {
                matchName = matchName[1];
                let htmlFileName = matchName;
                matchName = filename + '-' + htmlFileName;
                htmlPages.push({ 
                    name: htmlFileName,
                    dir: path.join(`${filename}/pages`, htmlFileName),
                    chunks: htmlChunks[matchName],
                });
            }
        });
    }
});

const _entris = Object.assign(jsEntris),
    _module = {
        rules: [
            {
                enforce: "pre",
                test: /\.(es|js)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                },
            },    
            {
                //设置对应的资源后缀.
                test: /\.(css)$/,
                //设置后缀对应的加载器.
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }]
                })
            }, {
                test: /\.(es|js)$/,
                loader: "babel-loader",
                options: {
                    "presets": ['env', 'stage-0'],
                    "plugins": ['transform-runtime']
                },
                exclude: path.resolve(__dirname, "../node_modules")
            }, 
            {
                // loader: 'style!css?sourceMap!sass?sourceMap!import-glob'
                test: /\.less$/i,
                //loader: extractLESS.extract(['css', 'less'])
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            }]
    },
    _resolve = {
        extensions: [".vue", ".js", ".es", ".less"],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    };
let _devLoaders = _.clone(_module.rules);
let _prodLoaders = _.clone(_module.rules);
_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[ext]'
});
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[hash:5].[ext]'
});
const webpackConfig = {
    dev: {
        entry: _entris,
        module: {
            rules: _devLoaders
        },
        resolve: _resolve,
    },
    prod: {
        entry: _entris,
        module: {
            rules: _prodLoaders
        },
        resolve: _resolve
    },
    TemplatePage: widgetPage
};

module.exports = webpackConfig;
module.exports.rootPath = rootPath;
module.exports.htmlPages = htmlPages;