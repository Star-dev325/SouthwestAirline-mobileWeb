const _ = require('lodash');
const fs = require('fs');
const merge = require('webpack-merge');
const commonConfig = require('./config/common');
const prodConfig = require('./config/prod');

function getAllEnvironments() {
  return fs.readdirSync('./config').map((filename) => filename.replace(/.js/, ''));
}

function getReplacementConfigurationByConfigKey(configKey, proxyEnv) {
  const _replaceConfigKey = `${configKey}: '${require(`../config/${proxyEnv}`)[configKey]}'`;
  const _replaceRemoteServiceUrl = `REMOTE_SERVICE_URL: 'https://mobile.${proxyEnv}.southwest.com'`;

  return {
    search: `${configKey}: '.*'`,
    replace: configKey === 'REMOTE_SERVICE_URL' ? _replaceRemoteServiceUrl : _replaceConfigKey,
    flags: 'g'
  };
}

module.exports = (options) => {
  const { proxyEnv, isDevMode } = options;
  const envEntries = _.reduce(
    getAllEnvironments(),
    (obj, env) => {
      obj[`${env}-config/js/config`] = `config/${env}`;

      return obj;
    },
    {}
  );

  return merge(
    {
      entry: envEntries,
      output: {
        library: 'mwebAppConfig',
        libraryTarget: 'this'
      },
      module: {
        rules: [
          {
            test: /default-proxy\.js$/,
            loader: 'string-replace-loader',
            query: {
              multiple: [
                getReplacementConfigurationByConfigKey('OAUTH_CLIENT_ID_COOKIE', proxyEnv),
                getReplacementConfigurationByConfigKey('OAUTH_CLIENT_ID_CORPORATE', proxyEnv),
                getReplacementConfigurationByConfigKey('OAUTH_CLIENT_ID_CORPORATE_COOKIE', proxyEnv),
                getReplacementConfigurationByConfigKey('REMOTE_SERVICE_URL', proxyEnv),
                getReplacementConfigurationByConfigKey('API_KEY', proxyEnv),
                getReplacementConfigurationByConfigKey('SWA_VACATIONS_URL', proxyEnv),
                getReplacementConfigurationByConfigKey('PAYPAL_WEBVIEW_CANCEL_URL', proxyEnv),
                getReplacementConfigurationByConfigKey('PAYPAL_WEBVIEW_RETURN_URL', proxyEnv),
                getReplacementConfigurationByConfigKey('IOS_API_KEY', proxyEnv),
                getReplacementConfigurationByConfigKey('IOS_API_CHANNEL', proxyEnv),
                getReplacementConfigurationByConfigKey('IOS_API_CORPORATE_CHANNEL', proxyEnv),
                getReplacementConfigurationByConfigKey('APP_ENV', proxyEnv),
                getReplacementConfigurationByConfigKey('CEPTOR_SITE', proxyEnv),
                getReplacementConfigurationByConfigKey('CEPTOR_ENV', proxyEnv)
              ]
            }
          }
        ]
      }
    },
    commonConfig,
    isDevMode ? {} : prodConfig
  );
};
