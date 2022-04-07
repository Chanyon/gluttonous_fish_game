const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports ={
    entry:"./src/main.ts",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,'./build'),
    },
    mode: 'development',//代码环境
    module:{ //配置相关模块
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader',{
                    loader:'postcss-loader'
                }],//从右向左执行
            },
            {
                test:/\.ts$/i,
                use:["ts-loader"],
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name:'assets/img/[name].[ext]'
                } 
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"assets/css/[name].css", //html引入什么名字的js文件，name就是啥
            chunkFilename:"css/[id].css"
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
        }),
        new CleanWebpackPlugin()
    ],
    resolve:{
        extensions:[".ts",".js"]
    }
}