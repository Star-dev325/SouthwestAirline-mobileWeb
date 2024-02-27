const _ = require('lodash');
const { argv } = require('yargs');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const isUsingOriginCode = !_.isUndefined(argv.origin);

module.exports = {
  devtool: 'source-map',
  plugins: isUsingOriginCode
    ? []
    : [
      new UglifyJsPlugin({
        mangle: true,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          warnings: false,
          pure_funcs: ['console.log']
        },
        sourceMap: true
      })
    ]
};
