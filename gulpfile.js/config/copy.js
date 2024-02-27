const gulp = require('gulp');

module.exports = {
  files: [
    {
      src: [`content/**/*.*`],
      dest: `${gulp.config('root.dist')}/content`
    },
    {
      src: [`${gulp.config('root.src')}/images/**/*.*`],
      dest: `${gulp.config('root.dist')}/images`
    },
    {
      src: [`${gulp.config('root.src')}/app_httpd.conf`],
      dest: `${gulp.config('root.dist')}`
    },
    {
      src: [`${gulp.config('root.src')}/manifest/manifest.json`],
      dest: `${gulp.config('root.dist')}/manifest`
    }
  ]
};
