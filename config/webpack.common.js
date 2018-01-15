const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx',
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
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
        include: path.resolve(__dirname, '../src'),
      },
      {
        enforce: 'pre', // 规则覆盖
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  },
};