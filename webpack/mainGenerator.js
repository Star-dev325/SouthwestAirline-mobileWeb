const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./config/common');
const devConfig = require('./config/dev');
const prodConfig = require('./config/prod');

module.exports = (options) => {
  const { isDevMode, NODE_ENV, APP_VERSION, PWD } = options;
  const packageJson = require(path.join(PWD, './package.json'));

  return merge(
    {
      entry: {
        'mobile-swa-ui-app-mobile-web/js/index': 'src/app/index',
        'mobile-swa-ui-app-mobile-web/js/analyticsLoader': 'src/shared/analytics/analyticsLoader'
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'mobile-swa-ui-app-mobile-web/js/vendor',
          minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': `'${NODE_ENV}'`,
          __DEV__: isDevMode,
          'process.env.APP_VERSION': APP_VERSION || JSON.stringify(packageJson.version) || '0.0.1'
        })
      ]
    },
    commonConfig,
    isDevMode ? devConfig : prodConfig
  );
};
