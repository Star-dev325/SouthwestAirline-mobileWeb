const gulp = require('gulp');
const dayjs = require('dayjs');

module.exports = {
  files: [
    {
      entry: `${gulp.config('root.src')}/index.html`,
      src: [`${gulp.config('root.src')}/*.html`],
      dest: `${gulp.config('root.dist')}`
    }
  ],
  options: {
    data: {
      build: process.env.JOB_NAME || '',
      commit: process.env.GIT_COMMIT || '',
      time: dayjs().toString()
    }
  }
};
