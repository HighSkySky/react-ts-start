const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  entry: {
    main: resolve('/src/entry-prod.tsx'), //入口文件
    vendor: ['react', 'react-dom'], //分离第三方库
  },
  output: {
    filename: 'static/js/[name].[chunkhash:5].js', // 打包后的文件名
    chunkFilename: 'static/js/[id].[chunkhash:5].js',
    path: resolve('dist'), // 打包后的文件存储位置
    publicPath: '/', // 此处上线部署再改，对应的是服务器上存储打包后文件的路径
  },
  devtool: false,
  resolve: {
    mainFields: ['jsnext:main', 'main'], //优化支持tree-shaking的库
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), //报错时不退出webpack进程
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false, // 删除所有注释
          beautify: false // 最紧凑的输出
        },
        compress: {
          drop_console: true, // 删除所有console
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      },
      parallel: true // 启用并发
    }),
    new ExtractTextPlugin({ // 将css分离成单独的文件
      filename: 'static/css/[name].[contenthash].css',
      allChunks: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      inject: true,
      minify: { // 缩小输出
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency' // 允许模块在添加到html前排序
    }),
    new ClearWebpackPlugin([resolve('dist')]),
    new webpack.HashedModuleIdsPlugin(), // 根据模块生成模块id
    new webpack.optimize.ModuleConcatenationPlugin(), // 作用域提升(优化代码运行速度)
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // 指定公共 bundle 的名字,加manifest防止vendor的hash值改变。
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: resolve('dist/static'),
        ignore: ['index.html', 'favicon.ico']
      }
    ]),
    // new Visualizer(), //打包后可生成一个html文件,直接打开可看到打包文件的具体信息(包含各个模块的比重)
  ]
})