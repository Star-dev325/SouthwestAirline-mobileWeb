'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('config');
const _ = require('lodash');
const requireDir = require('require-dir');
const compress = require('compression');
const middlewareDyson = require('./libs/middlewareDyson');
const middlewareProxy = require('./libs/middlewareProxy');
const dysonConfig = require('../dyson');
const useHTML5HistoryApi = require('connect-history-api-fallback');
const dumpMiddleware = require('./libs/dumpMiddleware');
const injectAdobeAnalyticsMiddleware = require('./libs/injectAdobeAnalyticsMiddleware');

const server = () => {
  let middlewares = [useHTML5HistoryApi()];
  const defaultOptions = {};

  if (gutil.env.proxy) {
    const hosts = gulp.config('hosts');

    const keys = [
      'LUV_API',
      'LOGGING_API',
      'CAR_API',
      'HOTEL_API',
      'SECURITY_API',
      'CHAPI_MISC',
      'CHAPI_AIR_OPERATIONS',
      'CONTENT_API',
      'CHAPI_AIR_BOOKING',
      'CHAPI_AIR_SHOPPING',
      'API_GATEWAY_CHASE_API'
    ];

    const conf = requireDir(config.util.getEnv('NODE_CONFIG_DIR'));

    if (_.indexOf(hosts, gutil.env.proxy) === -1) {
      gutil.env.proxy = hosts[0];
    }

    const proxyUrls = _.filter(keys, (key) => conf[gutil.env.proxy][key]).map((key) => {
      function makeFullUrlIfNecessary(url) {
        const isRelativeUrl = !url.startsWith('http');

        if (isRelativeUrl) {
          return `https://mobile.${gutil.env.proxy}.southwest.com${url}`;
        }

        return url;
      }

      const localProxyUrl = conf['default-proxy'][key];
      const remoteServiceUrl = makeFullUrlIfNecessary(conf[gutil.env.proxy][key]);

      return {
        localProxyUrl,
        remoteServiceUrl
      };
    });

    middlewares.push(
      dumpMiddleware({
        folder: '.dump',
        urls: proxyUrls.map((proxyUrl) => proxyUrl.localProxyUrl)
      })
    );

    proxyUrls.forEach((proxy) => {
      middlewares.push(middlewareProxy(proxy.localProxyUrl, proxy.remoteServiceUrl));
    });

    const environmentSettings = conf[gutil.env.proxy];

    // Proxy for WCM Content
    const WCM_URL = environmentSettings.WCM_URL || `https://mobile.${gutil.env.proxy}.southwest.com/content/`;
    const WCM_BOOTSTRAP_URL = `https://mobile.${gutil.env.proxy}.southwest.com/swa-ui/bootstrap/`;

    middlewares.push(middlewareProxy('/content/', WCM_URL, {}));
    middlewares.push(middlewareProxy('/swa-ui/bootstrap/', WCM_BOOTSTRAP_URL, {}));
  } else {
    middlewares = middlewares.concat(middlewareDyson(dysonConfig));
    middlewares.push(injectAdobeAnalyticsMiddleware());
    defaultOptions.serveStatic = [gulp.config('mock.wcm')];
  }

  if (process.env.NODE_ENV === 'production') {
    middlewares.push(compress());
  }

  return {
    options: _.merge(
      {
        notify: false,
        logSnippet: false,
        port: 3000,
        ghostMode: false,
        server: {
          baseDir: `${gulp.config('root.dist')}`,
          wcmMockDir: `${gulp.config('mock.wcm')}`,
          middleware: middlewares
        },
        ui: {
          port: 9999
        }
      },
      defaultOptions
    )
  };
};

module.exports = server;
