const gulp = require('gulp');

const env = gulp.config('currentHost');

module.exports = {
  src: `${gulp.config('root.built')}/${env}-config/**`,
  dest: gulp.config('root.dist')
};
