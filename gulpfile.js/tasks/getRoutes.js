const gulp = require('gulp');
const getRoutes = require('../libs/getRoutes');

const TASK_NAME = 'processHTMLRoutes';

const options = {
  basePath: '/',
  destination: 'build/mobile-swa-ui-app-mobile-web',
  sourceHtmlPath: 'build/mobile-swa-ui-app-mobile-web/index.html',
  templateOptions: {}
};

function processHTMLRoutes(callback) {
  gulp.autoRegister(TASK_NAME, () => {
    getRoutes(options);
    callback();
  });
}

gulp.task(TASK_NAME, processHTMLRoutes);

module.exports = processHTMLRoutes;
