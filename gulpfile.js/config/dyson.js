const gulp = require('gulp');

const servicesDir = gulp.config('mock.services');
const templatesDir = gulp.config('mock.templates');

module.exports = {
  watchFiles: [`${servicesDir}/**/*.js`, `${templatesDir}/**/*.js`, `test/builders/**/*.js`],
  configDir: servicesDir,
  exposeRequest: true
};
