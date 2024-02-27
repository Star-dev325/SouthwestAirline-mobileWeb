const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/html'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.json?$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', __dirname]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mweb Fill',
      bookmark: String(fs.readFileSync(path.join(__dirname, 'bookmark.js'))).replace(/[\t\n]/g, ''),
      template: './templates/install.ejs',
      inject: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      include: /\.min\.js$/,
      minimize: true
    })
  ],

  node: {
    filename: true,
    process: false,
    global: true
  }
};
