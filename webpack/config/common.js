const autoprefixer = require('autoprefixer');
const dayjs = require('dayjs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');

const rootDir = process.cwd();
const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(rootDir, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!jose\/|@?swa-|yup).*/,
        use: ['babel-loader']
      },
      {
        test: /\.(s)?css$/,
        exclude: /node_modules\/@?swa-.*/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false,
                minimize: !isDevMode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  autoprefixer({
                    browsers: [
                      'ie >= 8',
                      'ie_mob >= 10',
                      'ff >= 30',
                      'chrome >= 34',
                      'safari >= 7',
                      'opera >= 23',
                      'ios >= 7',
                      'android >= 2.3',
                      'bb >= 10'
                    ]
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['node_modules/']
              }
            }
          ]
        })
      },
      // Assume NextGen stylesheets are not valid in mweb framework
      {
        test: /node_modules\/@?swa-.*\.s?css$/,
        use: "null-loader"
      }
    ]
  },
  resolve: {
    modules: [rootDir, 'node_modules'],
    extensions: ['.js', '.jsx', '*']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'mobile-swa-ui-app-mobile-web/css/index.css'
    }),
    new DefinePlugin({
      'process.env.BUILD_TIME': JSON.stringify(dayjs().toString())
    })
  ]
};
