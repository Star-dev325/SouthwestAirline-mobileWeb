const gulp = require('gulp');
const gutil = require('gulp-util');
const processhtml = require('gulp-processhtml');

const TASK_NAME = 'processHtml';

function processHtmlOnce(fileConf) {
  return gulp
    .src(fileConf.entry)
    .pipe(processhtml(fileConf.options))
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME));
}

function processHtml() {
  return gulp.autoRegister(TASK_NAME, processHtmlOnce, (config) => {
    gulp.watch(config.src, (evt) => {
      gutil.log(evt.type, evt.path);
      processHtmlOnce(config);
    });
  });
}

gulp.task(TASK_NAME, processHtml);
module.exports = processHtml;
