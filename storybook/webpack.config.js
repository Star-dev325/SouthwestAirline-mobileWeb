const webpack = require('webpack');
const sourcemapsEnabled = process.env.STORYBOOK_SOURCEMAPS || false;

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat([
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules\/(?!jose\/|@?swa-).*/, 
      use: ['babel-loader']
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            alias: {
              '../fonts/iconfont.eot': '../../build/mobile-swa-ui-app-mobile-web/fonts/iconfont.eot',
              '../fonts/iconfont.woff2': '../../build/mobile-swa-ui-app-mobile-web/fonts/iconfont.woff2',
              '../fonts/iconfont.woff': '../../build/mobile-swa-ui-app-mobile-web/fonts/iconfont.woff',
              '../fonts/iconfont.ttf': '../../build/mobile-swa-ui-app-mobile-web/fonts/iconfont.ttf'
            },
            sourceMap: sourcemapsEnabled
          }
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules/'],
            sourceMap: sourcemapsEnabled
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: ['url-loader']
    }
  ]);

  storybookBaseConfig.devtool = process.env.STORYBOOK_DEVTOOL || 'inline-source-map';
  storybookBaseConfig.stats = 'errors-only';

  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: true
    })
  );

  return storybookBaseConfig;
};
