const _ = require('lodash');
const gulp = require('gulp');
const nwrun = require('nwrun');

const TASK_NAME = 'e2eLive';

function e2eLive(callback) {
  const config = require('test/e2e/nightwatch.js');
  const liveConfig = require('test/e2e/nightwatchLive.js');

  _.merge(config, liveConfig);

  nwrun(config, (success) => {
    if (!success) {
      process.exit(1);
    }
    callback();
  });
}

gulp.task(TASK_NAME, e2eLive);

module.exports = e2eLive;
