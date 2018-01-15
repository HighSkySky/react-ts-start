const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "./src/index.tsx",
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-hot-ts',
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, '../index.html')
    }),
  ],

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
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
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
    ]
  },

  devServer: {
    hot: true
  }

};
