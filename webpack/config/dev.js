const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  devtool: 'source-map',
  watch: true,
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 8888
    })
  ]
};
