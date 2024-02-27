const fs = require('fs');
const gulp = require('gulp');

const dist = gulp.config('root.built');

module.exports = () => ({
  tasks: fs.readdirSync(dist).map((dir) => ({
    name: `tar:${dir}`,
    src: `${dist}/${dir}/**`,
    dest: dist,
    filename: `${dir}.tar`
  }))
});
