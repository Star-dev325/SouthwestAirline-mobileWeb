'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const through = require('through');
const mergeStream = require('merge-stream');

const options = {};

const DEV_MODE = 'devMode';

function config(path, value) {
  if (value) {
    return _.set(options, path, value);
  }

  return _.get(options, path);
}

function pipeTimer(taskname) {
  taskname = taskname || 'some task';
  const startTime = new Date();

  return through(start, end);

  function start() {}

  function end() {
    if (gulp.config(DEV_MODE)) {
      this.on('end', () => {
        const time = new Date() - startTime;

        gutil.log(
          'Watcher:',
          `'${gutil.colors.cyan(taskname)}'`,
          're-bundle after',
          gutil.colors.magenta(time > 1000 ? `${time / 1000} s` : `${time} ms`)
        );
      });
    }
    this.queue(null);
  }
}

function autoRegister(TASK_NAME, bundleFn, devModelFn) {
  let conf = gulp.config(['tasks', TASK_NAME]);

  conf = _.get(conf, 'index') || conf;

  if (_.isFunction(conf)) {
    conf = conf();
  }

  if (_.isEmpty(conf)) {
    return register({});
  }

  if (conf.files && _.isArray(conf.files)) {
    return mergeStream.apply(gulp, _.map(conf.files, register.bind(gulp, conf.options)));
  }

  return register(conf);

  function register(commonOptions, config) {
    if (_.isObject(config)) {
      config.options = _.merge({}, commonOptions, config.options);
    } else {
      config = commonOptions;
    }

    if (_.isFunction(devModelFn) && gulp.config(DEV_MODE)) {
      devModelFn(config);
    }

    return bundleFn(config);
  }
}

module.exports = function bindToGulp(gulp) {
  gulp.DEV_MODE = DEV_MODE;
  gulp.config = config;
  gulp.pipeTimer = pipeTimer;
  gulp.autoRegister = autoRegister;
};
