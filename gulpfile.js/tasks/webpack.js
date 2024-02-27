const gulp = require('gulp');
const webpackRunner = require('../../webpack');

gulp.task(
  'webpack',
  () =>
    new Promise((resolve, reject) => {
      webpackRunner(resolve, reject);
    })
);
