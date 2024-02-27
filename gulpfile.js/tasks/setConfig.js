const gulp = require('gulp');

const TASK_NAME = 'setConfig';

function copyOnce(fileConf) {
  return gulp.src(fileConf.src).pipe(gulp.dest(fileConf.dest)).pipe(gulp.pipeTimer(TASK_NAME));
}

function copy() {
  return gulp.autoRegister(TASK_NAME, copyOnce);
}

gulp.task(TASK_NAME, copy);
module.exports = copy;
