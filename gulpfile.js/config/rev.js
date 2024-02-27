const gulp = require('gulp');

module.exports = {
  src: [`${gulp.config('root.dist')}/**`, `!${gulp.config('root.dist')}/content/**`],
  dest: `${gulp.config('root.dist')}`,
  options: {
    dontRenameFile: ['.html', /manifest\/manifest\.json/g],
    dontGlobal: [/^\/app_httpd\.conf/g],
    dontUpdateReference: [/manifest\/manifest\.json/g, /^\/index\.html/g],
    replacer(fragment, replaceRegExp, newReference, referencedFile) {
      const isJsFile = fragment.isJs;
      const isJsReference = referencedFile.path.match(/.js$/);

      const doNotReplace = isJsFile && isJsReference;

      if (!doNotReplace) {
        fragment.contents = fragment.contents.replace(replaceRegExp, `$1${newReference}$3$4`);
      }
    },
    annotator(contents, path) {
      const isJs = /.js$/.test(path);

      return [{ contents, isJs }];
    }
  }
};
