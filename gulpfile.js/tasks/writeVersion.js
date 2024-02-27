const gulp = require('gulp');
const swaBuildScripts = require('swa-build-scripts');

const TASK_NAME = 'writeVersion';

function writeVersion(callback) {
  gulp.autoRegister(TASK_NAME, () => {
    swaBuildScripts.writeVersion.writeDotComVersion(`${gulp.config('root.dist')}/version.json`);
    callback();
  });
}

gulp.task(TASK_NAME, writeVersion);

module.exports = writeVersion;
