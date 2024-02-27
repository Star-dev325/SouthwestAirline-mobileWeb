import DYSON_TASK_NAME from './dyson';
import CHASE_MOCK_SERVER from './chaseMockServer';
import PAYPAL_MOCK_SERVER from './payPalMockServer';
import APPLE_PAY_MOCK_SERVER from './applePayMockServer';

const _ = require('lodash');
const gulp = require('gulp');
const gutil = require('gulp-util');
const http = require('http');
const express = require('express');
const serveStatic = require('serve-static');
const runSequence = require('gulp4-run-sequence');
const nwrun = require('nwrun');
const findAPortNotInUse = require('../libs/findAPortNotInUse');

const TASK_NAME = 'e2e';

function e2e(callback) {
  gulp.autoRegister(TASK_NAME, (conf) => {
    const options = conf.options || {};

    Promise.resolve('start')
      .then(setConfiguration)
      .then(() =>
        Promise.all([
          findAPortNotInUse({
            portStart: 9000,
            portEnd: 12306
          }).then((port) =>
            staticServer(
              _.merge({}, options.server, {
                port
              })
            )
          )
        ])
      )
      .then((servers) => {
        if (!gutil.env.mock_services_only) {
          const staticServerInst = servers[0];
          const config = require('test/e2e/nightwatch.js');

          updateNightWatchLaunchUrl(config, staticServerInst.address().port);
          updateNightWatchDysonPort(config, gutil.env.DYSON_PORT);
          nwrun(config, (success) => {
            staticServerInst.close();
            callback();
            const status = success ? 0 : 1;

            process.exit(status);
          });
        }
      })
      .catch((e) => {
        gutil.log(e);
        process.exit(1);
      });
  });
}

gulp.task(
  TASK_NAME,
  gulp.series(gulp.parallel(DYSON_TASK_NAME, CHASE_MOCK_SERVER, PAYPAL_MOCK_SERVER, APPLE_PAY_MOCK_SERVER), e2e)
);

module.exports = e2e;

function staticServer(options) {
  options = options || {};

  return new Promise((resolve, reject) => {
    const app = express();

    if (_.isArray(options.middleware)) {
      _.forEach(options.middleware, (middlewareItem) => {
        app.use(middlewareItem);
      });
    }

    if (!gutil.env.mock_services_only) {
      app.use(serveStatic(options.baseDir));
    }

    app.use(serveStatic(options.wcmMockDir));

    const serve = http.createServer(app).listen(options.port || 3000, (err) => {
      gutil.log(`${TASK_NAME} listened port: ${options.port}`);

      return err ? reject(err) : resolve(serve);
    });
  });
}

function updateNightWatchLaunchUrl(config, port) {
  const settings = config.test_settings;

  // eslint-disable-next-line lodash/prefer-filter
  _.each(settings, (setting) => {
    if (setting.launch_url) {
      setting.launch_url = setting.launch_url.replace(/(^https?:\/\/[A-Za-z0-9.-]{3,}):\d{2,4}/g, `$1:${port}`);
    }
  });
}

function updateNightWatchDysonPort(config, port) {
  const settings = config.test_settings;

  // eslint-disable-next-line lodash/prefer-filter
  _.each(settings, (setting) => {
    if (setting.globals) {
      setting.globals = _.merge(setting.globals, { DYSON_PORT: port });
    }
  });
}

function setConfiguration() {
  return new Promise((resolve) => {
    runSequence('setConfig', resolve);
  });
}
