'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const gulpMocha = require('gulp-spawn-mocha');

const TASK_NAME = 'test';
const isWatchON = !!gutil.env.watch;

function testOnce(conf) {
  return gulp.src(conf.src, { read: false }).pipe(gulpMocha(conf.options));
}

function testOnceWithErrorCatch(conf) {
  return gulp.src(conf.src, { read: false }).pipe(gulpMocha(conf.options)).on('error', gutil.log);
}

function getFileFeatureFolder(path) {
  path = path || '';
  const matches = path.match(/src\/[^/]*/g);

  if (matches && matches.length > 0) {
    return matches[0];
  }

  return '';
}

function watchTest(conf) {
  const featureFolders = _(conf.src)
    .map(getFileFeatureFolder)
    .reject(_.isEmpty)
    .map((path) => `${path}/**/*.js{,x}`)
    .uniq()
    .value();

  let isWatched = false;
  const watch = function () {
    if (isWatched) {
      return;
    }
    isWatched = true;
    gutil.log(`Start watching files: ${featureFolders.join(',')}`);

    return gulp.watch(featureFolders, (evt) => {
      gutil.log(evt.type, evt.path);

      return testOnceWithErrorCatch(conf);
    });
  };

  const testTask = testOnce(conf);

  testTask.on('end', watch);
  testTask.on('error', watch);

  return testTask;
}

function test() {
  if (isWatchON) {
    return gulp.autoRegister(TASK_NAME, watchTest);
  }

  return gulp.autoRegister(TASK_NAME, testOnce);
}

gulp.task(TASK_NAME, test);
module.exports = test;
