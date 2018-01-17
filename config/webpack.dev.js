const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx',
  ],
  output: {
    filename: 'bundle.js', // 打包后的文件名
    chunkFilename: '[name].[chunkhash:5].js',
    path: resolve('dist'), // 打包后的文件存储位置
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    clientLogLevel: 'warning', // 配置浏览器控制台输出日志的内容
    historyApiFallback: true, // 针对单页应用,无论什么请求都返回这个html
    contentBase: 'public', // 这里path.join(__dirname, 'public') 不知道为什么不行
    host: 'localhost',
    port: 8080,
    https: true,
    compress: true, // 启用gzip压缩
    open: false, // 设置为true时会浏览器会自动打开默认页面
    proxy: { //设置代理
      '/api': { // 现在/api/users,会被代理到请求https://localhost:3000/users
        target: 'https://localhost:3000',
        pathRewrite: {"^/api" : ""},
        secure: false // 默认不支持无效证书的服务器,需特别设置为false
      }
    },
    quiet: true // 除了初始启动信息之外的任何内容都不会被打印到控制台
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      inject: true,
    }),
  ]
})