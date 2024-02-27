const gulp = require('gulp');
const RevAll = require('gulp-rev-all');
const del = require('del');
const mapStream = require('map-stream');

const TASK_NAME = 'rev';

function revCleaner() {
  return mapStream((file, callback) => {
    const manifest = JSON.parse(String(file.contents));

    const fileListNeedToClean = Object.keys(manifest).filter((key) => key !== manifest[key]);

    del.sync(fileListNeedToClean, {
      cwd: file.base
    });

    callback(null, file);
  });
}

function rev(callback) {
  gulp.autoRegister(TASK_NAME, (conf) => {
    const revAll = new RevAll(conf.options);

    return gulp
      .src(conf.src)
      .pipe(revAll.revision())
      .pipe(gulp.dest(conf.dest))
      .pipe(revAll.manifestFile())
      .pipe(revCleaner())
      .on('end', callback);
  });
}

gulp.task(TASK_NAME, rev);
module.exports = rev;
