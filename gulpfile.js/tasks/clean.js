const gulp = require('gulp');
const del = require('del');

const TASK_NAME = 'clean';

function clean(callback) {
  gulp.autoRegister(TASK_NAME, () => {
    del.sync(gulp.config('root.built'));
    callback();
  });
}

gulp.task(TASK_NAME, clean);

module.exports = clean;
