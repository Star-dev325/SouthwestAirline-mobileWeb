const gulp = require('gulp');
const gulpTar = require('gulp-tar');
const gulpGzip = require('gulp-gzip');
const runSequence = require('gulp4-run-sequence');

const TASK_NAME = 'tar';

function tar(callback) {
  gulp.autoRegister(TASK_NAME, (config) => {
    const { tasks } = config;

    tasks.forEach((taskOptions) => {
      const { name } = taskOptions;
      const { src } = taskOptions;
      const { dest } = taskOptions;
      const { filename } = taskOptions;

      gulp.task(name, () =>
        gulp.src(src).pipe(gulpTar(filename)).pipe(gulpGzip()).pipe(gulp.dest(dest)).pipe(gulp.pipeTimer(name))
      );
    });

    runSequence(
      tasks.map((task) => task.name),
      callback
    );
  });
}

gulp.task(TASK_NAME, tar);
module.exports = tar;
