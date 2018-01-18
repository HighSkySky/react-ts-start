const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    alias: { // 设置别名来把原导入路径映射成一个新路径
      '@': resolve('src'),
    },
    modules: [resolve('node_modules')], // 优化webpack文件搜索范围
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          'awesome-typescript-loader'
        ],
        include: resolve('src'),
      },
      {
        enforce: 'pre', // 把该loader的执行顺序放到最后
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                }
            },
            {
                loader: 'postcss-loader'
            }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  externals: {} // 告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块
};