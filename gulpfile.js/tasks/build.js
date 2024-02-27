const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');

const TASK_NAME = 'build';

function build(callback) {
  const conf = gulp.config(['tasks', TASK_NAME]);

  runSequence.apply(gulp, [].concat(conf.taskQueue).concat(callback));
}

gulp.task(TASK_NAME, build);

module.exports = build;
