const webpack = require('webpack');
const { argv } = require('yargs');
const mainGenerator = require('./mainGenerator');
const environmentConfigGenerator = require('./environmentConfigGenerator');

const { proxy = 'default' } = argv;
const { NODE_ENV, APP_VERSION, PWD } = process.env;
const isDevMode = process.env.NODE_ENV !== 'production';
const rootDir = process.cwd();

const customizedLog = (stats) => {
  console.log(
    stats.toString({
      // eslint-disable-line no-console
      colors: true,
      errors: true,
      modules: false,
      hash: false,
      version: false
    })
  );
};

const webpackConfigs = [
  environmentConfigGenerator({
    isDevMode,
    proxyEnv: proxy
  }),
  mainGenerator({
    isDevMode,
    rootDir,
    proxyEnv: proxy,
    NODE_ENV,
    APP_VERSION,
    PWD
  })
];

module.exports = (onFinish, onError) => {
  webpack(webpackConfigs, (err, stats) => {
    if (err) onError(err);
    customizedLog(stats);
    onFinish();
  });
};
