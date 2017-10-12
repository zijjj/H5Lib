var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//模板文件配置
var pageTplConfig = require('./page_tpl.config.js');

var env = "pro"; //dev开发环境 pro生产环境

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        //publicPath: 'http://mn.static.sinrewx.com/unisound/campus/',
        filename: 'js/[name].js?[chunkhash]'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: env == "pro" ? ExtractTextPlugin.extract({
                    use: ["css-loader?minimize=true&importLoaders=1", "postcss-loader"],
                    publicPath: "../"
                }) : ["style-loader", "css-loader?importLoaders=1", "postcss-loader"]
            }, {
                test: /\.less$/,
                use: env == "pro" ? ExtractTextPlugin.extract({
                    use: ["css-loader?minimize=true", "postcss-loader", "less-loader"],
                    publicPath: "../"
                }) : ["style-loader", "css-loader", "postcss-loader", "less-loader"]
                
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(html|html)$/,
                use: 'html-withimg-loader'
            }, {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash:5]',
                        outputPath: "img/"
                    }
                }]
            }/*, {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]?[hash:8]',
                        outputPath: "img/",
                        limit: 8192
                    }
                }]
            }*/
        ]
    },
    plugins: [],
    // devServer: {
    //     historyApiFallback: true
    // },
    devtool: '#eval-source-map',
    externals:{
        jquery: 'window.jQuery'
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}


//增加页面模板配置
module.exports.plugins = (module.exports.plugins || []).concat(pageTplConfig);


if (env === 'pro') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new ExtractTextPlugin("css/[name].css?[hash:8]"),
        new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
            }
        })
    ])
}
